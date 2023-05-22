<template>
    <div class="flex overflow-auto scroll-smooth h-full" style="background: rgb(227,232,233);
background: linear-gradient(90deg, rgba(227,232,233,1) 0%, rgba(227,232,233,1) 75%, rgba(81,63,63,1) 75%);">
        <!-- Form-1 -->
        <div class="grow flex flex-col justify-start items-center">
          <div id="normal" class="setup-memoAdd" :class="{'hidden' : pageNow !== 'main'}">
            <h1 class="text-2xl font-medium mt-10">การบันทึกเบื้องต้น</h1>
            <form @submit.prevent="submit" class="w-4/5 h-screen p-5 pt-10">
                <div class="relative">
                    <span class="absolute bottom-11 text-sm text-red-400">{{form1st.error.e_title}}</span>
                    <input v-if="checkEditForm.title == false || showForm1st.length == 0" type="text" v-model="form1st.title" @input="checkTitle()" 
                    :class="{'border-2 border-red-500' : form1st.error.e_title}" class="text-2xl p-1 rounded-md truncate focus:outline-none" placeholder="Untitled" size="30" >
                    <input v-else-if="checkEditForm.title == true"  @focus="onFocus($event, 'title')" type="text" :value="showForm1st[0].title" class="text-2xl p-1 rounded-md truncate focus:outline-none" size="30" >
                    <hr>
                </div>
                <div class="grid grid-rows-2 grid-cols-2 gap-x-10">
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
                <div class="grid grid-cols-2 ">                   
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
                            <input v-if="checkEditForm.price == false || showForm1st.length == 0" type="number" step="0.01" @input="checkPrice()" :class="{'border-2 border-red-500' : form1st.error.e_price}" v-model="form1st.price" class="input-memoAdd" size="30" placeholder="0.00">
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
                        <input type="file" multiple @change="selectImages" name="imageMemo" class="input-memoAdd" accept="image/png, image/jpeg, image/webp" placeholder="1">
                        <br>
                    </div>

                    <div v-if="imageErr == true">
                      <p class="text-red-400">Images must not be too large over than 3MB!</p>
                    </div>

                    <div v-if="images" class="flex">
                      <div v-for="(image, index) in images" :key="image.id">
                        <div class="mt-3 mx-1">
                          <figure>
                              <img :src="showSelectImage(image)" class="w-[100px] h-[100px]" alt="picture">
                          </figure>
                          <button @click="deleteSelectImage(index)" type="button" class="text-white bg-[#c98f8f] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-sm text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
                <hr class="mt-2">
                <div class="pt-5">
                        <p>INTRODUCTORY DESCRIPTION:</p>
                        <textarea v-if="checkEditForm.descript == false || showForm1st.length == 0" type="text" v-model="form1st.descript" class="block mt-1 p-2 text-lg border-2 border-gray-400 rounded-md" cols="60" rows="3.5" placeholder="Introductory Description">
                        </textarea>
                        <textarea v-else-if="checkEditForm.descript == true" @focus="onFocus($event, 'descript')" type="text" :value="showForm1st[0].descript" class="block mt-1 p-2 text-lg border-2 border-gray-400 rounded-md" cols="60" rows="3.5" placeholder="Introductory Description">
                        </textarea>
                </div>
                <hr class="mt-5">
                <div class="flex justify-around pb-5">
                    <button class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Save
                    </button>
                    <button href="#more"  @click="nextForm1st()" class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white text-center">Next
                    </button>
                </div>
            </form>
          </div>
          <div id="more" class="setup-memoAdd mt-[4em]" :class="{'hidden' : pageNow !== 'second'}">
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
                                        <select @change="checkCountry2ND()" :class="{'border-2 border-red-500' : form2nd.error.e_country}" name="country" v-model="form2nd.country" class="input-memoAdd" >
                                            <!-- <option disabled selected value="">Please select country</option> -->
                                            <option disabled selected value="" >Please select country</option>
                                            <option v-for="(item, index) in form1st.country_list" :key="index" :value="item">{{item}}</option>
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
                                        <input type="number" @input="checkPrice2ND()" :class="{'border-2 border-red-500' : form2nd.error.e_price}" v-model="form2nd.price" class="input-memoAdd" step="0.01" size="30" placeholder="0.00">
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
                                        <input type="datetime-local" @change="checkTimeStart2ND()" :class="{'border-2 border-red-500' : form2nd.error.e_start}" v-model="form2nd.start" class="input-memoAdd" size="30">
                                        <span class="relative bottom-0 text-sm text-red-400">{{form2nd.error.e_start}}</span>
                                    </div>
                                </div>
                            
                                <div class="pt-5">
                                    <div class="relative">
                                        <p>END TIME :</p>
                                        <input type="datetime-local" v-model="form2nd.end" @change="checkTimeEnd2ND()" :class="{'border-2 border-red-500' : form2nd.error.e_end}" class="input-memoAdd" size="30">
                                        <span class="relative bottom-0 text-sm text-red-400">{{form2nd.error.e_end}}</span>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-5">
                        
                             <div class="pt-5">
                                  <div class="relative">
                                      <p>IMAGE</p>
                                      <input type="file" multiple @change="selectImagesMore" name="imageMemoMore" class="input-memoAdd" accept="image/png, image/jpeg, image/webp" placeholder="1">
                                      <br>
                                  </div>
                                  <div v-if="image_moreErr == true">
                                    <p class="text-red-400">Images must not be too large over than 2MB!</p>
                                  </div>
                                
                                  <div v-if="images_more" class="flex">
                                    <div v-for="(image, index) in images_more" :key="image.id">
                                      <div class="mt-3 mx-1">
                                        <figure>
                                            <img :src="showSelectImage(image)" class="w-[100px] h-[100px]" alt="picture">
                                        </figure>
                                        <button @click="deleteSelectImageMore(index)" type="button" class="text-white bg-[#c98f8f] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-sm text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                                          Delete
                                        </button>
                                      </div>
                                    </div>
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
                                    <template v-if="data_more != null">
                                        <tr v-for="(item,index) in data_more" :key="index">
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
                                                <span v-for="(image, index) in item.image" :key="index">
                                                  <img :src="showSelectImage(image)" class="w-[50px] h-[50px]" alt="picture_more">
                                                </span>
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
                    
            <h1 class="text-2xl font-medium text-center">การบันทึกลงรายละเอียด</h1>
                <div class="w-11/12  p-5 pt-10">
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
                                    <th class="">Title</th>
                                    <th class="w-16 ">Address</th>
                                    <th class="w-24 ">Description</th>
                                    <th class="">Price</th>
                                    <th class="w-32 ">Image</th>
                                    <th class="w-32">Time</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-grey-100">
                                <template v-if="data_more.length != 0">
                                    <tr v-for="(item,index) in data_more" :key="index" class="bg-white">
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                            <a href="#" class="font-bold text-brown hover:underline ">{{index+1}}</a>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="title" readonly id="" cols="7" rows="2">{{item.title}}
                                            </textarea>
                                        </td>
                                            
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span v-if="item.address.replace(/\s/g, '').length">
                                              <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="address" readonly id="" cols="16" rows="1">{{item.address}}
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
                                          <!-- <img src="../assets/image/journii-logo.png" class="w-[50px] h-[50px]" alt="">
                                          <img src="https://media.timeout.com/images/101705309/image.jpg" class="w-[50px] h-[50px]" alt="">
                                          <img src="https://media.timeout.com/images/101705309/image.jpg" class="w-[50px] h-[50px]" alt="">
                                          <img src="https://media.timeout.com/images/101705309/image.jpg" class="w-[50px] h-[50px]" alt=""> -->
                                          <span v-for="(image, index) in item.image" :key="index" class="overflow-x-auto">
                                            <img :src="showSelectImage(image)" class="w-[50px] h-[50px]" alt="picture_more">
                                          </span>
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
                                        <td colspan="7" class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">กรุณาเพิ่มข้อมูล</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-around">
                        <button href="#normal"  @click="pageNow = 'main'" class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white text-center">Back</button>
                        <button @click="ThirdPageForm()" class="m-1 text-[1.3vw] mt-5 w-1/6 h-8 bg-green rounded-md hover:text-white">Next</button>
                    </div>
          </div>
          </div>
          
          <div id="sum" class="setup-memoAdd mt-[2em]" :class="{'hidden' : pageNow !== 'sum'}"> 
            <h1 class="text-2xl font-medium mt-10">สรุปบันทึก</h1>
            <div class="w-4/5 h-screen p-5 pt-10">
                <div class="flex flex-col justify-center items-center pt-3">
                    <div class='w-[50vw]  border-2 border-[#513F3F]  rounded-md p-4 bg-white'>
                        <template v-if="showForm1st[0] != null">
                            <div v-for="(item, index) in data_main" :key="index">
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
                                <div v-if="images.length !== 0">
                                  <hr class="mt-3">
                                  <div class="mt-3">
                                    <h1>IMAGE :</h1>
                                      <div class="flex">
                                        <div v-for="(image, index) in images" :key="index">
                                          <div class="mt-3 mx-1">
                                          <figure>
                                            <img :src="showSelectImage(image)" class="w-[100px] h-[100px]" alt="picture">
                                          </figure>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
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
                            <thead class="bg-brown-light border-b-2 border-gray-200 text-brown">
                                <tr>
                                    <th class="">No.</th>
                                    <th class="">Title</th>
                                    <th class="w-16 ">Address</th>
                                    <th class="w-24 ">Description</th>
                                    <th class="">Price</th>
                                    <th class="w-32 ">Image</th>
                                    <th class="w-32">Time</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-grey-100 bg-white">
                                <template v-if="data_more.length != 0">
                                    <tr v-for="(item,index) in data_more" :key="index" >
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                            <a href="#" class="font-bold text-brown hover:underline ">{{index+1}}</a>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="title" readonly id="" cols="7" rows="2">{{item.title}}
                                            </textarea>
                                        </td>
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <textarea class="cursor-default focus:outline-none resize-none bg-transparent" name="address" readonly id="" cols="16" rows="1">{{item.address}}
                                            </textarea>
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
                                            <span v-for="(image, index) in item.image" :key="index">
                                            <img :src="showSelectImage(image)" class="w-[50px] h-[50px]" alt="picture_more">
                                          </span>
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
                <div class="flex justify-around py-5">
                    <button @click="SecondForm()" class="m-1 text-[1.1vw] mt-3 h-3/4 p-2 px-3 bg-green rounded-md hover:text-white">Back</button>
                    <button @click="submitMain()" class="m-1 text-[1.1vw] mt-3 h-3/4 p-2 px-3 bg-green rounded-md hover:text-white">Submit</button>
                </div>    
            </div>
          </div>
        </div>
        
        <!-- List Form Button  -->     
        <div class="flex flex-col justify-center items-center w-1/4 pb-1/2 gap-10 ">
          <div class="fixed w-1/4">
                <button href="#normal" @click="FirstPageForm()" class="list-form-btn ">
                    <div class="text-white ">บันทึกเบื้องต้น</div>
                </button>

                <button href="#more" @click="SecondForm()" class="list-form-btn">
                    <div class="text-white">บันทึกลงรายละเอียด</div>
                </button>

                <button href="#sum" class="list-form-btn" @click="ThirdPageForm()">
                  <div class="text-white">สรุป</div>
                </button>
          </div>
        </div>
    </div>

    
