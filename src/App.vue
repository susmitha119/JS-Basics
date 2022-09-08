<template>
  <v-app>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
      
      <v-dialog 
      v-model="dialog"
       >
      <template v-slot:activator="{ on,attr }">
      <v-flex text-right align-right>
      <v-btn 
          color="primary"
          v-bind="attr"
          v-on="on"
        >
          ADD NEW
      </v-btn>
    </v-flex>
     
      </template>
     
    <v-card-text class="white">
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
      <v-radio-group v-model="gender">
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
        v-model="hobbies"
          v-for="(hobbi, i) in hobbie"
          :key="i"
          :value="hobbi"
          :label="hobbi"
          :item="hobbie"
        ></v-checkbox>  
        
          <v-btn
            color="blue"
            @click="validate"
            v-if="!random"
          >
            Validate
          </v-btn>
          
          <v-btn
            color="success"
            @click="editInfo"
            v-if="random"
            >
            Edit
          </v-btn>
      </v-card-text>
       </v-dialog>
      </v-form>

      <v-simple-table>
        <template>
        <thead>
            <tr>
              <th>ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Course</th>
            <th scope="col">Hobbies</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(data,i) in result" :key="i">
                <td>{{data.id}}</td>
                <td>{{data.name}}</td>
                <td>{{data.email}}</td>
                <td>{{data.gender}}</td>
                <td>{{data.course}}</td>
                <td>{{data.hobbies}}</td>
    <td>
                <v-btn @click="Delete(data)">Delete</v-btn></td>
           <td>  <v-btn @click="edit(data)">Edit</v-btn></td>

            </tr>
        </tbody>
    </template>
     </v-simple-table>

     
  </v-app>
</template>
 
 <script>
export default {
  name: 'App',

  data: () => ({
      name:"",
      dialog: false,
      id:0,
      namerule:[
        name=>!!name||'Name is required',
        name=>/^[a-zA-z]+$/.test(name)||'Name must be valid'
      ],
      
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      
      choice:['Female','Male'],
      gender:'',
      
      items: ['IT','CSE','EEE','ECE'],
      course:'',
      select:[ 
          v => !!v || 'course is required',
      ],
      
      hobbie:['reading','playing','swimming','cooking'],
      hobbies:[],
      
      result:[],
      random:false,
      new:{}
     
    }),
    
    
    methods:{
      validate(){
        
        if(this.$refs.form.validate()){
        this.id++,
        this.random=false
        this.result.push({
          id:this.id,
          name: this.name,
          email: this.email,
          gender: this.gender,
          course:this.course,
          hobbies:this.hobbies

          
        })
        this.dialog = false
        this.$refs.form.reset()
        //console.log(JSON.stringify(this.result));
      }
    }
,      Delete(data)
    {
      this.editedIndex = this.result.indexOf(data)
      
        this.result.splice(data,1)
    },
   
    edit(data) {     
        this.dialog = true  
        this.random=true

        this.new = data
       
        let id = data.id
        let obj= this.result.find(o => o.id == id)
        this.name = data.name
        this.email = data.email
        this.gender = data.gender
        this.course = data.course
        this.hobbies = data.hobbies
        this.dialog = true  
       
        this.dialog=true
        console.log(obj)
    
     }, 
      editInfo(){
        this.$refs.form.validate()
        this.dialog=false
        let item=this.result.findIndex(temp=>temp.id==this.new.id)
        this.result[item].name=this.name
        this.result[item].email=this.email
        this.result[item].gender = this.gender
        this.result[item].course=this.course
        this.result[item].hobbies=this.hobbies
   
        this.dialog=false
        this.random=false
        this.$refs.form.reset()


      },
      },
      
    };
   

</script>
