function validate({complexity, time}) {
  if (!complexity) {
    throw new Error('Complexity must be specified');
  }

  if (!time) {
    throw new Error('Time must be specified');
  }

  return {
    complexity, time
  };
}

export default function makeListProductivity({ minesweeperDb }) {
  return async function listProductivity(query) {
    const {complexity, time} = validate(query);
    return await minesweeperDb.getProductivity({complexity, time});
  };
}
