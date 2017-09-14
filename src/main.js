//application entry
import "babel-polyfill";
import Vue from "vue";
import store from "store";
import App from './app';
import Router from "./public_resource/router_configs/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import echarts from 'echarts';
import 'font-awesome/css/font-awesome.min.css';
Vue.prototype.$echarts=echarts;
Vue.use(ElementUI);
new Vue({
    el: '#app',
    store,
    router: Router,
    render: h => h(App),
    mounted:function(){
    	var ishasusername = sessionStorage.getItem("username"); 
    	var ishasuserid = sessionStorage.getItem("userid"); 
    	var loginstate={
    		username:ishasusername,
    		id:ishasuserid
    	};
    	if(typeof(ishasusername) ==='string'||typeof(ishasuserid)==='string'){
    		store.commit('userislogin',loginstate);
    	};
    }
})
