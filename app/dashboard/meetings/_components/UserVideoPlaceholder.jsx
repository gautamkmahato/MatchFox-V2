'use client';

import Modal from '@/components/Modal';
import { CameraOff, Clock, Mic, MonitorUp, Phone } from 'lucide-react';
import { useState } from 'react';

export default function UserVideoPlaceholder({
  handleCall,
  chat,
  assistantSpeaking,
  liveMessages,
  callActive,
  loadingInterview,
  loadingQuestions,
}) {

    // inside UserVideoPlaceholder component

const [showModal, setShowModal] = useState(false);
const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

const handleEndCallClick = () => {
  setShowModal(true); // show modal
};

const confirmEndCall = () => {
  setIsButtonsDisabled(true); // Disable all buttons
  stopCall();                 // Call your stop logic
  setShowModal(false);        // Close modal
};

const cancelEndCall = () => {
  setShowModal(false); // just close modal
};

  const stopCall = () => {
    handleCall();
  };

  const startCall = () => {
    chat();
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[412px] bg-gray-100 border border-gray-100 shadow rounded-xl flex flex-col justify-center items-center">

      {/* Top-right Clock */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-sm font-semibold text-gray-600">
        <Clock className="w-4 h-4" />
        <span>00:08:15</span>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Joanna"
          className="w-32 h-32 rounded-full object-cover"
        />
        <span className="mt-2 text-sm font-medium text-gray-700">Joanna</span>
      </div>

      {/* Assistant speaking status */}
      {assistantSpeaking && (
        <p className="text-yellow-600 font-semibold">Assistant is speaking...</p>
      )}

      {/* Responsive Bottom-right Small Avatar with spacing */}
      <div className="absolute right-4 bottom-24 sm:bottom-20">
        <div className="bg-gray-400 border border-gray-100 shadow p-3 sm:p-4 w-32 sm:w-36 h-20 sm:h-24 rounded-lg flex items-center">
          <div className="bg-emerald-800 text-white text-sm w-8 h-8 rounded-xl flex items-center justify-center shadow">
            S
          </div>
        </div>
      </div>

      {/* Bottom-center Control Icons */}
      <div className="absolute bottom-4">
        <div className="flex gap-2">
          {/* Mic */}
<button
  disabled={isButtonsDisabled}
  className={`p-3 rounded-full bg-gray-700 hover:bg-gray-900 ${
    isButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  <Mic className="w-4 h-4 text-white" />
</button>

{/* Camera Off */}
<button
  disabled={isButtonsDisabled}
  className={`p-3 rounded-full bg-red-600 hover:bg-red-700 ${
    isButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  <CameraOff className="w-4 h-4 text-white" />
</button>

{/* Monitor Up */}
<button
  disabled={isButtonsDisabled}
  className={`p-3 rounded-full bg-gray-700 hover:bg-gray-900 ${
    isButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  <MonitorUp className="w-4 h-4 text-white" />
</button>

{/* Start/End Call */}
{!callActive ? (
  <button
    onClick={startCall}
    disabled={loadingInterview || loadingQuestions || isButtonsDisabled}
    className={`flex gap-2 items-center px-4 py-3 rounded-full bg-gray-700 hover:bg-gray-900 ${
      isButtonsDisabled || loadingInterview || loadingQuestions ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    <Phone className="w-4 h-4 text-white" />
    <span className="text-white text-sm">Start Call</span>
  </button>
) : (
  <button
    onClick={handleEndCallClick}
    disabled={isButtonsDisabled}
    className={`flex gap-2 items-center px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 ${
      isButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    <Phone className="w-4 h-4 text-white" />
    <span className="text-white text-sm">End Call</span>
  </button>
)}

        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={cancelEndCall}>
  <h2 className="text-lg font-bold mb-4">End Interview?</h2>
  <p className="text-sm text-gray-600 mb-6">Are you sure you want to end the call?</p>
  <div className="flex justify-end gap-2">
    <button
  onClick={cancelEndCall}
  disabled={isButtonsDisabled}
  className={`px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 ${
    isButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  Cancel
</button>
<button
  onClick={confirmEndCall}
  disabled={isButtonsDisabled}
  className={`px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white ${
    isButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  Confirm
</button>

  </div>
</Modal>


    </div>
  );
}
