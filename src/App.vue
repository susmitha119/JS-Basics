<template>
  <v-main>
    <v-app>
    <div>
   <studentTable />
    <!-- <teacherTable />  -->
      <router-view />
    </div>
  </v-app>
</v-main>
</template>

<script>

import studentTable from './components/studentTable.vue';
// import teacherTable from './components/teacherTable.vue'
export default {
name: 'App',
components: {
    
    studentTable,
    //  teacherTable
},
data: () => ({
  //
}),
};
</script>