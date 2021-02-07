export default function makeGetScores({ listScores }) {
  return async function getScores({query}) {
    const {sortBy, sortDirection, complexity, page} = query;
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const scores = await listScores({sortBy, sortDirection, complexity, page});
      return {
        headers,
        statusCode: 200,
        body: scores
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
