app.component("recipe-list", {
  props: {
    recipe: {
      required: true,
    },
  },
  template:
    /*html*/
    `<h2>Recipes</h2>
    <ul>
        <li v-for="recipe in recipes">
            {{ recipe }}
        </li>
    </ul>`,
});
