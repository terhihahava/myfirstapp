import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyDPxpbYZasYMTrDN7IliUa1Ks9422YUwNg",
  authDomain: "testvue-2471b.firebaseapp.com",
  databaseURL: "https://testvue-2471b.firebaseio.com",
  projectId: "testvue-2471b",
  storageBucket: "testvue-2471b.appspot.com",
  messagingSenderId: "1066315743623"
};
firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
