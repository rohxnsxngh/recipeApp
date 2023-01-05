<template>
  <div class="flex flex-col">
    <div v-for="grocery in groceries" class="flex justify-center mt-8">
      <div class="flex flex-col">
        <div v-for="(quantity, index) in grocery.quantities">
          <input
            class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
            id="ingredient"
            type="text"
            placeholder="Recipe Ingredient"
            ref="ingredients"
            v-model="grocery.quantities[index]"
            required
          />
        </div>
        <br>
        <div v-for="(produce, index) in grocery.groceries">
          <input
            class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
            id="ingredient"
            type="text"
            placeholder="Recipe Ingredient"
            ref="ingredients"
            v-model="grocery.groceries[index]"
            required
          />
        </div>
      </div>
      <button
        @click="addgrocery(grocery.quantities, grocery.groceries)"
        class="px-4 mt-10 bg-turtle-green hover:bg-green-500 text-blue-gray hover:bg-gray-600 rounded-full focus:outline-none btn btn-xs"
      >
        <span class="material-icons text-sm text-white"> add </span>
      </button>
      <button
        @click="deletegrocery(grocery.quantities, grocery.groceries)"
        class="px-4 mt-10 bg-red-500 text-blue-gray bg-gray-blue hover:bg-red-600 rounded-full focus:outline-none btn btn-xs"
      >
        <span class="material-icons text-sm text-white"> remove </span>
      </button>
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
      groceries: [],
      groceryId: "",
      index: 0,
      groceryInfo: [
        {
          groceryName: "",
          groceryAmount: "",
        },
      ],
    };
  },
  methods: {
    addgrocery(arr, arr1) {
      arr.push("");
      arr1.push("");
    },
    deletegrocery(arr, arr1) {
      if (arr.length > 1) {
        arr.pop();
        arr1.pop();
      }
    },
    async getGroceries() {
      var groceriesRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        // .doc("0OqFWbAK5hQIwDFTES6Gh7dEZMt2")
        .collection("groceryList");

      groceriesRef.onSnapshot((snap) => {
        this.groceries = [];
        snap.forEach((doc) => {
          var grocery = doc.data();
          grocery.id = doc.id;
          this.groceries.push(grocery);
        });
      });
    },
    //
  },
  created() {
    this.getGroceries();
  },
};
</script>
