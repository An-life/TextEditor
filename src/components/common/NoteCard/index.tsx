import React, { useState } from 'react';

import { v1 } from 'uuid';

import DeleteIcon from '../../../assets/icons/DeleteIcon';
import EditIcon from '../../../assets/icons/EditIcon';
import { INote } from '../../App/App';
import AddNote from '../AddNote';
import IconButton from '../IconButton';
import Modal from '../Modal';

import styles from './styles.module.scss';

type Props = {
  deleteNote: () => void;
  changeNote: (id: string, note: string, tags: string[]) => void;
  setTagFilter: (tag: string) => void;
} & INote;

const NoteCard = ({
  id,
  note,
  tags,
  deleteNote,
  changeNote,
  setTagFilter,
}: Props): React.ReactElement => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const openModalHandler = (): void => setModalIsOpened(true);
  const closeModalHandler = (): void => setModalIsOpened(false);

  return (
    <div className={styles.container}>
      <div className={styles.buttonsWrapper}>
        <IconButton onClick={openModalHandler}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={deleteNote}>
          <DeleteIcon />
        </IconButton>
      </div>
      <h3>Note:</h3>
      <div className={styles.note}>
        {note.split(' ').map(word => {
          if (word.split('')[0] === '#') {
            return (
              <span key={v1()} className={styles.tag}>
                {word}
              </span>
            );
          }

          return (
            <span key={v1()} className={styles.text}>
              {word}
            </span>
          );
        })}
      </div>
      {tags.length !== 0 && <h3>Tags:</h3>}
      <div>
        {tags.map(tag => (
          <button
            type="button"
            key={v1()}
            onClick={() => setTagFilter(tag)}
            className={styles.tagButton}
          >
            {tag}
          </button>
        ))}
      </div>
      {modalIsOpened && (
        <Modal onClick={closeModalHandler}>
          <AddNote
            id={id}
            type="change"
            changeNote={changeNote}
            closeModal={closeModalHandler}
            changedNote={note}
          />
        </Modal>
      )}
    </div>
  );
};

export default NoteCard;
