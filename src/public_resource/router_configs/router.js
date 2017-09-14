//this is router config

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
var routesconfig = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: resolve => require(['../../components/pages/login/login.vue'], resolve)
	},
	{
		path: '/register',
		component: function (resolve) {
            require(['../../components/pages/register/register.vue'], resolve)
      	}
	},{
		path: '/forgetPaw',
		component: function (resolve) {
            require(['../../components/pages/forgetPaw/forgetPaw.vue'], resolve)
      	}
	},
	{
		path: '/screen',
		component: resolve => require(['../../components/pages/screen/screen.vue'], resolve),
		children: [{
				path: '/',
				redirect: '/wholeNetwork'
			},
			{
				path: '/wholeNetwork',
				component: resolve => require(['../../components/pages/screen/wholeNetwork/wholeNetwork.vue'], resolve)
			},
			{
				path: '/sMonitor',
				component: resolve => require(['../../components/pages/screen/sMonitor/sMonitor.vue'], resolve)
			},
			{
				path: '/sAnalysis',
				component: resolve => require(['../../components/pages/screen/sAnalysis/sAnalysis.vue'], resolve)
			},
			{
				path: '/sAssets',
				component: resolve => require(['../../components/pages/screen/sAssets/sAssets.vue'], resolve)
			},
		]
	},
	{
		path: '/main',
		component: resolve => require(['../../components/pages/main/main.vue'], resolve),
		children: [{
				path: '/',
				redirect: '/monitorCenter'
			},
			{
				path: '/solution',
				component: resolve => require(['../../components/pages/solution/solution.vue'], resolve)
			},
			// {
			// 	path: '/analysis',
			// 	component: resolve => require(['../../components/pages/analysis/analysis.vue'], resolve),
			// 	children: [{
			// 			path: '/',
			// 			redirect: '/analysisOne'
			// 		},
			// 		{
			// 			path: '/analysisOne',
			// 			component: resolve => require(['../../components/pages/analysis/analysisOne.vue'], resolve)
			// 		}, {
			// 			path: '/analysis_Two',
			// 			component: resolve => require(['../../components/pages/analysis/analysis_Two.vue'], resolve)
			// 		}, {
			// 			path: '/analysis_Three_OS',
			// 			component: resolve => require(['../../components/pages/analysis/analysis_Three_OS.vue'], resolve)
			// 		}, {
			// 			path: '/analysis_Three_IP',
			// 			component: resolve => require(['../../components/pages/analysis/analysis_Three_IP.vue'], resolve)
			// 		},
			// 	]
			// },
			{
				path: '/monitor',
				component: resolve => require(['../../components/pages/monitor/monitor.vue'], resolve)
			},
			// {
			// 	path: '/assetManagement',
			// 	component: resolve => require(['../../components/pages/assetManagement/assetManagement.vue'], resolve),
			// },
			{
				path: '/weakMonitor',
				component: resolve => require(['../../components/pages/weakMonitor/weakMonitor.vue'], resolve),
			},
			{
				path: '/monitorCenter',
				name: '/monitorCenter',
				component: resolve => require(['../../components/pages/monitorCenter/monitorCenter.vue'], resolve),
			},
			{
				path: '/associationAnalysis',
				component: resolve => require(['../../components/pages/associationAnalysis/associationAnalysis.vue'], resolve),
			},
			{
				path: '/system',
				component: resolve => require(['../../components/pages/system/system.vue'], resolve)
			}, 
			{
				path: '/event',
				component: resolve => require(['../../components/pages/event/event'], resolve)
			}, {
				path: '/eventIN',
				component: resolve => require(['../../components/pages/event/eventIN'], resolve),
			}, 
			{
				path: '/eventInformation/:eventId',
				name: 'eventInformation',
				component: resolve => require(['../../components/pages/event/eventInformation.vue'], resolve),
			}, {
				path: '/unknownThreaten',
				component: resolve => require(['../../components/pages/unknownThreaten/unknownThreaten'], resolve),
			}
		]
	},

	{
		path: '*',
		component: resolve => require(['../../components/pages/notfound/notfound.vue'], resolve)
	}

];

var router = new VueRouter({
	//mode: 'history',
	routes: routesconfig
});

export default router;