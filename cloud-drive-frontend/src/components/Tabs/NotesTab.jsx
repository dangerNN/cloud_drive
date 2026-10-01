import { useState } from 'react';

export default function NotesTab({ messages, setMessages, t }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, time: 'Только что' }]);
    setNewMessage('');
  };

  return (
    <section className="glass-panel p-4 flex-grow-1 d-flex flex-column">
      <div className="mb-3"><h3 className="m-0 fw-bold">{t.notes}</h3></div>
      <div className="flex-grow-1 overflow-auto my-3 pe-2">
        {messages.map(msg => (
          <div key={msg.id} className="chat-bubble mb-2">
            <div>{msg.text}</div>
            <div className="text-end subtext mt-1" style={{ fontSize: '0.75rem' }}>{msg.time}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="d-flex gap-2">
        <input type="text" className="form-control" placeholder="Заметка..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit" className="btn-glow">Отправить</button>
      </form>
    </section>
  );
}