<template>
  <div class="h-screen w-full">
    <div class="flex justify-center items-center w-full h-1/6">
        <div class="grid grid-cols-4 w-full h-2/6 px-[6em]">
            <div @click="[changePage.allUser = true, changePage.allLogs = false, changePage.allReports = false, changePage.allAdmin = false]" 
            :class="{'bg-pink text-white shadow-lg shadow-pink-300' : changePage.allUser == true}" class="admin-allMenu-btn transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover: duration-1 cursor-pointer">
                <div class=" w-1/4 flex justify-center items-center p-4">
                    <img src="/src/assets/image/icon-user.png" alt="">
                </div>
                <div class="w-3/4 p-2">
                    <p>All Journii users</p>
                    <p class="text-sm">0</p>
                </div>
            </div>
            <div @click="[changePage.allUser = false, changePage.allLogs = false, changePage.allReports = false, changePage.allAdmin = true]" 
            :class="{'bg-pink text-white shadow-lg shadow-pink-300' : changePage.allAdmin == true}" class="admin-allMenu-btn transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover: duration-1 cursor-pointer">
                <div class="w-1/4 flex justify-center items-center p-4">
                    <img src="/src/assets/image/icon-user.png" alt="">
                </div>
                <div class="w-3/4 p-2">
                    <p>All Journii Admin</p>
                    <p class="text-sm">0</p>
                </div>
            </div>
            <div @click="[changePage.allUser = false, changePage.allLogs = true, changePage.allReports = false, changePage.allAdmin = false]" 
            :class="{'bg-pink text-white shadow-lg shadow-pink-300' : changePage.allLogs == true}" class="admin-allMenu-btn transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover: duration-1 cursor-pointer">
                <div class=" w-1/4 flex justify-center items-center p-4">
                    <img src="/src/assets/image/icon-docs.png" alt="">
                </div>
                <div class=" w-3/4 p-2">
                    <p>All Journii logs</p>
                    <p class="text-sm">0</p>
                </div>
            </div>
            <div @click="[changePage.allUser = false, changePage.allLogs = false, changePage.allReports = true, changePage.allAdmin = false]" 
            :class="{'bg-pink text-white shadow-lg shadow-pink-300' : changePage.allReports == true}" class="admin-allMenu-btn transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover: duration-1 cursor-pointer">
                <div class=" w-1/4 flex justify-center items-center p-4">
                    <img src="/src/assets/image/icon-megaphone.png" alt="">
                </div>
                <div class=" w-3/4 p-2">
                    <p>All Journii Reports</p>
                    <p class="text-sm">0</p>
                </div>
            </div>
        </div>
    </div>
    <div v-show="changePage.allUser == true" class="p-10">
        <div class="w-full h-2/6 px-[1em] mt-5">
            <input type="text" class="input-memoAdd w-1/4" v-model="name" placeholder="Search">
        </div>
        <div class="mt-5 border border-black-500 overflow-auto rounded-lg shadow ">
            <div class="table table-auto w-full">
                <div class="table-header-group bg-gray-50 border-b-2 border-gray-200">
                    <div class="table-row">
                        <div class="text-center table-TH">USER_ID</div>
                        <div class="table-cell text-left table-TH">USERNAME</div>
                        <div class="table-cell text-left table-TH">FIRSTNAME</div>
                        <div class="table-cell text-left table-TH">LASTNAME</div>
                        <div class="table-cell text-left table-TH">EMAIL</div>
                        <div class="table-cell text-left table-TH">GENDER</div>
                        <div class="table-cell text-left table-TH">NUMBER OF LOGS</div>
                        <div class="table-cell text-left table-TH">TOTAL LIKES</div>
                    </div>
                </div>
                <div class="table-row-group divide-y divide-grey-100">
                    <a class="table-row transition ease-in-out delay-50 hover:bg-brown-light" href="">
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>1</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>username</p>
                        </div>           
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>firstname</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>lastname</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>email@email.com</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>Female</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>0</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700">
                            <p>0</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div v-show="changePage.allAdmin == true" class="p-10">
        <div class="w-full h-2/6 px-[1em] mt-5">
            <input type="text" class="input-memoAdd w-1/4" placeholder="Search">
        </div>
        <div class="mt-5 border border-black-500 overflow-auto rounded-lg shadow ">
            <div class="table table-auto w-full">
                <div class="table-header-group bg-gray-50 border-b-2 border-gray-200">
                    <div class="table-row">
                        <div class="text-center table-TH">ADMIN_ID</div>
                        <div class="table-cell text-left table-TH">USERNAME</div>
                        <div class="table-cell text-left table-TH">FIRSTNAME</div>
                        <div class="table-cell text-left table-TH">LASTNAME</div>
                        <div class="table-cell text-left table-TH">EMAIL</div>
                        <div class="table-cell text-left table-TH">GENDER</div>
                        <div class="table-cell text-left table-TH">NUMBER OF LOGS</div>
                        <div class="table-cell text-left table-TH">TOTAL REPORTS</div>
                    </div>
                </div>
                <div class="table-row-group divide-y divide-grey-100">
                    <a class="table-row transition ease-in-out delay-50 hover:bg-brown-light" href="">
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>1</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>username</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>firstname</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>lastname</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>email@email.com</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>Female</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>0</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700">
                            <p>0</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div v-show="changePage.allLogs == true" class="p-10">
        <div class="w-full h-2/6 px-[1em] mt-5">
            <input type="text" class="input-memoAdd w-1/4" placeholder="Search">
        </div>
        <div class="mt-5 border border-black-500 overflow-auto rounded-lg shadow ">
            <div class="table table-auto w-full">
                <div class="table-header-group bg-gray-50 border-b-2 border-gray-200">
                    <div class="table-row">
                        <div class="text-center table-TH">LOG_ID</div>
                        <div class="table-cell text-left table-TH">USERNAME</div>
                        <div class="table-cell text-left table-TH">NAME</div>
                        <div class="table-cell text-left table-TH">ROLE</div>
                        <div class="table-cell text-left table-TH">ACTION</div>
                        <div class="table-cell text-left table-TH">DATE</div>
                        <div class="table-cell text-left table-TH">TIME</div>
                    </div>
                </div>
                <div class="table-row-group divide-y divide-grey-100">
                    <a class="table-row transition ease-in-out delay-50 hover:bg-brown-light" href="">
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>1</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>username</p>
                        </div>    
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>firstname lastname</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>User</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>Update Journi</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>20 Mar 2022</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>23:30:23</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div v-show="changePage.allReports == true" class="p-10">
        <div class="w-full h-2/6 px-[1em] mt-5">
            <input type="text" class="input-memoAdd w-1/4" placeholder="Search">
        </div>
        <div class="mt-5 border border-black-500 overflow-auto rounded-lg shadow ">
            <div class="table table-auto w-full">
                <div class="table-header-group bg-gray-50 border-b-2 border-gray-200">
                    <div class="table-row">
                        <div class="text-center table-TH">JOUR_ID</div>
                        <div class="table-cell text-left table-TH">USERNAME</div>
                        <div class="table-cell text-left table-TH">FIRSTNAME</div>
                        <div class="table-cell text-left table-TH">LASTNAME</div>
                        <div class="table-cell text-left table-TH">EMAIL</div>
                        <div class="table-cell text-left table-TH">REPORT TYPE</div>
                        <div class="table-cell text-left table-TH">REPORT STATUS</div>
                    </div>
                </div>
                <div class="table-row-group divide-y divide-grey-100">
                    <a class="table-row transition ease-in-out delay-50 hover:bg-brown-light" href="">
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>1</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>username</p>
                        </div>
                            
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>lastname</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>lastname</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>email@email.com</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>Spam</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>Pending</p>
                        </div>     
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div> 
</template>

<script>
export default {
    
  data() {
    return{
      changePage: {
        allUser: false,
        allLogs: false,
        allReports: false,
        allAdmin: false,
      },
      user_data: [],
      name:'',
      filter_name: [],
    }
  },
  created() {
    fetch("/src/assets/data/user.json").then((results) =>
      results.json()
    ).then((value) => {
      this.user_data = value;
    });
    
    console.log(this.user_data)
    
    this.changePage.allUser = true;
  },
  methods: {
    
  },
  computed: {},
  watch: {
    name(newVal) {
      let input = newVal.toLowerCase();
      let full_name = "";

      this.filter_name = this.dummyData.filter((value) => {
        full_name =
          value.first_name.toLowerCase() + " " + value.last_name.toLowerCase();
        return (
          value.first_name.toLowerCase().includes(input) ||
          value.last_name.toLowerCase().includes(input) ||
          full_name.includes(input)
        );
      });
    },
  },
}
</script>