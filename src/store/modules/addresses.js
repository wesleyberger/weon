const state = {
    addresses: JSON.parse(localStorage.getItem('addresses')) || [],
  };
  
  const mutations = {
    ADD_ADDRESS(state, address) {
      address.id = Math.random().toString(36).substring(2, 14);
      address.createdAt = new Date().getTime();
      address.updatedAt = address.createdAt;
      state.addresses.push(address);
      localStorage.setItem('addresses', JSON.stringify(state.addresses));
    },
    UPDATE_ADDRESS(state, updatedAddress) {
      const index = state.addresses.findIndex(item => item.id === updatedAddress.id);
      if (index !== -1) {
        updatedAddress.updatedAt = new Date().getTime();
        state.addresses.splice(index, 1, updatedAddress);
        localStorage.setItem('addresses', JSON.stringify(state.addresses));
      }
    },
    DELETE_ADDRESS(state, addressId) {
      const index = state.addresses.findIndex(item => item.id === addressId);
      if (index !== -1) {
        state.addresses.splice(index, 1);
        localStorage.setItem('addresses', JSON.stringify(state.addresses));
      }
    }
  };
  
  const actions = {
    addAddress({ commit }, address) {
      commit('ADD_ADDRESS', address);
    },
    updateAddress({ commit }, updatedAddress) {
      commit('UPDATE_ADDRESS', updatedAddress);
    },
    deleteAddress({ commit }, addressId) {
      commit('DELETE_ADDRESS', addressId);
    }
  };
  
  const getters = {
    addresses: state => state.addresses,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  