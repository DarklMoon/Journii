<template>
    <section class="back flex justify-center items-center w-full h-full relative">
        <div
            class="form-box flex backdrop-blur justify-center items-center relative h-450 bg-transparent border-2 border-neutral-300 rounded-2xl">
            <div class="form-value p-10 text-white">
                <form action="">
                    <h2 class="text-center text-4xl">Sign Up</h2>
                    <div class="flex relative w-1/2 pt-6 ">
                        <input class="h-50 bg-transparent inputbox pb-1 pr-6 mr-10" type="text" v-model="new_user.firstname"
                            placeholder="Firstname" required>
                        <input class="h-50 bg-transparent inputbox " type="text" v-model="new_user.lastname"
                            placeholder="Lastname" required>
                    </div>
                    <!-- <div class="inputbox relative mx-30 w-1/2 py-3"> -->
                    <!-- </div> -->
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0 " name="mail-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="email" v-model="new_user.email" placeholder="Email"
                            required>
                    </div>
                    <div class="inputbox relative mx-30 w-310 pt-6  pb-1">
                        <ion-icon class="absolute right-0" name="person-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent " type="text" v-model="new_user.username"
                            placeholder="Username" required>
                    </div>
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="lock-closed-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="password" v-model="new_user.password"
                            placeholder="Password" required>
                    </div>
                    <div class="inputbox relative mx-30 w-310 pt-6 pb-1">
                        <ion-icon class="absolute right-0" name="lock-closed-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent" type="password" v-model="new_user.confirm_password"
                            placeholder="Confirm Password" required>
                    </div>
                    <div class="gender pt-6 ">
                        <label for="" class="">Gender</label><br>
                        <input class="checked:bg-gray-300" type="radio" value="female" v-model="new_user.gender" required>
                        <label for="" class="pl-1 pr-5">Female</label>
                        <input class="checked:bg-gray-300" type="radio" value="male" v-model="new_user.gender" required>
                        <label for="" class="pl-1">Male</label>
                    </div>
                    <!-- <div class="forget text-center">
                            <a href="#">Forget Password</a>
                        </div> -->
                    <button type="submit" class="mt-5 mb-2 rounded-2xl w-full h-8 text-black bg-white transition duration-100 ease-in-out hover:bg-neutral-300" @click="signup()">Sign Up</button>
                    <div class="register text-center">
                        <p>Already have an account? <router-link :to="{ name: 'signin' }" class="hover:text-neutral-300">Log in</router-link></p>
                    </div>
                </form>

            </div>

        </div>
    </section>
</template>

<script>
// import axios from './plugins/axios.js'
export default {
    name: 'Signup',
    data() {
        return {
            new_user: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                confirm_password: '',
                gender: '',
            }
        }
    },
    methods: {
        signup() {
            // let arr_user = JSON.parse(localStorage.getItem('User'))
            // arr_user.push(this.new_user)
            // localStorage.setItem('User', JSON.stringify(arr_user))
            let data = {
                username: this.username,
                password: this.password,
                confirm_password: this.confirm_password,
                email: this.email,
                gender: this.mobile,
                first_name: this.first_name,
                last_name: this.last_name,
            }
            axios
                .post("/user/signup", data)
                .then((res) => {
                    alert("Sign up Success");
                })
                .catch((err) => {
                    alert(err.response.data.details.message)
                });
        }
    }
}
</script>