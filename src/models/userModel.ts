import pool from '../config/db.js';

export const UserModel = {
  // Cari user berdasarkan username
  findByUsername: async (username) => {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  },

  // Buat user baru
  create: async (username, email, hashedPassword) => {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  }
};
