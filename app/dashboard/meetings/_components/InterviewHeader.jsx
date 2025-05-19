'use client'

import { useEffect, useState } from 'react';

export const InterviewHeader = ({ interviewDetails, stopCall }) => {
  const img = "https://logo.clearbit.com/google.com";
  // const durationInMinutes = interviewDetails?.duration || 10;
  const durationInMinutes = 2;
  const totalSeconds = durationInMinutes * 60;

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  // Countdown logic
  useEffect(() => {
    if (secondsLeft <= 0) {
      stopCall?.(); // call only if defined
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, stopCall]);

  const formatTime = (totalSeconds) => {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm w-full max-w-6xl mx-auto px-4 mt-8 mb-4">
      <div className="flex items-center gap-3">
        <img src={img} alt="company logo" className="w-10 h-10 object-cover rounded-full" />
        <div>
          <h1 className="text-base font-semibold">{interviewDetails?.interview_name}</h1>
          <p className="text-gray-600">{interviewDetails?.company} | {interviewDetails?.position}</p>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-gray-500">
          Duration: <span className="font-semibold">{interviewDetails?.duration} min</span>
        </p>
        <p className="text-gray-500">
          Location: <span className="font-semibold">{interviewDetails?.location}</span>
        </p>
        <p className="text-gray-500">
          Starts in: <span className="font-semibold">{formatTime(secondsLeft)}</span>
        </p>
      </div>
    </div>
  );
};