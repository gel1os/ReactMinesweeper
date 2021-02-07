export default function makeListScore({ minesweeperDb }) {
  return async function listScore({sortBy, sortDirection, complexity, page}) {
    const scores = await minesweeperDb.findAll({sortBy, sortDirection, complexity, page});
    return scores.map(({user_name, complexity, win_time, created_at}) => ({
      complexity,
      name: user_name,
      time: win_time,
      date: created_at,
    }));
  }
}
