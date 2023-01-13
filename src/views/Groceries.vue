<template>
  <div class="max-w-none">
    <div>
      <addGroceryList />
    </div>
    <input type="checkbox" id="existingGrocery" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <div class="flex flex-col">
          <div v-for="grocery in groceries" class="justify-center mt-8">
            <div v-if="showGroceryId(grocery.id)">
              <div class="font-semibold text-green-500">
                Grocery List for: {{ grocery.groceryDate.toLocaleDateString() }}
              </div>
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
                <div v-for="(produce, index) in grocery.groceries" class="flex">
                  <input
                    class="w-full px-3 py-2 my-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                    id="ingredient"
                    type="text"
                    placeholder="Grocery"
                    ref="ingredients"
                    v-model="grocery.groceries[index]"
                    required
                  />
                  <label
                    @click="fetchData(grocery.groceries[index])"
                    class="btn btn-xs bg-yellow-600 hover:bg-green-600 text-white mx-2 mt-4"
                    ><span class="material-icons text-sm text-black">
                      info
                    </span></label
                  >
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
                  addGroceryArray(
                    grocery.quantities,
                    grocery.groceries,
                    grocery.isChecked
                  )
                "
                class="px-4 mr-4 mt-4 bg-turtle-green hover:bg-green-500 text-blue-gray hover:bg-gray-600 rounded-full focus:outline-none btn btn-xs"
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
                class="px-4 mt-4 bg-red-500 text-blue-gray bg-gray-blue hover:bg-red-600 rounded-full focus:outline-none btn btn-xs"
              >
                <span class="material-icons text-sm text-white"> remove </span>
              </button>
              <div class="modal-action">
                <label
                  @click="isLoading = false"
                  for="existingGrocery"
                  class="btn btn-sm bg-gray-blue hover:bg-red-600 text-white"
                  >Close</label
                >
                <label
                  for="existingGrocery"
                  @click="updateGroceries(grocery.id)"
                  class="btn btn-sm bg-turtle-green hover:bg-green-600 text-white"
                  >Update Grocery List</label
                >
              </div>
            </div>
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
              class="stats stats-vertical lg:stats-horizontal shadow text-center"
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
                <div class="stat-desc">Carbohydrate by Difference (grams)</div>
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
    <!-- Cards -->
    <div
      class="px-4 mt-10 mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4"
    >
      <div
        class="bg-tan card card-compact text-black hover:bg-coconut hover:text-white hover:-translate-y-6 hover:-translate-x-6 transition duration-700 h-full lg:w-80 md:w-60 sm:w-52 w-42 mb-24 shadow-xl mx-auto"
        v-for="grocery in groceries"
      >
        <span class="material-icons text-center text-9xl"> menu_book </span>
        <div class="card-body">
          <p class="text-center font-bold sm:text-lg text-sm">
            Grocery List for: <br />
            {{ grocery.groceryDate.toLocaleDateString() }}
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
import addGroceryList from "../components/addGroceryList.vue";

export default {
  components: {
    addGroceryList,
  },
  data() {
    return {
      groceries: [],
      groceryId: "",
      groceryStats: [],
      isLoading: false,
      index: 0,
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
  },
  methods: {
    //
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
    //
    setGroceryId(docId) {
      this.groceryId = docId;
    },
    showGroceryId(docId) {
      if (this.groceryId == docId) {
        return true;
      } else {
        return false;
      }
    },
    addGroceryArray(arr, arr1, arr2) {
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
