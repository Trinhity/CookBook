// Libraries required for testing
import test from "ava";
import request from "supertest";
import MongodbMemoryServer from "mongodb-memory-server";
import mongoose from "mongoose";

// Your server and models
import app from "../app";
import Recipe from "../models/recipes";

// Start MongoDB Instance
const mongod = new MongodbMemoryServer();

// Create connection to mongoose before all tests
test.before(async (t) =>
  mongoose.connect(await mongod.getConnectionString(), { useMongoClient: true })
);

// Setup dummy data
test.beforeEach(async (t) => {
  const recipe = new Recipe({
    recipe: {
      uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6",
      label: "Chicken Vesuvio",
      image:
        "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
      source: "Serious Eats",
      url: "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      shareAs:
        "http://www.edamam.com/recipe/chicken-vesuvio-b79327d05b8e5b838ad6cfd9576b30b6/chicken",
      yield: 4,
      dietLabels: ["Low-Carb"],
      healthLabels: [
        "Mediterranean",
        "Dairy-Free",
        "Gluten-Free",
        "Wheat-Free",
        "Egg-Free",
        "Peanut-Free",
        "Tree-Nut-Free",
        "Soy-Free",
        "Fish-Free",
        "Shellfish-Free",
        "Pork-Free",
        "Red-Meat-Free",
        "Crustacean-Free",
        "Celery-Free",
        "Mustard-Free",
        "Sesame-Free",
        "Lupine-Free",
        "Mollusk-Free",
        "Kosher",
      ],
      cautions: ["Sulfites"],
      ingredientLines: [
        "1/2 cup olive oil",
        "5 cloves garlic, peeled",
        "2 large russet potatoes, peeled and cut into chunks",
        "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
        "3/4 cup white wine",
        "3/4 cup chicken stock",
        "3 tablespoons chopped parsley",
        "1 tablespoon dried oregano",
        "Salt and pepper",
        "1 cup frozen peas, thawed",
      ],
      ingredients: [
        {
          text: "1/2 cup olive oil",
          quantity: 0.5,
          measure: "cup",
          food: "olive oil",
          weight: 108,
          foodCategory: "Oils",
          foodId: "food_b1d1icuad3iktrbqby0hiagafaz7",
          image:
            "https://www.edamam.com/food-img/4d6/4d651eaa8a353647746290c7a9b29d84.jpg",
        },
        {
          text: "5 cloves garlic, peeled",
          quantity: 5,
          measure: "clove",
          food: "garlic",
          weight: 15,
          foodCategory: "vegetables",
          foodId: "food_avtcmx6bgjv1jvay6s6stan8dnyp",
          image:
            "https://www.edamam.com/food-img/6ee/6ee142951f48aaf94f4312409f8d133d.jpg",
        },
        {
          text: "2 large russet potatoes, peeled and cut into chunks",
          quantity: 2,
          measure: "<unit>",
          food: "russet potatoes",
          weight: 738,
          foodCategory: "vegetables",
          foodId: "food_brsjy86bq09pzgbmr4ri8bnohrf7",
          image:
            "https://www.edamam.com/food-img/71b/71b3756ecfd3d1efa075874377038b67.jpg",
        },
        {
          text: "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          quantity: 3.5,
          measure: "pound",
          food: "chicken",
          weight: 1587.5732950000001,
          foodCategory: "Poultry",
          foodId: "food_bmyxrshbfao9s1amjrvhoauob6mo",
          image:
            "https://www.edamam.com/food-img/d33/d338229d774a743f7858f6764e095878.jpg",
        },
        {
          text: "3/4 cup white wine",
          quantity: 0.75,
          measure: "cup",
          food: "white wine",
          weight: 176.39999999999998,
          foodCategory: "wines",
          foodId: "food_bn44h7baron9ufaoxinmya8l0yye",
          image:
            "https://www.edamam.com/food-img/a71/a718cf3c52add522128929f1f324d2ab.jpg",
        },
        {
          text: "3/4 cup chicken stock",
          quantity: 0.75,
          measure: "cup",
          food: "chicken stock",
          weight: 180,
          foodCategory: "canned soup",
          foodId: "food_bptblvzambd16nbhewqmhaw1rnh5",
          image:
            "https://www.edamam.com/food-img/26a/26a10c4cb4e07bab54d8a687ef5ac7d8.jpg",
        },
        {
          text: "3 tablespoons chopped parsley",
          quantity: 3,
          measure: "tablespoon",
          food: "parsley",
          weight: 11.399999999999999,
          foodCategory: "vegetables",
          foodId: "food_b244pqdazw24zobr5vqu2bf0uid8",
          image:
            "https://www.edamam.com/food-img/46a/46a132e96626d7989b4d6ed8c91f4da0.jpg",
        },
        {
          text: "1 tablespoon dried oregano",
          quantity: 1,
          measure: "tablespoon",
          food: "dried oregano",
          weight: 2.9999999997971143,
          foodCategory: "Condiments and sauces",
          foodId: "food_bkkw6v3bdf0sqiazmzyuiax7i8jr",
          image:
            "https://www.edamam.com/food-img/1b0/1b0eaffb1c261606e0d82fed8e9747a7.jpg",
        },
        {
          text: "Salt and pepper",
          quantity: 0,
          measure: null,
          food: "Salt",
          weight: 17.720239769998784,
          foodCategory: "Condiments and sauces",
          foodId: "food_btxz81db72hwbra2pncvebzzzum9",
          image:
            "https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg",
        },
        {
          text: "Salt and pepper",
          quantity: 0,
          measure: null,
          food: "pepper",
          weight: 8.860119884999392,
          foodCategory: "Condiments and sauces",
          foodId: "food_b6ywzluaaxv02wad7s1r9ag4py89",
          image:
            "https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg",
        },
        {
          text: "1 cup frozen peas, thawed",
          quantity: 1,
          measure: "cup",
          food: "frozen peas",
          weight: 134,
          foodCategory: "vegetables",
          foodId: "food_aqrct01b4nxw5eaxoo8woaxc3xd7",
          image:
            "https://www.edamam.com/food-img/c91/c9130a361d5c5b279bf48c69e2466ec2.jpg",
        },
      ],
      calories: 4228.043058200812,

      totalTime: 60,
      cuisineType: ["italian"],
      mealType: ["lunch/dinner"],
      dishType: ["main course"],
    },
  });
  await recipe.save();
});

// First test
test.serial("Get recipe by name", async (t) => {
  const { app } = t.context;
  const res = await request(app)
    .get("/api/recipes")
    .send({
      recipe: {
        label: "Chicken Vesuvio",
      },
    });
  t.is(res.status, 200);
  t.is(res.body.name, "Chicken Vesuvio");
});

// Second test
// Note: subsequent tests must be serial tests.
// It is NOT RECOMMENDED to run parallel tests within an AVA test file when using Mongoose
test.serial("litmus create user", async (t) => {
  const { app } = t.context;
  const res = await request(app).post("/litmus").send({
    email: "new@example.com",
    name: "New name",
  });

  t.is(res.status, 200);
  t.is(res.body.name, "New name");

  // Verifies that user is created in DB
  const newUser = await User.findOne({ email: "new@example.com" });
  t.is(newUser.name, "New name");
});

// Cleans up database after every test
test.afterEach.always(async (t) => await User.remove());

// Disconnect MongoDB and mongoose after all tests are done
test.after.always(async (t) => {
  mongoose.disconnect();
  mongod.stop();
});
