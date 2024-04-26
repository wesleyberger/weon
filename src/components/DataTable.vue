vue.<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="addresses"
      sort-by="calories"
      class="elevation-1"
      hide-default-footer
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      dark
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('message.registeredAddresses') }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                {{ $t('message.newAddress') }} 
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row dense>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        label="CEP*"
                        placeholder="Ex: 00000111"
                        v-model="editedItem.cep"
												@blur="fetchAddressByCEP"
                        maxlength="8"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" sm="6">
                      <v-text-field
                        :label="$t('message.addressTitle')"
                        placeholder="Ex: Casa, Trabalho, etc."
                        v-model="editedItem.title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" sm="6">
                      <v-text-field
                        :label="$t('message.street')"
                        placeholder="Ex: Rua, Avenida, etc."
                        v-model="editedItem.street"
												disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        :label="$t('message.complement')"
                        placeholder="Ex: 123"
                        v-model="editedItem.complement"
												disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5" sm="6">
                      <v-text-field
                      :label="$t('message.neighborhood')"
                        placeholder="Ex: Centro, Jardim, etc."
                        v-model="editedItem.neighborhood"
												disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5" sm="6">
                      <v-text-field
                        :label="$t('message.city')"
                        placeholder="Ex: São Paulo, Rio de Janeiro, etc."
                        v-model="editedItem.city"
												disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" sm="6">
                      <v-select
                      :label="$t('message.state')"
                        placeholder="Ex: SP, RJ, etc."
                        :items="UF"
                        v-model="editedItem.state"
												disabled
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
							<v-alert v-if="!isValid" type="error" :key="isKey" dense>
                Por favor, preencha todos os campos obrigatórios.
              </v-alert>
              <v-alert v-if="messageErrorCEP" type="error" :key="isKey" dense>
                Por favor, preencha um CEP válido.
              </v-alert>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{ $t('message.close') }}
                </v-btn>
                <v-btn color="blue darken-1" text @click.stop="save">
                  {{ $t('message.save') }}
                </v-btn>
              </v-card-actions>
              
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza de que deseja excluir este endereço?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm(editedItem)"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <span>Nenhum endereço cadastrado</span>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";

export default {
  name: "AddressView",

  components: {
    // ModalFormAddress,
  },
  data: () => ({
    isKey: 0,
    messageErrorCEP: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Título do endereço",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "CEP", value: "cep" },
      { text: "Logradouro", value: "" },
      { text: "Complemento", value: "complement" },
      { text: "Bairro", value: "neighborhood" },
      { text: "Localidade", value: "city" },
      { text: "UF", value: "state" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    UF: [
      "SP",
      "RJ",
      "MG",
      "ES",
      "PR",
      "SC",
      "RS",
      "MS",
      "MT",
      "GO",
      "DF",
      "BA",
      "SE",
      "AL",
      "PE",
      "PB",
      "RN",
      "CE",
      "PI",
      "MA",
      "PA",
      "AP",
      "TO",
      "RR",
      "AM",
      "AC",
      "RO",
      "PA",
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      title: "",
      cep: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      createdAt: "",
      updatedAt: "",
    },
    defaultItem: {
      id: "",
      title: "",
      cep: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      createdAt: "",
      updatedAt: "",
    },
    errors: {
      title: false,
      cep: false,
      street: false,
      complement: false,
      neighborhood: false,
      city: false,
      state: false,
    },
  }),
  created() {
    this.addresses;
    this.initialize();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    addresses() {
      return this.$store.getters.addresses;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Novo Endereço" : "Editar Endereço";
    },
    isValid() {
      for (const key in this.errors) {
        if (this.errors[key]) return false;
      }
      return true;
    },
  },
  methods: {
    initialize() {
      this.addresses;
    },
		async fetchAddressByCEP() {
      const cep = this.editedItem.cep.replace(/\D/g, '');
      if (cep.length !== 8) {
        // CEP inválido
        return;
      }

      try {
        await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
          const addressData = response.data;
          if(addressData.erro) {
            this.messageErrorCEP = true;
            return;
          }
          this.editedItem.street = addressData.logradouro;
          this.editedItem.complement = addressData.complemento || 'sem complemento';
          this.editedItem.neighborhood = addressData.bairro;
          this.editedItem.city = addressData.localidade;
          this.editedItem.state = addressData.uf;
          this.messageErrorCEP = false;
        });
      } catch (error) {
        console.error('Erro ao buscar endereço pelo CEP:', error);
        this.messageErrorCEP = true;
      }
    },
    save() {
      if (this.validateForm()) {
        console.log(this.editedItem, "editedItem validado");
        const newAddress = { ...this.editedItem };
        if (this.editedIndex > -1) {
          store.dispatch("updateAddress", newAddress, newAddress.id);
        } else {
          store.dispatch("addAddress", newAddress);
        }
        this.dialog = false;
        this.close();
      }
    },
    editItem(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      store.dispatch("deleteAddress", this.editedItem.id);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.errors = {
        title: false,
        cep: false,
        street: false,
        complement: false,
        neighborhood: false,
        city: false,
        state: false,
      }
      this.isKey++
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    validateForm() {
      this.errors.title = !this.editedItem.title;
      this.errors.cep = !this.editedItem.cep;
      this.errors.street = !this.editedItem.street;
      this.errors.complement = !this.editedItem.complement;
      this.errors.neighborhood = !this.editedItem.neighborhood;
      this.errors.city = !this.editedItem.city;
      this.errors.state = !this.editedItem.state;

      return this.isValid;
    },
  },
};
</script>

<style scoped>
.theme--dark.v-data-table {
  background-color: #1f2937 !important;
}
.theme--dark.v-sheet {
  background-color: #1f2937 !important;
}
</style>