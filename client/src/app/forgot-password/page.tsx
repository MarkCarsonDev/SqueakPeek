"use client"
import { useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createSupabaseClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        //TODO: reset password
        //redirectTo: 'http:/reset-password', // Replace with your actual URL
      });

      if (error) {
        throw error;
      }

      setMessage('Check your email for a password reset link.');
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;