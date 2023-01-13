<template>
  <div
    class="hero min-h-screen overflow-hidden"
    style="
      background-image: url(https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2022%2F11%2F17%2Farticle_291139_the-top-10-healthiest-foods-for-kids_-02.jpg&q=60);
    "
  >
    <div class="hero-overlay bg-opacity-60 overflow-hidden"></div>
    <div class="hero-content text-center text-neutral-content overflow-hidden">
      <div class="max-w-md">
          <h1 class="text-6xl text-white font-bold">Get Started</h1>
          <p class="py-6 text-black bg-tan my-4 px-6 rounded-lg font-semibold hover:text-white hover:bg-coconut hover:-translate-y-3 hover:-translate-x-3 transition duration-700">
            Welcome to a user-friendly and intuitive one stop shop for
            organizing your dietary life. Making it easy for you to plan their
            meals and grocery shopping. It provides helpful features such as
            recipe storage, grocery lists, expiration date tracking, and
            nutritional information, making meal planning and grocery shopping
            more efficiently and less time-consuming.
          </p>
          <router-link
            to="/sign-in"
            class="btn btn-wide glass text-black bg-tan hover:bg-coconut hover:text-white hover:-translate-y-6 hover:-translate-x-6 transition duration-700"
            >Login</router-link
          >
        </div>
    </div>
  </div>
</template>
