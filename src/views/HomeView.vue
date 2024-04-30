<template>
    <div class="main" v-if="addresses.length > 0">
      <div class="map">
        <map-leaf :address="addresses" :focus="focusItem"></map-leaf>
        <street-view :focus="focusItem" :addresses="addresses"></street-view>
      </div>
      <div class="details">
        <list-items
          v-for="(item, index) in addresses"
          :key="index"
          :item="item"
          @click="markerUpdate(item)"
        ></list-items>
      </div>
    </div>
</template>

<script>
import ListItems from "@/components/ListItems.vue";
import MapLeaf from "@/components/MapLeaf.vue";
import StreetView from "@/components/StreetView.vue";
export default {
  name: "HomeView",

  components: {
    ListItems,
    MapLeaf,
    StreetView,
  },
  data() {
    return {
      addressAddCoordinates: [],
      focusItem: null,
    };
  },
  computed: {
    addresses() {
      return this.$store.getters.addresses
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
    },
  },
  async mounted() {
    this.addressCoordinates();
  },
  methods: {
    markerUpdate(item) {
      console.log(item, "markeritem");
      this.focusItem = item;
    },
    addressCoordinates() {
      console.log(this.addresses, "addresses");
      this.addressAddCoordinates = this.addresses.map((address) => {
        this.getAddressCoordinates(
          address.street + ", " + address.neighborhood + ", " + address.city
        ).then((coordinates) => {
          if (coordinates) {
            address.lat = parseFloat(coordinates.latitude);
            address.lng = parseFloat(coordinates.longitude);
          }
        });
      });
    },
    async getAddressCoordinates(address) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          return { latitude: lat, longitude: lon };
        } else {
          throw new Error("Endereço não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao obter coordenadas:", error);
        return null;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main {
  display: flex;
  @media screen and (max-width: 1030px) {
    display: grid;
    flex-direction: column-reverse;
  }
}
.map {
  display: flex;
  width: 100%;
  height: 88vh;
  background-color: #f1f1f1;
}
.details {
  width: 30%;
  height: 88vh;
  background-color: #1f293700;
  margin: 0 12px;
  @media screen and (max-width: 1030px) {
    display: grid;
    height: auto;
    width: 100%;
    position: absolute;
    z-index: 99999;
    justify-items: start;
    align-items: end;
    justify-content: start;
    align-content: center;
    bottom: 45px;
    left: 3px;
  }
}
::v-deep .v-icon,
::v-deep .v-banner__text {
  color: #fff !important;
}
</style>
