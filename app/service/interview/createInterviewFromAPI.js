/**
 * Service for handling create interview API calls
 */


export default async function createInterviewFromAPI(formData) {
  const response = await fetch(`/api/interviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  

  if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Interview creation failed");
      }

      const result = await response.json()

  return result;
};



 createInterviewFromAPI