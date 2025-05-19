export default function ReportCard({ data }) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm">
      <h2 className="text-md font-semibold">{data.interview_name}</h2>
      <p className="text-sm text-gray-600">{data.position}</p>
      <p className="text-xs text-gray-400">{data.interview_time}</p>
    </div>
  );
}