<template>
    <div class="flex">
        <template v-if="form2nd.isModalAdd == true">
            <div class="modalAdd">
                <div class="modal-content">
                    <span class="close" @click="form2nd.isModalAdd = false, changeOverflow()">&times;</span>
                    <h1 class="text-2xl font-medium text-center mt-4">เพิ่มบันทึกรายละเอียด</h1>
                    <div class="mr-15">
                        <form @submit.prevent="submit" class="w-full h-screen p-5 pt-10">
                            <div class="relative">
                                <span class="absolute bottom-11 text-sm text-red-400">{{form2nd.error.e_title}}</span>
                                <input type="text" v-model="form2nd.title" @input="checkTitle2ND()" :class="{'border-2 border-red-500' : form2nd.error.e_title}" class="text-2xl p-1 rounded-md truncate focus:outline-none" size="30" placeholder="Untitled">
                                <hr>
                            </div>
                        
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div class="pt-5">
                                    <p>STREET ADDRESS</p>
                                    <input type="text" v-model="form2nd.address.v_street" class="input-memoAdd" size="30" placeholder="street address">
                                </div>
                            
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>COUNTRY</p>
                                        <select  name="country" v-model="form2nd.address.v_country" class="input-memoAdd" >
                                            <!-- <option disabled selected value="">Please select country</option> -->
                                            <option v-for="(item, index) in form1st.country_list" :key="index" :value="item">{{item}}</option>
                                        </select>
                                        
                                    </div>

                                </div>
                            
                                <div class="pt-5">
                                    <p>PROVINCE</p>
                                    <input type="text" v-model="form2nd.address.v_province" class="input-memoAdd" size="30" placeholder="province">
                                </div>
                            
                                <div class="pt-5">
                                    <p>CITY</p>
                                    <input type="text" v-model="form2nd.address.v_city" class="input-memoAdd" size="30" placeholder="city">
                                </div>
                            </div>
                            <hr class="mt-5">
                        
                            <div class="grid grid-cols-2">                   
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>PRICE</p>
                                        <input type="number" v-model="form2nd.price" class="input-memoAdd" size="30" placeholder="0.00">
                                        <span class="text-xl text-gray-400">$</span><br>
                                    </div>
                                </div>
                                
                            </div>
                            <hr class="mt-5">
                        
                            <div class="grid grid-cols-2">
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>START TIME :</p>
                                        <input type="datetime-local" v-model="form2nd.time.v_start" class="input-memoAdd" size="30">
                                    </div>
                                </div>
                            
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>END TIME :</p>
                                        <input type="datetime-local" v-model="form2nd.time.v_end" class="input-memoAdd" size="30">
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-5">
                        
                             <div class="pt-5">
                                    <div class="relative">
                                        <p>IMAGE</p>
                                        <input type="file" @input="" class="input-memoAdd" placeholder="1">
                                        <br>
                                    </div>
                                </div>
                            <hr class="mt-5">

                            <div class="pt-5">
                                    <p>DESCRIPTION:</p>
                                    <textarea type="text" v-model="form2nd.descript" class="block mt-1 p-2 text-lg border-2 border-gray-400 rounded-md" cols="60" rows="3.5" placeholder="Description">
                                    </textarea>
                            </div>
                            <hr class="mt-5">
                        
                            <div class="flex justify-end">
                                <button @click="add2ND()" class="m-1 text-[1.3vw] mt-5 mb-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Add</button>
                            </div>

                        </form>      
                    </div>
                </div>
            </div>
        </template>
        <template v-if="form2nd.isModalDelete == true">
            <div class="modalAdd">
                <div class="modal-content">
                    <span class="close" @click="form2nd.isModalDelete = false, changeOverflow()">&times;</span>
                    <h1 class="text-2xl font-medium text-center mt-4">ลบบันทึกรายละเอียด</h1>
                    <!-- <hr class="w-1/2 "> -->
                    <div class="w-full h-screen p-5 pt-10 mr-15">
                        <div class="mt-5 border border-black-500 overflow-auto rounded-lg shadow">
                            <table class="table-auto w-full">
                                <thead class="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th>No.</th>
                                        <th class="w-24">Title</th>
                                        <th class="w-24 ">Address</th>
                                        <th class="w-24 ">Description</th>
                                        <th class="">Price</th>
                                        <th class="w-32 ">Image</th>
                                        <th class="w-32">Time</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-grey-100">
                                    <template v-if="showData2nd != null">
                                        <tr v-for="(item,index) in showData2nd">
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                                <a href="#" class="font-bold text-brown hover:underline ">{{index+1}}</a>
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                {{item.title}}
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                <textarea class="cursor-default focus:outline-none resize-none" name="address" readonly id="" cols="26" rows="1">{{item.address}}
                                                </textarea>
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                <textarea class="cursor-default focus:outline-none resize-none" name="detail" readonly id="" cols="26" rows="1">{{item.descript}}
                                                </textarea>
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                <span v-if="item.price != '' ">{{item.price}} $</span>
                                                <span v-else>0 $</span>
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap overflow-x-auto inline-flex gap-3">
                                                <img
                                                    src="https://media.timeout.com/images/101705309/image.jpg"
                                                    width="100px"
                                                    height="100px"
                                                    alt=""
                                                />  
                                                <img
                                                    src="https://media.timeout.com/images/101705309/image.jpg"
                                                    width="100px"
                                                    height="100px"
                                                    alt=""
                                                />
                                            </td>
                                            <td class="p-3 text-sm text-gray-700">
                                                Start:
                                                <span v-if="item.start != ''">
                                                    <input type="datetime-local" :value="item.start" disabled>
                                                </span>
                                                <span v-else>
                                                    Not defined <br>    
                                                </span>
                                                End: 
                                                <span v-if="item.end != ''">
                                                    <input type="datetime-local" :value="item.end" disabled>
                                                </span>
                                                <span v-else>
                                                    Not defined <br>    
                                                </span>
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 text-center">
                                                <input type="checkbox" @click="checkDel2ND(index)" :key="index"> 
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex justify-end">
                            <button @click="submitDelete(true)" class="m-1 text-[1.3vw] mt-5 mb-5 w-1/6 h-8 bg-pink rounded-md hover:text-white">Delete</button>
                            <button @click="submitDelete(false)" class="m-1 text-[1.3vw] mt-5 mb-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Cancel</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </template>     
                    
        <div class="grow flex flex-col justify-start items-center">
                <h1 class="text-2xl font-medium mt-10">การบันทึกลงรายละเอียด</h1>
                <div class="w-11/12 h-screen p-5 pt-10">
                    <div class="flex flex-col justify-center items-center pt-3">
                        <!-- <div v-show="form1st.is_pic === true" class='flex w-2/4 h-[40vh] bg-gray-500 rounded-md p-4'>
                            <h1 class="">PICTURE</h1>
                        </div> -->
                        <div class="grid grid-cols-2 w-2/4">
                            <button @click="form2nd.isModalAdd = true, changeOverflow()" class="m-1 text-[1.1vw] mt-3 w-5/6 h-3/4 bg-green rounded-md hover:text-white">Add more detail</button>
                            <button @click="form2nd.isModalDelete = true, changeOverflow()" class="m-1 text-[1.1vw] mt-3 w-5/6 h-3/4 bg-pink rounded-md hover:text-white">Delete detail</button>
                        </div>          
                    </div>
                    <div class="mt-5 border border-black-500 overflow-auto rounded-lg shadow">
                        <table class="table-auto w-full">
                            <thead class="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th class="">No.</th>
                                    <th class="w-24">Title</th>
                                    <th class="w-24 ">Address</th>
                                    <th class="w-24 ">Description</th>
                                    <th class="">Price</th>
                                    <th class="w-32 ">Image</th>
                                    <th class="w-32">Time</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-grey-100">
                                <template v-if="showData2nd != null">
                                    <tr v-for="(item,index) in showData2nd">
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                            <a href="#" class="font-bold text-brown hover:underline ">{{index+1}}</a>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <textarea class="cursor-default focus:outline-none resize-none" name="title" readonly id="" cols="15" rows="2">{{item.title}}
                                            </textarea>
                                        </td>
                                            
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <textarea class="cursor-default focus:outline-none resize-none" name="address" readonly id="" cols="26" rows="1">{{item.address}}
                                            </textarea>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <textarea class="cursor-default focus:outline-none resize-none" name="detail" readonly id="" cols="26" rows="1">{{item.descript}}
                                            </textarea>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span v-if="item.price != '' ">{{item.price}} $</span>
                                            <span v-else>0 $</span>
                                        </td>
                                        
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap overflow-x-auto inline-flex gap-3">
                                            <img
                                                src="https://media.timeout.com/images/101705309/image.jpg"
                                                width="100px"
                                                height="100px"
                                                alt=""
                                            />  
                                            <img
                                                src="https://media.timeout.com/images/101705309/image.jpg"
                                                width="100px"
                                                height="100px"
                                                alt=""
                                            />
                                        </td>
                                        <td class="p-3 text-sm text-gray-700">
                                            Start:
                                            <span v-if="item.start != ''">
                                                <input type="datetime-local" :value="item.start" disabled>
                                            </span>
                                            <span v-else>
                                                Not defined <br>    
                                            </span>
                                            End: 
                                            <span v-if="item.end != ''">
                                                <input type="datetime-local" :value="item.end" disabled>
                                            </span>
                                            <span v-else>
                                                Not defined <br>    
                                            </span>
                                            
                                        </td>
                                    </tr>
                                </template>
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-around">
                        <button @click="FirstPageForm()" class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Back</button>
                        <button @click="ThirdPageForm()" class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Next</button>
                    </div>
                </div>
                
        </div>
        <!-- Right Menubar  -->
        <div class="flex flex-col justify-center items-center w-1/4 pb-1/2  bg-brown gap-10">
            <button class="list-form-btn" @click="FirstPageForm('From_23')">
                <div class="text-white ">บันทึกเบื้องต้น</div>
            </button>

            <button class="list-form-btn">
                <div class="text-white">บันทึกลงรายละเอียด</div>
            </button>

            <button class="list-form-btn" @click="ThirdPageForm()">
                <div class="text-white">สรุป</div>
            </button>
        </div>
    </div>
    <Footer />
