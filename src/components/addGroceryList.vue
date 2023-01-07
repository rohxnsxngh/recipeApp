<template>
  <div class="flex justify-center flex-col px-4 py-4">
    <label
      for="addNewGrocery"
      class="btn btn-sm bg-tan font-bold text-black hover:text-white hover:bg-coconut"
      >Add New Grocery List</label
    >

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="addNewGrocery" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box bg-coconut w-11/12 max-w-5xl overflow-auto">
        <!-- Add Recipe -->
        <div
          class="flex flex-inline space-x-4"
          v-for="(ingredient, index) in groceryInfo"
          :key="index"
        >
          <div class="form-group col-md-6">
            <label class="block font-bold mb-2 text-blue-gray">Quantity</label>
            <input
              v-model="ingredient.groceryAmount"
              :name="`groceryInfo[${index}][groceryAmount]`"
              type="text"
              class="w-full px-3 py-2 text-blue-gray bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Quantity"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label class="block font-bold mb-2 text-blue-gray">Grocery</label>
            <input
              v-model="ingredient.groceryName"
              :name="`groceryInfo[${index}][groceryName]`"
              type="text"
              class="w-full px-3 py-2 text-blue-gray bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Grocery"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <input
              v-model="ingredient.groceryBoolean"
              :name="`groceryInfo[${index}][groceryBoolean]`"
              type="checkbox"
              class="hidden checkbox checkbox-md checkbox-warning mt-10 mb-2 py-3"
              true-value="true"
              false-value="false"
              id="ingredient"
            />
          </div>
        </div>
        <button
          @click="addGrocery"
          class="px-4 mr-4 mt-10 bg-turtle-green hover:bg-green-500 text-blue-gray hover:bg-gray-600 rounded-full focus:outline-none btn btn-xs"
        >
          <span class="material-icons text-sm text-white"> add </span>
        </button>
        <button
          @click="deleteGrocery"
          class="px-4 mt-10 bg-red-500 text-blue-gray bg-gray-blue hover:bg-red-600 rounded-full focus:outline-none btn btn-xs"
        >
          <span class="material-icons text-sm text-white"> remove </span>
        </button>
        <div class="modal-action">
          <label
            for="addNewGrocery"
            class="btn btn-sm bg-gray-blue hover:bg-red-600 text-white"
            >Cancel</label
          >
          <label
            for="addNewGrocery"
            @click="addGroceries"
            class="btn btn-sm bg-turtle-green hover:bg-green-500 text-white"
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
      groceryList: [],
      groceryDate: new Date(),
      groceries: [],
      quantities: [],
      isChecked: [],
      groceryInfo: [
        {
          groceryName: "",
          groceryAmount: "",
          groceryBoolean: "false",
        },
      ],
    };
  },
  methods: {
    addGrocery() {
      this.groceryInfo.push({
        groceryName: "",
        groceryAmount: "",
        groceryBoolean: "false",
      });
    },
    deleteGrocery() {
      if (this.groceryInfo.length > 1) {
        this.groceryInfo.pop();
      }
      return;
    },
    addGroceries() {
      const data = {
        groceryInfo: this.groceryInfo,
      };
      const json = JSON.stringify(data, null, 2);
      this.groceries = this.groceryInfo.map((grocery) => grocery.groceryName);
      this.quantities = this.groceryInfo.map(
        (grocery) => grocery.groceryAmount
      );
      this.quantities = this.groceryInfo.map(
        (grocery) => grocery.groceryBoolean
      );
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("groceryList")
        .add({
          groceries: Object.values(this.groceries),
          quantities: Object.values(this.quantities),
          isChecked: Object.values(this.isChecked),
          groceryDate: new Date(),
        });
    },
  },
};
</script>
