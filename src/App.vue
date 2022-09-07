<template>
  <v-app>
    <v-form>
     

      <v-text-field 
          placeholder="Name"
          v-model="name"
          label="Name"
          :rules="namerule"
          filled
      ></v-text-field>
      
      
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        filled
       ></v-text-field>  
        
       
      <label>Gender</label>
      <v-radio-group v-model="radioGroup">
        <v-radio
          v-for="(choice, i) in choice"
          :key="i"
          :label="choice"
          :value="choice"
          :choice="choice"
      ></v-radio>
      </v-radio-group>
       
       
      <v-combobox
        v-model="course"
          :items="items"
          label="Select Course"
          :rules="select"
       
      ></v-combobox>
      
     <label>Hobbies</label>
        <v-checkbox
        v-model="checkbox"
          v-for="(hobbies, i) in hobbies"
          :key="i"
          :label="hobbies"
          :value="hobbies"
          :item="hobbies"
        ></v-checkbox>  
         <v-btn  
            depressed
            color="primary"
            @click="submit"
         >
         Submit
       </v-btn>  
      </v-form>
  </v-app>
</template>
 
 <script>
export default {
  name: 'App',

  data: () => ({
      name:"",
      namerule:[
        name=>!!name||'Name is required'
      ],
      
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      
      choice:['Female','Male'],
      radioGroup:'',
      
      items: ['IT','CSE','EEE','ECE'],
      course:'',
      select:[ 
          v => !!v || 'course is required',
      ],
      
      hobbies:['reading','playing','swimming','cooking'],
      checkbox:[],
      result: [],
    }),
    
    
    methods:{
      submit(){
        this.result.push({
          name: this.name,
          email: this.email,
          gender: this.radioGroup,
          course:this.course,
          hobbies:this.checkbox
        })
        console.log(JSON.stringify(this.result));
      }
    }
};
</script>
