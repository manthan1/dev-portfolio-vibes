
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface UseGoogleSheetsSubmitReturn {
  submit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: Error | null;
  reset: () => void;
}

/**
 * A custom hook for submitting form data to Google Sheets via Google Apps Script
 * @param deploymentId The Google Apps Script deployment ID
 */
export function useGoogleSheetsSubmit(deploymentId: string): UseGoogleSheetsSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const endpoint = `https://script.google.com/macros/s/${deploymentId}/exec`;
      
      // Using no-cors mode as Google Apps Script doesn't support CORS by default
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'no-cors',
      });
      
      // Since no-cors doesn't return readable response, we assume success
      // In production, you may want to add some verification mechanism
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setError(null);
  };

  return {
    submit,
    isSubmitting,
    isSuccess,
    error,
    reset,
  };
}
