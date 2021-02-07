export default class HighScoreService {
  static async getScore(sortBy, sortDirection, complexity, page) {
    const response = await fetch(`/api/score?sortBy=${sortBy}&sortDirection=${sortDirection}&complexity=${complexity}&page=${page}`);
    return await response.json() || [];
  }

  static saveScore({time, complexity, name}) {
    return fetch('/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        complexity,
        time,
      })
    })
  }

  static async checkProductivity({time, complexity}) {
    const response = await fetch(`/api/productivity?complexity=${complexity}&time=${time}`);
    return await response.json();
  }
}