
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface UseSupabaseSubmitReturn {
  submit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: Error | null;
  reset: () => void;
}

/**
 * A custom hook for submitting form data to Supabase
 */
export function useSupabaseSubmit(): UseSupabaseSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Submitting form data to Supabase:', data);
      
      // Insert the form data into the "contact_messages" table in Supabase
      const { error: supabaseError, data: responseData } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (supabaseError) {
        console.error('Supabase error details:', supabaseError);
        throw new Error(supabaseError.message || 'Error submitting to database');
      }
      
      console.log('Form data submitted successfully, response:', responseData);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error in form submission:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
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
    reset
  };
}
