export default function makeRenderer ({getHtml}) {
  return async function renderer(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const result = await getHtml(httpRequest.url);
      return {
        headers,
        statusCode: 200,
        body: result,
        file: true,
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
