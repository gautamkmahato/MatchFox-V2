// components/dashboard/InterviewCard.js
import { Calendar, Briefcase } from "lucide-react";

export default function InterviewCard({ data }) {
  return (
    <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white">
      <h2 className="text-lg font-semibold mb-1">{data.interview_name}</h2>
      <p className="text-sm text-gray-600 mb-2">{data.position}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar size={16} /> {data.interview_time}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Briefcase size={16} /> {data.company}
      </div>
    </div>
  );
}