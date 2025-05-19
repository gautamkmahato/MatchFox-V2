import { dummyInterviews } from "@/lib/utils/data/interviews";
import InterviewCard from "./InterviewCard";

export default function InterviewList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {dummyInterviews.map((interview) => (
        <InterviewCard key={interview.id} data={interview} />
      ))}
    </div>
  );
}