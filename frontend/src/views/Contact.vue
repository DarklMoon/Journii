<template>
    <div class="h-screen w-full">
        <div class="flex flex-col justify-center items-center w-full h-2/6">
            <h1 class="text-[3em] mt-4 mb-4 font-medium">Contact JOURNII</h1>
            <p class="text-gray-500 font-light">Get in touch with us to get information</p>
            <hr class="mt-2 w-1/2 ">
        </div>
        <div class="grid grid-cols-3 justify-items-center mx-16 mt-5">
            <div class="bg-gray-100 drop-shadow-lg w-1/2 flex flex-col justify-center items-center p-7">
                <img src="/src/assets/image/icon-docs.png" class="w-1/3" alt="">
                <h1 class="mt-4 text-gray-400">Send An Email</h1>
                <h2>Admin@gmai.com</h2>
            </div>
            <div class="bg-gray-100 drop-shadow-lg w-1/2 flex flex-col justify-center items-center p-7">
                <img src="/src/assets/image/icon-phone.png" class="w-1/3" alt="">
                <h1 class="mt-4 text-gray-400">Give A Call</h1>
                <h2>0811234567</h2>
            </div>
            <div class="bg-gray-100 drop-shadow-lg w-1/2 flex flex-col justify-center items-center p-7">
                <img src="/src/assets/image/icon-map.png" class="w-1/3" alt="">
                <h1 class="mt-4 text-gray-400">Visit Office</h1>
                <h2>Thailand, Bangkok</h2>
            </div>
        </div>
     </div>

     <Footer />
     
</template>

<script setup>
    import Footer from '@/components/Footer.vue'
</script>