<template>
  <div class="flex justify-center mt-8">
    <div class="w-full max-w-xs bg-tan rounded-lg shadow-md p-4 md:p-8">
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">Login to Your Account</h1>
      <div class="mb-4">
        <p v-if="errMsg" class="text-red-600 text-md">{{ errMsg }}</p>
        <label class="block font-bold mb-2 text-gray-700" for="email">
          Email
        </label>
        <input
          class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-2 text-gray-700" for="password">
          Password
        </label>
        <input
          class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <!-- <div class="mb-4">
        <input
          class="leading-tight"
          type="checkbox"
          id="remember-me"
          v-model="rememberMe"
        />
        <label class="text-gray-700 font-bold" for="remember-me">
          Remember me
        </label>
      </div> -->
      <div class="flex items-center justify-between">
        <button
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
          @click="signIn"
        >
          Submit
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const signIn = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!");
      router.push("/feed");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
      // console.log(error)
      // alert(error.message)
    });
};
</script>
