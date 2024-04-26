<template>
  <v-app-bar app>
    <v-toolbar-title>{{ appName }}</v-toolbar-title>
  </v-app-bar>
</template>
  
  <script>
export default {
  name: "TopBarMenu",
  props: {
    appName: {
      type: String,
      required: true,
    },
  },
};
</script>
  
  <style scoped>
.v-app-bar--fixed {
  left: 0 !important;
  z-index: 99999 !important;
  background-color: #1f2937 !important;
}
.v-toolbar__title {
  color: #4bc37d !important;
  font-size: 28px !important;
  font-weight: 500 !important;
  font: Roboto, sans-serif !important;
}
</style>
  