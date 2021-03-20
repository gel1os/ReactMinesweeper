export default function makePostScore({ addScore }) {
  return async function postScore(httpRequest) {
    try {
      const scoreInfo = httpRequest.body;
      await addScore(scoreInfo);
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: scoreInfo,
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}
