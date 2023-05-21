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
                <div class="card bg-white border-0 rounded-md " v-for="value in keyword" :key="value">
                    <img src="https://images.unsplash.com/photo-1538640206218-edd12e7624fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="pic" class="rounded-t-md" style="width:100%">
                    <div class="card-data p-3">
                        <h4><b>{{ value.jour_title }}</b></h4>
                        <p>{{ value.country }}, {{ value.state_province }}, {{ value.city }}</p>
                        <p>{{ value.date_s }} - {{ value.date_e }}</p>
                        <hr>
                        <h4><b>Price: {{ value.total_price }}</b></h4>
                        <!-- <ion-icon name="star" class="mt-3 float-right"></ion-icon> -->
                        <p>Favorite: {{ value.jour_like }}</p>
                        <router-link class="readmore" :to="`/memo/detail/${value.jour_id}`">Read more...</router-link>
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
            country_select: "",
            getData: [],
            word: '',
        }
    },

    methods: {

    },
    created() {
        // ทำครั้งแรกที่appสร้าง
        // fetch("/src/assets/data/memo.json").then((results) =>
        //     results.json()
        // ).then((value) => {
        //     this.getData = value;
        // })
        // fetchมาแล้วได้เป็นpromise เอาไปthenเพื่อให้เอาpromise resultมาแปลงเป็นjsonแล้วมันก็เอาที่returnจากอันก่อนหน้า มาthenต่อว่าให้getdata = valueที่ได้

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
    computed: {
        // countryFilter() {
        //     return this.getData.filter(f => f.country == this.country_select || this.country_select == '')
        //     // เอาข้อมูลในgetDataมาfilter ดูว่าตัวที่filมาทีละตัวมันตรงกับตัวที่เราselectไหม ถ้าตรงมันจะreturn arrayใหม่ออกไป หรือถ้าที่เลือกเป็นสตริงเปล่าก็จะreturn arrayทั้งหมด
        // },
        keyword() {
            return this.getData.filter(f =>
                f.jour_title.toLowerCase().includes(this.word.toLowerCase())  || f.country.toLowerCase().includes(this.word.toLowerCase()) || f.city.toLowerCase().includes(this.word.toLowerCase()) || this.word == '')
        }
    }
}
</script>