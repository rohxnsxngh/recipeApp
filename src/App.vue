<!-- <template>
  <div class="bg-gray-600">
    <nav>
      <router-link to="/"> Home </router-link> |
      <span v-if="isLoggedIn">
        <router-link to="/feed"> Feed </router-link> |
      </span>
      <span v-if="isLoggedIn"
        >
        <button @click="signOut">Logout</button>
      </span>
      <span v-else>
        <router-link to="/register"> Register </router-link> |
        <router-link to="/sign-in"> Login </router-link>
      </span>
    </nav>
    <router-view />
  </div>
</template> -->

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
      <div class=" md:block text-white">
        <span v-if="isLoggedIn">
          <router-link to="/feed"> Feed </router-link>
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
  <!-- <div class="md:hidden" v-if="showMenu">
    <router-link
      to="/"
      class="block py-2 px-4 text-white font-normal bg-gray-800 hover:bg-gray-900 rounded-full focus:outline-none"
    >
      Home
    </router-link>
    <router-link
      to="/"
      class="block py-2 px-4 text-white font-normal bg-gray-800 hover:bg-gray-900 rounded-full focus:outline-none"
    >
      Page 2
    </router-link>
    <button
      class="block py-2 px-4 text-white font-normal bg-gray-800 hover:bg-gray-900 rounded-full focus:outline-none"
    >
      Button
    </button>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>
