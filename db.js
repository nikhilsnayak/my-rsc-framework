const { Database } = require('sqlite3');

const db = new Database('db.sqlite');

function getMovies(query) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM movies';
    let params = [];

    if (query) {
      sql += ' WHERE title LIKE ?';
      params.push(`%${query}%`);
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        setTimeout(() => {
          resolve(rows);
        }, Math.max(Math.floor(Math.random() * 5000), 1000));
      }
    });
  });
}

function updateVote(movieId, voteType) {
  return new Promise((resolve, reject) => {
    const voteChange = voteType === 'upVote' ? 1 : -1;

    const sql = `
      UPDATE movies 
      SET votes = votes + ? 
      WHERE id = ?
      RETURNING *`;

    db.get(sql, [voteChange, movieId], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        reject(new Error('Movie not found'));
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = { getMovies, updateVote };