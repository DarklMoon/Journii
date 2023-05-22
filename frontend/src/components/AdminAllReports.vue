<template>
    <div>
        <div class="w-full h-2/6 px-[1em] mt-5">
            <input type="number" class="input-memoAdd w-[4em] mr-2" v-model="search_id" placeholder="ID">
            <input type="text" class="input-memoAdd w-1/4" v-model="search" placeholder="Search">
        </div>
        <div class="mt-5 border border-black-500 overflow-auto rounded-lg shadow ">
            <div class="table table-auto w-full">
                <div class="table-header-group bg-brown-light text-brown border-b-2 border-gray-200">
                    <div class="table-row">
                        <div class="text-center table-TH">REPORT_ID</div>
                        <div class="table-cell text-left table-TH">JOUR_ID</div>
                        <div class="table-cell text-left table-TH">USERNAME</div>
                        <div class="table-cell text-left table-TH">FIRSTNAME</div>
                        <div class="table-cell text-left table-TH">LASTNAME</div>
                        <div class="table-cell text-left table-TH">EMAIL</div>
                        <div class="table-cell text-left table-TH">REPORT TYPE</div>
                        <div class="table-cell text-left table-TH">REPORT STATUS</div>
                        <div class="table-cell text-left table-TH">TIME</div>
                        <div class="table-cell text-left table-TH">DATE</div>
                    </div>
                </div>
                <template v-if = "filter.length === 0">
                  <div class="table-row-group divide-y divide-grey-100 bg-white" v-for="(item, index) in report_data" :key="index">
                    <a @click.stop.prevent="doThat" class="table-row transition ease-in-out delay-50 hover:bg-[#c5d5b8]" @click="$router.push({name:'detail',params:{id:item.jour_id}})">
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>{{ item.report_id }}</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>{{ item.jour_id }}</p>
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
                            <p>{{ item.report_type }}</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>{{ item.report_status }}</p>
                        </div>     
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>{{ item.time }}</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>{{ changeDate(item.date) }}
                                <br>{{ item.date }}
                            </p>
                        </div>
                    </a>
                    </div>
                </template>

                <template v-else>
                  <div class="table-row-group divide-y divide-grey-100 bg-white" v-for="(item, index) in filter" :key="index">
                    <a @click.stop.prevent="doThat" class="table-row transition ease-in-out delay-50 hover:bg-[#c5d5b8]" @click="$router.push({name:'detail',params:{id:item.jour_id}})">
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>{{ item.report_id }}</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <p>{{ item.jour_id }}</p>
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
                            <p>{{ item.report_type }}</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>{{ item.report_status }}</p>
                        </div>     
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>{{ item.time }}</p>
                        </div>
                        <div class="table-cell p-3 text-sm text-gray-700 whitespace-nowrap">
                            <p>{{ changeDate(item.date) }}
                                <br>{{ item.date }}
                            </p>
                        </div>
                    </a>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
    
  data() {
    return{
      report_data: [],
      search:'',
      search_id:'',
      filter: [],
    }
  },
  created() {
    axios.get("/admin/allReports")
        .then((response) => {
          this.report_data = response.data;
          localStorage.setItem('numOfAllReport', JSON.stringify(response.data.length))
        })
        .catch((err) => {
          console.log(err);
        });
  },
  methods: {
    changeDate(date){
        let newDate = new Date(date)
        return newDate.toDateString();
    }
  },
  computed: {
  },
  watch: {
    search_id(input){
      this.filter = this.report_data.filter((value) => {
        return (value.report_id.toString().includes(input))
      })
    },
    search(newVal) {
      let input = newVal.toLowerCase();
      let full_name = "";

      this.filter = this.report_data.filter((value) => {
        full_name = value.first_name.toLowerCase() + " " + value.last_name.toLowerCase();
        return (
          value.first_name.toLowerCase().includes(input) ||
          value.last_name.toLowerCase().includes(input) ||
          full_name.includes(input) ||
          value.email.toLowerCase().includes(input) ||
          value.username.toLowerCase().includes(input)
        );
      });
    },
  },
}
</script>