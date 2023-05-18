<template>
  <div>
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
                    <div class="table-cell text-center table-TH">NUMBER OF LOGS</div>
                    <div class="table-cell text-center table-TH">TOTAL LIKES</div>
                </div>
            </div>
            <div class="table-row-group divide-y divide-grey-100" v-for="(item, index) in user_data" :key="index">
                <a @click.stop.prevent="doThat" class="table-row transition ease-in-out delay-50 hover:bg-brown-light" href="">
                    <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        <p>{{ item.user_id }}</p>
                    </div>
                    <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                        <p>{{ item.username }}</p>
                    </div>           
                    <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                        <p>{{ item.first_name }}</p>
                    </div>
                    <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                        <p>{{ item.last_name }}</p>
                    </div>
                    <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                        <p>{{ item.email }}</p>
                    </div>
                    <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                        <p>{{ item.gender}}</p>
                    </div>
                    <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        <p>{{ item.numLogs }}</p>
                    </div>
                    <div class="table-cell p-3 text-sm text-gray-700 text-center">
                        <span v-if="!item.total_like">0</span>
                        <p>{{ item.total_like }}</p>
                    </div>
                </a>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
    
  data() {
    return{
      user_data: [],
      name:'',
      filter_name: [],
    }
  },
  created() {
    axios.get("/admin/allUser")
        .then((response) => {
            console.log(response.data.length)
          this.user_data = response.data;
          localStorage.setItem('numOfAllUser', JSON.stringify(response.data.length))
        })
        .catch((err) => {
          console.log(err);
        });

        
  },
  methods: {
    
  },
  computed: {
  },
  watch: {
    name(newVal) {
      let input = newVal.toLowerCase();
      let full_name = "";

    //   this.filter_name = this.dummyData.filter((value) => {
    //     full_name = value.first_name.toLowerCase() + " " + value.last_name.toLowerCase();
    //     return (
    //       value.first_name.toLowerCase().includes(input) ||
    //       value.last_name.toLowerCase().includes(input) ||
    //       full_name.includes(input)
    //     );
    //   });
    },
  },
}
</script>