</template>

<script setup>
    import Footer from '@/components/Footer.vue'
</script>

<script>
//  import App from '@/assets/js/memoAdd.js'
//  export default App;
export default {
  data() {
    return {
      form1st: {
        country_list: [],
      },
      form2nd: {
        title: "",
        address: {
          v_street: "",
          v_country: "",
          v_province: "",
          v_city: "",
        },
        price: "",
        time: {
          v_start: "",
          v_end: "",
        },
        img: [],
        descript: "",
        isModalAdd: false,
        isModalDelete: false,
        indexDelete: [],
        error: {
          e_title: "",
        },
      },
      data_length: 0,
      data_length_more: 0,
      data_main: [],
      data_more: [],
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
    add2ND() {
      this.checkTitle2ND();

      if (this.form1st.error.e_title != "") {
        return;
      }

      if (this.data_more[0] == null) {
        this.data_more.splice(0, 1);
      }

      let address = `${this.form2nd.address.v_street} ${this.form2nd.address.v_province} ${this.form2nd.address.v_city} ${this.form2nd.address.v_country}`;

      this.data_more.push({
        main_id: this.data_length + 1,
        username: `Test`,
        title: this.form2nd.title,
        address: address,
        start: this.form2nd.time.v_start,
        end: this.form2nd.time.v_end,
        price: this.form2nd.price,
        descript: this.form2nd.descript,
        image: "",
      });
      localStorage.setItem("data_more", JSON.stringify(this.data_more));
      this.form2nd.isModalAdd = false;
      this.changeOverflow();
    },
    checkDel2ND(index) {
      let checkDuplicates = this.form2nd.indexDelete.indexOf(index);

      if (checkDuplicates == -1) {
        this.form2nd.indexDelete.push(index);
      } else {
        this.form2nd.indexDelete.splice(checkDuplicates, 1);
      }
    },
    submitDelete(bool) {
      console.log(this.form2nd.indexDelete.length);
      if (bool == true && this.form2nd.indexDelete.length != 0) {
        let i = 0;
        let sortDESC = this.form2nd.indexDelete.sort().reverse();
        while (i < sortDESC.length) {
          this.data_more.splice(sortDESC[i], 1);
          i++;
        }
        localStorage.removeItem("data_more");
        localStorage.setItem("data_more", JSON.stringify(this.data_more));
      }
      this.form2nd.indexDelete = [];
      this.form2nd.isModalDelete = false;
      this.changeOverflow();
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
    changeOverflow() {
      let body = document.getElementsByTagName("BODY")[0];

      if (this.form2nd.isModalAdd || this.form2nd.isModalDelete) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    },
    submitAll() {
      if (confirm("Do you want to submit it?")) {
        alert("Data is added successfully!");
        localStorage.removeItem("data");
        localStorage.removeItem("data_more");
        localStorage.removeItem("isEdit");
        this.$router.push({ name: "list" });
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