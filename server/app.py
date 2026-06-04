from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os, uuid

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'standups.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'txt', 'docx'}


class StandupPost(db.Model):
    __tablename__ = 'standup_post'
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100), nullable=False)
    yesterday = db.Column(db.Text, nullable=False)
    today = db.Column(db.Text, nullable=False)
    blockers = db.Column(db.Text, nullable=True)
    has_blocker = db.Column(db.Boolean, default=False)
    file_attachment = db.Column(db.String(255), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author,
            'yesterday': self.yesterday,
            'today': self.today,
            'blockers': self.blockers,
            'has_blocker': self.has_blocker,
            'file_attachment': self.file_attachment,
            'file_url': f'/uploads/{self.file_attachment}' if self.file_attachment else None,
            'timestamp': self.timestamp.isoformat() + 'Z',
        }


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/standups/', methods=['GET'])
def get_standups():
    standups = StandupPost.query.order_by(StandupPost.timestamp.desc()).all()
    return jsonify([s.to_dict() for s in standups])


@app.route('/standups/', methods=['POST'])
def create_standup():
    author = request.form.get('author', '').strip()
    yesterday = request.form.get('yesterday', '').strip()
    today = request.form.get('today', '').strip()
    blockers = request.form.get('blockers', '').strip()
    has_blocker = request.form.get('has_blocker', 'false').lower() in ('true', '1', 'yes')

    errors = {}
    if not author:
        errors['author'] = 'Author name is required'
    if not yesterday:
        errors['yesterday'] = 'Yesterday field is required'
    if not today:
        errors['today'] = 'Today field is required'
    if errors:
        return jsonify({'errors': errors}), 400

    file_attachment = None
    if 'file' in request.files:
        file = request.files['file']
        if file and file.filename and allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower()
            filename = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            file_attachment = filename

    post = StandupPost(
        author=author, yesterday=yesterday, today=today,
        blockers=blockers, has_blocker=has_blocker, file_attachment=file_attachment
    )
    
    recent_post = StandupPost.query.filter(
        StandupPost.author == author,
        StandupPost.yesterday == yesterday,
        StandupPost.today == today,
        StandupPost.blockers == blockers,
        StandupPost.timestamp >= datetime.utcnow() - timedelta(minutes=10)
    ).first()

    if recent_post:
        return jsonify({
            "error": "Duplicate submission detected. Please wait before resubmitting."
        }), 409
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201


@app.route('/standups/stats/', methods=['GET'])
def get_stats():
    today = datetime.utcnow().date()
    stats = []
    for i in range(6, -1, -1):
        day = today - timedelta(days=i)
        day_start = datetime.combine(day, datetime.min.time())
        day_end = datetime.combine(day, datetime.max.time())
        posts = StandupPost.query.filter(
            StandupPost.timestamp >= day_start,
            StandupPost.timestamp <= day_end
        ).all()
        stats.append({
            'date': day.isoformat(),
            'day': day.strftime('%a'),
            'posts': len(posts),
            'blockers': sum(1 for p in posts if p.has_blocker),
        })
    return jsonify(stats)


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
