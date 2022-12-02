import React, { useState } from 'react';

import { v1 } from 'uuid';

import styles from './App.module.scss';
import AddIcon from './assets/icons/AddIcon';
import AddNote from './components/common/AddNote';
import IconButton from './components/common/IconButton';
import Modal from './components/common/Modal';
import NoteCard from './components/common/NoteCard';

export interface INote {
  id: string;
  note: string;
  tags: string[] | [];
}

const App = (): React.ReactElement => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [notes, setNotes] = useState<INote[]>([]);

  const openModalHandler = (): void => setModalIsOpened(true);

  const closeModalHandler = (): void => setModalIsOpened(false);

  const addNoteHandler = (note: string): void =>
    setNotes([{ id: v1(), note, tags: [] }, ...notes]);

  const deleteNoteHandler = (id: string): void => {
    const filteredNotes = notes.filter(note => note.id !== id);

    setNotes(filteredNotes);
  };

  const changeNoteHandler = (id: string, note: string): void => {
    const filteredNotes = notes?.filter(note => note.id !== id);
    const changedNote = notes?.find(note => note.id === id);

    if (changedNote) {
      changedNote.note = note;

      setNotes([changedNote, ...filteredNotes]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <IconButton onClick={openModalHandler}>
          <AddIcon />
        </IconButton>
        <div className={styles.notes}>
          {notes.map(({ id, note, tags }) => (
            <NoteCard
              key={id}
              id={id}
              note={note}
              tags={tags}
              changeNote={changeNoteHandler}
              deleteNote={() => {
                deleteNoteHandler(id);
              }}
            />
          ))}
        </div>
      </div>
      {modalIsOpened && (
        <Modal onClick={closeModalHandler}>
          <AddNote type="add" addNode={addNoteHandler} closeModal={closeModalHandler} />
        </Modal>
      )}
    </div>
  );
};

export default App;
