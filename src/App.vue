<template>
  <v-app>
    <router-link to="/customerForm">customerForm</router-link> 
    <router-link to="/hotelForm">hotelForm</router-link><router-view/>
  </v-app>
</template>

<script>

export default {
    name: "App",
    data: () => ({}),
    components: {  }
};
</script>
