<template>
  <div>
    <input type="text" placeholder="Add Todo" v-model="title" />
    <div>{{ title }}</div>
    <button @click="addTodo()">add</button>
    <div v-for="todo in todos">
      <p>{{ todo }} <button @click="deleteTodo(todo.id)">delete</button></p>
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
        .collection("todos");

      todosRef.onSnapshot((snap) => {
        this.todos = [];
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
