const app = Vue.createApp({
  el: "#main",

  data: {
    result: false,
    errors: [],
    mainIngredient: null,
    app_id: "",
    app_key: "",
  },

  methods: {
    checkForm() {
      this.errors = [];
      if (!this.mainIngredient) {
        this.errors.push("Main ingredient required");
      }

      fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          this.mainIngredient +
          "&app_id=26d89fcd&app_key=28d64d9439085ffc46d2b5ac16b31fc4",
        {
          method: "GET",
          headers: {},
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .then((response) => {
          this.result = true;
          console.log(response.body);
        });

      e.preventDefault();
    },
  },
});
