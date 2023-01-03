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
  <nav class="bg-gray-800 px-4 py-2 flex items-center justify-between">
    <div class="flex items-center">
      <router-link
        to="/"
        class="text-lg text-white font-semibold hover:text-gray-400 mr-4"
      >
        Home
      </router-link>
      <div class="md:block text-white">
        <span v-if="isLoggedIn">
          <router-link to="/feed" class="text-sm"> Feed </router-link>
        </span>
        <span v-else class="space-x-4">
          <router-link to="/register"> Register </router-link>
          <router-link to="/sign-in"> Login </router-link>
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <div class="hidden md:block">
        <button
          v-if="isLoggedIn"
          @click="signOut"
          class="px-4 py-2 bg-transparent text-white hover:bg-gray-600 rounded-full focus:outline-none"
        >
          Logout
        </button>
      </div>
      <div class="md:hidden">
        <button
          class="px-4 py-2 bg-transparent text-white hover:bg-gray-600 rounded-full focus:outline-none"
          @click="showMenu = !showMenu"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="white">
            <path v-if="!showMenu" d="M4 6h16M4 12h16M4 18h16" />
            <path v-if="showMenu" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
  <router-view />
  <Footer class="mt-96" />
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
