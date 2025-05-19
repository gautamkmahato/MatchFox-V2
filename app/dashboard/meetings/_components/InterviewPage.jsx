'use client';

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CallComponent from "./CallComponent";
import InterviewJoinScreen from "./InterviewJoinScreen";

export default function InterviewPage({ interviewId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [interviewAttempted, setInterviewAttempted] = useState(false);
  const [showCallComponent, setShowCallComponent] = useState(false);
  const [validated, setValidated] = useState(false);
  const [interviewAttemptId, setinterviewAttemptId] = useState('');

  const { isSignedIn, user, isLoaded } = useUser();


  // Validate user & check if already attempted
  useEffect(() => {
    async function validateUser() {
      if (!user?.id) return;

      try {
        const response = await fetch('/api/user/check-attempt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id, interviewId: interviewId }),
        });

        const result = await response.json();
        console.log('Validation result:', result);

        if (!result.state) {
          if (result.error?.includes('Already attempted')) {
            setInterviewAttempted(true);
          } else {
            setError(result.error || 'Validation failed');
          }
          return;
        }

        // If no interviewAttempt data => allow user to proceed
        if (!result.data || result.data === null) {
          setValidated(true);
        } else {
          setInterviewAttempted(true);
        }

      } catch (err) {
        console.error(err);
        setError('Something went wrong validating user');
      } finally {
        setLoading(false);
      }
    }

    validateUser();
  }, [user]);

  // Handle Join Interview (form submit)
  const handleJoinInterview = async () => {
    try {
      const input = {
        status: 'completed',
        interview_id: interviewId,
        user_id: user.id,
        started_at: new Date().toISOString(), // Valid timestamptz
      };

      const res = await fetch('/api/user/submit-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      const result = await res.json();
      console.log('Submit result:', result);

      if (result.state && result?.data?.interview_attempt) {
        setinterviewAttemptId(result?.data?.id);
        setShowCallComponent(true);
      } else {
        setError(result.error || 'Failed to submit interview attempt');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while submitting the attempt');
    }
  };

  // --- Conditional UI ---

  if (!isLoaded || loading) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-semibold">Please sign in to continue</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-red-600 font-semibold text-lg mb-2">Error</h2>
        <p className="text-gray-700">{error}</p>
        <a href="/dashboard/report" className="text-blue-600 underline mt-4 block">
          Go to Report Dashboard
        </a>
      </div>
    ); 
  }
 
  if (showCallComponent) {
    return <CallComponent interviewAttemptId={interviewAttemptId} interviewId={interviewId} />;
  }

  if (interviewAttempted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Interview Already Attempted</h2>
        <p className="text-gray-700">You’ve already completed this interview.</p>
        <a href="/dashboard/review" className="mt-4 text-blue-600 underline">Check Your Report</a>
      </div>
    );
  }

  if (validated) {
    return <InterviewJoinScreen onJoinInterview={handleJoinInterview} />;
  }

  return null; // Fallback state
}
