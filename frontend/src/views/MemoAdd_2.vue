<template>
    <div class="flex overflow-visible" style="background: rgb(227,232,233);
background: linear-gradient(90deg, rgba(227,232,233,1) 0%, rgba(227,232,233,1) 75%, rgba(81,63,63,1) 75%);">
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
                                    <input type="text" v-model="form2nd.street" class="input-memoAdd" size="30" placeholder="street address">
                                </div>
                            
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>COUNTRY<span v-show="form2nd.country == '' " class="text-md text-red-400">*</span></p>
                                        <select @change="checkCountry()" :class="{'border-2 border-red-500' : form2nd.error.e_country}" name="country" v-model="form2nd.country" class="input-memoAdd" >
                                            <!-- <option disabled selected value="">Please select country</option> -->
                                            <option disabled selected value="" >Please select country</option>
                                            <option v-for="(item, index) in form2nd.country_list" :key="index" :value="item">{{item}}</option>
                                        </select><br>
                                        <span class="relative bottom-0 text-sm text-red-400">{{form2nd.error.e_country}}</span>
                                    </div>

                                </div>
                            
                                <div class="pt-5">
                                    <p>PROVINCE</p>
                                    <input type="text" v-model="form2nd.province" class="input-memoAdd" size="30" placeholder="province">
                                </div>
                            
                                <div class="pt-5">
                                    <p>CITY</p>
                                    <input type="text" v-model="form2nd.city" class="input-memoAdd" size="30" placeholder="city">
                                </div>
                            </div>
                            <hr class="mt-5">
                        
                            <div class="grid grid-cols-2">                   
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>PRICE<span v-show="form2nd.price == '' " class="text-md text-red-400">*</span></p>
                                        <input type="number" @input="checkPrice()" :class="{'border-2 border-red-500' : form2nd.error.e_price}" v-model="form2nd.price" class="input-memoAdd" size="30" placeholder="0.00">
                                        <span class="text-xl text-gray-400">$</span><br>
                                        <span class="relative bottom-0 text-sm text-red-400">{{form2nd.error.e_price}}</span>
                                    </div>
                                </div>
                                
                            </div>
                            <hr class="mt-5">
                        
                            <div class="grid grid-cols-2">
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>START TIME :</p>
                                        <input type="datetime-local" @change="checkTimeStart()" :class="{'border-2 border-red-500' : form2nd.error.e_start}" v-model="form2nd.start" class="input-memoAdd" size="30">
                                        <span class="relative bottom-0 text-sm text-red-400">{{form2nd.error.e_start}}</span>
                                    </div>
                                </div>
                            
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>END TIME :</p>
                                        <input type="datetime-local" v-model="form2nd.end" @change="checkTimeEnd()" :class="{'border-2 border-red-500' : form2nd.error.e_end}" class="input-memoAdd" size="30">
                                        <span class="relative bottom-0 text-sm text-red-400">{{form2nd.error.e_end}}</span>
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
                                <thead class="bg-brown-light border-b-2 border-gray-200 text-brown">
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
                                        <tr v-for="(item,index) in showData2nd" :key="index">
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                                <a href="#" class="font-bold text-brown hover:underline ">{{index+1}}</a>
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap ">
                                                {{item.title}}
                                            </td>
                                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                                          <span v-if="item.address.replace(/\s/g, '').length">
                                              <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="address" readonly id="" cols="26" rows="1">{{item.address}}
                                              </textarea>
                                            </span>
                                            <span v-else>-</span>

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
                                                <img src="../assets/image/journii-logo.png" class="w-[50px] h-[50px]" alt="">
                                                <img src="https://media.timeout.com/images/101705309/image.jpg" class="w-[50px] h-[50px]" alt="">
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
                            <thead class="bg-brown-light border-b-2 border-gray-200 text-brown">
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
                                    <tr v-for="(item,index) in showData2nd" :key="index" class="bg-white">
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                            <a href="#" class="font-bold text-brown hover:underline ">{{index+1}}</a>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="title" readonly id="" cols="15" rows="2">{{item.title}}
                                            </textarea>
                                        </td>
                                            
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span v-if="item.address.replace(/\s/g, '').length">
                                              <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="address" readonly id="" cols="26" rows="1">{{item.address}}
                                              </textarea>
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                          <span v-if="item.descript == ''">-</span>
                                          <span v-else>
                                            <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="detail" readonly id="" cols="26" rows="1">{{item.descript}}
                                            </textarea>
                                          </span>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span v-if="item.price != '' ">{{item.price}} $</span>
                                            <span v-else>0 $</span>
                                        </td>
                                        
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap overflow-x-auto inline-flex gap-3">
                                            <img src="../assets/image/journii-logo.png" class="w-[50px] h-[50px]" alt="">
                                            <img src="https://media.timeout.com/images/101705309/image.jpg" class="w-[50px] h-[50px]" alt="">
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
        <div class="flex flex-col justify-center items-center w-1/4 h-3/4 pb-1/2 gap-10">
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
      form2nd: {
        country_list: [],
        title: "",
        street: "",
        country: "",
        province: "",
        city: "",
        price: "",
        start: "",
        end: "",
        img: [],
        descript: "",
        isModalAdd: false,
        isModalDelete: false,
        indexDelete: [],
        error: {
          e_title: "",
          e_country: "",
          e_price: "",
          e_start: "",
          e_end: "",
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
      this.form2nd.country_list = value.countrys;
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
    // checkTitle() {
    //   if (this.form1st.title === "" && this.checkEditForm.title == false) {
    //     this.form2nd.error.e_title = "กรุณากรอกชื่อหัวข้อ";
    //     return;
    //   }
    //   this.form2nd.error.e_title = "";
    // },
    checkTitle2ND() {
      if (this.form2nd.title === "") {
        this.form2nd.error.e_title = "กรุณากรอกชื่อหัวข้อ";
        return;
      }
      this.form2nd.error.e_title = "";
    },
    checkCountry2ND() {
      if (this.form2nd.country === "") {
        this.form2nd.error.e_country = "กรุณาเลือกประเทศ";
        return;
      }
      this.form2nd.error.e_country = "";
    },
    checkPrice2ND() {
      if (this.form2nd.price === "") {
        this.form2nd.error.e_price = "กรุณาระบุจำนวนค่าใช้จ่าย";
        return;
      }
      this.form2nd.error.e_price = "";
    },
    checkTimeStart2ND() {
      const today = new Date();
      const start = new Date(this.form2nd.start);
      if (start > today) {
        this.form2nd.error.e_start = "ห้ามเป็นวันในอนาคต";
        return;
      }
      this.form2nd.error.e_start = "";

      if (this.form2nd.start != "" && this.form2nd.end == "") {
        this.form2nd.error.e_end = "กรุณากรอกวันสิ้นสุดการเดินทาง";
        return;
      }

      if (this.form2nd.start > this.form2nd.end) {
        this.form2nd.error.e_start = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        this.form2nd.error.e_end = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        return;
      } else if (this.form2nd.start <= this.form2nd.end) {
        this.form2nd.error.e_start = "";
        this.form2nd.error.e_end = "";
      }

      this.form2nd.error.e_start = "";
    },
    checkTimeEnd2ND() {
      const today = new Date();
      const end = new Date(this.form2nd.end);
      if (end > today) {
        this.form2nd.error.e_end = "ห้ามเป็นวันในอนาคต";
        return;
      }
      this.form2nd.error.e_end = "";

      if (this.form2nd.start == "" && this.form2nd.end != "") {
        this.form2nd.error.e_start = "กรุณากรอกวันเริ่มต้นการเดินทาง";
        return;
      }

      if (this.form2nd.start > this.form2nd.end) {
        this.form2nd.error.e_start = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        this.form2nd.error.e_end = "ข้อมูลวันที่ไม่สอดคล้องกัน";
        return;
      } else if (this.form2nd.start <= this.form2nd.end) {
        this.form2nd.error.e_start = "";
        this.form2nd.error.e_end = "";
      }

      this.form2nd.error.e_end = "";
    },
    
    add2ND() {
      this.checkTitle2ND();
      this.checkCountry();
      this.checkPrice();
      this.checkTimeStart();
      this.checkTimeEnd();

      if (
        this.form2nd.error.e_title != "" ||
        this.form2nd.error.e_country != "" ||
        this.form2nd.error.e_price != "" ||
        this.form2nd.error.e_start != "" ||
        this.form2nd.error.e_end != ""
      ) {
        return;
      }

      if (this.data_more[0] == null) {
        this.data_more.splice(0, 1);
      }

      let address = `${this.form2nd.street} ${this.form2nd.province} ${this.form2nd.city} ${this.form2nd.country}`;

      this.data_more.push({
        main_id: this.data_length + 1,
        username: `Test`,
        title: this.form2nd.title,
        address: address,
        start: this.form2nd.start,
        end: this.form2nd.end,
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

      // console.log("Hello WOrld");
      // console.log(this.showForm1st.length);
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