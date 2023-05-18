<template>
    <div>
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
                    <a @click.stop.prevent="doThat" class="table-row transition ease-in-out delay-50 hover:bg-brown-light" href="">
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
</template>

<script>
export default {
    
  data() {
    return{
      user_data: [],
      name:'',
      filter_name: [],
    }
  },
  created() {
    
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