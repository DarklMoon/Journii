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
                    <p>All Journii Users</p>
                    <p class="text-sm">{{ numOfAllUser }}</p>
                </div>
            </div>
            <div @click="[changePage.allUser = false, changePage.allLogs = false, changePage.allReports = false, changePage.allAdmin = true]" 
            :class="{'bg-pink text-white shadow-lg shadow-pink-300' : changePage.allAdmin == true}" class="admin-allMenu-btn transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover: duration-1 cursor-pointer">
                <div class="w-1/4 flex justify-center items-center p-4">
                    <img src="/src/assets/image/icon-user.png" alt="">
                </div>
                <div class="w-3/4 p-2">
                    <p>All Journii Admin</p>
                    <p class="text-sm">{{ numOfAllAdmin }}</p>
                </div>
            </div>
            <div @click="[changePage.allUser = false, changePage.allLogs = true, changePage.allReports = false, changePage.allAdmin = false]" 
            :class="{'bg-pink text-white shadow-lg shadow-pink-300' : changePage.allLogs == true}" class="admin-allMenu-btn transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover: duration-1 cursor-pointer">
                <div class=" w-1/4 flex justify-center items-center p-4">
                    <img src="/src/assets/image/icon-docs.png" alt="">
                </div>
                <div class=" w-3/4 p-2">
                    <p>All Journii Logs</p>
                    <p class="text-sm">{{ numOfAllLogs  }}</p>
                </div>
            </div>
            <div @click="[changePage.allUser = false, changePage.allLogs = false, changePage.allReports = true, changePage.allAdmin = false]" 
            :class="{'bg-pink text-white shadow-lg shadow-pink-300' : changePage.allReports == true}" class="admin-allMenu-btn transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover: duration-1 cursor-pointer">
                <div class=" w-1/4 flex justify-center items-center p-4">
                    <img src="/src/assets/image/icon-megaphone.png" alt="">
                </div>
                <div class=" w-3/4 p-2">
                    <p>All Journii Reports</p>
                    <p class="text-sm">{{ numOfAllReport }}</p>
                </div>
            </div>
        </div>
    </div>

    <div v-show="changePage.allUser == true" class="p-10">
        <AdminAllUser />
    </div>
    <div v-show="changePage.allAdmin == true" class="p-10">
        <AdminAllAdmin />
    </div>
    <div v-show="changePage.allLogs == true" class="p-10">
        <AdminAllLogs/>
    </div>
    <div v-show="changePage.allReports == true" class="p-10">
        <AdminAllReports/>
    </div>
  </div> 
</template>

<script setup>
// import { RouterView} from 'vue-router' 
import AdminAllUser from '@/components/AdminAllUser.vue'
import AdminAllAdmin from '@/components/AdminAllAdmin.vue'
import AdminAllLogs from '@/components/AdminAllLogs.vue'
import AdminAllReports from '@/components/AdminAllReports.vue'

</script>

<script>

export default {
    
  data() {
    return{
      changePage: {
        allUser: true,
        allAdmin: false,
        allLogs: false,
        allReports: false,
      },
      numOfAllUser: 0,
      numOfAllAdmin: 0,
      numOfAllLogs: 0,
      numOfAllReport: 0,
    }
  },
  created() {
    var getPage = JSON.parse(localStorage.getItem('adminPage'))
    if(getPage){
        this.changePage = getPage
    }
    window.addEventListener('beforeunload', this.isReload)

    var getNumOfAllUser = JSON.parse(localStorage.getItem('numOfAllUser'));
    var getNumOfAllAdmin = JSON.parse(localStorage.getItem('numOfAllAdmin'));
    var getNumOfAllLogs = JSON.parse(localStorage.getItem('numOfAllLogs'));
    var getNumOfAllReport = JSON.parse(localStorage.getItem('numOfAllReport'));

    if(getNumOfAllUser){ this.numOfAllUser = getNumOfAllUser; }
    if(getNumOfAllAdmin){ this.numOfAllAdmin = getNumOfAllAdmin; }
    if(getNumOfAllLogs){ this.numOfAllLogs = getNumOfAllLogs; }
    if(getNumOfAllReport){ this.numOfAllReport = getNumOfAllReport; }
    
  },
  methods: {
    isReload(event){
        localStorage.setItem('adminPage', JSON.stringify(this.changePage))
        console.log(this.changePage)
        console.log(event)
    }
  },
  computed: {  
  },
}
</script>