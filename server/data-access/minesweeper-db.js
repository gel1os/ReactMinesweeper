export default function makeMinesweeperDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    insert,
    getProductivity,
    // findById,
    // remove,
    // update
  })
  async function findAll() {
    const db = makeDb();
    const result = await db.query('SELECT * FROM high_score');
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

    return result;
  }

  // async function findById ({ id: _id }) {
  //   const db = await makeDb()
  //   const result = await db.collection('comments').find({ _id })
  //   const found = await result.toArray()
  //   if (found.length === 0) {
  //     return null
  //   }
  //   const { _id: id, ...info } = found[0]
  //   return { id, ...info }
  // }

  // async function update ({ id: _id, ...commentInfo }) {
  //   const db = await makeDb()
  //   const result = await db
  //     .collection('comments')
  //     .updateOne({ _id }, { $set: { ...commentInfo } })
  //   return result.modifiedCount > 0 ? { id: _id, ...commentInfo } : null
  // }
  // async function remove ({ id: _id }) {
  //   const db = await makeDb()
  //   const result = await db.collection('comments').deleteOne({ _id })
  //   return result.deletedCount
  // }
}
