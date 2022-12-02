import React, { useState } from 'react';

import styles from './styles.module.scss';

type Props = {
  id?: string;
  type: 'add' | 'change';
  changedNote?: string;
  addNode?: (note: string) => void;
  closeModal: () => void;
  changeNote?: (id: string, note: string) => void;
};

const AddNote = ({
  id,
  type,
  changedNote,
  addNode,
  closeModal,
  changeNote,
}: Props): React.ReactElement => {
  const [note, setNote] = useState(changedNote || '');

  const onChangeHandler = (e: any): void => {
    setNote(e.target.value);
  };

  const onButtonClickHandler = (): void => {
    if (addNode) {
      addNode(note);
    }

    if (changeNote && id) {
      changeNote(id, note);
    }
    closeModal();
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={note}
        onChange={e => onChangeHandler(e)}
        placeholder="Enter your note..."
      />
      <button
        type="submit"
        className={styles.button}
        onClick={onButtonClickHandler}
        disabled={note.length === 0}
      >
        {type === 'add' ? 'Add Note' : 'Save changes'}
      </button>
    </div>
  );
};

export default AddNote;
