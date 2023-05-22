<template>
    <div class="relative">
        <div class="relative">
            <h1 class="text-4xl text-center my-7">{{ user?.username }}'s Journey</h1>
        </div>
        <div class="fav">
            <h2 class="text-2xl ml-8 mb-8">Favourite (1)</h2>
            <div class="justify-center ">
                <div class="gap-8 grid grid-cols-4 mt-4 px-8 mb-16">
                    <div class="card flex flex-col bg-white border-0 rounded-md " v-for="value in checkFav" :key="value">
                        <template v-if="value.jour_fav === 1" >
                        <img src="https://images.unsplash.com/photo-1538640206218-edd12e7624fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                            alt="pic" class="rounded-t-md" style="width:100%">
                        <!-- <div class="flex flex-col justify-between"> -->
                            <div class="card-data flex flex-col grow p-3">
                                <h4><b>{{ value.jour_title }}</b></h4>
                                <h4>{{ value.jour_script }}</h4>
                                <p>{{ value.country }}, {{ value.state_province }}, {{ value.city }}</p>
                                <p>{{ value.date_s }} - {{ value.date_e }}</p>
                                <hr>
                                <h4><b>Price: {{ value.total_price }}</b></h4>
                                <!-- <ion-icon name="heart"></ion-icon> -->
                                <router-link class="readmore" :to="`/memo/detail/${value.jour_id}`">Read
                                    more...</router-link>

                            </div>
                            <!-- </a> -->
                            <footer class="card-footer">
                                <!-- <router-link class="card-footer-item" :to="`/blogs/detail/${blog.id}`">Read more...</router-link> -->
                                <a class="card-footer flex text-center">
                                    <div
                                        class="w-1/2 border-t border-r border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-600 hover:bg-slate-100">
                                        Edit
                                    </div>
                                    <div
                                        class="w-1/2 border-t border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-600 hover:bg-slate-100">
                                        Delete
                                    </div>
                                </a>
                            </footer>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="all">
            <h2 class="text-2xl ml-8 mb-8">All ({{ getData.length }})</h2>
            <div class="justify-center ">
                <div class="gap-8 grid grid-cols-4 mt-4 px-8  mb-5">
                    <div class="card flex flex-col bg-white border-0 rounded-md hover:bg-slate-100"
                        v-for="value in getData" :key="value">
                        <!-- <a href="" onclick="alert('test')"> -->
                        <img src="https://images.unsplash.com/photo-1538640206218-edd12e7624fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                            alt="pic" class="rounded-t-md" style="width:100%">
                        <div class="card-data  flex flex-col grow p-3">
                            <h4><b>{{ value.jour_title }}</b></h4>
                            <h4>{{ value.jour_script }}</h4>
                            <p>{{ value.country }}, {{ value.state_province }}, {{ value.city }}</p>
                            <p>{{ value.date_s }} - {{ value.date_e }}</p>
                            <hr>
                            <h4><b>Price: {{ value.total_price }}</b></h4>
                            <!-- <ion-icon name="heart-outline"></ion-icon> -->
                            <router-link class="readmore" :to="`/memo/detail/${value.jour_id}`">Read more...</router-link>

                        </div>
                        <!-- </a> -->
                        <footer class="card-footer">
                            <a class="card-footer flex text-center">
                                <div
                                    class="w-1/2 border-t border-r border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-600">
                                    Edit
                                </div>
                                <div
                                    class="w-1/2 border-t border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-600">
                                    Delete
                                </div>
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/plugins/axios.js'
export default {
    // name: 'eachAccount',
    props: ['user'],
    data() {
        return {
            getData: [],
            test: {},
        }
    },
    created() {
        axios.get(`/user/${this.$route.params.id}`)
        .then((response) => {
            this.getData = response.data.data
            console.log(response.data.data[0])
        }).catch((error) => {
          console.log(error.response.data.message)
        });
        console.log(this.getData)
    },
    mounted() {
    // this.getAccountDetail(this.$route.params.id);
  },
  methods: {
    // getAccountDetail(userId) {
    //   axios
    //     .get(`/user/${userId}`)
    //     .then((response) => {
    //         this.gatData = response.data
    //         console.log(response.data)
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.message)
    //     });
    // },
    },
    computed: {
        checkFav() {
            console.log(this.getData)
            // return this.getData.filter(f => f.jour_fav == 1)
        }
    }

}
</script>
