app.component("find-recipes-form", {
  template:
    /*html*/
    `<form @submit.prevent="onSubmit">
    <p v-if="errors.length > 0">
        <b>Error(s): </b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
    <div class="input-group mb-3" >
        <span class="deleteicon">                       
            <input id="mainIngredient" type="search" class="form-control" placeholder="What are you craving?" aria-describedby="button-addon2" v-model="mainIngredient">              
            <span onclick="var input = this.previousElementSibling; input.value = ''; input.focus();">x</span>                    
        </span>
        
        <button class="btn btn-outline-secondary" type="button" id="button-addon2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg></i></button>
    </div>
</form>`,
  data() {
    return {
      mainIngredient: "",
    };
  },
  methods: {
    onSubmit() {
      fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          this.mainIngredient +
          "&app_id=26d89fcd&app_key=28d64d9439085ffc46d2b5ac16b31fc4",
        {
          method: "GET",
          headers: {},
        }
      ).then((response) => {
        if (response.ok) {
          let recipe = {
            recipe: response.json,
          };
          this.$emit("recipes-found", recipe);
        } else {
          alert(
            "Server returned " + response.status + " : " + response.statusText
          );
        }
      });

      this.name = "";
    },
  },
});
