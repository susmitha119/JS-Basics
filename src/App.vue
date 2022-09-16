<!-- <template>
  <div>
  <routerLink to="/employeeData"></routerLink>
    <router-view/>
  </div>
    
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script> -->
<template>
  <v-main>
    <v-app>
    <div>
   <employeeData />
   
      <router-view />
    </div>
  </v-app>
</v-main>
</template>

<script>


import employeeData from './components/employeeData.vue';

export default {
name: 'App',
components: {
    
    employeeData
},
data: () => ({
  
}),
};
</script>