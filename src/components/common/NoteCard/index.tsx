import React, { useState } from 'react';

import { INote } from '../../../App';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import EditIcon from '../../../assets/icons/EditIcon';
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
      <div className={styles.note}>{note}</div>
      <div>
        {tags.map(tag => (
          <button
            type="button"
            key={id}
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
