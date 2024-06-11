import { useState } from 'react';
 

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editNoteId, setEditNoteId] = useState(null); // 추가
  const [editNoteText, setEditNoteText] = useState(''); // 추가

  const createNote = () => {
    const note = {
      id: notes.length + 1,
      text: newNote,
      createdAt: new Date() // 현재 날짜와 시간을 저장
    };
    setNotes([...notes, note]);
    setNewNote('');
  };

  const updateNote = (id) => {

    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, text: editNoteText,  createdAt: new Date() } : note
      )
    );
    setEditNoteId(null);
    setEditNoteText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <h2>메모</h2>
      <input
        type="text"
        placeholder="새 메모 입력"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={createNote}>메모 추가</button>
      <ul>
      {notes.map(note => (
        <li key={note.id}>
          {editNoteId === note.id ? (
            <div>
              <input
                type="text"
                value={editNoteText}
                onChange={(e) => setEditNoteText(e.target.value)}
              />
              <button onClick={() => updateNote(note.id)}>저장</button>
              <button onClick={() => setEditNoteId(null)}>취소</button>
            </div>
          ) : (
            <div>
              {note.text}, <small>생성일: {note.createdAt.toLocaleString()}</small>
              <button onClick={() => {
                setEditNoteId(note.id);
                setEditNoteText(note.text);
              }}>수정</button>
              <button onClick={() => deleteNote(note.id)}>삭제</button>
            </div>
          )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;