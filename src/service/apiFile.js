import axios from 'axios';
// import { log } from 'console';
// import { get } from 'core-js/core/dict';
// import Vue from 'vue';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios,axios)

async function getData(){
    const result = await axios.get(`${process.env.VUE_APP_URL}/read/`)
    console.log(result)
    return result.data
 }
async function addData(value){
    console.log('submit', value.id);
    return await axios.post(`${process.env.VUE_APP_URL}/create/`,
    {
        id:value.id,
        name:value.name,
        departement:value.departement,
        salary:value.salary
    })
 }
 async function deleteData(id){
    return await axios.delete(`${process.env.VUE_APP_URL}/delete/${id}`)
 }
 async function editData(value){
    return await axios.put(`${process.env.VUE_APP_URL}/update/`,
    {
        id:value.id,
        name:value.name,
        departement:value.departement,
        salary:value.salary

    })
 }
 async function sortAsc(){
     const result=await  axios.get(`${process.env.VUE_APP_URL}/SortAce`)
     return result.data
 }
 async function sortDesc(){
     const result = await axios.get(`${process.env.VUE_APP_URL}/SortDesc`)
     return result.data
   
     }
async function ascName(){
    const result=await  axios.get(`${process.env.VUE_APP_URL}/SortAceName`)
    return result.data
    
     }
 async function descName(){
    const result=await axios.get(`${process.env.VUE_APP_URL}/SortDescName`)
    return result.data
    
     }
async  function ascDepartement(){
    const result=await axios.get(`${process.env.VUE_APP_URL}/SortAceDepartement`)
    return result.data
  
     }
 async function descDepartement()
 {
    const result=await axios.get(`${process.env.VUE_APP_URL}/SortDescDepartement`)
    return result.data
    
}
async  function ascSalary(){
    const result=await axios.get(`${process.env.VUE_APP_URL}/SortAceSalary`)
    return result.data
  
     }
 async function descSalary()
 {
    const result=await axios.get(`${process.env.VUE_APP_URL}/SortDescSalary`)
    return result.data
    
}
async function searchData(value){
    console.log(value)
    return await axios.post(`${process.env.VUE_APP_URL}/getName/`,
    {
        finding:value

    })
 }

 export { getData,addData,deleteData,editData,descDepartement,ascDepartement,sortDesc,sortAsc,descName,ascName,searchData,descSalary,ascSalary}

