import React, { useState, useEffect } from 'react';
import { 
  getGuestbookEntries, 
  createGuestbookEntry,
  deleteGuestbookEntry,
  updateGuestbookEntry 
} from './api/api';
import './form.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Load entries on component mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await getGuestbookEntries();
      setEntries(data);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    try {
      setLoading(true);
      await createGuestbookEntry({ name, message });
      setName('');
      setMessage('');
      await loadEntries(); // Refresh the list
    } catch (error) {
      console.error('Error creating entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      setLoading(true);
      await deleteGuestbookEntry(id);
      await loadEntries(); // Refresh the list
    } catch (error) {
      console.error('Error deleting entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (entry) => {
    setEditingId(entry.id);
    setEditName(entry.name);
    setEditMessage(entry.message);
  };

  const handleUpdate = async (id) => {
    if (!editName.trim() || !editMessage.trim()) return;
    
    try {
      setLoading(true);
      await updateGuestbookEntry(id, { 
        name: editName, 
        message: editMessage 
      });
      setEditingId(null);
      await loadEntries(); // Refresh the list
    } catch (error) {
      console.error('Error updating entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditMessage('');
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
                disabled={loading}
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
                disabled={loading}
              />
            </label>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Sign Guestbook'}
          </button>
        </form>

        {entries.length > 0 && (
          <>
            <hr />
            <div>
              <p><strong>Recent Guestbook Entries:</strong></p>
              <ul>
                {entries.map((entry) => (
                  <li key={entry.id}>
                    {editingId === entry.id ? (
                      // Edit mode
                      <div>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Name"
                          disabled={loading}
                        />
                        <textarea
                          value={editMessage}
                          onChange={(e) => setEditMessage(e.target.value)}
                          placeholder="Message"
                          rows="2"
                          disabled={loading}
                        />
                        <div>
                          <button 
                            onClick={() => handleUpdate(entry.id)}
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button 
                            onClick={cancelEditing}
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View mode
                      <div>
                        <strong>{entry.name}</strong>
                        <br />
                        <small>{entry.message}</small>
                        <br />
                        <small style={{ color: '#999', fontSize: '0.8em' }}>
                          {new Date(entry.created_at).toLocaleString()}
                        </small>
                        <div style={{ marginTop: '5px' }}>
                          <button 
                            onClick={() => startEditing(entry)}
                            disabled={loading}
                            style={{ marginRight: '5px' }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(entry.id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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