<template>
<v-app>
  <TopBar appName="DEVEL" />
  <SideBar />
  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
  </v-footer>
</v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';
import SideBar from './components/SideBarMenu.vue';
export default {
  name: 'App',
  components: {
    TopBar,
    SideBar,
  },
};
</script>
<style scoped>
* {
  font-family: 'Roboto', sans-serif;
  background-color: #111827;
}
.v-toolbar {
  z-index: 99999;
}
</style>