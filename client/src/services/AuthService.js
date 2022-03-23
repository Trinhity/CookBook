import axios from "axios";
const url = "http://localhost:5000/api/";

export default class AuthenticationAPI {
  static async login(credentials) {
    const res = await axios.post(url + "login/", credentials);
    return res;
  }

  static async register(credentials) {
    const res = await axios.post(url + "registration/", credentials);
    return res;
  }

  static async getSecretContent() {
    const res = await axios.get(url + "secret-route/");
    return res;
  }
}