</template>

<script>
import axios from '@/plugins/axios'

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
      images: [],
      images_more: [],
      imageErr: false,
      image_moreErr: false,
      pageNow: 'main',
      jour_id: '',

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
      pathNameURL.includes("memo/addJourni/") &&
      this.showForm1st.length != 0
    ) {
      Object.keys(this.form1st.isEdit).forEach((keys) => {
        this.form1st.isEdit[keys] = true;
      });
      localStorage.setItem("isEdit", JSON.stringify(this.form1st.isEdit));
    }
    console.log("Created!");

    window.addEventListener('beforeunload', this.isReload)
  },

  methods: {
    isReload(){
      this.showSelectImage('reload')
    },
    selectImages(event) {
      this.imageErr = false
      this.images = event.target.files;
      const fileSize = 	3145728 //LIMIT 3 MB
      for (let i = 0; i < this.images.length; i++) {
        console.log(this.images[i].size)
        if(this.images[i].size > fileSize){
          this.deleteSelectImage(i)
          this.imageErr = true
        }
      }
    },
    selectImagesMore(event) {
      this.image_moreErr = false
      this.images_more = event.target.files;
      const fileSize = 2097152 //LIMIT 2 MB
      for (let i = 0; i < this.images_more.length; i++) {
        // console.log(this.images_more[i].size)
        if(this.images_more[i].size > fileSize){
          this.deleteSelectImageMore(i)
          this.image_moreErr = true
        }
      }
    },
    showSelectImage(image) {
      if(image === 'reload'){
        return 0
      }
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    deleteSelectImageMore(index) {
      this.images_more = Array.from(this.images_more);
      this.images_more.splice(index, 1);
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
      } else if(this.form1st.co_traveller < 0){ 
        this.form1st.error.e_people = "จำนวณคนห้ามติดลบ";
        return;
      }
      this.form1st.error.e_people = "";
    },
    checkPrice() {
      if (this.form1st.price === "" && this.checkEditForm.price == false) {
        this.form1st.error.e_price = "กรุณาระบุจำนวนค่าใช้จ่าย";
        return;
      } else if(this.form1st.price < 0){ 
        this.form1st.error.e_price = "จำนวณเงินห้ามติดลบ";
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
      // console.log(this.form1st.isChange);
      // console.log(this.form1st.country);
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
        favorite: 0,
      });
      Object.keys(this.form1st.isEdit).forEach((keys) => {
        this.form1st.isEdit[keys] = true;
      });
      localStorage.setItem("data", JSON.stringify(this.data_main));
      console.log(this.data_main)
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
      this.pageNow = 'second'
      // this.$router.push({ name: "addJourni_2" });
    },
    
    FirstPageForm() {
      if (this.showForm1st.length == 0) {
        alert("Please fill out the form!");
      } 
      this.pageNow = 'main'
    },
    SecondForm() {
      if (this.showForm1st.length == 0) {
        alert("Please click the 'Save' or 'Next' button below the form to save!");
        return;
      }
      this.pageNow = 'second'
    },
    ThirdPageForm() {
      if (this.showForm1st.length == 0) {
        alert("Please click the 'Save' or 'Next' button below the form to save!");
        return;
      }
      this.pageNow = 'sum'
    },
    changeOverflow() {
      let body = document.getElementsByTagName("BODY")[0];

      if (this.form2nd.isModalAdd || this.form2nd.isModalDelete) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    },
    submitMain() {
      console.log(this.showForm1st)
      if (confirm("Do you want to submit it?")) {
        let formData = new FormData();
        formData.append("title", this.showForm1st[0].title);
        formData.append("st_address", this.showForm1st[0].st_address);
        formData.append("country", this.showForm1st[0].country);
        formData.append("province", this.showForm1st[0].province);
        formData.append("city", this.showForm1st[0].city);
        formData.append("start", this.showForm1st[0].start);
        formData.append("end", this.showForm1st[0].end);
        formData.append("co_travel", this.showForm1st[0].co_traveller);
        formData.append("price", this.showForm1st[0].price);
        formData.append("descript", this.showForm1st[0].descript);
        for (let i = 0; i < this.images.length; i++) {
          const value = this.images[i];
          formData.append("imageMemo", value)
        }
        axios.post("/memoes/main", formData).then((res) => {
          console.log(res.data)
          this.jour_id = res.data.jour_id
          this.submitMore()
          this.$router.push({name: 'list'})
        }).catch((e) => console.log(e.response.data));

        alert("Data is added successfully!");
        localStorage.removeItem("data");
        localStorage.removeItem("isEdit");
      }
    },
    submitMore(){
       if(this.data_more.length !== 0 && this.jour_id != ''){
          for (let index = 0; index < this.data_more.length; index++) {
            var dataMore = this.data_more[index]
            let formData2 = new FormData();
            formData2.append("title", dataMore.title);
            formData2.append("st_address", dataMore.st_address);
            formData2.append("country", dataMore.country);
            formData2.append("province", dataMore.province);
            formData2.append("city", dataMore.city);
            formData2.append("start", dataMore.start);
            formData2.append("end", dataMore.end);
            formData2.append("price", dataMore.price);
            formData2.append("descript", dataMore.descript);

            for (let i = 0; i < dataMore.image.length; i++) {
              const value = dataMore.image[i];
              formData2.append("imageMemoMore", value)
            }
            console.log(this.jour_id, '<<<<< id')
            axios.post(`/memoes/optional/${this.jour_id}`, formData2).then((res) => {
              console.log(res.data)
            }).catch((e) => console.log(e.response.data));
          }
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
      } else if(this.form1st.price < 0){ 
        this.form1st.error.e_price = "จำนวณเงินห้ามติดลบ";
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
      this.checkCountry2ND();
      this.checkPrice2ND();
      this.checkTimeStart2ND();
      this.checkTimeEnd2ND();

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
        title: this.form2nd.title,
        st_address: this.form2nd.st_address,
        country: this.form2nd.country,
        city: this.form2nd.city,
        province: this.form2nd.province,
        address: address,
        start: this.form2nd.start,
        end: this.form2nd.end,
        price: this.form2nd.price,
        descript: this.form2nd.descript,
        image: this.images_more,
      });

      this.form2nd.title = ''
      this.form2nd.street = ''
      this.form2nd.province = ''
      this.form2nd.city = ''
      this.form2nd.country = ''
      this.form2nd.start = ''
      this.form2nd.end = ''
      this.form2nd.price = ''
      this.form2nd.descript = ''
      this.images_more = ''
      
      console.log(this.data_more)
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
      if (bool == true && this.form2nd.indexDelete.length != 0) {
        let i = 0;
        let sortDESC = this.form2nd.indexDelete.sort().reverse();
        while (i < sortDESC.length) {
          this.data_more.splice(sortDESC[i], 1);
          i++;
        }
      }
      this.form2nd.indexDelete = [];
      this.form2nd.isModalDelete = false;
      this.changeOverflow();
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