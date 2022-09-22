<template>
    <div>
    <div>
 <searchBar :temp='link' @searching="tableSearch"/>
    </div>
    <div>
     <v-form refs="forms">
            <v-dialog width="500" v-model="dialog">

                <template v-slot:activator="{ on, attrs }">
                    <v-flex text-right align-right>
                        <v-btn color="primary" v-bind="attrs" v-on="on">
                            Add new
                        </v-btn>
                    </v-flex>
                </template>
                <v-card class="white">

                    <v-text-field v-model="element.id" label="id" value="id"  filled>
                    </v-text-field>
                    <v-text-field v-model="element.hotelName" label="hotelName" value="name" filled>
                    </v-text-field>
                    <v-text-field v-model="element.hotelDoorNo" label="hotelDoorNo" value="doorno" filled>
                    </v-text-field>
                    <v-text-field v-model="element.hotelLandmark" label="hotelLandmark" value="landmark" filled>
                    </v-text-field>
                    <v-text-field v-model="element.hotelStreet" label="hotelStreet" value="street" filled>
                    </v-text-field>
                    <v-text-field v-model="element.hotelPincode" label="hotelPincode" value="pincode" filled>
                    </v-text-field>
                    <v-text-field v-model="element.customerId" label="customerId" value="cusid" filled>
                    </v-text-field>
                    <v-flex text-center align-center>
                        <v-btn color="primary" @click="cancel">
                            cancel
                        </v-btn>
                        <v-btn v-if="add" color="primary" @click="postData">
                            submit
                        </v-btn>
                        <v-btn v-else color="primary" @click="update()">
                            update
                        </v-btn>


                    </v-flex>
                    
                   
                </v-card>
            </v-dialog>
        </v-form>
        <v-simple-table>
        <thead>
            <tr>
            <th>id
               
                 <button @click="sortIdAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                 <button @click="sortIdDescFn()"><span class="mdi mdi-arrow-down"></span></button>
            </th>
            <th>hotelName
               
                <button @click="sortNameAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                <button @click="sortNameDescFn()"><span class="mdi mdi-arrow-down"></span></button>
            </th>
            <th>address </th>
          <th>customerId
               
               <button @click="sortAscFn()"><span class="mdi mdi-arrow-up"></span></button>
               <button @click="sortDescFn()"><span class="mdi mdi-arrow-down"></span></button>
          </th>
          <th>ownerName</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(details,i) in arr" :key="i">
               
                <td>{{details.id}}</td>
                <td >{{details.hotelName }}</td>
                <td>{{details.address}}</td>
                <td>{{details.customerId}}</td>
                <td>{{details.customerName}}</td>
                
                
                   
       <v-btn             
             color="primary"
            @click="deleteData(details.id)"
            >
           Delete
           </v-btn>
           <v-btn             
             color="primary"
            @click="editdata(details)"
            >
           edit
       
           </v-btn>
           
        </tr>
    </tbody>
    </v-simple-table>
  
    
</div>
</div>
  </template>
  <script>
    import axios from"axios"
   
    export default {
      data () {
        return {
         valform:{},
          arr:[],
          list:[],
          element:{
            id:null,
            hotelName:'',
            hotelDoorNo:'',
            hotelLandmark:'',
            hotelStreet:'',
            hotelPincode:'',
            customerId:''
          },
          link: "http://127.0.0.1:3333/hotel/searching",
            isEdit:false,
            row:'',
            dialog:false,
            add:true,
        }
    },
        
        mounted()
        {
         axios.get('http://127.0.0.1:3333/hotel/address')
       
            .then((resp)=>{this.arr=resp.data
            console.log(this.arr)})
           
            // axios.get('http://127.0.0.1:3333/hotel/get')
            //     .then((resp)=>{this.arr=resp.data
            // console.log(this.arr)})
        }, 
        methods:
        {
            postData(){
                
                axios.post('http://127.0.0.1:3333/hotel/add',
                {
                   
                    id:this.element.id,
                    hotelName:this.element.hotelName,
                    hotelDoorNo:this.element.hotelDoorNo,
                    hotelLandmark:this.element.hotelLandmark,
                    hotelStreet:this.element.hotelStreet,
                    hotelPincode:this.element.hotelPincode,
                    customerId:this.element.customerId
                
                })
            //     axios.get('http://127.0.0.1:3333/hotel/get')
            //     .then((resp)=>{this.arr=resp.data
            // console.log(this.arr)}),
                this.dialog = false
                },
                
               
               
                async deleteData(id) 
                {
                    
                    await axios.delete(`http://127.0.0.1:3333/hotel/remove/${id}`)

                    axios.get('http://127.0.0.1:3333/hotel/get').then((resp)=>this.arr=resp.data)
                    

                    
                },
                
                
                editdata(details) {
                    console.log(details)
                    this.add = false
                    this.dialog = true
                    this.valform = details
                    this.element.id = details.id
                    console.log(this.element.id)
                    this.element.hotelName = details.hotel_name
                    this.element.hotelDoorNo = details.hotel_doorno
                    this.element.hotelLandmark= details.hotel_landmark
                    this.element.hotelStreet = details.hotel_street
                    this.element.hotelPincode =details.hotel_pincode   
                    this.element.customerId = details.customer_id  
                },
                update(){
                     const data = {
                        id:this.element.id,
                        hotelName : this.element.hotelName,
                        hotelDoorNo: this.element.hotelDoorNo,
                        hotelLandmark : this.element.hotelLandmark,
                        hotelStreet:this.element.hotelStreet,
                        hotelPincode:this.element.hotelPincode,
                        customerId : this.element.customerId,
                     }
                   
                    console.log(data)
                    axios.post('http://127.0.0.1:3333/hotel/update',
                        data)
                    // this.add=true
                    // this.revert()
                    // this.$refs.forms.reset()
                    
                },
                sortIdAscFn() {
                    axios.get('http://127.0.0.1:3333/hotel/sortIdAsc')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
                sortIdDescFn() {
                    axios.get('http://127.0.0.1:3333/hotel/sortIdDesc')
                    .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
        sortNameAscFn() {
          axios.get('http://127.0.0.1:3333/hotel/sortAscName')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })

        },
        sortNameDescFn() {
            axios.get('http://127.0.0.1:3333/hotel/sortDescName')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })

        },
        sortAscFn() {
                    axios.get('http://127.0.0.1:3333/hotel/sortAsc')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
                sortDescFn() {
                    axios.get('http://127.0.0.1:3333/hotel/sortDesc')
                    .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
        
                revert(){
                   
                    this.id='',
                    this.hotelName=''
                    this.hotelDoorno=''
                    this.hotelLandmark=''
                    this.hotelStreet=''
                    this.hotelPincode=''
                    this.customerId=''
                },
                cancel(){
                    this.add=true
                    this.dialog=false
                    this.revert()
                },
                tableSearch(value){
            this.arr = value.data
        },
            }
    
 }
          </script>