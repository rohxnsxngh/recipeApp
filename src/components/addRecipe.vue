<template>
  <div class="flex justify-center flex-col px-4 py-4">
    <div class="divider"></div>

    <label for="addNewRecipe" class="btn btn-sm">Add New Recipe</label>
    <div class="divider"></div>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="addNewRecipe" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl overflow-auto">
        <!-- Add Recipe -->
        <label class="block font-bold mb-2 text-gray-700"> Recipe Name </label>
        <input
          class="w-full px-3 py-2 mb-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          id="recipeTitle"
          type="text"
          placeholder="Recipe Name"
          v-model="recipeTitle"
          required
        />
        <label class="block font-bold mb-2 text-gray-700"> Recipe Type </label>
        <input
          class="w-full px-3 py-2 mb-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          id="recipeType"
          type="text"
          placeholder="Breakfast, Lunch, Dessert..."
          v-model="recipeType"
          required
        />
        <label class="block font-bold mb-2 text-gray-700"> Description </label>
        <textarea
          class="w-full h-16 px-3 py-2 mb-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          id="recipeDescription"
          type="text"
          placeholder="Recipe Description"
          v-model="recipeDescription"
          required
        ></textarea>
        <label class="block font-bold mb-2 text-gray-700">
          Detailed Instructions
        </label>
        <textarea
          id="recipeInstructions"
          class="w-full h-16 px-3 py-2 mb-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Recipe Instructions"
          v-model="recipeInstructions"
          required
        ></textarea>
        <div
          class="flex flex-inline space-x-4"
          v-for="(ingredient, index) in ingredientInfo"
          :key="index"
        >
          <div class="form-group col-md-6">
            <label class="block font-bold mb-2 text-gray-700"
              >Ingredient Name</label
            >
            <input
              v-model="ingredient.ingredientName"
              :name="`ingredientInfo[${index}][ingredientName]`"
              type="text"
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Ingredient Name"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label class="block font-bold mb-2 text-gray-700"
              >Ingredient Amount</label
            >
            <input
              v-model="ingredient.ingredientAmount"
              :name="`ingredientInfo[${index}][ingredientAmount]`"
              type="text"
              class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Ingredient Amount"
              required
            />
          </div>
          <button
            @click="addIngredient"
            class="px-4 mt-10 bg-green-500 text-white hover:bg-gray-600 rounded-full focus:outline-none btn btn-xs"
          >
            <span class="material-icons text-sm"> add </span>
          </button>
          <button
            @click="deleteIngredient"
            class="px-4 mt-10 bg-red-500 text-white hover:bg-gray-600 rounded-full focus:outline-none btn btn-xs"
          >
            <span class="material-icons text-sm"> remove </span>
          </button>
        </div>
        <div class="modal-action">
          <label for="addNewRecipe" class="btn btn-sm bg-red-500 text-white"
            >Cancel</label
          >
          <label for="addNewRecipe" @click="addRecipe" class="btn btn-sm"
            >Add Recipe to Collection!</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "app",
  data() {
    return {
      todos: [],
      recipeTitle: "",
      recipeType: "",
      recipeDescription: "",
      recipeInstructions: "",
      ingredientNames: [],
      ingredientAmounts: [],
      ingredientInfo: [
        {
          ingredientName: "",
          ingredientAmount: "",
        },
      ],
    };
  },
  methods: {
    addIngredient() {
      this.ingredientInfo.push({
        ingredientName: "",
        ingredientAmount: "",
      });
    },
    deleteIngredient() {
      if (this.ingredientInfo.length > 1) {
        this.ingredientInfo.pop();
      }
      return;
    },
    addRecipe() {
      const data = {
        ingredientInfo: this.ingredientInfo,
      };
      const json = JSON.stringify(data, null, 2);
      this.ingredientNames = this.ingredientInfo.map(
        (ingredient) => ingredient.ingredientName
      );
      this.ingredientAmounts = this.ingredientInfo.map(
        (ingredient) => ingredient.ingredientAmount
      );
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        // .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("recipes")
        .add({
          recipeTitle: this.recipeTitle,
          recipeType: this.recipeType,
          recipeDescription: this.recipeDescription,
          recipeInstructions: this.recipeInstructions,
          ingredients: Object.values(this.ingredientNames),
          ingredientsAmounts: Object.values(this.ingredientAmounts),
        });
    },
  },
};
</script>
