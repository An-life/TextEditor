import React, { useEffect, useState } from 'react';

import { v1 } from 'uuid';

import AddIcon from '../../assets/icons/AddIcon';
import AddNote from '../common/AddNote';
import IconButton from '../common/IconButton';
import Modal from '../common/Modal';
import NoteCard from '../common/NoteCard';

import styles from './App.module.scss';

export interface INote {
  id: string;
  note: string;
  tags: string[] | [];
}

const App = (): React.ReactElement => {
  const savedNotes = localStorage.getItem('notes');

  let initialNotes: INote[] = [];

  if (savedNotes) {
    initialNotes = JSON.parse(savedNotes);
  }

  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filteredNotes, setFilteredNotes] = useState<INote[]>(notes);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    if (tagFilter === 'all') {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(notes.filter(note => note.tags.find(tag => tag === tagFilter)));
    }
  }, [tagFilter, notes]);

  const openModalHandler = (): void => setModalIsOpened(true);

  const closeModalHandler = (): void => setModalIsOpened(false);

  const addNoteHandler = (note: string, tags: string[]): void =>
    setNotes([{ id: v1(), note, tags }, ...notes]);

  const deleteNoteHandler = (id: string): void => {
    const filteredNotes = notes.filter(note => note.id !== id);

    setNotes(filteredNotes);
  };

  const changeNoteHandler = (id: string, note: string, tags: string[]): void => {
    const filteredNotes = notes?.filter(note => note.id !== id);
    const changedNote = notes?.find(note => note.id === id);

    if (changedNote) {
      changedNote.note = note;
      changedNote.tags = tags;

      setNotes([changedNote, ...filteredNotes]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <IconButton onClick={openModalHandler}>
          <AddIcon />
        </IconButton>
        <div>
          <button
            type="button"
            onClick={() => setTagFilter('all')}
            className={styles.allButton}
          >
            View all notes
          </button>
        </div>
        <h2 className={styles.filter}>Filter: {tagFilter}</h2>
        <div className={styles.notes}>
          {filteredNotes.map(({ id, note, tags }) => (
            <NoteCard
              key={id}
              id={id}
              note={note}
              tags={tags}
              changeNote={changeNoteHandler}
              deleteNote={() => {
                deleteNoteHandler(id);
              }}
              setTagFilter={setTagFilter}
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
