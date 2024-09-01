<template>
  <v-app class="">
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>

    </v-toolbar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    tab: null
    //
  }),
}
</script>
