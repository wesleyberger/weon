<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          :text="true"
          v-bind="activatorProps"
          @click="dialog = true"
          >Novo endereço</v-btn
        >
      </template>

      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="CEP"
                placeholder="Ex: 00000-000"
                required
                v-model="form.cep"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="6">
              <v-text-field
                label="Título do endereço*"
                placeholder="Ex: Casa, Trabalho, etc."
                required
                v-model="form.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="6">
              <v-text-field
                label="Logradouro*"
                placeholder="Ex: Rua, Avenida, etc."
                required
                v-model="form.street"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Complemento*"
                placeholder="Ex: 123"
                required
                v-model="form.complement"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5" sm="6">
              <v-text-field
                label="Bairro*"
                placeholder="Ex: Centro, Jardim, etc."
                required
                v-model="form.neighborhood"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5" sm="6">
              <v-text-field
                label="Localidade*"
                placeholder="Ex: São Paulo, Rio de Janeiro, etc."
                required
                v-model="form.city"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2" sm="6">
              <v-select
                label="UF*"
                placeholder="Ex: SP, RJ, etc."
                required
                :items="UF"
                v-model="form.state"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="true" variant="plain" @click="dialog = false">fechar</v-btn>

          <v-btn
            :text="true"
            variant="tonal"
            @click="save"
          >salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import store from '@/store';

export default {
  data: () => ({
    dialog: false,
    UF: ["SP", "RJ", "MG", "ES", "PR", "SC", "RS", "MS", "MT", "GO", "DF", "BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA", "PA", "AP", "TO", "RR", "AM", "AC", "RO", "PA"],
    form: {
      cep: '',
      title: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '', 
    },
  }),
  methods: {
    save() {
      // falta add validaçao
      const newAddress = { ...this.form };
      store.dispatch('addAddress', newAddress); // Dispatch da ação para adicionar o endereço ao store
      console.log(newAddress);
      console.log(store.state.addresses, 'addresses');
      this.dialog = false;

    },
  },
};
</script>
<style scoped>
.v-btn {
  background-color: #e0e0e0;
}
</style>