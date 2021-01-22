export default function makeMinesweeperDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    insert,
    getProductivity,
  })
  async function findAll({sortBy = 'name', sortDirection = 'desc'}) {
    const db = makeDb();
    const sortingFields = {
      date: 'created_at',
      name: 'user_name',
      complexity: 'complexity',
      time: 'win_time'
    }
    sortBy = sortingFields[sortBy] || 'win_time';
    const query = sortDirection === 'asc'
      ? `SELECT * FROM high_score ORDER BY ${db.escapeId(sortBy)} ASC`
      : `SELECT * FROM high_score ORDER BY ${db.escapeId(sortBy)} DESC`;

    const result = await db.query(query);
    return result;
  }

  async function insert({name, complexity, time}) {
    const db = await makeDb();
    const score = {
      user_name: name,
      complexity,
      win_time: time,
    };
    await db.query('INSERT INTO high_score SET ?', score);

    return score;
  }

  async function getProductivity({complexity, time}) {
    const db = await makeDb();
    const result = await db.query(`
        SELECT
          ROUND(
            COUNT(*) /
              (SELECT
                COUNT(*)
                FROM high_score
                WHERE complexity = ?
              ) * 100, 2)
        AS percentage
        FROM high_score
        WHERE  complexity = ? AND win_time > ?;
      `,
      [complexity, complexity, time]
    );
    return result[0].percentage;
  }
}
