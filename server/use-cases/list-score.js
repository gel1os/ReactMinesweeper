export default function makeListScore({ minesweeperDb }) {
  return async function listScore() {
    const scores = await minesweeperDb.findAll();
    return scores.map(({user_name, complexity, win_time, created_at}) => ({
      complexity,
      name: user_name,
      time: win_time,
      date: created_at,
    }));
  }
}
