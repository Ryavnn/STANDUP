import './App.css'
import Dashboard from './ui/dashboard'
import Livefeed from './ui/liveFeed'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Livefeed />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App
