<template>
  <div class="flex justify-center mt-8">
    <div class="w-full max-w-xs glass bg-tan text-black rounded-lg shadow-md p-4 md:p-8 hover:text-white">
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">Create an Account</h1>
      <div class="mb-4">
        <label class="block font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="w-full px-3 py-2 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="w-full px-3 py-2 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
          @click="register"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase";
import { useRouter} from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();
const register = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      router.push({name: 'feed'}); // redirect to the feed
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
