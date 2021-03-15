export default class ProductivityService {
  static async checkProductivity({time, complexity}) {
    const response = await fetch(`/api/productivity?complexity=${complexity}&time=${time}`);
    return await response.json();
  }
}