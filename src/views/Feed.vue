<template>
  <div class="max-w-none">
    <!-- add recipes -->
    <div>
      <AddRecipe />
    </div>

    <!-- display all recipes -->
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="existingRecipe" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <!-- inside modal -->
        <div v-for="recipe in recipes" class="flex justify-center mt-8">
          <div v-if="this.recipeId == recipe.id">
            <label class="block font-bold mb-2 text-gray-700">
              Recipe Title
            </label>
            <input
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeTitle"
              type="text"
              placeholder="Recipe Name"
              v-model="recipe.recipeTitle"
              required
            />
            <label class="block font-bold mb-2 text-gray-700">
              Recipe Type
            </label>
            <input
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeType"
              type="text"
              placeholder="Recipe Type"
              v-model="recipe.recipeType"
              required
            />
            <br />
            <label class="block font-bold mb-2 text-gray-700">
              Recipe Description
            </label>
            <input
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeDescription"
              type="text"
              placeholder="Recipe Description"
              v-model="recipe.recipeDescription"
              required
            />
            <label class="block font-bold mb-2 text-gray-700">
              Recipe Instructions
            </label>
            <input
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeInstructions"
              type="text"
              placeholder="Recipe Description"
              v-model="recipe.recipeInstructions"
              required
            />
            <div class="flex flex-inline">
              <div class="">
                <label class="block font-bold mb-2 text-gray-700">
                  Ingredients
                </label>
                <div v-for="(ingredient, index) in recipe.ingredients">
                  <input
                    class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                    id="ingredient"
                    type="text"
                    placeholder="Recipe Ingredient"
                    ref="ingredients"
                    v-model="recipe.ingredients[index]"
                    required
                  />
                </div>
              </div>
              <div class="mx-12">
                <label class="block font-bold mb-2 text-gray-700">
                  Amount
                </label>
                <ul v-for="(amount, index) in recipe.ingredientsAmounts">
                  <input
                    class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                    id="amount"
                    type="text"
                    placeholder="Recipe Ingredient"
                    ref="amounts"
                    v-model="recipe.ingredientsAmounts[index]"
                    required
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label for="existingRecipe" class="btn btn-sm">Close</label>
          <label
            for="existingRecipe"
            class="btn btn-sm"
            @click="updateRecipe(this.recipeId)"
            >Update Recipe</label
          >
        </div>
      </div>
    </div>

    <div v-for="recipe in recipes" class="flex justify-center mt-8">
      <div>
        {{ recipe.recipeTitle }} {{ recipe.recipeType }}
        <label
          for="existingRecipe"
          class="btn btn-sm"
          @click="setRecipeId(recipe.id)"
          >View Details</label
        >
        <label class="btn btn-sm" @click="deleteRecipe(recipe.id)"
          >Delete</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";

const router = useRouter();

const authListener = firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // not logged in
    alert("you must be logged in to view this. redirecting to the home page");
    router.push("/");
  }
});

onBeforeUnmount(() => {
  // clear up listener
  authListener();
});
</script>

<script>
import AddRecipe from "../components/addRecipe.vue";

export default {
  name: "app",
  components: {
    AddRecipe,
  },
  data() {
    return {
      recipes: [],
      recipeId: "",
      index: 0,
      // recipeTitle: "",
      // recipeType: "",
      // recipeDescription: "",
      // recipeInstructions: "",
      // ingredientNames: [],
      // ingredientAmounts: [],
      addRecipeForm: false,
    };
  },
  methods: {
    setRecipeId(docId) {
      this.recipeId = docId;
    },
    //
    async getRecipes() {
      var recipesRef = await firebase
        .firestore()
        .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("recipes");

      recipesRef.onSnapshot((snap) => {
        this.recipes = [];
        snap.forEach((doc) => {
          var recipe = doc.data();
          recipe.id = doc.id;
          this.recipes.push(recipe);
        });
      });
    },
    //
    deleteRecipe(docId) {
      firebase
        .firestore()
        .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("recipes")
        .doc(docId)
        .delete();
    },
    updateRecipe(docId) {
      for (let i = 0; i < this.recipes.length; i++) {
        if (docId == this.recipes[i].id) {
          this.index = i
        }
      }
      // console.log(this.recipes[0].recipeType);
      // console.log(this.recipes[0].recipeDescription);
      // console.log(this.recipes[0].recipeInstructions);
      // console.log(Object.values(this.recipes[0].ingredients));
      // console.log(Object.values(this.recipes[0].ingredientsAmounts));
      firebase
        .firestore()
        .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("recipes")
        .doc(docId)
        .update({
          recipeTitle: this.recipes[this.index].recipeTitle,
          recipeType: this.recipes[this.index].recipeType,
          recipeDescription: this.recipes[this.index].recipeDescription,
          recipeInstructions: this.recipes[this.index].recipeInstructions,
          ingredients: Object.values(this.recipes[this.index].ingredients),
          ingredientsAmounts: Object.values(this.recipes[this.index].ingredientsAmounts),
        });
    },
  },
  created() {
    this.getRecipes();
  },
};
</script>
