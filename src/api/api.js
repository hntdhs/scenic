import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// that process.env will be the envirnment var to set on the front to talk to the back
// ask about static async request method in jobly api, or look up where it's used

class BywayApi {

    static token;
    // token for interacting with the API

    static async request(endpoint, data = {}, method = "get") {
      console.debug("API Call:", endpoint, data, method);
  
      const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${BywayApi.token}` };
      const params = (method === "get")
          ? data
          : {};
  
      try {
        return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
        console.error("API Error:", err);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
    }  

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
      }

    static async login(data) {
      let res = await this.request(`auth/token`, data, "post");
      return res.token;
    }

    static async getCurrentUser(username) {
      let res = await this.request(`users/${username}`);
      return res.user;
    }

    static async getAllStates(name) {
      let res = await this.request("states", { name });
      return res;
    }

    static async getAllUsers() {
      let res = await this.request('users');
      return res;
    }

    static async findBywaysByState(name) {
      let res = await this.request(`states/${ name }`);
      return res;
    }

    static async getAllByways(name) {
      let res = await this.request("byways", { name });
      return res;
    }

    static async search(params) {
      let res = await this.request("byways/search", params);
      return res;
    }

    static async getByway(name) {
      let res = await this.request(`byways/${ name }`, );
      return res;
    }

    static async getCommentsByByway(id) {
      let res = await this.request(`byways/${ id }/comments`, );
      return res;
    }

    static async makeComment(id, comment) {
      let res = await this.request(`byways/${ id }/comments`, {comment}, "post");
      return res;
    }

    static async favoriteAByway(username, id) {
      let res = await this.request(`users/${ username }/favorites/${id}`, {}, "post");
      return res;
    }

    static async removeFavorite(username, id) {
      let res = await this.request(`users/${ username }/favorites/${id}`, {}, "delete");
      return res;
      // can't tell if I need that empty object like favAByway or something different or nothing
      // it was needed, not having it but then having 'delete' made it think delete was data instead of method, see top line of function and what's inside the parentheses for request
    }

    static async getUserFavorites(username, sortField, sortDirection) {
      let res = await this.request(`users/${ username }/favorites?sort=${sortField}&direction=${sortDirection}`);
      return res;
    }

    static async saveProfile(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    }

    static async getRandomByway() {
      let res = await this.request(`byways/random`, );
      return res;
    }




}

export default BywayApi;