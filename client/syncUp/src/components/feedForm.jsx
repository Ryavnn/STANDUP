import {useState} from "react"
import {useForm} from 'react-hook-form';
import { toast } from "react-toastify";
const FeedForm = () => {
    const [hasBlocker, setHasBlocker] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm();
    const onSubmit = async (data) =>{
        try{
            const formData = new FormData();
            formData.append("author", data.author)
            formData.append("yesterday", data.yesterday)
            formData.append("today", data.today)
            formData.append("blockers", data.blockers || "")
            formData.append("has_blocker", hasBlocker);

            if (data.file?.[0]){
                formData.append("file", data.file[0])
            }

            const response = await fetch(
              "https://standup-e6ai.onrender.com/standups/",
              {
                method: "POST",
                body: formData,
              },
            );

            const result = await response.json()
            if (!response.ok){
                toast.error(result.error || "Something went wrong");
            }

            toast.success("Standup submitted successfully");
            reset();
            setHasBlocker(false);
        } catch (error){
            console.error("Error submitting form:", error)
        }
    }
  return (
    <div className="feed-form flex flex-col gap-4 p-5 w-92 shadow-md rounded-md sticky top-5">
      <form
        className="form w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col gap-2">
          Name:
          <input
            {...register("author", {
              required: "Name is required",
            })}
            type="text"
            placeholder="eg Ryan Njoroge"
          />
        </label>
        {errors.author && (
          <div className="text-red-500 ">{errors.author.message}</div>
        )}

        <label className="flex flex-col gap-2">
          Yesterday:
          <input
            {...register("yesterday", {
              required: "Yesterday's log is required",
            })}
            type="text"
            placeholder="eg Solved a CI/CD issue"
          />
          {errors.yesterday && (
            <div className="text-red-500 ">{errors.yesterday.message}</div>
          )}
        </label>

        <label className="flex flex-col gap-2">
          Today:
          <input
            {...register("today", { required: "Today's log is required" })}
            type="text"
            placeholder="eg Implemented new feature"
          />
          {errors.today && (
            <div className="text-red-500 ">{errors.today.message}</div>
          )}
        </label>

        <label className="flex flex-col gap-2">
          Blockers:
          <input
            {...register("blockers")}
            type="text"
            placeholder="eg Any Blockers? (optional)"
          />
          {errors.blockers && (
            <div className="text-red-500 ">{errors.blockers.message}</div>
          )}
        </label>

        <button
          type="button"
          onClick={() => setHasBlocker(!hasBlocker)}
          className={`text-white px-4 py-2 rounded-md ${
            hasBlocker ? "bg-red-500" : "bg-primary"
          }`}
        >
          {hasBlocker ? "Blocker Flagged" : "Flag Blocker"}
        </button>

        <label className="flex flex-col gap-2">
          Upload File:
          <input {...register("file")} type="file" className="py-2" />
        </label>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedForm;
