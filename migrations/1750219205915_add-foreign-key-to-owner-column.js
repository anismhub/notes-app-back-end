export const shorthands = undefined;

export const up = (pgm) => {
  // membuat user baru
  pgm.sql(
    "INSERT INTO users VALUES('old_notes','old_notes','old_notes','old_notes')"
  );

  // mengubah nilai owner pada note yang ownernya bernilai null
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // membuat constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint(
    'notes',
    'fk_notes.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

export const down = (pgm) => {
  // menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // menghapus nilai owner old_notes pada note menjadi null
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // menghapus user old_notes
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
