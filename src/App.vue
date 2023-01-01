<template>
  <div class="bg-blue-600">
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
</template>

<script lang="ts" setup>
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
