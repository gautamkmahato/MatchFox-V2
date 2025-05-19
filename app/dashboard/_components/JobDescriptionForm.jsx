'use client'

import { cleanCodeBlock } from "@/lib/utils/cleanCodeBlock";
import { useState } from "react";
import { TextAreaField } from "./TextAreaFeild";
import { SubmitButton } from "./SubmitButton";
import generateJobDetails from "@/app/service/jobService";
import { validateJobDescription } from "@/lib/utils/validateJobDescription";

export default function JobDescriptionForm({ onSubmit, initialData = {} }) {
  const [jobDescription, setJobDescription] = useState(initialData.jobDescription || "");
  const [difficultyLevel, setDifficultyLevel] = useState(initialData.difficultyLevel || "");
  const [duration, setDuration] = useState(initialData.duration || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    const validationError = validateJobDescription(jobDescription);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiResult = await generateJobDetails(jobDescription);
      const cleanedResult = cleanCodeBlock(apiResult);

      // Override fields if provided by user
      const updatedResult = {
        ...cleanedResult,
        difficulty_level: difficultyLevel || cleanedResult.difficulty_level || 'medium',
        duration: duration ? duration.toString() : cleanedResult.duration || 30,
        interview_time: cleanedResult?.interview_time
          ? new Date(cleanedResult.interview_time).toISOString()
          : new Date().toISOString() // Default to current time if not provided
      };

      console.log(updatedResult);

      // Call parent onSubmit with the result
      if (onSubmit) {
        onSubmit(updatedResult);
      }
    } catch (err) {
      setError(err.message || "Failed to extract details");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Difficulty Level</label>
          <select
            name="Difficulty"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Duration (in mins)</label>
          <input
            className="w-full border p-2 rounded-md"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration Eg: 30"
          />
        </div>
        <TextAreaField
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          ariaLabel="Job Description"
          required
        />

        <SubmitButton
          isLoading={loading}
          loadingText="Processing..."
          defaultText="Extract Details"
        />
      </form>
    </div>
  );
}