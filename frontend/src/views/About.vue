<template>
      <div class="h-screen w-full">
        <div class="flex flex-col justify-center items-center w-full h-2/6 mt-6">
            <h1 class="text-[3em] mt-4 mb-4 font-medium">About us</h1>
            <p class="text-gray-500 font-light">by</p>
            <hr class="mt-2 w-1/2 ">
        </div>
        <div class="grid grid-cols-2 justify-items-center mx-16 mt-5 mb-9">
            <div class="bg-gray-100 drop-shadow-lg w-1/2 flex flex-col justify-center items-center p-7">
                <img src="/src/assets/image/rabbit.png" class="w-1/3" alt="">
                <h1 class="mt-4">Rerksurat Attinantachai</h1>
                <h2>64070094@kmitl.ac.th</h2>
            </div>
            <div class="bg-gray-100 drop-shadow-lg w-1/2 flex flex-col justify-center items-center p-7">
                <img src="/src/assets/image/moon_icon.png" class="w-1/3" alt="">
                <h1 class="mt-4">Phuriwat Pitipongmontri</h1>
                <h2>64070213@kmitl.ac.th</h2>
            </div>
        </div>
     </div>
  <Footer />
</template>

<script setup>
    import Footer from '@/components/Footer.vue'
</script>