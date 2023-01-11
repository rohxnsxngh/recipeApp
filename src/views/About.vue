<template>
  <div>
    <div
      class="hero min-h-screen bg-gradient-to-r from-yellow-500 via-turtle-green to-coconut"
    >
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl text-black font-bold">Get Started</h1>
          <p class="py-6 text-white bg-gray-600 my-4 px-6 rounded-lg font-semibold">
            Welcome to a user-friendly and intuitive one stop shop for
            organizing your dietary life. Making it easy for you to plan their
            meals and grocery shopping. It provides helpful features such as
            recipe storage, grocery lists, expiration date tracking, and
            nutritional information, making meal planning and grocery shopping
            more efficiently and less time-consuming.
          </p>
          <router-link
            to="/sign-in"
            class="btn btn-wide glass text-black bg-tan hover:bg-coconut hover:text-white"
            >Login</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
