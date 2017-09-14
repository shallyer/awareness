<template>
	<div class="header">
		<div class="topBar clearfix">
			<canvas id="canvas2"></canvas>
			<div class="logo">
				<img :src="logo" alt="logo" />
			</div>
			<div class="user-info">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
	                    <img class="user-logo" v-bind:src="portrait">
	                    {{username}}
	                </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="loginout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="navBox">
			<el-menu :default-active="activeIndex" router='true' class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="monitorCenter">监控中心</el-menu-item>
				<el-menu-item index="unknownThreaten">未知威胁</el-menu-item>
				<el-submenu index="1">
					<template slot="title">威胁感知与报警</template>
					<el-menu-item index="event">安全事件</el-menu-item>
					<el-menu-item index="associationAnalysis">关联分析</el-menu-item>
				</el-submenu>
				<el-menu-item index="analysis">流量分析</el-menu-item>
				<el-menu-item index="monitor">业务监控</el-menu-item>
				<el-submenu index="5">
					<template slot="title">安全环境</template>
					<el-menu-item index="assetManagement">资产管理</el-menu-item>
					<el-menu-item index="weakMonitor">脆弱性管理</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				logo: require('./logo.png'),
				portrait: require('./portrait.jpg'),
				name: 'cui',
				activeIndex: 'monitorCenter',
				navBoxList: [{
						link: '/alert',
						name: '威胁感知与报警',
						isHasMenu: true,
						subCates: [{
								name: '监控中心',
								link: '/'
							},
							{
								name: '安全事件',
								link: '/'
							},
							{
								name: '关联分析',
								link: '/'
							},
							{
								name: '异常链接',
								link: '/'
							}
						]
					},
					{
						link: '/solution',
						name: '威胁分析与处置',
						isHasMenu: false,
					},
					{
						link: '/analysis',
						name: '流量分析',
						isHasMenu: 'false',
					},
					{
						link: '/monitor',
						name: '网络业务监控',
						isHasMenu: false,
					},
					{
						link: '/safe',
						name: '安全环境',
						isHasMenu: true,
						subCates: [{
								name: '资产管理',
								link: '/'
							},
							{
								name: '脆弱性管理',
								link: '/'
							}
						]
					},
					{
						link: '/system',
						name: '系统管理',
						isHasMenu: true,
						subCates: [{
								name: '用户管理',
								link: '/'
							},
							{
								name: '情报数据更新',
								link: '/'
							}
						]
					},
				],
			}
		},
		computed: {
			username() {
				let username = localStorage.getItem('ms_username');
				return username ? username : this.name;
			}
		},
		methods: {
			handleCommand(command) {
				if(command == 'loginout') {
					localStorage.removeItem('ms_username')
					this.$router.push('/login');
				}
			}
		},
		mounted: function() {
			//宇宙特效
			"use strict";
			var canvas = document.getElementById('canvas2'),
				ctx = canvas.getContext('2d'),
				w = canvas.width = window.innerWidth,
				h = canvas.height = 70,

				hue = 217,
				stars = [],
				count = 0,
				maxStars = 200; //星星数量

			var canvas2 = document.createElement('canvas'),
				ctx2 = canvas2.getContext('2d');
			canvas2.width = 100;
			canvas2.height = 100;
			var half = canvas2.width / 2,
				gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
			gradient2.addColorStop(0.025, '#CCC');
			gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
			gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
			gradient2.addColorStop(1, 'transparent');

			ctx2.fillStyle = gradient2;
			ctx2.beginPath();
			ctx2.arc(half, half, half, 0, Math.PI * 2);
			ctx2.fill();

			// End cache

			function random(min, max) {
				if(arguments.length < 2) {
					max = min;
					min = 0;
				}

				if(min > max) {
					var hold = max;
					max = min;
					min = hold;
				}

				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			function maxOrbit(x, y) {
				var max = Math.max(x, y),
					diameter = Math.round(Math.sqrt(max * max + max * max));
				return diameter / 2;
				//星星移动范围，值越大范围越小，
			}

			var Star = function() {

				this.orbitRadius = random(maxOrbit(w, h));
				this.radius = random(60, this.orbitRadius) / 8;
				//星星大小
				this.orbitX = w / 2;
				this.orbitY = h / 2;
				this.timePassed = random(0, maxStars);
				this.speed = random(this.orbitRadius) / 50000;
				//星星移动速度
				this.alpha = random(2, 10) / 10;

				count++;
				stars[count] = this;
			}

			Star.prototype.draw = function() {
				var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
					y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
					twinkle = random(10);

				if(twinkle === 1 && this.alpha > 0) {
					this.alpha -= 0.05;
				} else if(twinkle === 2 && this.alpha < 1) {
					this.alpha += 0.05;
				}

				ctx.globalAlpha = this.alpha;
				ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
				this.timePassed += this.speed;
			}

			for(var i = 0; i < maxStars; i++) {
				new Star();
			}

			function animation() {
				ctx.globalCompositeOperation = 'source-over';
				ctx.globalAlpha = 0.5; //尾巴
				ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
				ctx.fillRect(0, 0, w, h)

				ctx.globalCompositeOperation = 'lighter';
				for(var i = 1, l = stars.length; i < l; i++) {
					stars[i].draw();
				};

				window.requestAnimationFrame(animation);
			}

			animation();
		}
	}
</script>
<style scoped>
	.header{
		width:100%;
	}
	#canvas2 {
		position: absolute;
		top: 0;
		left: 0;
		width:100%;
		height:70px;
		
	}
	
	.topBar {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 2.2rem;
		line-height: 70px;
		color: #fff;
		background: transparent;
	}
	
	.topBar .logo {
		float: left;
		width: 250px;
		text-align: center;
		padding-top: 6px;
		height: 100%;
		box-sizing: border-box;
		position:relative;
		z-index:99;
	}
	.el-menu{
		background:none;
	}
	.user-info {
		float: right;
		padding-right: 50px;
		font-size: 16px;
		color: #fff;
		position:relative;
		z-index:99;
	}
	
	.user-info .el-dropdown-link {
		position: relative;
		display: inline-block;
		padding-left: 50px;
		color: #fff;
		cursor: pointer;
		vertical-align: middle;
	}
	
	.user-info .user-logo {
		position: absolute;
		left: 0;
		top: 15px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	
	.el-dropdown-menu__item {
		text-align: center;
	}
	.navBox{
		padding-left:60px;
		background:#fff;
	}
	.el-menu--horizontal .el-submenu .el-menu-item{
		text-align: center;
	}
	
</style>