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

        <!-- detail -->
        <div class="grow flex flex-col justify-start items-center">
            <h1 class="text-2xl font-medium mt-10">Detail</h1>
            <div class="w-4/5 h-screen p-5 pt-10">
                <div class="flex flex-col justify-center items-center pt-3">
                    <div class='relative w-[50vw] border-2 border-[#513F3F]  rounded-md p-4 bg-white'>
                        <div v-if="user" class="absolute top-1 right-1">
                            <button
                                class=" text-[1.1vw] h-3/4 p-2 px-3 bg-green rounded-md hover:text-white">
                                <router-link :to="{ name: 'report' }">Report</router-link></button>
                        </div>
                        <div>
                            <img :src="imagePath(blog.image_file)"
                                class="w-1/2 mx-auto mb-4" alt="">

                        </div>

                        <div>
                            <h1 class="text-xl">{{ blog.jour_title }}

                            </h1>
                            <hr class="w-1/2 h-[2px] border-none bg-gray-400 mb-6">

                            <div class="grid grid-cols-2 mt-3">
                                <h1>STREET ADDESS :
                                    <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                        <span>
                                            {{ blog.street_address }}
                                        </span>
                                    </p>
                                </h1>
                                <h1>COUNTRY : <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                        {{ blog.country }}</p>
                                </h1>

                                <h1 class="mt-2">PROVINCE :
                                    <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                        <span>
                                            {{ blog.state_province }}
                                        </span>
                                    </p>
                                </h1>
                                <h1 class="mt-2">CITY :
                                    <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                        <span>
                                            {{ blog.city }}
                                        </span>
                                    </p>
                                </h1>
                            </div>
                            <hr class="mt-3">
                            <div class="grid grid-cols-2 mt-3">
                                <h1>NUMBER OF PEOPLE : <p
                                        class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">{{
                                            blog.co_traveller }}</p>
                                </h1>
                                <h1>PRICE : <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">{{
                                    blog.total_price }}</p>
                                </h1>
                            </div>
                            <hr class="mt-3">
                            <div class="grid grid-cols-2 mt-3">
                                <h1>START TIME :
                                    <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                        <span>
                                            {{ blog.date_s }}
                                        </span>
                                    </p>
                                </h1>
                                <h1>END TIME :
                                    <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                        <span>
                                            {{ blog.date_e }}
                                        </span>
                                    </p>
                                </h1>
                            </div>
                            <hr class="mt-3">
                            <div class="mt-3">
                                <h1>INTRODUCTORY DESCRIPTION :
                                    <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                        <span>
                                            -
                                        </span>

                                    </p>
                                </h1>
                            </div>
                        </div>
                        <!-- </template> -->
                        <button
                            class="float-right m-1 text-[1.1vw] mt-3 h-3/4 p-2 px-3 bg-green rounded-md hover:text-white"><router-link
                                :to="{ name: '' }">Next</router-link></button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios.js'
export default {
    name: 'list',
    props: ['user'],
    data() {
        return {
            getData: [],
            blog: {}
        }
    },
    mounted() {
        this.getBlogDetail(this.$route.params.id);
    },
    methods: {
        getBlogDetail(blogId) {
            axios
                .get(`/memoes/${blogId}`)
                .then((response) => {
                    // console.log(response.data)
                    this.blog = response.data;
                    // console.log(this.blog)
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
        },
        imagePath(file_path) {
            if (file_path) {
                return "http://localhost:3000/" + file_path;
            } else {
                return "https://images.unsplash.com/photo-1684216116726-a6d0cea8e93f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80";
            }
        },
    },

}
</script>