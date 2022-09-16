<template>
    <v-div>
   
  <h1>test</h1>
        <v-text-field
                v-model="finding"
                label="search"
                value="search"
                @keyup="Search"
               >Search
                </v-text-field>
        <!-- <v-btn       
            color="success"
            @click="Search"
            >
            Search
        </v-btn> -->
      </v-div>

</template>
    
    <script>
    import  Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
    import {searchData} from '../service/apiFile.js'
    Vue.use(VueAxios,axios)
    // @ is an alias to /src
    export default {
      name: 'searchBar',
      finding:"",
      components: {
      },
      methods:{
        async Search() {
            console.log("working")
            let value=await searchData(this.finding)
                
               this.$emit('searching',value)
            
          },
          
        },
        props: {
          temp:String,
        }
    }
    </script>