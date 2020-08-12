import { createSlice, nanoid } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    noteAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(noteTitle, noteText) {
        return {
          payload: {
            id: nanoid(),
            noteTitle,
            noteText,
            isFavorite: false,
          },
        };
      },
    },
    noteDeleted(state, action) {
      return state.filter((note) => note.id !== action.payload);
    },
    noteStarred(state, action) {
      state.map((note) =>
        note.id === action.payload ? (note.isFavorite = !note.isFavorite) : note
      );
    },
    noteEdited(state, action) {
      const { id, updatedNoteTitle, updatedNoteText } = action.payload;
      const existingNote = state.find((note) => note.id === id);
      if (existingNote) {
        existingNote.noteTitle = updatedNoteTitle;
        existingNote.noteText = updatedNoteText;
      }
    },
  },
});

export const {
  noteAdded,
  noteDeleted,
  noteStarred,
  noteEdited,
} = notesSlice.actions;
export const selectAllNotes = (state) => state.notes;
export const selectFavoriteNotes = (state) =>
  state.notes.filter((note) => note.isFavorite === true);

export default notesSlice.reducer;
