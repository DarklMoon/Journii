<template>
  <section id="app"
    class="bg-blue flex flex-col w-11/12 mt-10 mb-10 relative border-0 rounded-xl shadow-lg shadow-black-500/50 overflow-x-hidden overflow-y-auto">
    <nav class="sticky top-0 w-full px-4 py-4 flex items-center bg-green border-0 rounded-t-xl z-50">
      <div class="relative flex items-center w-full">
        <div class="flex w-1/2 justify-start">
          <router-link :to="{ name: 'home' }" class="w-52">
            <img src="./assets/image/logo-original.png" alt="JourniiLogo">
          </router-link>
        </div>
        <div class="shrink-0">
          <router-link :to="{ name: 'home' }" :class="{ 'text-white': this.$route.path === '/' }"
            class="px-2 hover:text-white transition ease-in-out delay-10">Home</router-link>
          <router-link :to="{ name: 'list' }" :class="{ 'text-white': this.$route.path.includes('/memo') }"
            class="px-2 hover:text-white transition ease-in-out delay-10">Memo</router-link>
          <router-link :to="{ name: 'about' }" :class="{ 'text-white': this.$route.path === '/about' }"
            class="px-2 hover:text-white transition ease-in-out delay-10">About</router-link>
          <router-link :to="{ name: 'contact' }" :class="{ 'text-white': this.$route.path === '/contact' }"
            class="px-2 hover:text-white transition ease-in-out delay-10">Contact</router-link>
          <!-- <p class="px-2">{{ this.$route.path }}</p> this.$route.path === '/memo/addJourni/first' -->
        </div>
        <div class="flex w-1/2 justify-end">
          <div v-if="user && user.role == 'Admin'">
            <button @click="logout()" class="pr-3 hover:text-white transition ease-in-out delay-10">Sign Out</button>
            <button type="button"
              class="px-4 py-2 mr-2 bg-brown-light text-brown rounded-md hover:text-white hover:bg-[#513f3f] transition ease-in-out delay-10 " >
              <router-link :to="{ name: 'admin' }" :class="{ 'text-white': this.$route.path === '/admin' }" >Admin</router-link>
            </button>
            <button type="button"
              class="px-4 py-2 bg-brown-light text-brown rounded-md hover:text-white hover:bg-[#513f3f] transition ease-in-out delay-10 " >
              <router-link :to="{ name: 'account' }" :class="{ 'text-white': this.$route.path === '/user/me' }" >{{ user.username }}</router-link>
            </button>
          </div>
          <div v-if="user && user.role == 'Normal'">
            <button @click="logout()" class="pr-3 hover:text-white transition ease-in-out delay-10">Sign Out</button>
            <button type="button"
              class="px-4 py-2 bg-brown-light text-brown rounded-md hover:text-white hover:bg-[#513f3f] transition ease-in-out delay-10 " >
              <router-link :to="{ name: 'account' }" :class="{ 'text-white': this.$route.path === '/user/me' }" >{{ user.username }}</router-link>
            </button>
          </div>
          <div v-else-if="!user">
            <button class="pr-3 hover:text-white transition ease-in-out delay-10">
              <router-link :to="{ name: 'signin' }" :class="{ 'text-white': this.$route.path === '/user/signin' }">Sign
                in</router-link>
            </button>
            <button type="button"
              class="px-4 py-2 bg-brown-light text-brown rounded-md hover:text-white hover:bg-[#513f3f] transition ease-in-out delay-10 " >
              <router-link :to="{ name: 'signup' }" :class="{ 'text-white': this.$route.path === '/user/signup' }" >Sign up</router-link>
            </button>
          </div>

        </div>
      </div>
    </nav>

    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
  </section>
</template>

<script setup>
import { RouterView } from 'vue-router' 
</script>

<script>
import axios from '@/plugins/axios'
export default {
  
  data() {
    return {
      user: null
    }
  },
    // props: ['user'],
  methods: {
    onAuthChange() {
      const token = localStorage.getItem('token')
      // console.log('choco')
      if (token) {
        // console.log('aom')
        this.getUser()
      }
    },
    getUser() {
      axios.get('/user/me').then(res => {
        this.user = res.data
      })
    },
    logout() {
      localStorage.removeItem('token')
      location.reload()
    },
    // myBlogs() {
    //   if (!this.user) return false
    //   return blog.create_by_id === this.user.id || this.user.role == 'admin'
    // }
  },
  mounted() {
    this.onAuthChange() //เวลารีเฟรชหน้าข้อมูลจะได้ไม่หาย
  }
}
</script>