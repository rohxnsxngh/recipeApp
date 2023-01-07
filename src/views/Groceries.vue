<template>
  <div class="max-w-none">
    <div>
      <addgroceryList />
    </div>
    <input type="checkbox" id="existingGrocery" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <div class="flex flex-col">
          <div v-for="grocery in groceries" class="justify-center mt-8">
            <div v-if="this.groceryId == grocery.id">
              <div>{{ grocery.groceryDate }}</div>
              <div class="columns-3 gap-x-5">
                <div v-for="(quantity, index) in grocery.quantities">
                  <input
                    class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                    id="ingredient"
                    type="text"
                    placeholder="Quantity"
                    ref="ingredients"
                    v-model="grocery.quantities[index]"
                    required
                  />
                </div>
                <div v-for="(produce, index) in grocery.groceries">
                  <input
                    class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                    id="ingredient"
                    type="text"
                    placeholder="Grocery"
                    ref="ingredients"
                    v-model="grocery.groceries[index]"
                    required
                  />
                </div>
                <div v-for="(isChecked, index) in grocery.isChecked">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-md checkbox-warning mt-4 mb-2 py-3"
                    v-model="grocery.isChecked[index]"
                    true-value="true"
                    false-value="false"
                    id="ingredient"
                    placeholder="Is Checked"
                  />
                </div>
              </div>
              <button
                @click="
                  addgrocery(
                    grocery.quantities,
                    grocery.groceries,
                    grocery.isChecked
                  )
                "
                class="px-4 mr-4 mt-10 bg-turtle-green hover:bg-green-500 text-blue-gray hover:bg-gray-600 rounded-full focus:outline-none btn btn-xs"
              >
                <span class="material-icons text-sm text-white"> add </span>
              </button>
              <button
                @click="
                  deleteGrocery(
                    grocery.quantities,
                    grocery.groceries,
                    grocery.isChecked
                  )
                "
                class="px-4 mt-10 bg-red-500 text-blue-gray bg-gray-blue hover:bg-red-600 rounded-full focus:outline-none btn btn-xs"
              >
                <span class="material-icons text-sm text-white"> remove </span>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label
            for="existingGrocery"
            class="btn btn-sm bg-gray-blue hover:bg-red-600 text-white"
            >Close</label
          >
          <label
            for="existingGrocery"
            @click="updateGroceries(this.groceryId)"
            class="btn btn-sm bg-gray-blue hover:bg-green-600 text-white"
            >Update Grocery List</label
          >
        </div>
      </div>
    </div>
    <!-- Cards -->
    <div
      class="px-4 mt-10 mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4"
    >
      <div
        class="bg-tan card card-compact text-black hover:bg-coconut hover:text-white hover:-translate-y-6 hover:-translate-x-6 transition duration-700 h-full lg:w-80 md:w-60 sm:w-52 w-42 mb-24 shadow-xl mx-auto"
        v-for="grocery in groceries"
      >
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div class="card-body">
          <p class="text-center font-bold sm:text-lg text-sm">
            {{ grocery.groceryDate }}
          </p>
          <div class="flex flex-inline space-x-1 justify-end">
            <div class="tooltip" data-tip="edit grocery list">
              <label
                for="existingGrocery"
                class="btn btn-xs w-12"
                @click="setGroceryId(grocery.id)"
                ><span class="material-icons text-sm"> edit_note </span></label
              >
            </div>
            <div class="tooltip" data-tip="delete grocery list">
              <label
                class="btn btn-xs w-12"
                @click="deleteGroceries(grocery.id)"
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
import addgroceryList from "../components/addgroceryList.vue";

export default {
  name: "app",
  components: {
    addgroceryList,
  },
  data() {
    return {
      groceries: [],
      groceryId: "",
      index: 0,
    };
  },
  methods: {
    setGroceryId(docId) {
      this.groceryId = docId;
    },
    addgrocery(arr, arr1, arr2) {
      arr.push("");
      arr1.push("");
      arr2.push("");
    },
    deleteGrocery(arr, arr1, arr2) {
      if (arr.length > 1) {
        arr.pop();
        arr1.pop();
        arr2.pop();
      }
    },
    updateGroceries(docId) {
      for (let i = 0; i < this.groceries.length; i++) {
        if (docId == this.groceries[i].id) {
          this.index = i;
        }
      }
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("groceryList")
        .doc(docId)
        .update({
          groceries: Object.values(this.groceries[this.index].groceries),
          quantities: Object.values(this.groceries[this.index].quantities),
          isChecked: Object.values(this.groceries[this.index].isChecked),
          groceryDate: this.groceries[this.index].groceryDate,
        });
    },
    //
    deleteGroceries(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("groceryList")
        .doc(docId)
        .delete();
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
