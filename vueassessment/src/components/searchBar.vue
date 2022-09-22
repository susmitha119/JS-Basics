<template>
    <v-div>
   
 
        <v-text-field
                v-model="searchKey"
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
    Vue.use(VueAxios,axios)
    // @ is an alias to /src
    export default {
      name: 'searchBar',
      components: {
      },
      methods:{
        async Search() {
          console.log(this.temp)
            await Vue.axios.post(this.temp, {
                searchKey: this.searchKey
            }).then((response) => {
           
               this.$emit('searching',response)
            })
          },
          
        },
        props: {
          temp:String,
        }
    }
    </script>