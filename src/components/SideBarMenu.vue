<template>
  <v-navigation-drawer app permanent>
    <v-list dense>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/address">
        <v-list-item-icon>
          <v-icon>mdi-map-marker-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Cadastrar endereço</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
  
  <script>
export default {
  name: "SideMenu",
};
</script>
  
<style scoped>
.v-navigation-drawer {
  top: 64px !important;
  height: 89% !important;
  background-color: #1f2937 !important;
}
.v-list-item__title {
  color: #fff !important;
}
.v-list-item--active {
  background-color: #4bc37d !important;
  transition: 0.4s ease-in-out !important;
}
.v-icon {
  color: #fff !important;
}
</style>
  