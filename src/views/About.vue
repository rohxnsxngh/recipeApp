<template>
  <div>
    <div class="carousel w-full h-screen">
      <div id="slide1" class="carousel-item relative w-full">
        <img src="../assets/aboutFood1.webp" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide4" class="btn btn-circle">❮</a>
          <a href="#slide2" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" class="carousel-item relative w-full">
        <img src="../assets/aboutFood2.jpg" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide1" class="btn btn-circle">❮</a>
          <a href="#slide3" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" class="carousel-item relative w-full">
        <img src="../assets/aboutFood3.webp" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide2" class="btn btn-circle">❮</a>
          <a href="#slide4" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide4" class="carousel-item relative w-full">
        <img src="../assets/aboutFood4.webp" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide3" class="btn btn-circle">❮</a>
          <a href="#slide1" class="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-turtle-green">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl text-black font-bold">Get Started</h1>
          <p class="py-6 text-white">
            Create a Login to start organizing your recipes and grocery lists!
          </p>
          <router-link to="/login" class="btn btn-wide glass text-black hover:bg-yellow-600">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
