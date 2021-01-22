export default function makeGetProductivity ({ listProductivity }) {
  return async function getProductivity(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const productivity = await listProductivity(httpRequest.query);
      return {
        headers,
        statusCode: 200,
        body: {productivity}
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
