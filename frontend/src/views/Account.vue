<template>
    <div class="relative">
        <div class="relative">
            <h1 class="text-4xl text-center my-7">Aom's Journey</h1>
            <button class="add-jour-btn">Sort&Filter</button>
        </div>
        <div class="fav">
            <h2 class="text-2xl ml-8 mb-8">Favourite (1)</h2>
            <div class="justify-center ">
                <div class="gap-8 grid grid-cols-4 mt-4 px-8 mb-16">
                    <div class="card flex flex-col justify-between bg-white border-0 rounded-md " v-for="value in getData" :key="value">
                        <a href="" onclick="alert('test')">
                            <!-- <img :src="value.image" alt="pic" class="rounded-t-md" style="width:100%"> -->
                            <div class="card-data p-3">
                                <h4><b>{{ value.jour_title }}</b></h4>
                                <h4>{{ value.jour_script }}</h4>
                                <p>{{ value.country }}, {{ value.state_province }}, {{ value.city }}</p>
                                <p>{{ value.date_s }} - {{ value.date_e }}</p>
                                <hr>
                                <h4><b>Price: {{ value.total_price }}</b></h4>
                                <!-- <ion-icon name="heart"></ion-icon> -->
                            </div>
                        </a>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="all">
            <h2 class="text-2xl ml-8 mb-8">All (8)</h2>
            <div class="justify-center ">
                <div class="gap-8 grid grid-cols-4 mt-4 px-8  mb-5">
                    <div class="card flex flex-col justify-between bg-white border-0 rounded-md hover:bg-slate-100" v-for="value in getData" :key="value">
                        <a href="" onclick="alert('test')">
                            <!-- <img :src="value.image" alt="pic" class="rounded-t-md" style="width:100%"> -->
                            <div class="card-data p-3">
                                <h4><b>{{ value.jour_title }}</b></h4>
                                <h4>{{ value.jour_script }}</h4>
                                <p>{{ value.country }}, {{ value.state_province }}, {{ value.city }}</p>
                                <p>{{ value.date_s }} - {{ value.date_e }}</p>
                                <hr>
                                <h4><b>Price: {{ value.total_price }}</b></h4>
                                <!-- <ion-icon name="heart-outline"></ion-icon> -->
                            </div>
                        </a>
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
    name: 'Account',
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
}
</script>
