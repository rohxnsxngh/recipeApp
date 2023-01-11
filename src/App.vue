<script setup>
import { ref, watchEffect } from "vue"; // used for conditional rendering
import firebase from "firebase";
import { useRouter } from "vue-router";
const router = useRouter();
const isLoggedIn = ref(true);
// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});
const signOut = () => {
  firebase.auth().signOut();
  router.push("/");
};
</script>

<template>
  <div class="h-screen bg-gradient-to-r from-yellow-500 via-turtle-green to-coconut justify-between w-screen overflow-x-hidden">
    <nav class="bg-turtle-green px-4 py-2 flex items-center justify-between">
      <div class="flex items-center">
        <router-link
          to="/"
          class="text-lg text-white font-semibold hover:text-black mr-4"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          class="text-md text-white font-semibold hover:text-black mr-4"
        >
          About
        </router-link>
        <div class="text-white mx-2">
          <span v-if="isLoggedIn">
            <router-link
              to="/feed"
              class="text-md font-semibold hover:text-black mr-4"
            >
              Feed
            </router-link>
            <router-link
              to="/groceries"
              class="text-md font-semibold hover:text-black mr-4"
            >
              Groceries
            </router-link>
          </span>
          <span v-else class="space-x-4">
            <router-link to="/register"> Register </router-link>
            <router-link to="/sign-in"> Login </router-link>
          </span>
        </div>
      </div>
      <div class="flex items-center">
        <div class="block">
          <button
            v-if="isLoggedIn"
            @click="signOut"
            class="px-4 py-2 bg-transparent font-bold text-md text-white hover:bg-gray-600 rounded-full focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <router-view class="bg-gradient-to-r from-yellow-500 via-turtle-green to-coconut" />
    <Footer class="fixed bottom-0 mt-96" />
  </div>
</template>

<script>
import Footer from "./components/footer.vue";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>
