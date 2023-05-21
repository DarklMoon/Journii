<template>
    <section class="back flex justify-center items-center w-full h-full relative">
        <div
            class="form-box flex backdrop-blur justify-center items-center relative h-450 bg-transparent border-2 border-neutral-300 rounded-2xl">
            <div class="form-value p-10 text-white">
                <form action="">
                    <h2 class="text-center text-4xl">Sign Up</h2>
                    <div class="flex relative w-1/2 pt-6 ">
                        <input class="h-50 bg-transparent inputbox pb-1 pr-6 mr-10" type="text" v-model="firstname"
                            placeholder="Firstname" required>
                        <input class="h-50 bg-transparent inputbox " type="text" v-model="lastname"
                            placeholder="Lastname" required>
                    </div>
                    <!-- <div class="inputbox relative mx-30 w-1/2 py-3"> -->
                    <!-- </div> -->
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0 " name="mail-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="email" v-model="email" placeholder="Email"
                            required>
                    </div>
                    <div class="inputbox relative mx-30 w-310 pt-6  pb-1">
                        <ion-icon class="absolute right-0" name="person-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent " type="text" v-model="username"
                            placeholder="Username" required>
                    </div>
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="lock-closed-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="password" v-model="password"
                            placeholder="Password" required>
                    </div>
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="lock-closed-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="password" v-model="confirm_password"
                            placeholder="Confirm Password" required>
                    </div>
                    <div class="gender pt-6 ">
                        <label for="" class="">Gender</label><br>
                        <input class="" type="radio" value="female" v-model="gender" required>
                        <label for="" class="pl-1 pr-5">Female</label>
                        <input class="" type="radio" value="male" v-model="gender" required>
                        <label for="" class="pl-1">Male</label>
                    </div>
                    <!-- <div class="forget text-center">
                            <a href="#">Forget Password</a>
                        </div> -->
                    <button type="submit"
                        class="mt-5 mb-2 rounded-2xl w-full h-8 text-black bg-white transition duration-100 ease-in-out hover:bg-neutral-300"
                        @click="signup()">Sign Up</button>
                    <div class="register text-center">
                        <p>Already have an account? <router-link :to="{ name: 'signin' }" class="hover:text-neutral-300">Log
                                in</router-link></p>
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
    name: 'Signup',
    components: {IonIcon},
    data() {
        return {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            gender: '',
        }
    },
    methods: {
        signup() {
            let data = {
                first_name: this.firstname,
                last_name: this.lastname,
                username: this.username,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password,
                gender: this.gender,
            }
            // console.log(data)
            axios
                .post("/user/signup", data)
                .then((res) => {
                    // console.log(data)
                    alert("Sign up Success");
                    this.$router.push({
                        name: 'signin'
                    })
                })
                .catch((err) => {
                    // console.log(data)
                    alert(err)
                });
        }
    }
}
</script>