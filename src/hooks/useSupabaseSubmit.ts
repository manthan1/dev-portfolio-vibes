
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface UseSupabaseSubmitReturn {
  submit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: Error | null;
  reset: () => void;
}

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      // Insert the form data into a "contact_messages" table in Supabase
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
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
