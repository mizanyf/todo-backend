import pool from '../config/db.js';

export const TodoModel = {
  // Ambil semua todo berdasarkan user_id
  getByUserId: async (userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE user_id = ?',
      [userId]
    );
    return rows;
  },

  // Tambah todo baru
  create: async (userId, task) => {
    const [result] = await pool.query(
      'INSERT INTO todos (user_id, task) VALUES (?, ?)',
      [userId, task]
    );
    return result.insertId;
  }
};
