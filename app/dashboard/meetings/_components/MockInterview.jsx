'use client';

import UserVideoPlaceholder from './UserVideoPlaceholder';

export default function MockInterview({ handleCall, chat, chatMessages, chatEndRef, assistantSpeaking, liveMessages, callActive, loadingInterview, loadingQuestions }) {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 px-4">

      {/* Header */}
      {/* <div className="w-full max-w-6xl flex justify-between items-center mb-2 px-2">
        <h3 className="text-md text-gray-800 font-semibold">AI Interview</h3>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
          <Clock className="w-4 h-4 font-semibold" />
          <span>00:08:15</span>
        </div>
      </div> */}

      {/* Main Interview Card */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md">
        {/* Left Panel - Video / Avatar */}
        <UserVideoPlaceholder handleCall={handleCall} chat={chat} assistantSpeaking={assistantSpeaking} liveMessages={liveMessages} callActive={callActive} loadingInterview={loadingInterview} loadingQuestions={loadingQuestions} />


        {/* Right Panel - Chat */}
        <div className="flex flex-col w-full md:w-1/2 border border-gray-100 shadow p-4 rounded-lg h-[412px] overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            <div className="mt-6 space-y-3">
              {chatMessages.map((chat, index) => {
                const isUser = chat.role === 'user';
                return (
                  <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 ${isUser ? 'bg-green-200 text-gray-700 rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'} shadow-md`} >
                      {/* Username */}
                      <p className="text-xs font-semibold mb-1 text-gray-700">
                        {isUser ? 'You' : 'Interviewer'}
                      </p>

                      {/* Message Text */}
                      <p className="text-sm whitespace-pre-wrap">{chat.transcript}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>
      </div>

      {liveMessages && (
        <div className="p-2 border bg-green-100 border-gray-300 text-sm shadow rounded-md mt-4">
          <strong>Live:</strong> {liveMessages}
        </div>
      )}

    </div>
  );
}
