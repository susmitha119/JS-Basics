<template>
<v-app><v-div>
    <v-text-field
            v-model="id"
            label="search"
            width="500"
            value="search"
            filled
            outlined>Search
            </v-text-field>
    <v-btn       
        color="success"
        @click="Search"
        >
        Search
    </v-btn>
  </v-div>
</v-app>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
  }
}
</script>