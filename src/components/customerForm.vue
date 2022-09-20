<template>
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
                <button @click="sortIdDescFn()"><span class="mdi mdi-arrow-down"></span></button>
                 <button @click="sortIdAscFn()"><span class="mdi mdi-arrow-up"></span></button>
            </th>
            <th>customerName
                <button @click="sortNameDescFn()"><span class="mdi mdi-arrow-down"></span></button>
                <button @click="sortNameAscFn()"><span class="mdi mdi-arrow-up"></span></button>
            </th>
            <th>phoneNumber
                <button @click="sorttDescFn()"><span class="mdi mdi-arrow-down"></span></button>
                <button @click="sortAscFn()"><span class="mdi mdi-arrow-up"></span></button>
            </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(details,i) in arr" :key="i">
               
                <td>{{details.customer_id}}</td>
                <td >{{details.customer_name  }}</td>
                <td>{{details.phone_number}}</td>
                   
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
  </template>
  <script>
     import  Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
   
    Vue.use(VueAxios,axios)
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
         isEdit:false,
                row:'',
                dialog:false,
                add:true,
        }
    },
        
        mounted()
        {
            Vue.axios.get('http://127.0.0.1:3333/get/')
            .then((resp)=>{this.arr=resp.data
            console.log(this.arr)})
        }, 
        methods:
        {
            postData(){
                Vue.axios.post("http://127.0.0.1:3333/post/",
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
                    await Vue.axios.delete(`http://127.0.0.1:3333/delete/${details.customer_id}`)

                    Vue.axios.get('http://127.0.0.1:3333/get/').then((resp)=>this.arr=resp.data)
                    

                    
                },
                
                
                editdata(details) {
                    console.log(details)
                    this.add = false
                    this.dialog = true
                    this.valform = details
                    this.customerId = details.customer_id
                    console.log(this.customerId)
                    this.customerName = details.customer_name
                    this.phoneNumber =details.phone_number
                    
                  
                    
                },
                update(){
                    let test = this.arr.findIndex(trail => trail.customerId == this.valform.customerId)
                    this.arr[test].customerId = this.element.customerId
                    this.arr[test].customerName = this.element.customerName
                    this.arr[test].phoneNumber = this.element.phoneNumber
                    this.dialog=false
                    // this.editform=true
                    Vue.axios.put('http://127.0.0.1:3333/updated/',{
                        customerId:this.element.customerId,
                        customerName:this.element.customerName,
                        phoneNumber:this.element.phoneNumber
                        


                    })
                    this.add=true
                    this.revert()
                    this.$refs.forms.reset()
                    
                },
                sortIdAscFn() {
                    Vue.axios.get('http://127.0.0.1:3333/sortAce/')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
        sortIdDescFn() {
            Vue.axios.get('http://127.0.0.1:3333/sortDesc/')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })
        },
        sortNameAscFn() {
            Vue.axios.get('http://127.0.0.1:3333/sortAscName/')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })

        },
        sortNameDescFn() {
            Vue.axios.get('http://127.0.0.1:3333/sortDescName/')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data
                })

        },
        sortAscFn() {
            Vue.axios.get('http://127.0.0.1:3333/sortAscPhone/')
                .then((res) => {
                    console.log(res)
                    this.arr = res.data

                })

        },

        sortDescFn() {
            Vue.axios.get('http://127.0.0.1:3333/sortDescPhone/')
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
            }
    
}
          </script>