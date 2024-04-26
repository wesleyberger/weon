<template>
  <div class="map-container">
    <div id="map" class="map-container" ref="mapContainer" ></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { set } from 'vue';

export default {
  props: {
    address: {
      type: Array,
      required: true,
    },
    focus: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      map: null,
      isKey: 0,
    };
  },
  computed: {
    focusedAddress() {
      return this.focus ? this.focus : this.address[0];
    },
  },
  async mounted() {
   setTimeout(() => {
    this.initializeMap();
    }, 2000);
  },
  watch: {
    focus() {
      this.map.setView(this.focusedAddress, 15)
    },
  },
  methods: {
    async initializeMap() {
      this.map = L.map(this.$refs.mapContainer);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);

      const markeris = require("@/assets/marker.png");
      const markerIcon = L.icon({
        iconUrl: markeris, //
        iconSize: [48, 48],
      });
      console.log(this.address, 'address map');
      
      this.address.forEach((element, index) => {
            L.marker([element.lat, element.lng], {
              icon: markerIcon,
            }).addTo(this.map).bindPopup(
              `<b>${element.street}</b><br>${element.neighborhood}<br>${element.city}`
            );
          });
          console.log(this.focusedAddress, "focus");
      const lat = parseFloat(this.focusedAddress.lat);
      const lng = parseFloat(this.focusedAddress.lng);
      const focus = { lat, lng };
      await this.map.setView(focus, 15);
    },
  },
};
</script>
<style scoped>
.map-container {
  display: flex;
  width: 99%;
  height: 88vh;
}
#map {
  width: 100%;
  height: 97%;
  background-color: #f1f1f1;
}
</style>
