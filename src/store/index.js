import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    authorization: '',
    jwt: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    username2: '',
    endpoints: {
      obtainJWT: 'api-food_delivery/api/token/',
      refreshJWT: 'api-food_delivery/api/token/refresh/',
      // baseURL: 'http://127.0.0.1:8080/',
      baseURL: 'https://try-coding.herokuapp.com/',
    },
    loggedIn: '',
    registered: '',
    groceries_data_pagination: [],
    groceries_data_results: [],
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      state.jwt = null;
    },
    updateUsername(state, username) {
      localStorage.setItem('username', username);
      state.jwt = username;
    },
    loginSuccess(state, username) {
      state.loggedIn = true;
      state.username = username;
      state.jwt = localStorage.getItem('token');
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.username = null;
    },
    registerSuccess(state) {
      state.registered = true;
      state.jwt = localStorage.getItem('token');
    },
    registerFailure(state) {
      state.registered = false;
    },
    nullShit() {
    },
    authHeader(state) {
      let token = localStorage.getItem('token');
      let username = localStorage.getItem('username');
      if (username && token) {
        state.authorization = 'Bearer ' + token
      } else {
        state.authorization = '';
      }
    },
    ADD_GROCERIES: (state, groceries_data_results) => {
      state.groceries_data_results = groceries_data_results;
    },
    // create new mutation that can append data
    APPEND_GROCERIES: (state, groceries_data_results) => {
      console.log(Object.entries(groceries_data_results));
      state.groceries_data_results.push(...groceries_data_results)
    },
    ADD_GROCERIES_PAGINATION: (state, groceries_data_pagination) => {
      state.groceries_data_pagination = groceries_data_pagination;
    }
  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    userName: state => state.username2,
    userjwt: state => state.jwt,
    userName1: state => state.username,
    loggedIn: state => state.loggedIn,
    all_groceries: state => state.groceries_data,
  },
  actions: {
    async obtainToken({ commit }, user) {
      const username = user.username
      console.log("user: ", user);



      await axios.post(this.state.endpoints.baseURL + this.state.endpoints.obtainJWT, user)
        .then((res) => {
          commit('updateToken', res.data.access);
          commit('updateUsername', username);
          const token = res.data.token;
          axios.defaults.headers.common['Authorization'] = token
          this.state.username2 = username
          commit('loginSuccess', username)
          router.push('/');
          console.log("token: ", token);
          Vue.$toast.open("Login successful", {
            timeout: 2000
          });
        })
        .catch(err => {
          commit('loginFailure')

          if (err.response.data.username) {
            Vue.$toast.error(err.response.data.username[0], {
              timeout: 2000
            });
          } else if (err.response.data.email) {
            Vue.$toast.error(err.response.data.email[0], {
              timeout: 2000
            });
          } else if (err.response.data.password) {
            Vue.$toast.error(err.response.data.password[0], {
              timeout: 2000
            });
          } else if (err.response.data.detail) {
            Vue.$toast.error(err.response.data.detail, {
              timeout: 2000
            });
          } else {
            Vue.$toast.error(err.response.data, {
              timeout: 2000
            });
          }


        })
    },
    async newRegister({ commit }, registerdata) {
      const { username, first_name, email, password, password_confirm } = registerdata;
      await axios.post(this.state.endpoints.baseURL + 'api-food_delivery/auth/accounts/register/', {
        username,
        first_name,
        email,
        password,
        password_confirm
      })
        .then(res => {
          console.log(res);
          this.dispatch('obtainToken', { username, password });
          this.state.username2 = username;
          commit('registerSuccess');
          // router.push('/');
          Vue.$toast.open("Registration successful", {
            timeout: 2000
          });
        })
        .catch(err => {
          this.commit('registerFailure')
          console.log("err: ", err);

          if (err.response.data.username) {
            Vue.$toast.error(err.response.data.username[0], {
              timeout: 2000
            });
          } else if (err.response.data.email) {
            Vue.$toast.error(err.response.data.email[0], {
              timeout: 2000
            });
          } else if (err.response.data.password) {
            Vue.$toast.error(err.response.data.password[0], {
              timeout: 2000
            });
          } else if (err.response.data.password_confirm) {
            Vue.$toast.error(err.response.data.password_confirm[0], {
              timeout: 2000
            });
          } else {
            Vue.$toast.error(err.response.data, {
              timeout: 2000
            });
          }
        })
    },

    async fetchGroceries({ commit }, filter_date) {
      console.log(filter_date);
      await axios
        .get(this.state.endpoints.baseURL + 'api-mzansi_groceries/all_departments/')
        .then(res => {
          console.log("ADD_GROCERIES: ", res.data.results);
          commit('ADD_GROCERIES', res.data.results);
          commit('ADD_GROCERIES_PAGINATION', res.data)
        })
        .catch(err => console.error(err));
    },

    async updateGroceries({ commit }, filter_url) {
      await axios
        .get(filter_url.filter_url)
        .then(res => {
          console.log("load more data: ", res.data.results);
          commit('APPEND_GROCERIES', res.data.results)
          commit('ADD_GROCERIES_PAGINATION', res.data)
        })
        .catch(err => console.error(err));
    },

    async updateGroceryCount({ commit }, view_type) {
      console.log("view_type: ", view_type);
      console.log(commit);
      await axios
        .post(this.state.endpoints.baseURL + 'api-analytics/api_grocery_list_count/', {
          views_count: 1,
          view_type: view_type,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    },

    async updateRegisterCount({ commit }, val) {
      console.log(commit);
      await axios
        .post(this.state.endpoints.baseURL + 'api-analytics/api_register_count/', {
          views_count: 1,
          ip_address: val
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    },

    async getAPISearchText({ commit }, val) {
      console.log("val: ", val);
      console.log(commit);
      await axios
        .post(this.state.endpoints.baseURL + 'api-analytics/api_search_text/', {
          search_text: val,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    },

    async viewTrackerCount({ commit }, val) {
      console.log(commit);
      await axios
        .post(this.state.endpoints.baseURL + 'api-analytics/api_viewtrackercount/', {
          views_count: 1,
          view_type: val
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    },


    },
  modules: {
  }
})
