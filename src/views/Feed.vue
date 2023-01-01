<template>
  <div>
    <input type="text" placeholder="Add Todo" v-model="title" />
    <div>{{ title }}</div>
    <button @click="addTodo()" class="px-4 py-2 bg-blue-500 text-white hover:bg-gray-600 rounded-full focus:outline-none">add</button>
    <div v-for="todo in todos">
      <p>
        {{ todo.recipeTitle }} {{ todo.recipeType }}
        <button @click="deleteTodo(todo.id)" class="px-4 py-2 bg-blue-500 text-white hover:bg-gray-600 rounded-full focus:outline-none">delete</button>
        <button @click="recipeDetails = !recipeDetails" class="px-4 py-2 bg-blue-500 text-white hover:bg-gray-600 rounded-full focus:outline-none">details</button>
      </p>
      <div v-if="recipeDetails">
        {{ todo.recipeDescription }}
        <br />
        <div>
          <ul v-for="ingredient in todo.ingredients">
            <li>{{ ingredient }}</li>
          </ul>
          <ul v-for="amounts in todo.ingredientsAmounts">
            <li>{{ amounts }}</li>
          </ul>
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
export default {
  name: "app",
  data() {
    return {
      todos: [],
      title: "",
      recipeDetails: false,
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
