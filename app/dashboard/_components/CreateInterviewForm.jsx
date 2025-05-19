'use client'

import { useState } from "react";
import JobDescriptionForm from "./JobDescriptionForm";
import ExtractedJobDetailsCard from "../interview/_components/ExtractedJobDetailsCard";
import createInterviewFromAPI from "@/app/service/interview/createInterviewFromAPI";
import { useRouter } from "next/navigation";

export default function CreateInterviewForm() {
  const [step, setStep] = useState(1);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter()

  const handleJobDetailsSubmit = async (result) => {
    setJobDetails(result);
    setStep(2);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Here you would typically send the data to your API

      console.log("befor api call", jobDetails)
      // Simulate API call
      const result = await createInterviewFromAPI(jobDetails);

      console.log(result)

      if (!result) {
        setError(result)
      }

      // On success, you might redirect or show a success message
      alert("Interview created successfully!");

      router.push('/dashboard/interview')

    } catch (err) {
      setError(err.message || "Failed to create interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {step === 1 && (
        <div>
          <label className="block mb-2 font-medium">Job Description *</label>
          <JobDescriptionForm onSubmit={handleJobDetailsSubmit} />
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleFinalSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Extracted Job Details</h2>
            {jobDetails && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <ExtractedJobDetailsCard interview={jobDetails} />
              </div>
            )}

            <label className="block mb-2 font-medium">Resume (optional)</label>
            <input type="file" className="w-full border p-2 rounded-md" />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Interview"}
            </button>
          </div>
        </form>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}