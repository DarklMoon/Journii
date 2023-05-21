<template>
    <section class="back flex justify-center items-center w-full h-full relative">
        <div
            class="form-box flex backdrop-blur justify-center items-center relative h-450 bg-transparent border-2 border-neutral-300 rounded-2xl">
            <div class="form-value p-10 text-white">
                <form action="">
                    <h2 class="text-center text-4xl">Sign Up</h2>
                    <div class="flex relative pt-6 gap-4">
                        <div class="flex flex-col">
                            <input class="h-50 bg-transparent border-b-2 border-b-white pb-1" type="text"
                                :class="{ 'border-b-2 border-b-rose-600': v$.firstname.$error }"
                                v-model="v$.firstname.$model" placeholder="Firstname">
                            <template v-if="v$.firstname.$error">
                                <p class="text-rose-600" v-for="error of v$.firstname.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </p>
                            </template>
                        </div>
                        <div class="flex flex-col">
                            <input class="h-50 bg-transparent border-b-2 border-b-white pb-1" type="text"
                                :class="{ 'border-b-2 border-b-rose-600': v$.lastname.$error }" v-model="v$.lastname.$model"
                                placeholder="Lastname">
                            <template v-if="v$.lastname.$error">
                                <p class="text-rose-600" v-for="error of v$.lastname.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </p>
                            </template>
                        </div>

                    </div>
                    <div class=" relative mx-30 w-310 pt-6 ">
                        <ion-icon class="absolute right-0 " name="mail-outline"></ion-icon>
                        <input class="border-b-2 border-b-white pb-1 w-full h-50 bg-transparent" type="lastname"
                            :class="{ 'border-b-2 border-b-rose-600': v$.email.$error }" v-model="v$.email.$model"
                            placeholder="Email">
                        <template v-if="v$.email.$error">
                            <p class="text-rose-600" v-for="error of v$.email.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </template>
                    </div>
                    <div class="relative mx-30 w-310 pt-6">
                        <ion-icon class="absolute right-0" name="person-outline"></ion-icon>
                        <input class="border-b-2 border-b-white pb-1 w-full h-50 bg-transparent " type="text"
                            :class="{ 'border-b-2 border-b-rose-600': v$.username.$error }" v-model="v$.username.$model"
                            placeholder="Username">
                        <template v-if="v$.username.$error">
                            <p class="text-rose-600" v-for="error of v$.username.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </template>
                    </div>
                    <div class="relative mx-30 w-310 pt-6">
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
                    <div class="relative mx-30 w-310 pt-6">
                        <ion-icon class="absolute right-0" name="lock-closed-outline"></ion-icon>
                        <input class="w-full h-50 bg-transparent border-b-2 border-b-white pb-1" type="password"
                            :class="{ 'border-b-2 border-b-rose-600': v$.confirm_password.$error }"
                            v-model="v$.confirm_password.$model" placeholder="Confirm Password">
                        <template v-if="v$.confirm_password.$error">
                            <p class="text-rose-600" v-for="error of v$.confirm_password.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </template>
                    </div>
                    <div class="gender pt-6 ">
                        <label for="" class="">Gender</label><br>
                        <input class="" type="radio" value="female" v-model="gender">
                        <label for="" class="pl-1 pr-5">Female</label>
                        <input class="" type="radio" value="male" v-model="gender">
                        <label for="" class="pl-1">Male</label>
                    </div>
                    <button type="button"
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
import { IonIcon } from '@ionic/vue'
import axios from '@/plugins/axios.js'
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'

function complexPassword(value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
}

export default {
    name: 'Signup',
    components: { IonIcon },
    setup() {
        return { v$: useVuelidate() };
    },
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
    validations() {
        return {
            firstname: {
                required: required,
                maxLength: maxLength(150)
            },
            lastname: {
                required: required,
                maxLength: maxLength(150)
            },
            username: {
                required: required,
                minLength: minLength(5),
                maxLength: maxLength(20)
            },
            email: {
                required,
                email
            },
            password: {
                required: required,
                minLength: minLength(8),
                complex: complexPassword,
            },
            confirm_password: {
                sameAsPassword: helpers.withMessage('Password must match', sameAs(this.password)),
            },
            gender: {
                required
            }
        }
    },
    methods: {
        signup() {
            this.v$.$touch();
            if (!this.v$.$invalid) {
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
    },

}
</script>