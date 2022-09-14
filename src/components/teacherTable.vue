<template>
  <div>
      
        <div>
                    <searchBar :temp='link' @searching="tableSearch"/>
    </div>
        <div>

            <v-form
            refs = "teacherforms">
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
        <!-- <v-text-field
                v-model="finding"
                label="finding"
                value="search"
                >Search
                </v-text-field>
        <v-btn       
            color="success"
            @click="Search"
            >
            Search
        </v-btn> -->
       
        </v-flex>    
    </template>
            <v-card class="white">
               
        
            <v-text-field
            v-model="id"
            label="id"
            value="id"
            filled>
            </v-text-field>
            <v-text-field
            v-model="age"
            label="age"
            value="age"
            filled>
        </v-text-field>
        <v-text-field
            v-model="salary"
            label="salary"
            value="salary"
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
            <th>age</th>
            <th>salary</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(values,i) in arr" :key="i">
            
            <td>{{values.id}}</td>
            <td>{{values.age }}</td>
                <td v-amount="5000">{{values.salary}}</td>
                
                <v-btn             
             color="primary"
             @click="deleteData(values.id)"
            >
            Delete
        </v-btn>
           <v-btn             
           color="primary"
            @click="editdata(values)"
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
    import  Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"


    Vue.use(VueAxios,axios)

    export default{
    name: "teacherTable",
    data() {
        return {
            valform: {},
            arr: [],
            id: "",
            age: "",
            salary: "",
            isEdit: false,
            row: "",
            dialog: false,
            add: true,
            finding: "",
            link: "http://127.0.0.1:3333/getInfo"
        };
    },
    mounted() {
        Vue.axios.get("http://127.0.0.1:3333/get/").then((resp) => this.arr = resp.data);
    },
    methods: {
        postData() {
            Vue.axios.post("http://127.0.0.1:3333/add/", {
                id: this.id,
                age: this.age,
                salary: this.salary
            }).then((response) => {
                console.log(response.data);
                this.id = "",
                    this.age = "",
                    this.salary = "";
            });
            this.dialog = false;
        },
        deleteData(id) {
            Vue.axios.delete(`http://127.0.0.1:3333/remove/${id}`);
            Vue.axios.get("http://127.0.0.1:3333/get/").then((resp) => this.arr = resp.data);
            // },
            // async Search() {
            //     await Vue.axios.post("http://127.0.0.1:3333/getInfo", {
            //         finding: this.finding
            //     }).then((response) => {
            //         this.arr = response.data;
            //         console.log(response.data);
            //     });
        },
        editdata(values) {
            this.add = false;
            this.dialog = true;
            this.valform = values;
            // this.isEdit=true
            this.id = values.id;
            this.age = values.age;
            this.salary = values.salary;
            // this.id=this.arr[id].id
            // this.name=this.arr[id].name
            // this.departement=this.arr[id].departement
            // this.row=id
            // this.isEdit=true
        },
        getData(value) {
            this.arr = value.data;
        },
        update() {
            let test = this.arr.findIndex(trail => trail.id == this.valform.id);
            this.arr[test].id = this.id;
            this.arr[test].age = this.age;
            this.arr[test].salary = this.salary;
            this.dialog = false;
            // this.editform=true
            Vue.axios.put("http://127.0.0.1:3333/upgrade/", {
                id: this.id,
                name: this.age,
                departement: this.salary
            });
            this.add = true;
            this.revert();
            this.$refs.teacherforms.reset();
        },
        revert() {
            this.age = "";
            this.id = "";
            this.salary = "";
        },
        cancel() {
            this.add = true;
            this.dialog = false;
            this.revert();
        }, 
        tableSearch(val){
            this.arr = val.data
        },
    }
}
 
</script>
        
        
            
       
       
       
     
    
        