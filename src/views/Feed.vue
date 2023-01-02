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
              Recipe Description
            </label>
            <p contenteditable="true">{{ recipe.recipeDescription }}</p>
            <br />
            <div class="flex flex-inline">
              <div class="">
                <label class="block font-bold mb-2 text-gray-700">
                  Ingredients
                </label>
                <ul v-for="ingredient in recipe.ingredients">
                  <li contenteditable="true">{{ ingredient }}</li>
                </ul>
              </div>
              <div class="mx-12">
                <label class="block font-bold mb-2 text-gray-700">
                  Amount
                </label>
                <ul v-for="amounts in recipe.ingredientsAmounts">
                  <li contenteditable="true">{{ amounts }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label for="existingRecipe" class="btn btn-sm">Close</label>
        </div>
      </div>
    </div>

    <div v-for="recipe in recipes" class="flex justify-center mt-8">
      <div>
        {{ recipe.recipeTitle }} {{ recipe.recipeType }}
        <label for="existingRecipe" class="btn btn-sm" @click="setRecipeId(recipe.id)">View Details</label>
        <label class="btn btn-sm" @click="deleterecipe(recipe.id)">Delete</label>
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
      addRecipeForm: false,
    };
  },
  methods: {
    setRecipeId(docId) {
      this.recipeId = docId
    },
    //
    async getrecipes() {
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
    deleterecipe(docId) {
      firebase
        .firestore()
        .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("recipes")
        .doc(docId)
        .delete();
    },
  },
  created() {
    this.getrecipes();
  },
};
</script>
