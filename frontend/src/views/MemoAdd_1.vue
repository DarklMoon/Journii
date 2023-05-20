<template>
    <div class="flex overflow-auto" style="background: rgb(227,232,233);
background: linear-gradient(90deg, rgba(227,232,233,1) 0%, rgba(227,232,233,1) 75%, rgba(81,63,63,1) 75%);">
        <!-- Form-1 -->
        <div class="grow flex flex-col justify-start items-center">
            <h1 class="text-2xl font-medium mt-10">การบันทึกเบื้องต้น</h1>
            <form @submit.prevent="submit" class="w-4/5 h-screen p-5 pt-10">
                <div class="relative">
                    <span class="absolute bottom-11 text-sm text-red-400">{{form1st.error.e_title}}</span>
                    <input v-if="checkEditForm.title == false || showForm1st.length == 0" type="text" v-model="form1st.title" @input="checkTitle()" 
                    :class="{'border-2 border-red-500' : form1st.error.e_title}" class="text-2xl p-1 rounded-md truncate focus:outline-none" placeholder="Untitled" size="30" >
                    <input v-else-if="checkEditForm.title == true"  @focus="onFocus($event, 'title')" type="text" :value="showForm1st[0].title" class="text-2xl p-1 rounded-md truncate focus:outline-none" size="30" >
                    <hr>
                </div>
                <div class="grid grid-rows-2 grid-cols-2">
                    <div class="pt-5">
                        <p>STREET ADDRESS</p>
                        <input v-if="checkEditForm.st_address == false || showForm1st.length == 0" type="text" v-model="form1st.st_address" class="input-memoAdd" size="30" placeholder="street address">
                        <input v-else-if="checkEditForm.st_address == true"  @focus="onFocus($event, 'st_address')" type="text" :value="showForm1st[0].st_address" class="input-memoAdd" size="30" >
                    </div>
                    <div class="pt-5">
                        <div class="relative">
                            <p>COUNTRY<span v-show="form1st.country == '' " class="text-md text-red-400">*</span></p>
                            <select @change="checkCountry()" :class="{'border-2 border-red-500' : form1st.error.e_country}" name="country" v-model="form1st.country" class="input-memoAdd" >
                                <option disabled selected value="" v-if="showForm1st.length == 0">Please select country</option>
                                <option disabled selected value="" v-else>{{showForm1st[0].country}}</option>
                                <option v-for="(item, index) in form1st.country_list" :key="index" :value="item">{{item}}</option>
                            </select>
                            <span class="relative bottom-0 text-sm text-red-400">{{form1st.error.e_country}}</span>
                        </div>

                    </div>
                    <div class="pt-5">
                        <p>PROVINCE</p>
                        <input v-if="checkEditForm.province == false || showForm1st.length == 0" type="text" v-model="form1st.province" class="input-memoAdd" size="30" placeholder="province">
                        <input v-else-if="checkEditForm.province == true"  @focus="onFocus($event, 'province')" type="text" :value="showForm1st[0].province" class="input-memoAdd" size="30" >
                    </div>
                    <div class="pt-5">
                        <p>CITY</p>
                        <input v-if="checkEditForm.city == false || showForm1st.length == 0" type="text" v-model="form1st.city" class="input-memoAdd" size="30" placeholder="city">
                        <input v-else-if="checkEditForm.city == true"  @focus="onFocus($event, 'city')" type="text" :value="showForm1st[0].city" class="input-memoAdd" size="30" >
                    </div>
                </div>
                <hr class="mt-5">
                <div class="grid grid-cols-2">                   
                        <div class="pt-5">
                            <div class="relative">
                                <p>NUMBER OF PEOPLE<span v-show="form1st.co_traveller == '' " class="text-md text-red-400">*</span></p>
                                <input v-if="checkEditForm.co_traveller == false || showForm1st.length == 0" type="number" @input="checkPeople()" :class="{'border-2 border-red-500' : form1st.error.e_people}" v-model="form1st.co_traveller" class="input-memoAdd" placeholder="1">
                                <input v-else-if="checkEditForm.co_traveller == true"  @focus="onFocus($event, 'co_traveller')" type="text" :value="showForm1st[0].co_traveller" class="input-memoAdd" size="30" >
                                <br>
                                <span class="relative bottom-0 text-sm text-red-400">{{form1st.error.e_people}}</span>
                            </div>
                        </div>
                    <div class="pt-5">
                        <div class="relative">
                            <p>PRICE<span v-show="form1st.price == '' " class="text-md text-red-400">*</span></p>
                            <input v-if="checkEditForm.price == false || showForm1st.length == 0" type="number" @input="checkPrice()" :class="{'border-2 border-red-500' : form1st.error.e_price}" v-model="form1st.price" class="input-memoAdd" size="30" placeholder="0.00">
                            <input v-else-if="checkEditForm.price == true"  @focus="onFocus($event, 'price')" type="text" :value="showForm1st[0].price" class="input-memoAdd" size="30" >
                            <span class="text-xl text-gray-400">$</span><br>
                            <span class="relative bottom-0 text-sm text-red-400">{{form1st.error.e_price}}</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-5">
                <div class="grid grid-cols-2">
                    <div class="pt-5">
                        <div class="relative">
                            <p>START TIME :</p>
                            <input v-if="checkEditForm.start == false || showForm1st.length == 0" type="date" @change="checkTimeStart()" :class="{'border-2 border-red-500' : form1st.error.e_start}" v-model="form1st.start" class="input-memoAdd" size="30">
                            <input v-else-if="checkEditForm.start == true"  @focus="onFocus($event, 'start')" type="date" :value="showForm1st[0].start" class="input-memoAdd" size="30" >
                            <span class="relative bottom-0 text-sm text-red-400">{{form1st.error.e_start}}</span>
                        </div>
                    </div>
                    <div class="pt-5">
                        <div class="relative">
                            <p>END TIME :</p>
                            <input v-if="checkEditForm.end == false || showForm1st.length == 0" type="date" @change="checkTimeEnd()" :class="{'border-2 border-red-500' : form1st.error.e_end}" v-model="form1st.end" class="input-memoAdd" size="30">
                            <input v-else-if="checkEditForm.end == true"  @focus="onFocus($event, 'end')" type="date" :value="showForm1st[0].end" class="input-memoAdd" size="30" >
                            <span class="relative bottom-0 text-sm text-red-400">{{form1st.error.e_end}}</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-5">
                <div class="pt-5">
                    <div class="relative">
                        <p>IMAGE</p>
                        <input type="file" multiple @change="selectImages" class="input-memoAdd" accept="image/png, image/jpeg, image/webp" placeholder="1">
                        <br>
                    </div>
                </div>
                <hr class="mt-5">
                <div class="pt-5">
                        <p>INTRODUCTORY DESCRIPTION:</p>
                        <textarea v-if="checkEditForm.descript == false || showForm1st.length == 0" type="text" v-model="form1st.descript" class="block mt-1 p-2 text-lg border-2 border-gray-400 rounded-md" cols="60" rows="3.5" placeholder="Introductory Description">
                        </textarea>
                        <textarea v-else-if="checkEditForm.descript == true" @focus="onFocus($event, 'descript')" type="text" :value="showForm1st[0].descript" class="block mt-1 p-2 text-lg border-2 border-gray-400 rounded-md" cols="60" rows="3.5" placeholder="Introductory Description">
                        </textarea>
                </div>
                <hr class="mt-5">
                <div class="flex justify-around">
                    <button class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Save
                    </button>
                    <button @click="nextForm1st()" class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Next
                    </button>
                </div>
            </form>
        </div>
        <!-- List Form Button  -->     
        <div class="flex flex-col justify-center items-center w-1/4 pb-1/2 gap-10">
                <button class="list-form-btn" @click="FirstPageForm('Form_2&3')">
                    <div class="text-white ">บันทึกเบื้องต้น</div>
                </button>

                <button class="list-form-btn" @click="SecondPageForm('From_1stPage')">
                    <div class="text-white">บันทึกลงรายละเอียด</div>
                </button>

                <button class="list-form-btn" @click="ThirdPageForm('From_1stPage')">
                    <div class="text-white">สรุป</div>
                </button>
        </div>
    </div>
