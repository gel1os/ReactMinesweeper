export default function makeMinesweeperDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    insert,
    getProductivity,
  });
  async function findAll({sortBy = 'name', sortDirection = 'desc', complexity, page = 1}) {
    const db = makeDb();
    const sortingFields = {
      date: 'created_at',
      name: 'user_name',
      complexity: 'complexity',
      time: 'win_time'
    };
    const PAGE_SIZE = 10;

    let query = complexity
      ? 'SELECT * FROM high_score WHERE complexity = ?'
      : 'SELECT * FROM high_score';
    sortBy = sortingFields[sortBy] || 'win_time';
    query = sortDirection === 'asc'
      ? `${query} ORDER BY ${db.escapeId(sortBy)} ASC`
      : `${query} ORDER BY ${db.escapeId(sortBy)} DESC`;
    const limit = page * PAGE_SIZE - PAGE_SIZE;
    query = `${query} LIMIT ${limit},${PAGE_SIZE + 1}`;
    return await db.query(query, complexity);
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
