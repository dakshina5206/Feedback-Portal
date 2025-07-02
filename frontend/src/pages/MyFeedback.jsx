import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:3001/feedback', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch feedbacks');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>My Feedback</h2>
      {error && <p>{error}</p>}
      <ul>
        {feedbacks.map((fb) => (
          <li key={fb.id}>{fb.message}</li>
        ))}
      </ul>
      <a href="/submit">
        <button>Write Feedback</button>
      </a>
    </div>
  );
}
