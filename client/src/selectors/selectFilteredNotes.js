const selectFilteredNotes = (notes, filter, search) => {
  let prop;
  let reverse = 1;

  let notesCopy = [...notes];

  if (search) {
    notesCopy = notesCopy.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.plainContent.toLowerCase().includes(search.toLowerCase())
    );
  }

  switch (filter) {
    case "dateCreated":
      prop = "createdAt";
      reverse = -1;
      break;
    case "title":
      prop = "title";
      break;
    default:
      prop = "updatedAt";
      reverse = -1;
      break;
  }

  const filteredNotes = notesCopy.sort((a, b) =>
    a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 * reverse : -1 * reverse
  );
  return filteredNotes;
};

export default selectFilteredNotes;
