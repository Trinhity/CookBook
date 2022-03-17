// File for abstracting generic before, beforeEach, afterEach and after code
const MongodbMemoryServer = require("mongodb-memory-server").default;
const mongoose = require("mongoose");

// Your models and server
const app = require("../server");
const Recipe = require("../models/recipes");

const mongod = new MongodbMemoryServer();

// Create connection to mongoose before all tests
exports.before = async (t) =>
  mongoose.connect(await mongod.getConnectionString(), {
    useMongoClient: true,
  });

// Create fixtures before each test
exports.beforeEach = async (t) => {
  const recipe1 = new Recipe({
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
  const recipe2 = new Recipe({ 
      recipe: {
          "uri":"http://www.edamam.com/ontologies/edamam.owl#recipe_4d850627e47820d4ebd4e91ae7fd8b0e",
  "label":"Grilled Lobster with Creamy Chili Vinaigrette",
  "image":"https://www.edamam.com/web-img/ec3/ec3ee301d44a118bf5a465762e3d1619.jpg",
  "source":"Epicurious",
  "url":"https://www.epicurious.com/recipes/food/views/grilled-lobster-with-creamy-chili-vinaigrette-103884",
  "yield":2,
  "dietLabels":[
      "High-Fiber",
      "Low-Carb"
    ],
    "healthLabels":[
        "Pescatarian",
        "Peanut-Free",
        "Tree-Nut-Free",
        "Soy-Free",
        "Fish-Free",
        "Pork-Free",
        "Red-Meat-Free",
        "Celery-Free",
        "Sesame-Free",
        "Lupine-Free",
        "Mollusk-Free",
        "Alcohol-Free"
    ],
    "cautions":[
        "Sulfites"
    ],
    "ingredients":[
        {
            "text":"1 cup mayonnaise",
            "quantity":1,
            "measure":"cup",
            "food":"mayonnaise",
            "weight":231,
            "foodId":"food_bu8t61zaplle7dbrzk81dbygq0qj",
            "_id":{"$oid":"62302fabf7a9606a8fa0586c"}
        },
        {
            "text":"1/4 cup chopped fresh cilantro",
        "quantity":0.25,
        "measure":"cup",
        "food":"cilantro",
        "weight":4,
        "foodId":"food_alhzhuwb4lc7jnb5s6f02by60bzp",
        "_id":{"$oid":"62302fabf7a9606a8fa0586d"}
    },{"text":"3 tablespoons red wine vinegar","quantity":3,"measure":"tablespoon","food":"red wine vinegar","weight":44.7,"foodId":"food_ad6iyy1anmzb49a817rgnabnz8c9","_id":{"$oid":"62302fabf7a9606a8fa0586e"}},{"text":"2 tablespoons fresh lemon juice","quantity":2,"measure":"tablespoon","food":"lemon juice","weight":30.4999999994844,"foodId":"food_bglm6vxahuauteb0n6ynfbg9eryu","_id":{"$oid":"62302fabf7a9606a8fa0586f"}},{"text":"2 tablespoons Dijon mustard","quantity":2,"measure":"tablespoon","food":"Dijon mustard","weight":31.1249999994738,"foodId":"food_a34cdj5b0kyuhfbov30xcb50u4dv","_id":{"$oid":"62302fabf7a9606a8fa05870"}},{"text":"2 tablespoons chili-garlic sauce*","quantity":2,"measure":"tablespoon","food":"chili","weight":13.124999999778096,"foodId":"food_akybxs9atrgwona5nz3jgbo3vor5","_id":{"$oid":"62302fabf7a9606a8fa05871"}},{"text":"2 garlic cloves, minced","quantity":2,"measure":"clove","food":"garlic","weight":6,"foodId":"food_avtcmx6bgjv1jvay6s6stan8dnyp","_id":{"$oid":"62302fabf7a9606a8fa05872"}},{"text":"2 teaspoons sugar","quantity":2,"measure":"teaspoon","food":"sugar","weight":8.4,"foodId":"food_axi2ijobrk819yb0adceobnhm1c2","_id":{"$oid":"62302fabf7a9606a8fa05873"}},{"text":"3/4 cup plus 2 tablespoons olive oil","quantity":0.75,"measure":"cup","food":"olive oil","weight":162,"foodId":"food_b1d1icuad3iktrbqby0hiagafaz7","_id":{"$oid":"62302fabf7a9606a8fa05874"}},{"text":"3/4 cup plus 2 tablespoons olive oil","quantity":2,"measure":"tablespoon","food":"olive oil","weight":27,"foodId":"food_b1d1icuad3iktrbqby0hiagafaz7","_id":{"$oid":"62302fabf7a9606a8fa05875"}},{"text":"9 ounces angel hair pasta","quantity":9,"measure":"ounce","food":"angel hair pasta","weight":255.145708125,"foodId":"food_a8hs60uayl5icia1qe8qoba1kwp8","_id":{"$oid":"62302fabf7a9606a8fa05876"}},{"text":"2 10- to 12-ounce lobster tails (thawed if frozen), split lengthwise in half","quantity":22,"measure":"ounce","food":"lobster tails","weight":623.6895087500001,"foodId":"food_b51mgtbayikvscbpep4d3b4ut3j6","_id":{"$oid":"62302fabf7a9606a8fa05877"}},{"text":"1 tablespoon butter","quantity":1,"measure":"tablespoon","food":"butter","weight":14.2,"foodId":"food_awz3iefajbk1fwahq9logahmgltj","_id":{"$oid":"62302fabf7a9606a8fa05878"}},{"text":"2 tablespoons chopped fresh chives","quantity":2,"measure":"tablespoon","food":"chives","weight":6,"foodId":"food_btg1uzjak79lawbirsitkaeai60l","_id":{"$oid":"62302fabf7a9606a8fa05879"}},{"text":"2 tablespoons chopped fresh parsley","quantity":2,"measure":"tablespoon","food":"parsley","weight":7.6,"foodId":"food_b244pqdazw24zobr5vqu2bf0uid8","_id":{"$oid":"62302fabf7a9606a8fa0587a"}},{"text":"Lemon wedges","quantity":1,"measure":"wedge","food":"Lemon","weight":7,"foodId":"food_a6uzc62astrxcgbtzyq59b6fncrr","_id":{"$oid":"62302fabf7a9606a8fa0587b"}}],"totalTime":0,"calories":4884.937498880749,"cuisineType":["american"],"mealType":["lunch/dinner"],"dishType":["main course"]},"__v":0,"recipe_id":{"$numberLong":"22"}} });
  

  await user.save();
  await user2.save();
  await user3.save();

  // Saves app to t.context so tests can access app
  t.context.app = app;
};

// Clean up database after every test
exports.afterEach = async (t) => await User.remove();

// Disconnect MongoDB and mongoose after all tests are done
exports.after = async (t) => {
  mongoose.disconnect();
  mongod.stop();
};
