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
                        <div class=" mb-5">
                            <select name="" id="" class="input-memoAdd w-full" v-model="v$.selected.$model"
                                :class="{ 'border-b-2 border-rose-600': v$.selected.$error }">
                                <option disabled selected value="">Type of Report</option>
                                <option value="Spam">Spam</option>
                                <option value="Fake Information">Fake Information</option>
                                <option value="Abusive Content">Abusive Content</option>
                                <option value="Other">Other</option>
                            </select><br>
                            <template v-if="v$.selected.$error">
                                <p class="text-rose-600" v-for="error of v$.selected.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </p>
                            </template>
                        </div>

                        <h1 class="text-xl" for="">Description</h1>
                        <textarea name="" id="" v-model="description"
                            class="block mt-1 p-2 text-lg border-2 border-gray-400 rounded-md w-full" rows="8"></textarea>
                        <div class="text-center mt-5">
                            <button @click="$router.go(-1)"
                                class=" text-[1.1vw] h-3/4 p-2 px-3 bg-green rounded-md hover:text-white mr-6">
                                Cancel
                            </button>
                            <button @click="submit()"
                                class="text-[1.1vw] h-3/4 p-2 px-3 bg-green rounded-md hover:text-white">
                                Submit </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios.js'
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'

export default {
    name: 'report',
    props: ['user'],
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            selected: '',
            description: '',
        }
    },
    created(){
         console.log(this.$route.params.id)
        //  axios.get(`/reports/${this.$route.params.id}`)
        // .then((response) => {
        //     this.getData = response.data.data
        // }).catch((error) => {
        //   console.log(error.response.data.message)
        // });
        // console.log(this.getData)
    },  
    validations() {
        return {
            selected: {
                required
            }
        }
    },
    methods: {
        submit() {
            this.v$.$touch();
            if (!this.v$.$invalid) {
                let data = {
                    selected: this.selected,
                    description: this.description,
                }
                axios
                    .post("/reports", data)
                    .then((res) => {
                        alert("Report Success");
                        this.$router.push({
                            name: 'list'
                        })
                    })
                    .catch((err) => {
                        alert(err)
                    });
            }
        }
    },

}
</script>