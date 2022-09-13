<template>
    <v-app>
        <v-form
        refs = "forms">
            <v-dialog
            width="500"
            v-model="dialog">
            
            <template v-slot:activator="{ on, attrs }">
            <v-flex text-right align-right>
            <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
         >
          Add new
          </v-btn>
        </v-flex>    </template>
            <v-card class="white">
        
            <v-text-field
            v-model="id"
            label="id"
            value="id"
            filled>
            </v-text-field>
            <v-text-field
            v-model="name"
            label="name"
            value="name"
            filled>
        </v-text-field>
        <v-text-field
            v-model="departement"
            label="departement"
            value="departement"
            filled>
        </v-text-field>
        <v-flex text-center align-center>
            <v-btn        
             color="primary"
            @click="cancel"
             >
           cancel
           </v-btn>
            <v-btn v-if="add"         
             color="primary"
            @click="postData"
             >
           submit
           </v-btn>
           <v-btn v-else        
             color="primary"
            @click="update"
             >
           update
           </v-btn>

          
        </v-flex>
        </v-card>
    </v-dialog>
        </v-form>
    <v-simple-table>
        <thead>
            <tr>
            <th>id</th>
            <th>name</th>
            <th>departement</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(details,i) in arr" :key="i">
               
                <td>{{details.id}}</td>
                <td>{{details.name | trim }}</td>
                <td>{{details.departement}}</td>
                   
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
</v-app>
</template>
<script>
    import  Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
    Vue.use(VueAxios,axios)

    export default{
        name:"NewFile",
        data(){
            return {
                valform:{},
                arr:[],
                id:'',
                name:'',
                namerule:[
                name=>!!name||'Name is required',
                name=>/^[a-zA-z]+$/.test(name)||'Name must be valid'
                ],
                departement:'',
                isEdit:false,
                row:'',
                dialog:false,
                add:true
            }


        },
        mounted(){
            Vue.axios.get('http://127.0.0.1:3333/read/').then((resp)=>this.arr=resp.data)
        }, 
        methods:
        {
            postData(){
                Vue.axios.post("http://127.0.0.1:3333/create/",
                {
                    id:this.id,
                    name:this.name,
                    departement:this.departement
                }).then((response)=>{
                    console.log(response.data);
                    this.id='',
                    this.name="",
                    this.departement=""
                });
                this.dialog = false
                },
               
                async deleteData(id) 
                {
                    
                    await Vue.axios.delete(`http://127.0.0.1:3333/delete/${id}`)
                    Vue.axios.get('http://127.0.0.1:3333/read/').then((resp)=>this.arr=resp.data)
                    

                    
                },
                
                
                editdata(details) {
                    this.add = false
                    this.dialog = true
                    this.valform = details
                    // this.isEdit=true
                    this.id = details.id
                    this.name = details.name
                    this.departement = details.departement
                    
                    // this.id=this.arr[id].id
                    // this.name=this.arr[id].name
                    // this.departement=this.arr[id].departement
                    // this.row=id
                    
                    // this.isEdit=true
                    
                },
                update(){
                    let test = this.arr.findIndex(temp => temp.id == this.valform.id)
                    this.arr[test].id = this.id
                    this.arr[test].name = this.name
                    this.arr[test].departement = this.departement
                    this.dialog=false
                    // this.editform=true
                    Vue.axios.put('http://127.0.0.1:3333/update/',{
                        id:this.id,
                        name:this.name,
                        departement:this.departement
                        


                    })
                    this.add=true
                    this.revert()
                    this.$refs.forms.reset()
                    
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
                }
                
        }
    }
 
</script>