import React, { useState } from 'react';
import axios from 'axios';

export default function SubmitFeedback() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('You must be logged in to submit feedback.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/feedback', 
        { message }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus('Feedback submitted successfully!');
      setMessage('');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setStatus(err.response?.data?.message || 'Failed to submit feedback');
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
