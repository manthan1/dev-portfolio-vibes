
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
  isConfigured: boolean;
}

// Initialize Supabase client if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Only create client if we have the required credentials
const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
      // Check if Supabase is configured
      if (!isConfigured || !supabase) {
        throw new Error(
          "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables."
        );
      }
      
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
    isConfigured
  };
}
