// components/meeting/InterviewMeeting.js
export default function InterviewMeeting() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3 bg-gray-100 h-[400px] rounded-xl flex items-center justify-center">
        <img src="/meeting-placeholder.png" alt="Meeting" className="max-w-full max-h-full object-contain" />
      </div>
      <div className="md:w-1/3 bg-white border p-4 rounded-xl overflow-auto h-[400px]">
        <h3 className="font-semibold mb-2">Chat</h3>
        <div className="space-y-2">
          <p className="bg-gray-100 p-2 rounded">Hi! How can I help you today?</p>
          <p className="bg-blue-100 p-2 rounded self-end text-right">I'm ready for my interview.</p>
        </div>
      </div>
    </div>
  );
}