</template>

<script setup>
    import Footer from '@/components/Footer.vue'
</script>

<script>
 export default {
  data() {
    return {
      form1st: {
        country_list: [],
        title: "",
        st_address: "",
        country: "",
        province: "",
        city: "",
        start: "",
        end: "",
        co_traveller: "",
        price: "",
        descript: "",
        error: {
          e_title: "",
          e_country: "",
          e_people: "",
          e_price: "",
          e_start: "",
          e_end: "",
        },
        isChange: false,
        isEdit: {
          title: false,
          st_address: false,
          province: false,
          city: false,
          co_traveller: false,
          price: false,
          start: false,
          end: false,
          descript: false,
        },
      },
      data_length: 0,
      data_length_more: 0,
      data_main: [],
      data_more: [],
      images: [], // array of image
      imageErr: false,
    };
  },
  created() {
    let actionWindow =
      window.performance.getEntriesByType("navigation")[0].type;
    let pathNameURL = window.location.pathname;

    const country = fetch("/src/assets/data/country.json").then((results) =>
      results.json()
    );
    country.then((value) => {
      this.form1st.country_list = value.countrys;
    });

    const dataJson = fetch("/src/assets/data/memo.json").then((results) =>
      results.json()
    );
    dataJson.then((value) => {
      this.data_length = value.length;
    });

    if (
      actionWindow == "reload" &&
      pathNameURL.includes("memo/addJourni/first") &&
      this.showForm1st.length != 0
    ) {
      Object.keys(this.form1st.isEdit).forEach((keys) => {
        this.form1st.isEdit[keys] = true;
      });
      localStorage.setItem("isEdit", JSON.stringify(this.form1st.isEdit));
    }
    console.log("Fetch Json File");
  },

  methods: {
    selectImages(event) {
      this.imageErr = false
      this.images = event.target.files;
      const fileSize = 1048576 
      console.log(this.images)
      for (let i = 0; i < this.images.length; i++) {
        console.log(this.images[i].size)
        if(this.images[i].size > fileSize){
          this.deleteSelectImage(i)
          this.imageErr = true
        }
      }
    },
    checkTitle() {
      if (this.form1st.title === "" && this.checkEditForm.title == false) {
        this.form1st.error.e_title = "กรุณากรอกชื่อหัวข้อ";
        return;
      }
      this.form1st.error.e_title = "";
    },
    checkTitle2ND() {
      if (this.form2nd.title === "") {
        this.form2nd.error.e_title = "กรุณากรอกชื่อหัวข้อ";
        return;
      }
      this.form2nd.error.e_title = "";
    },
    checkCountry() {
      if (this.form1st.country === "" && this.showForm1st.length == 0) {
        this.form1st.error.e_country = "กรุณาเลือกประเทศ";
        return;
      }
      this.form1st.error.e_country = "";
    },
    checkPeople() {
      if (
        this.form1st.co_traveller === "" &&
        this.checkEditForm.co_traveller == false
      ) {
        this.form1st.error.e_people = "กรุณาระบุจำนวนคน'";
        return;
      }
      this.form1st.error.e_people = "";
    },
    checkPrice() {
      if (this.form1st.price === "" && this.checkEditForm.price == false) {
        this.form1st.error.e_price = "กรุณาระบุจำนวนค่าใช้จ่าย";
        return;
      }
      this.form1st.error.e_price = "";
    },
    checkTimeStart() {
      const today = new Date();
      const start = new Date(this.form1st.start);
      if (start > today) {
        this.form1st.error.e_start = "ห้ามเป็นวันในอนาคต";
        return;
      }
      this.form1st.error.e_start = "";

      if (this.form1st.start != "" && this.form1st.end == "") {
        this.form1st.error.e_end = "กรุณากรอกวันสิ้นสุดการเดินทาง";
        return;
      }

      if (this.form1st.start > this.form1st.end) {
        this.form1st.error.e_start = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        this.form1st.error.e_end = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        return;
      } else if (this.form1st.start <= this.form1st.end) {
        this.form1st.error.e_start = "";
        this.form1st.error.e_end = "";
      }

      this.form1st.error.e_start = "";
    },
    checkTimeEnd() {
      const today = new Date();
      const end = new Date(this.form1st.end);
      if (end > today) {
        this.form1st.error.e_end = "ห้ามเป็นวันในอนาคต";
        return;
      }
      this.form1st.error.e_end = "";

      if (this.form1st.start == "" && this.form1st.end != "") {
        this.form1st.error.e_start = "กรุณากรอกวันเริ่มต้นการเดินทาง";
        return;
      }

      if (this.form1st.start > this.form1st.end) {
        this.form1st.error.e_start = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        this.form1st.error.e_end = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        return;
      } else if (this.form1st.start <= this.form1st.end) {
        this.form1st.error.e_start = "";
        this.form1st.error.e_end = "";
      }

      this.form1st.error.e_end = "";
    },
    submit() {
      this.checkTitle();
      this.checkCountry();
      this.checkPeople();
      this.checkPrice();
      this.checkTimeStart();
      this.checkTimeEnd();

      if (
        this.form1st.error.e_title != "" ||
        this.form1st.error.e_country != "" ||
        this.form1st.error.e_people != "" ||
        this.form1st.error.e_price != "" ||
        this.form1st.error.e_start != "" ||
        this.form1st.error.e_end != ""
      ) {
        return;
      }
      console.log(this.form1st.isChange);
      console.log(this.form1st.country);
      if (this.data_main.length != 0 && this.form1st.isChange == true) {
        Object.keys(this.form1st.isEdit).forEach((keys) => {
          if (this.form1st.isEdit[keys] == true) {
            this.form1st[keys] = this.showForm1st[0][keys];
          }
        });
        if (
          (this.showForm1st[0].country != "" ||
            this.showForm1st[0].country != this.form1st.country) &&
          this.form1st.country == ""
        ) {
          console.log("In");
          this.form1st.country = this.showForm1st[0].country;
        }

        this.data_main.splice(0, 1);
        this.pushData_main();
      } else if (
        this.showForm1st.length != 0 &&
        this.form1st.isChange == false
      ) {
        if (
          (this.showForm1st[0].country == "" ||
            this.showForm1st[0].country != this.form1st.country) &&
          this.form1st.country != ""
        ) {
          this.showForm1st[0].country = this.form1st.country;
          localStorage.setItem("data", JSON.stringify(this.showForm1st));
        }
        return;
      } else if (this.data_main.length == 0) {
        this.pushData_main();
      }
      this.form1st.isChange = false;
      localStorage.setItem("isEdit", JSON.stringify(this.form1st.isEdit));
    },
    pushData_main() {
      this.data_main.push({
        id: this.data_length + 1,
        username: `Test${this.data_length + 1}`,
        title: this.form1st.title,
        st_address: this.form1st.st_address,
        country: this.form1st.country,
        province: this.form1st.province,
        city: this.form1st.city,
        start: this.form1st.start,
        end: this.form1st.end,
        co_traveller: this.form1st.co_traveller,
        price: this.form1st.price,
        descript: this.form1st.descript,
        image: "",
        favorite: 0,
      });
      Object.keys(this.form1st.isEdit).forEach((keys) => {
        this.form1st.isEdit[keys] = true;
      });
      localStorage.setItem("data", JSON.stringify(this.data_main));
    },
    nextForm1st() {
      this.submit();
      if (
        this.form1st.error.e_title != "" ||
        this.form1st.error.e_country != "" ||
        this.form1st.error.e_people != "" ||
        this.form1st.error.e_price != "" ||
        this.form1st.error.e_start != "" ||
        this.form1st.error.e_end != ""
      ) {
        return;
      }
      this.$router.push({ name: "addJourni_2" });
    },
    
    FirstPageForm(status) {
      this.$router.push({ name: "addJourni_1" });

      console.log("Hello WOrld");
      console.log(this.showForm1st.length);
      if (status == "Form_2&3" && this.showForm1st.length == 0) {
        alert("Please fill out the form!");
      } else {
        // document.getElementById('title').defaultValue = 'hello'
        // console.log(this.data_main)
      }
    },
    SecondPageForm(status) {
      console.log(this.showForm1st.length);
      if (status == "From_1stPage" && this.showForm1st.length == 0) {
        alert("Please click the 'Next' button below the form to save!");
        return;
      }
      this.$router.push({ name: "addJourni_2" });
    },
    ThirdPageForm(status) {
      if (status == "From_1stPage" && this.showForm1st.length == 0) {
        alert("Please click the 'Next' button below the form to save!");
        return;
      }
      this.$router.push({ name: "addJourni_3" });
    },
    submitAll() {
      if (confirm("Do you want to submit it?")) {
        alert("Data is added successfully!");
        localStorage.removeItem("data");
        localStorage.removeItem("data_more");
        localStorage.removeItem("isEdit");
        location.replace("./memoList.html");
      }
    },
    onFocus(e, msg) {
      this.form1st.isChange = true;

      if (e.type == "focus") {
        if (msg == "start") {
          this.form1st.end = this.showForm1st[0].end;
          this.form1st.isEdit.end = false;
        } else if (msg == "end") {
          this.form1st.start = this.showForm1st[0].start;
          this.form1st.isEdit.start = false;
        }
        this.form1st[msg] = this.showForm1st[0][msg];
        this.form1st.isEdit[msg] = false;
        localStorage.setItem("isEdit", JSON.stringify(this.form1st.isEdit));
      }
    },
  },
  computed: {
    showForm1st() {
      let getItem = JSON.parse(localStorage.getItem("data"));
      if (getItem != null) {
        this.data_main = getItem;
      }
      return this.data_main;
    },
    showData2nd() {
      let getItem = JSON.parse(localStorage.getItem("data_more"));
      if (getItem != null) {
        this.data_more = getItem;
      }
      console.log(this.data_more);
      return this.data_more;
    },
    checkEditForm() {
      let getItem = JSON.parse(localStorage.getItem("isEdit"));
      if (getItem != null) {
        this.form1st.isEdit = getItem;
      }
      return this.form1st.isEdit;
    },
  },
};
</script>