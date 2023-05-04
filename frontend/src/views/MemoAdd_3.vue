<template>
    <div class="flex">
        <div class="grow flex flex-col justify-start items-center">
            <h1 class="text-2xl font-medium mt-10">สรุปบันทึก</h1>
            <div class="w-4/5 h-screen p-5 pt-10">
                <div class="flex flex-col justify-center items-center pt-3">
                    <div class='w-[50vw] h-[70vh] border-2 border-gray-500 rounded-md p-4 bg-white'>
                        <template v-if="showForm1st[0] != null">
                            <div v-for="item in showForm1st">
                                <h1 class="text-xl">{{item.title}}</h1>
                                <hr class="w-1/2 h-[2px] border-none bg-gray-400">
                                <div class="grid grid-cols-2 mt-3">
                                    <h1>STREET ADDESS : 
                                        <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                            <span v-if="item.st_address == '' ">
                                                -
                                            </span>
                                            <span v-else>
                                                {{item.st_address}}
                                            </span>
                                        </p>
                                    </h1> 
                                    <h1>COUNTRY : <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">{{item.country}}</p></h1> 
                                    
                                    <h1 class="mt-2">PROVINCE :
                                        <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                            <span v-if="item.province == '' ">
                                                -
                                            </span>
                                            <span v-else>
                                                {{item.province}}
                                            </span>
                                        </p>
                                    </h1> 
                                    <h1 class="mt-2">CITY : 
                                        <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                            <span v-if="item.city == '' ">
                                                -    
                                            </span>
                                            <span v-else>
                                                {{item.city}}
                                            </span>
                                        </p>
                                    </h1> 
                                </div>
                                <hr class="mt-3">
                                <div class="grid grid-cols-2 mt-3">
                                    <h1>NUMBER OF PEOPLE : <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">{{item.co_traveller}}</p></h1> 
                                    <h1>PRICE : <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">{{item.price}}</p></h1> 
                                </div>
                                <hr class="mt-3">
                                <div class="grid grid-cols-2 mt-3">
                                    <h1>START TIME : 
                                        <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                            <span v-if="item.start == '' ">
                                                -    
                                            </span>
                                            <span v-else>
                                                {{item.start}}
                                            </span>
                                        </p>
                                    </h1> 
                                    <h1>END TIME : 
                                        <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                            <span v-if="item.end == '' ">
                                                -    
                                            </span>
                                            <span v-else>
                                                {{item.end}}
                                            </span>
                                        </p>
                                    </h1> 
                                </div>
                                <hr class="mt-3">
                                <div class="mt-3">
                                    <h1>INTRODUCTORY DESCRIPTION : 
                                        <p class="text-sm w-3/4 truncate p-1 border-2 border-gray-500 rounded-md">
                                            <span v-if="item.descript == '' ">
                                                -    
                                            </span>
                                            <span v-else>
                                                {{item.descript}}
                                            </span>
                                            
                                        </p>
                                    </h1> 
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <h1 class="text-xl">ไม่พบข้อมูล</h1>
                        </template>
                        <hr class="mt-3">
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
                                <template v-if="showData2nd.length != 0">
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
                                <template v-else>
                                    <tr>
                                        <td colspan="7" class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">ไม่พบข้อมูล</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="flex justify-around">
                    <button @click="SecondPageForm('')" class="m-1 text-[1.1vw] mt-3 h-3/4 p-2 px-3 bg-green rounded-md hover:text-white">Back</button>
                    <button @click="submitAll()" class="m-1 text-[1.1vw] mt-3 h-3/4 p-2 px-3 bg-green rounded-md hover:text-white">Submit</button>
                </div>    
            </div>
        </div>
        <div class="flex flex-col justify-center items-center w-1/4 pb-1/2 bg-brown gap-10">
            <button class="list-form-btn" @click="FirstPageForm('From_2&3')">
                <div class="text-white ">บันทึกเบื้องต้น</div>
            </button>

            <button class="list-form-btn" @click="SecondPageForm()">
                <div class="text-white">บันทึกลงรายละเอียด</div>
            </button>

            <button class="list-form-btn" >
                <div class="text-white">สรุป</div>
            </button>
        </div>
    </div>   
</template>

<script>
export default {
    data(){
        return{
            data_main: [],
            data_more: [],
        }
    },
    methods: {
        submitAll() {
            if (confirm("Do you want to submit it?")) {
              alert("Data is added successfully!");
              localStorage.removeItem("data");
              localStorage.removeItem("data_more");
              localStorage.removeItem("isEdit");
              this.$router.push({ name: "list" });
            }
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
  },

}
</script>