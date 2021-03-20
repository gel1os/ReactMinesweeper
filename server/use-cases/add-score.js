function validate({name, time, complexity}) {
  if (!name) {
    throw new Error('Name must be specified');
  }

  if (!time) {
    throw new Error('Time must be specified');
  }

  if (!complexity) {
    throw new Error('Complexity must be specified');
  }

  return {
    name, time, complexity,
  };
}

export default function makeAddScore({ minesweeperDb }) {
  return async function addScore(scoreInfo) {
    const score = validate(scoreInfo);
    return minesweeperDb.insert(score);
  };
}
