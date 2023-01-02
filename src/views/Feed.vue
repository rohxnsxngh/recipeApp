<template>
  <div class="max-w-none">
    <!-- add recipes -->
    <div>
      <AddRecipe/>
    </div>

    <!-- display all recipes -->
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="existingRecipe" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <!-- inside modal -->
        <div v-for="todo in todos" class="flex justify-center mt-8">
          <div>
            <label class="block font-bold mb-2 text-gray-700">
              Recipe Description
            </label>
            <p contenteditable="true">{{ todo.recipeDescription }}</p>
            <br />
            <div class="flex flex-inline">
              <div class="">
                <label class="block font-bold mb-2 text-gray-700">
                  Ingredients
                </label>
                <ul v-for="ingredient in todo.ingredients">
                  <li contenteditable="true">{{ ingredient }}</li>
                </ul>
              </div>
              <div class="mx-12">
                <label class="block font-bold mb-2 text-gray-700">
                  Amount
                </label>
                <ul v-for="amounts in todo.ingredientsAmounts">
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

    <div v-for="todo in todos" class="flex justify-center mt-8">
      <div>
        {{ todo.recipeTitle }} {{ todo.recipeType }}
        <label for="existingRecipe" class="btn btn-sm">View Details</label>
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
      todos: [],
      title: "",
      addRecipeForm: false,
    };
  },
  methods: {
    //
    async getTodos() {
      var todosRef = await firebase
        .firestore()
        .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("recipes");

      todosRef.onSnapshot((snap) => {
        // this.todos = [];
        snap.forEach((doc) => {
          var todo = doc.data();
          todo.id = doc.id;
          this.todos.push(todo);
        });
      });
    },
    //
    addTodo() {
      firebase
        .firestore()
        .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("todos")
        .add({
          title: this.title,
          createdAt: new Date(),
          isCompleted: false,
        });
    },
    deleteTodo(docId) {
      firebase
        .firestore()
        .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("todos")
        .doc(docId)
        .delete();
    },
  },
  created() {
    this.getTodos();
  },
};
</script>
