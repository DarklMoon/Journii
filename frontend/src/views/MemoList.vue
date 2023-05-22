<template>
    <!---------------------- search ---------------------------------- -->
    <!-- <div class="relative"> -->
    <div>
        <div class="box-top  bg-brown text-white text-center">
            <div class="justify-center relative">
                <h1 class="text-4xl">Journey logs search</h1>
                <router-link class="add-jour-btn" :to="{ name: 'addJourni_1' }">Add your journey</router-link>

            </div>
            <h3 class="pt-2">find your interesting journey logs here !</h3>
        </div>
        <!---------------------- all filters ---------------------------------- -->
        <div class="gap-6 grid grid-cols-4 mt-4 px-3">
            <input v-model="word" class="bg-gray-100 shadow-md rounded py-1.5 px-6 mx-5 text-center"
                placeholder="title or keyword">
            <select v-model="country_select" class="bg-gray-100 shadow-md rounded py-1.5 px-6 mx-5 text-center">
                <option value="">All</option>
                <option :value="value.country" v-for="value in getData" :key="value">{{ value.country }}</option>
            </select>
            <!-- <select v-model="country_select" class="bg-gray-100 shadow-md rounded py-1.5 px-6 mx-5 text-center">
                <option value="">All</option>
                <option :value="value.country" v-for="value in getData" :key="value">{{ value.country }}</option>
            </select>
            <select v-model="country_select" class="bg-gray-100 shadow-md rounded py-1.5 px-6 mx-5 text-center">
                <option value="">All</option>
                <option :value="value.country" v-for="value in getData" :key="value">{{ value.country }}</option>
            </select>
            <select v-model="country_select" class="bg-gray-100 shadow-md rounded py-1.5 px-6 mx-5 text-center">
                <option value="">All</option>
                <option :value="value.country" v-for="value in getData" :key="value">{{ value.country }}</option>
            </select> -->
        </div>
        <!---------------------- country list---------------------------------- -->
        <div class="justify-center ">
            <div class="gap-8 grid grid-cols-4 mt-4 px-8 mb-5">
                <div class="card flex flex-col  bg-white border-0 rounded-md " v-for="value, index in keyword" :key="value">
                    <img :src="imagePath(value.image_file)" alt="pic" class="rounded-t-md" style="width:100%">
                    <div class="card-data flex flex-col grow p-3">
                        <h4><b>{{ value.jour_title }}</b></h4>
                        <p>{{ value.country }}, {{ value.state_province }}, {{ value.city }}</p>
                        <p>{{ value.date_s }} - {{ value.date_e }}</p>
                        <hr>
                        <h4><b>$ {{ value.total_price }}</b></h4>
                        <p>Favorite: {{ value.jour_like }}</p>
                        <!-- <ion-icon  name="heart-outline"></ion-icon>
                        <ion-icon  name="heart"></ion-icon> -->
                        <router-link class="readmore hover:text-amber-800" :to="`/memo/detail/${value.jour_id}`">Read
                            more...</router-link>
                    </div>
                    <footer v-if="user && user.role == 'Admin'" class="card-footer">
                        <!-- <router-link class="card-footer-item" :to="`/blogs/detail/${blog.id}`">Read more...</router-link> -->
                        <a class="card-footer flex text-center">
                            <div
                                class="w-1/2 border-t border-r border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-600 hover:bg-slate-100">
                                <router-link :to="`/memo/edit/${value.jour_id}`">Edit</router-link>
                            </div>
                            <div @click="deleteBlog(value.jour_id, index)"
                                class="w-1/2 border-t border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-600 hover:bg-slate-100">
                                Delete
                            </div>
                        </a>
                    </footer>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { IonIcon } from '@ionic/vue'
import axios from '@/plugins/axios.js'
export default {
    name: 'list',
    props: ['user'],
    components: { IonIcon },
    data() {
        return {
            country_select: "",
            getData: [],
            word: '',
        }
    },
    created() {
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
    methods: {
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
    },

    computed: {
        // countryFilter() {
        //     return this.getData.filter(f => f.country == this.country_select || this.country_select == '')
        //     // เอาข้อมูลในgetDataมาfilter ดูว่าตัวที่filมาทีละตัวมันตรงกับตัวที่เราselectไหม ถ้าตรงมันจะreturn arrayใหม่ออกไป หรือถ้าที่เลือกเป็นสตริงเปล่าก็จะreturn arrayทั้งหมด
        // },
        keyword() {
            return this.getData.filter(f =>
                f.jour_title.toLowerCase().includes(this.word.toLowerCase()) || f.country.toLowerCase().includes(this.word.toLowerCase()) || f.city.toLowerCase().includes(this.word.toLowerCase()) || this.word == '')
        }
    }
}
</script>