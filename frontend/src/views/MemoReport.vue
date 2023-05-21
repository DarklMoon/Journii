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
            <h1 class="text-2xl font-medium mt-10">Report</h1>
            <div class="w-4/5 h-screen p-5 pt-10">
                <div class="flex flex-col justify-center items-center pt-3">
                    <div class='relative w-[50vw] border-2 border-[#513F3F] rounded-md p-4 bg-white'>
                        <select name="" id="" class="input-memoAdd w-full mb-5">
                            <option disabled selected value="">Type of Report</option>
                            <option value="">Spam</option>
                            <option value="">Fake Information</option>
                        </select><br>
                        <h1 class="text-xl" for="">Description</h1>
                        <textarea name="" id="" class="block mt-1 p-2 text-lg border-2 border-gray-400 rounded-md w-full"
                            rows="8"></textarea>
                        <div class="text-center mt-5">
                            <button @click="$router.go(-1)" class=" text-[1.1vw] h-3/4 p-2 px-3 bg-green rounded-md hover:text-white mr-6">
                                Cancel
                            </button>
                            <button class=" text-[1.1vw] h-3/4 p-2 px-3 bg-green rounded-md hover:text-white">
                                <router-link :to="{ name: 'report' }">Submit</router-link>
                            </button>
                        </div>

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
    },

}
</script>