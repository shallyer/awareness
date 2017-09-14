<template>
	<div class="sHeader">
		<div class="topArea clearfix">
			<div class="sTopBg">
				<div class="light"></div>
			</div>
			<div class="sLogo">
				<img :src="logo" alt="logo" />
			</div>
			
			<div id="sName">
				<img :src="name" alt="名称" />
			</div>
			<ul class="navCates">
				<li v-for='(item,index) in navCates' :class="{active:isActive==index}" @click="classActive($event.target)">
					<router-link v-bind:to='item.link'>{{item.name}}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		props:['isActive'],
		data() {
			return {
				logo: require('./logo.png'),
				name: require('./name.png'),
				navCates: [{
						link: '/wholeNetwork',
						name: '全网攻击态势',
					},
					{
						link: '/sMonitor',
						name: '业务监控',
					},
					{
						link: '/sAnalysis',
						name: '流量监控',
					},
					{
						link: '/sAssets',
						name: '资产与风险',
					}
				],
			}
		},
		methods: {
			classActive(_target){
				$(_target).parent('li').addClass('active').siblings().removeClass('active');
			}
		},
		mounted: function() {
			$('.light').addClass('.lightning');
		}
	}
</script>
<style>
	.sHeader {
		position: relative;
		z-index:9999;
	}
	
	.sTopBg {
		height: 60px;
		background: url('./topBg.png');
		background-size:5px 60px;
	}
	
	.sLogo {
		position: absolute;
		top: 0;
		left:0;
	}
	.sLogo img{
		width:160px;
	}
	#sName {
		position: absolute;
		top: 22px;
		left: 160px;
	}
	#sName img{
		width:230px;
	}
	.navCates {
		position: absolute;
		top: 60px;
		right: 3%;
		transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		-o-transform: translateY(-50%);
	}
	
	.navCates li {
		float: left;
		width: 140px;
		height: 63px;
		text-align: center;
		color: #fff;
		font-size: 1.4rem;
		background: url('./button_normal.png') no-repeat;
		background-size: 100% 100%;
		transition: background 0.3s;
		-moz-transition: background 0.3s;
		-o-transition: background 0.3s;
		-webkit-transition: background 0.3s;
	}
	
	.navCates li:hover {
		background: url('./button_hover.png') no-repeat;
		background-size: 100% 100%;
	}
	
	.navCates li.active {
		background: url('./button_active.png') no-repeat;
		background-size: 100% 100%;
	}
	
	.navCates li a {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 63px;
		text-align: center;
		color: #fff;
		font-size: 1.4rem;
		text-shadow: 0 0 10px #009eff;
	}
	.light{
		position:absolute;
		top:0;
		left:-300px;
		width:300px;
		height:60px;
		background-image: -webkit-linear-gradient(0deg,rgba(0,143,249,0),rgba(0,143,249,0.3),rgba(0,143,249,0)); 
		transform: skewx(-60deg);  
	    -o-transform: skewx(-60deg);  
	    -moz-transform: skewx(-60deg);  
	    -webkit-transform: skewx(-60deg); 
	    animation:light 7.5s ease-in infinite; 
	}
	@-webkit-keyframes light{
		0{
			left:-300px;
		}
		20%{
			left:100%;
		}
		40%{
			left:100%;
		}
		60%{
			left:100%;
		}
		80%{
			left:100%;
		}
		100%{
			left:100%;
		}
	}
</style>