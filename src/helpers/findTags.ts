export const findTags = (note: string): string[] => {
  const notesTags = note.split(' ').filter(word => word.split('')[0] === '#');
  let uniqTags: string[] = [];

  if (notesTags) {
    for (let i = 0; i < notesTags.length; ) {
      const repeatedTag = uniqTags.filter(tag => tag !== notesTags[i]);

      uniqTags = [notesTags[i], ...repeatedTag];
      i += 1;
    }
  }

  return uniqTags;
};
