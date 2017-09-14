import "babel-polyfill";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


export default new Vuex.Store({
  	state:{
		islogin:false,
		userinfo:{
			username:'',
			useravata:'',
			userid:''
		},
		ishasmessage:false,
		messagelist:[],
		ishascart:false,
		cartlist:[]
  	},
  	mutations: {
    userislogin (state,usertoken) {
      	state.islogin=true;
      	state.userinfo.username=usertoken.username;
      	state.userinfo.userid=usertoken.id;
      	
    },
    userisloginout(state) {
      	state.islogin=false;
    }
  }
});