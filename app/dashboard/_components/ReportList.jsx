// components/reports/ReportsList.js

import { dummyInterviews } from "@/lib/utils/data/interviews";
import ReportCard from "./ReportCard";

export default function ReportList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {dummyInterviews.map((interview) => (
        <ReportCard key={interview.id} data={interview} />
      ))}
    </div>
  );
}