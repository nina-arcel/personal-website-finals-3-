import React, { useState, useEffect } from 'react';
import './form.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);

  // Load entries on component mount
  useEffect(() => {
    // You'll connect this to your API later
    const savedEntries = JSON.parse(localStorage.getItem('guestbook') || '[]');
    setEntries(savedEntries);
  }, []);

  // Save entries when they change
  useEffect(() => {
    localStorage.setItem('guestbook', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim() && message.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        name: name,
        message: message,
        created_at: new Date().toISOString()
      };
      
      setEntries([newEntry, ...entries]);
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h1 className="Cal-text">Guestbook</h1>
      
      <p>Please fill out the form below to let us know what you think.</p>

      <div id="app">
        <form onSubmit={handleSubmit}>
          <p>
            <label>Name:<br />
              <input 
                type="text" 
                required 
                placeholder="Your name.." 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </p>

          <p>
            <label>Message:<br />
              <textarea 
                rows="3" 
                placeholder="Write your message.." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </p>

          <button type="submit">Sign Guestbook</button>
        </form>

        {entries.length > 0 && (
          <>
            <hr />
            <div>
              <p><strong>Recent Guestbook Entries:</strong></p>
              <ul>
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <strong>{entry.name}</strong>
                    <br />
                    <small>{entry.message}</small>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;