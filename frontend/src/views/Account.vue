<template>
    <div class="relative">
        <div class="relative">
            <h1 class="text-4xl text-center my-7">{{ user?.username }}'s Journey</h1>
        </div>
        <div class="fav">
            <h2 class="text-2xl ml-8 mb-8">Favourite</h2>
            <div class="justify-center ">
                <div class="gap-8 grid grid-cols-4 mt-4 px-8 mb-16">
                    <div class="card flex flex-col bg-white border-0 rounded-md " v-for="value,index in checkFav" :key="value">
                        <img :src="imagePath(value.image_file)"
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
                                    <router-link :to="`/memo/edit/${value.jour_id}`">Edit</router-link>
                                </div>
                                <div @click="deleteBlogOne(value.jour_id, index)"
                                    class="w-1/2 border-t border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-600 hover:bg-slate-100">
                                    Delete
                                </div>
                            </a>
                        </footer>
                        <!-- </div> -->

                        <!-- <a href="" onclick="alert('test')"> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="all">
            <h2 class="text-2xl ml-8 mb-8">All</h2>
            <div class="justify-center ">
                <div class="gap-8 grid grid-cols-4 mt-4 px-8  mb-5">
                    <div class="card flex flex-col bg-white border-0 rounded-md hover:bg-slate-100" v-for="value,index in getData"
                        :key="value">
                        <!-- <a href="" onclick="alert('test')"> -->
                        <img :src="imagePath(value.image_file)"
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
                                    <router-link :to="`/memo/edit/${value.jour_id}`">Edit</router-link>
                                </div>
                                <div @click="deleteBlog(value.jour_id, index)"
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
    name: 'Account',
    props: ['user'],
    data() {
        return {
            getData: [],

        }
    },
    created() {
        // ทำครั้งแรกที่appสร้าง
        axios
            .get("http://localhost:3000", {

                // params: {
                //     search: this.search,
                // },
            })
            .then((response) => {
                this.getData = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    computed: {
        checkFav() {
            return this.getData.filter(f => f.jour_fav == 1)
        }
    },
    methods: {
        deleteBlogOne(id, index) {
            console.log(this.getData[index])
            const result = confirm(
                `Are you sure you want to delete \'${this.getData[index].jour_title}\'`
            );
            if (result) {
                axios
                    .delete(`/memoes/${id}`)
                    .then((response) => {
                        location.reload()
                    })
                    .catch((error) => {
                        alert(error.response.data.message);
                    });
            }
        },
        deleteBlog(id, index) {
            console.log(this.getData[index])
            const result = confirm(
                `Are you sure you want to delete \'${this.getData[index].jour_title}\'`
            );
            if (result) {
                axios
                    .delete(`/memoes/${id}`)
                    .then((response) => {
                        location.reload()
                    })
                    .catch((error) => {
                        alert(error.response.data.message);
                    });
            }
        },
        imagePath(file_path) {
            if (file_path) {
                return "http://localhost:3000/" + file_path;
            } else {
                return "https://images.unsplash.com/photo-1684216116726-a6d0cea8e93f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80";
            }
        },
    }

}
</script>
