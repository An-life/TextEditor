import React, { useEffect, useState } from 'react';

import { v1 } from 'uuid';

import { findTags } from '../../../helpers/findTags';

import styles from './styles.module.scss';

type Props = {
  id?: string;
  type: 'add' | 'change';
  changedNote?: string;
  addNode?: (note: string, tags: string[]) => void;
  closeModal: () => void;
  changeNote?: (id: string, note: string, tags: string[]) => void;
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
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const notesTags = findTags(note);

    setTags(notesTags);
  }, [note]);

  const onChangeHandler = (e: any): void => {
    setNote(e.target.value);
  };

  const onButtonClickHandler = (): void => {
    if (addNode) {
      addNode(note, tags);
    }

    if (changeNote && id) {
      changeNote(id, note, tags);
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
      <div>
        {tags.map(tag => (
          <span key={v1()} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
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
