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
      <div class="modal-box bg-coconut w-11/12 max-w-5xl">
        <!-- inside modal -->
        <div v-for="recipe in recipes" class="flex justify-center mt-8">
          <div v-if="this.recipeId == recipe.id">
            <label class="block font-bold mb-2 text-blue-gray">
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
            <label class="block font-bold mb-2 text-blue-gray">
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
            <label class="block font-bold mb-2 text-blue-gray">
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
            <label class="block font-bold mb-2 text-blue-gray">
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
                <label class="block font-bold my-4 text-blue-gray">
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
                <label class="block font-bold my-4 text-blue-gray">
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
          <label
            for="existingRecipe"
            class="btn btn-sm bg-gray-blue hover:bg-red-600 text-white"
            >Close</label
          >
          <label
            for="existingRecipe"
            class="btn btn-sm bg-gray-blue hover:bg-green-600 text-white"
            @click="updateRecipe(this.recipeId)"
            >Update Recipe</label
          >
        </div>
      </div>
    </div>
    <!-- Cards -->
    <div class="px-4 mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
      <div
        v-for="recipe in recipes"
        class="bg-tan card card-compact text-black hover:bg-coconut hover:text-white hover:-translate-y-6 hover:-translate-x-6 transition duration-700 h-full lg:w-80 md:w-60 sm:w-52 w-42 mb-24 shadow-xl mx-auto"
      >
        <figure>
          <img
            src="https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxMjkxNjk3NTc5OTAw/istock-1203599963-jpg.jpg"
            alt="Recipies"
          />
        </figure>
        <div class="card-body">
          <p class="text-center font-bold sm:text-lg text-sm">
            {{ recipe.recipeTitle }}
          </p>
          <div class="flex flex-inline space-x-1 justify-end">
            <div class="tooltip" data-tip="edit recipe">
              <label
                for="existingRecipe"
                class="btn btn-xs w-12"
                @click="setRecipeId(recipe.id)"
                ><span class="material-icons text-sm"> edit_note </span></label
              >
            </div>
            <div class="tooltip" data-tip="delete recipe">
              <label class="btn btn-xs w-12" @click="deleteRecipe(recipe.id)"
                ><span class="material-icons text-sm"> delete </span>
              </label>
            </div>
          </div>
        </div>
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
      userQuery: "",
      index: 0,
      addRecipeForm: false,
    };
  },
  computed: {
    filteredSystem() {
      const self = this;
      return this.recipes.filter((x) => {
        return (
          x.recipeTitle.toLowerCase().indexOf(self.userQuery.toLowerCase()) >=
            0 ||
          x.recipeType.toLowerCase().indexOf(self.userQuery.toLowerCase()) >=
            0 ||
          x.ingredient.toLowerCase().indexOf(self.userQuery.toLowerCase()) >= 0
        );
      });
    },
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
        .doc(firebase.auth().currentUser.uid)
        // .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
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
        .doc(firebase.auth().currentUser.uid)
        .collection("recipes")
        .doc(docId)
        .delete();
    },
    updateRecipe(docId) {
      for (let i = 0; i < this.recipes.length; i++) {
        if (docId == this.recipes[i].id) {
          this.index = i;
        }
      }
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("recipes")
        .doc(docId)
        .update({
          recipeTitle: this.recipes[this.index].recipeTitle,
          recipeType: this.recipes[this.index].recipeType,
          recipeDescription: this.recipes[this.index].recipeDescription,
          recipeInstructions: this.recipes[this.index].recipeInstructions,
          ingredients: Object.values(this.recipes[this.index].ingredients),
          ingredientsAmounts: Object.values(
            this.recipes[this.index].ingredientsAmounts
          ),
        });
    },
  },
  created() {
    this.getRecipes();
  },
};
</script>
