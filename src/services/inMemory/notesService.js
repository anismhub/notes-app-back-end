const { nanoid } = require('nanoid');
const notes = require('../../notes');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNotes({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      body,
      tags,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];

    if (!note) {
      throw new Error('catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tag }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui catatan. ID tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      body,
      tag,
      updatedAt,
    };
  }

  deleteNoteByIdHandler(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Gagal menghapus catatan. ID tidak ditemukan');
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
