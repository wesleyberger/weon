<template>
  <div id="pano"></div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Object,
      required: false,
    },
    addresses: {
      type: Array,
      required: true,
    },
  },
  async mounted() {
    setTimeout(() => {
      this.loadGoogleMaps().then(() => {
        this.initializeMap();
      });
    }, 2000);
  },
  computed: {
    focusedAddress() {
      return this.focus ? this.focus : this.addresses[0];
    },
  },
  watch: {
    focus() {
      this.initializeMap();
    },
  },
  methods: {
    async initializeMap() {
      const lat = this.focusedAddress.lat;
      const lng = this.focusedAddress.lng;
      const fenway = { lat, lng };
      console.log(fenway, "fenway");
      const map = await new google.maps.Map(document.getElementById("pano"), {
        center: this.focus,
        zoom: 14,
      });
      const panorama = await new google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
          position: fenway,
          pov: {
            heading: 34,
            pitch: 10,
          },
        }
      );
      map.setStreetView(panorama);
    },
    async loadGoogleMaps() {
      return await new Promise((resolve) => {
        if (typeof google === "undefined") {
          const apiKey = "AIzaSyC3BZTZOMMR6aH9P6P7q91c27zsw1xe4K0";
          var script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          resolve();
        }
      });
      },
    },
};
</script>
<style scoped>
#pano {
  height: 100%;
  width: 100%;
}
</style>