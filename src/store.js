import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      name: ''
    };
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    }
  },
  actions: {
    setName({ commit }, name) {
      commit('setName', name);
    }
  },
  getters: {
    getName: state => state.name
  }
});

export default store;
