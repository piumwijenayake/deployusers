
import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://deployusers-three.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      // Check if response is OK (status code 200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        console.log(data);
      } else {
        throw new Error('Response is not JSON');
      }

    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Display error message to user
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;