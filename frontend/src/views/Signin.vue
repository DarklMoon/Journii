<template>
    <section class="back flex justify-center items-center w-full h-full relative">
        <div
            class="form-box flex backdrop-blur justify-center items-center relative w-400 h-450 bg-transparent border-2 border-neutral-300 rounded-2xl">
            <div class="form-value p-10 text-white">
                <form action="">
                    <h2 class="text-center text-4xl">Log in</h2>
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="person-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="text" placeholder="Username" v-model='username' required>
                    </div>
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="lock-closed-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="password" placeholder="Password" v-model='password'
                            required>
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
import {IonIcon} from '@ionic/vue'
import axios from '@/plugins/axios.js'
export default {
    name: 'Signin',
    components: {IonIcon},
    data() {
        return {
            username: '',
            password: ''
        }

    },
    methods: {
        Login() {
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
</script>