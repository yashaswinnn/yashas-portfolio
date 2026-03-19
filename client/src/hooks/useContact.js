import { useState } from 'react';
import { contactApi } from '../services/api';

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const sendMessage = async ({ name, email, message }) => {
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await contactApi.send({ name, email, message });
      setSuccess('Message sent successfully! I\'ll get back to you soon.');
      return true;
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setSuccess(''); setError(''); };

  return { sendMessage, loading, success, error, reset };
}
