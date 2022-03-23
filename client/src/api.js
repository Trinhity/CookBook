import axios from "axios";
const url = "/api/recipes";

export default class API {
  // Get all recipes from the database
  static async getSavedRecipes() {
    const res = await axios.get(url);
    return res.data;
  }

  // Get recipe by id from the database
  static async getRecipebyID(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }

  // Save new recipe into database
  static async addRecipe(id) {
    const res = await axios.post(url, id);
    return res.data;
  }

  // Delete all recipe from the database
  static async deleteRecipe(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}
