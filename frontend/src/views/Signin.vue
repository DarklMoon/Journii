<template>
    <section class="back flex justify-center items-center w-full h-full relative">
        <div
            class="form-box flex backdrop-blur justify-center items-center relative w-400 h-450 bg-transparent border-2 border-neutral-300 rounded-2xl">
            <div class="form-value p-10 text-white">
                <form action="">
                    <h2 class="text-center text-4xl">Log in</h2>
                    <div class=" relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="person-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent border-b-2 border-b-white pb-1" type="text"
                            placeholder="Username" :class="{ 'border-b-2 border-b-rose-600': v$.username.$error }"
                            v-model="v$.username.$model">
                        <template v-if="v$.username.$error">
                            <p class="text-rose-600" v-for="error of v$.username.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </template>
                    </div>
                    <div class=" relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="lock-closed-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent border-b-2 border-b-white pb-1" type="password"
                            :class="{ 'border-b-2 border-b-rose-600': v$.password.$error }" v-model="v$.password.$model"
                            placeholder="Password">
                        <template v-if="v$.password.$error">
                            <p class="text-rose-600" v-for="error of v$.password.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </template>
                    </div>
                    <button type="button"
                        class="mt-5 mb-2 rounded-2xl w-full h-8 text-black bg-white transition duration-100 ease-in-out hover:bg-neutral-300"
                        @click="Login()">Log
                        in</button>
                    <div class="register">
                        <p>Don't have an account? <router-link :to="{ name: 'signup' }" class="hover:text-neutral-300">Sign
                                Up</router-link>
                        </p>
                    </div>
                </form>

            </div>

        </div>
    </section>
</template>

<script>
import { IonIcon } from '@ionic/vue'
import axios from '@/plugins/axios.js'
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'

export default {
    name: 'Signin',
    components: { IonIcon },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            username: '',
            password: ''
        }

    },
    validations() {
        return {
            username: {
                required: required,
                minLength: minLength(5),
                maxLength: maxLength(20)
            },
            password: {
                required: required,
            },
        }
    },
    methods: {
        Login() {
            this.v$.$touch();
            if (!this.v$.$invalid) {
                const data = {
                    username: this.username,
                    password: this.password

                }

                axios.post('/user/login', data)
                    .then(res => {
                        const token = res.data.token
                        localStorage.setItem('token', token)
                        this.$emit('auth-change')
                        this.$router.push({
                            name: 'account'
                        })
                        console.log('test')
                    })
                    .catch(error => {
                        // this.error = error.response.data
                        console.log(error.response.data)
                    })
            }
        }
    }
}
</script>