'use client'


import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import LoadingOverlay from "./LoadingOverlay";
import { InterviewHeader } from "./InterviewHeader";
import MockInterview from "./MockInterview";
import { useInterviewData } from "@/app/hooks/useInterviewData";
import { useVapi } from "@/app/hooks/useVapi";



export default function CallComponent({ interviewAttemptId, interviewId }) {

  const chatEndRef = useRef(null);
  const { isSignedIn, user, isLoaded } = useUser();


  const { interviewDetails, questions, loadingInterview, loadingQuestions, interviewError } = useInterviewData(interviewId);
  const { assistantSpeaking, liveMessages, chatMessages, callActive, chat, stopCall, vapiError, conversationsRef, loadingReport, loadingGenerateReport, reportError, handleCall } = useVapi(interviewDetails, questions, interviewAttemptId);

console.log("interviewDetails: ", interviewDetails)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (!isLoaded) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-semibold">Please sign in to continue</p>
      </div>
    );
  }



  return (
    <>
      <div className="mt-2 sm:px-6 px-0">
        {loadingInterview && <LoadingOverlay text="Loading interview details" />}
        {loadingQuestions && <LoadingOverlay text="Generating questions" />}
        {loadingReport && <LoadingOverlay text="Generating Report" />}

        <InterviewHeader interviewDetails={interviewDetails} stopCall={stopCall} />

        <MockInterview handleCall={handleCall} chat={chat} chatMessages={chatMessages} liveMessages={liveMessages} assistantSpeaking={assistantSpeaking} chatEndRef={chatEndRef} callActive={callActive} loadingInterview={loadingInterview} loadingQuestions={loadingQuestions} />
      </div>
    </>
  )
}
