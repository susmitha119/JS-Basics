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

                    <v-text-field v-model="element.customerId" label="customerId" value="id"  filled>
                    </v-text-field>
                    <v-text-field v-model="element.customerName" label="customerName" value="name" filled>
                    </v-text-field>
                    <v-text-field v-model="element.phoneNumber" label="phoneNumber" value="departement" filled>
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
            <th>customerId
               
                 <button @click="sortIdAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                 <button @click="sortIdDescFn()"><span class="mdi mdi-arrow-down"></span></button>
            </th>
            <th>customerName
               
                <button @click="sortNameAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                <button @click="sortNameDescFn()"><span class="mdi mdi-arrow-down"></span></button>
            </th>
            <th>phoneNumber
               
                <button @click="sortAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                <button @click="sortDescFn()"><span class="mdi mdi-arrow-down"></span></button>
            </th>
            <th>
                HotelCount
            </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(details,i) in arr" :key="i">
               
                <td>{{details.customer_id}}</td>
                <td >{{details.customer_name  }}</td>
                <td>{{details.phone_number}}</td>
                <td>{{details.hotel_count}}</td>
                   
       <v-btn             
             color="primary"
            @click="deleteData(details)"
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
          element:{
            customerId:null,
            customerName:'',
            phoneNumber:''
          },
          link: "http://127.0.0.1:3333/customer/search",
         isEdit:false,
                row:'',
                dialog:false,
                add:true,
        }
        
    },
        
        mounted()
        {
         axios.get('http://127.0.0.1:3333/customer/count')
            .then((resp)=>{this.arr=resp.data
            console.log(this.arr)})
        }, 
        methods:
        {
            postData(){
                axios.post("http://127.0.0.1:3333/customer/post",
                {
                    customerId:this.element.customerId,
                    customerName:this.element.customerName,
                    phoneNumber:this.element.phoneNumber
                })
                this.dialog = false
                },
               
                async deleteData(details) 
                {
                    console.log(details)
                    await axios.delete(`http://127.0.0.1:3333/delete/${details.customer_id}`)

                    axios.get('http://127.0.0.1:3333/customer/get').then((resp)=>this.arr=resp.data)
                    

                    
                },
                
                
                editdata(details) {
                    console.log(details)
                    this.add = false
                    this.dialog = true
                    this.valform = details
                    this.element.customerId = details.customer_id
                    console.log(this.element.customerId)
                    this.element.customerName = details.customer_name
                    this.element.phoneNumber =details.phone_number       
                },
                update(){
                     const data = {
                        customerId : this.element.customerId,
                        customerName : this.element.customerName,
                        phoneNumber : this.element.phoneNumber,
                     }
                   
                    console.log(data)
                    axios.post('http://127.0.0.1:3333/customer/updated',
                        data)
                    // this.add=true
                    // this.revert()
                    // this.$refs.forms.reset()
                    
                },
                sortIdAscFn() {
                    axios.get('http://127.0.0.1:3333/customer/sortAsc')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
                sortIdDescFn() {
                    axios.get('http://127.0.0.1:3333/customer/sortDesc')
                    .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
        sortNameAscFn() {
          axios.get('http://127.0.0.1:3333/customer/sortAscName')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })

        },
        sortNameDescFn() {
            axios.get('http://127.0.0.1:3333/customer/sortDescName')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })

        },
        sortAscFn() {
            axios.get('http://127.0.0.1:3333/customer/sortAscPhone')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data

                })

        },

        sortDescFn() {
            axios.get('http://127.0.0.1:3333/customer/sortDescPhone')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })

        },
        
                revert(){
                    this.name=''
                    this.id=''
                    this.departement=''
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