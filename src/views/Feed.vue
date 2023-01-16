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
      <div class="modal-box w-11/12 max-w-6xl">
        <!-- inside modal -->
        <div v-for="recipe in recipes" class="flex justify-center mt-8">
          <div v-if="showRecipeId(recipe.id)">
            <label class="block font-bold my-2 text-green-500">
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
            <label class="block font-bold my-2 text-green-500">
              Recipe Preparation Time
            </label>
            <input
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeTitle"
              type="text"
              placeholder="Recipe Prep Time"
              v-model="recipe.prepTime"
              required
            />
            <label class="block font-bold my-2 text-green-500">
              Recipe Time to Cook
            </label>
            <input
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeTitle"
              type="text"
              placeholder="Recipe Cooking Time"
              v-model="recipe.cookTime"
              required
            />
            <label class="block font-bold my-2 text-green-500">
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
            <label class="block font-bold my-2 text-green-500">
              Recipe Description
            </label>
            <textarea
              class="w-full touch-pan-y h-3/6 px-3 py-2 mb-2 text-black bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeDescription"
              type="text"
              placeholder="Recipe Description"
              v-model="recipe.recipeDescription"
              required
            ></textarea>
            <label class="block font-bold mb-2 text-green-500">
              Recipe Instructions
            </label>
            <textarea
              class="w-full touch-pan-y h-3/6 object-cover px-3 py-2 mb-2 text-black bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              id="recipeInstructions"
              type="text"
              placeholder="Recipe Description"
              v-model="recipe.recipeInstructions"
              required
            >
            </textarea>
            <div class="flex flex-inline">
              <div class="">
                <label class="block font-bold text-green-500">
                  Ingredients
                </label>
                <div
                  v-for="(ingredient, index) in recipe.ingredients"
                  class="flex"
                >
                  <input
                    class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                    id="ingredient"
                    type="text"
                    placeholder="Recipe Ingredient"
                    ref="ingredients"
                    v-model="recipe.ingredients[index]"
                    required
                  />
                  <label
                    @click="fetchData(recipe.ingredients[index])"
                    class="btn btn-xs bg-yellow-600 hover:bg-green-600 text-white mx-2 mt-4"
                    ><span class="material-icons text-sm text-black">
                      info
                    </span></label
                  >
                </div>
              </div>
              <div class="mx-12">
                <label class="block font-bold text-green-500"> Amount </label>
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
            <button
              @click="
                addIngredientArray(
                  recipe.ingredients,
                  recipe.ingredientsAmounts
                )
              "
              class="px-4 mr-4 mt-4 bg-turtle-green hover:bg-green-500 text-green-500 hover:bg-gray-600 rounded-full focus:outline-none btn btn-xs"
            >
              <span class="material-icons text-sm text-white"> add </span>
            </button>
            <button
              @click="
                deleteIngredient(recipe.ingredients, recipe.ingredientsAmounts)
              "
              class="px-4 mt-4 bg-red-500 text-green-500 bg-gray-blue hover:bg-red-600 rounded-full focus:outline-none btn btn-xs"
            >
              <span class="material-icons text-sm text-white"> remove </span>
            </button>
            <div class="modal-action">
              <label
                @click="isLoading = false"
                for="existingRecipe"
                class="btn btn-sm mb-2 bg-gray-blue hover:bg-red-600 text-white"
                >Close</label
              >
              <label
                for="existingRecipe"
                class="btn btn-sm mb-2 bg-turtle-green hover:bg-green-600 text-white"
                @click="updateRecipe(recipe.id)"
                >Update Recipe</label
              >
            </div>
            <!-- Grocery Statistics -->
            <div v-if="isLoading">
              <div>
                <p class="font-semibold">
                  Nutritional Information:
                  <span class="text-green-500">{{ groceryStats.text }}</span>
                </p>
              </div>
              <div
                class="stats stats-vertical lg:stats-horizontal shadow text-center mb-2"
                v-if="groceryStats.parsed"
              >
                <div class="stat">
                  <div class="stat-title">Energy</div>
                  <div class="stat-value">
                    {{ ENERC_KCAL }}
                  </div>
                  <div class="stat-desc">Energy (kilocalorie)</div>
                </div>

                <div class="stat">
                  <div class="stat-title">Protein</div>
                  <div class="stat-value">
                    {{ PROCNT }}
                  </div>
                  <div class="stat-desc">Amount of Protein (grams)</div>
                </div>

                <div class="stat">
                  <div class="stat-title">Fat</div>
                  <div class="stat-value">
                    {{ FAT }}
                  </div>
                  <div class="stat-desc">Total Lipids (grams)</div>
                </div>

                <div class="stat">
                  <div class="stat-title">Carbohydrate</div>
                  <div class="stat-value">
                    {{ CHOCDF }}
                  </div>
                  <div class="stat-desc">
                    Carbohydrate by Difference (grams)
                  </div>
                </div>

                <div class="stat">
                  <div class="stat-title">Fiber</div>
                  <div class="stat-value">
                    {{ FIBTG }}
                  </div>
                  <div class="stat-desc">Total Dietary Fiber (grams)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Cards -->
    <!-- Search Bar -->
    <form class="flex items-center mx-4 my-2">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for Recipes..."
          v-model="search"
          required
        />
      </div>
      <button
        type="submit"
        class="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-white"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </form>

    <div class="divider"></div>

    <div class="px-4 mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
      <div
        v-for="recipe in filteredList"
        class="bg-tan card card-compact text-black hover:bg-coconut hover:text-white hover:-translate-y-6 hover:-translate-x-6 transition duration-700 w-full h-full lg:w-80 md:w-60 sm:w-52 w-42 mb-24 shadow-xl mx-auto"
      >
        <span class="material-icons text-center text-9xl"> menu_book </span>
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
  components: {
    AddRecipe,
  },
  data() {
    return {
      recipes: [],
      recipeId: "",
      groceryStats: [],
      isLoading: false,
      index: 0,
      search: "",
      addRecipeForm: false,
    };
  },
  computed: {
    ENERC_KCAL() {
      return this.groceryStats.parsed[this.index].food.nutrients.ENERC_KCAL;
    },
    PROCNT() {
      return this.groceryStats.parsed[this.index].food.nutrients.PROCNT;
    },
    FAT() {
      return this.groceryStats.parsed[this.index].food.nutrients.FAT;
    },
    CHOCDF() {
      return this.groceryStats.parsed[this.index].food.nutrients.CHOCDF;
    },
    FIBTG() {
      return this.groceryStats.parsed[this.index].food.nutrients.FIBTG;
    },
    filteredList() {
      return this.recipes.filter((recipe) => {
        return (
          recipe.recipeTitle
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          recipe.recipeType.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    async fetchData(payload) {
      // console.log(payload);
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7f999eae26msh31113b5455bebd8p18dc04jsnb359ddad0a18",
          "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
        },
      };

      fetch(
        `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${payload}`,
        options
      )
        .then((response) => {
          response.json().then((res) => (this.groceryStats = res));
          this.isLoading = true;
        })
        .catch((err) => {
          console.error(err);
          this.isLoading = false;
        });
    },
    setRecipeId(docId) {
      this.recipeId = docId;
      return this.recipeId;
    },
    showRecipeId(docId) {
      if (this.recipeId == docId) {
        return true;
      } else {
        return false;
      }
    },
    addIngredientArray(arr, arr1) {
      arr.push("");
      arr1.push("");
    },
    deleteIngredient(arr, arr1) {
      if (arr.length > 1) {
        arr.pop();
        arr1.pop();
      }
    },
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
          prepTime: this.recipes[this.index].prepTime,
          cookTime: this.recipes[this.index].cookTime,
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
