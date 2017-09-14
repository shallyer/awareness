import "babel-polyfill";
import Vue from 'vue';
import Validator from 'vue-validator'
Vue.use(Validator);

Vue.validator('tel', function (val) {
  return /^[0-9]{11}$/.test(val)
});

Vue.validator('passw', function (val) {
  return /^(\w){6,20}$/.test(val)
});