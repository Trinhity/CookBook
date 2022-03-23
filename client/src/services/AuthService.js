import axios from "axios";
const url = "/api/";

export default class AuthenticationAPI {
  static async login(credentials) {
    const res = await axios.post(url + "login/", credentials);
    return res.data;
  }

  static async register(credentials) {
    const res = await axios.post(url + "register/", credentials);
    return res.data;
  }

  static async getSecretContent() {
    const res = axios.get(url + "secret-route/");
    return res.data;
  }
}
