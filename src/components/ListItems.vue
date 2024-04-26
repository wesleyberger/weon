<template>
  <v-card class="mx-auto mb-4" max-width="400" @click="emitEvent">
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-subtitle class="pb-0">
      {{ item.street + ", " + item.complement }}
    </v-card-subtitle>
    
    <v-card-text class="text--primary">
      <div class="location">
        {{ item.neighborhood + ", " + item.city + " - " + item.state + ", " + item.cep}}
      </div>
      <div class="d-flex justify-space-between">
        <small>{{ $t('message.createdAt') }}: {{ dateCreated(item.createdAt) }}</small>
        <small>{{ $t('message.updatedAt') }}: {{ dateUpdated(item.updatedAt) }} </small>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ListItems",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitEvent() {
      this.$emit("click");
    },
    dateCreated(date) {
      return new Date(date).toLocaleDateString();
    },
    dateUpdated(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card {
  background-color: #1f2937 !important;
  color: #fff !important;
}
.v-card:hover {
  background-color: #4bc37d !important;
  transition: 0.4s ease-in-out !important;
}
.v-card:focus {
  background-color: #4bc37d !important;
  transition: 0.4s ease-in-out !important;
}
.v-card__subtitle,
.v-card__title,
.v-card__text {
}
.v-card__subtitle,
.v-card__title,
.v-card__text,
.location, 
small {
  color: #fff !important
}
</style>