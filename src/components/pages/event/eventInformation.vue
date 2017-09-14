<template>
	<div class="eventinformation_root">
		<div id="eventinfor_contain">
			<div class="topBar">
				<a href="javascript:history.go(-1)" class="btn btn-border color-3 material-design"> <i id="back" class="ipublic"></i>返      回</a>
				<div @click="addList()" class="start" style="position: relative;">
					<div class="radar"></div>
					<span style="margin-left: 15px;">开始分析</span>
				</div>
			</div>
			
			<div class="con_step">
				<ul>
					<li>事件名称：<span>{{eventname}}</span></li>
					<li>目标源IP：<span>{{eventSource}}</span></li>
					<li>目的IP：<span>{{destination}}</span></li>
					<li>攻击时间：<span>{{time}}</span></li>
					<li>严重程度：<span>{{rank}}</span>
						<a class="large red button">严重</a>
					</li>
					<li>事件主分类：<span>{{classify}}</span></li>
					<li>事件子分类：<span>{{subclassification}}</span></li>
					<li>攻击阶段：<span>{{attack}}</span></li>
					<li>危险程度：<span>{{severity}}</span>

					</li>

				</ul>
			</div>
			<div class="con_history">
				<p>分析历史记录</p>
				<template>
					<el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
						<el-table-column label="序列" width="100">
							<template scope="scope">
								{{scope.$index+1}}
							</template>
						</el-table-column>
						<el-table-column prop="date" label="日期" width="170">
							<template scope="scope">{{ scope.row.date |timerrandom }}</template>
						</el-table-column>
						<el-table-column prop="name" label="事件名">
						</el-table-column>
						<el-table-column prop="progress" label="分析进度">
							<template scope="scope">
								<el-progress :text-inside="true" :percentage="scope.row.progress" :stroke-width="18"></el-progress>
							</template>
						</el-table-column>
						<el-table-column prop="actionTime" label="分析时间" width="120">
						</el-table-column>
						<el-table-column prop="ActionResults" label="处置结果">
						</el-table-column>
						<el-table-column label="操作" width="100">
							<template scope="scope">
								<el-button @click="" type="text" size="small">
									<i class="el-icon-information" @click="togglewramp()"></i>
								</el-button>
								<el-button @click="" type="text" size="small">
									<i class="el-icon-delete2"></i>
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<div class="page">
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<div class="wramp">

			<div class="capacity">
				<div class="con_root" style="z-index: 999999;">

					<div class="title">分析日志</div>
					<div class="realTimeProgress"><br />
						<div style="width: 100%;height: 80%;">
							<el-progress type="circle" :percentage="100"></el-progress>
						</div>

						<p style="width: 100%;height: 20%;">{{status}}</p>
					</div>
					<div class="contain">
						秋天的怀念 双腿瘫痪后，我的脾气变得暴怒无常。望着望着天上北归的雁阵，我会突然把面前的玻璃砸碎；听着听着李谷一甜美的歌声，我会猛地把手边的东西摔向四周的墙壁。母亲就悄悄地躲出去，在我看不见的地方偷偷地听着我的动静。当一切恢复沉寂，她又悄悄地进来，眼边红红的，看着我。“听说北海的花儿都开了，我推着你去走走。”她总是这么说。母亲喜欢花，可自从我的腿瘫痪后，她侍弄的那些花都死了。“不，我不去！”我狠命地捶打这两条可恨的腿，喊着：“我活着有什么劲！”母亲扑过来抓住我的手，忍住哭声说：“咱娘儿俩在一块儿，好好儿活，好好儿活……”可我却一直都不知道，她的病已经到了那步田地。后来妹妹告诉我，她常常肝疼得整宿整宿翻来覆去地睡不了觉。 那天我又独自坐在屋里，看着窗外的树叶“唰唰啦啦”地飘落。母亲进来了，挡在窗前：“北海的菊花开了，我推着你去看看吧。”她憔悴的脸上现出央求般的神色。“什么时候？”“你要是愿意，就明天?”她说。我的回答已经让她喜出望外了。“好吧，就明天。”我说。她高兴得一会坐下，一会站起：“那就赶紧准备准备。”“唉呀，烦不烦？几步路，有什么好准备的！”她也笑了，坐在我身边，絮絮叨叨地说着：“看完菊花，咱们就去‘仿膳’，你小时候最爱吃那儿的豌豆黄儿。还记得那回我带你去北海吗？你偏说那杨树花是毛毛虫，跑着，一脚踩扁一个……”她忽然不说了。对于“跑”和“踩”一类的字眼儿。她比我还敏感。她又悄悄地出去了。 她出去了。就再也没回来。 邻居们把她抬上车时，她还在大口大口地吐着鲜血。我没想到她已经病成那样。看着三轮车远去，也绝没有想到那竟是永远的诀别。 邻居的小伙子背着我去看她的时候，她正艰难地呼吸着，像她那一生艰难的生活。别人告诉我，她昏迷前的最后一句话是：“我那个有病的儿子和我那个还未成年的女儿……” 又是秋天，妹妹推我去北海看了菊花。黄色的花淡雅、白色的花高洁、紫红色的花热烈而深沉，泼泼洒洒，秋风中正开得烂漫。我懂得母亲没有说完的话。妹妹也懂。我俩在一块儿，要好好儿活…… </p>
					</div>
					<p class="time">报告生成于：{{timer}}</p>
					<div class="btn">
						<el-button type="danger" @click="closeCapacity"><i class="el-icon-close"></i></el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				status: '分析已完成',
				percentage: 0,
				timer: new Date(),
				eventname: '跨站脚本攻击',
				time: '2017-08-01 15:36:21',
				classify: '智能检测威胁',
				subclassification: '文件匹配',
				eventSource: '192.168.120.211',
				rank: '1',
				severity: '低危',
				currColor: '#ffcc67',
				attack: '信息收集',
				destination: '172.68.34.201',
				tableData2: [{
					date: Math.random(new Date()),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕',
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'
				}, {
					date: new Date(),
					name: 'Threat Intelligence Detected',
					progress: 100,
					actionTime: '5s',
					ActionResults: '修复完毕'

				}],
				x: "1",
				y: '2',
				h: '3',

			}
		},
		methods: {
			togglewramp() {
				if($('.wramp').hide()) {
					$('.wramp').fadeIn(1000)
				} else {
					$('.wramp').fadeOut(1000)
				}
			},
			closeCapacity() {
				if($('.wramp').show()) {
					$('.wramp').fadeOut(1000)
				} else {
					$('.wramp').fadeOut(1000)
				}
			},
			addList() {

			},
			iconShow() {
                

			},
			//弹出框背景动画
			backgroundAnimation() {

			}
		},
		filters: {
			timerrandom: function(input) {
				var d = new Date(input);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
				var hour = d.getHours();
				var minutes = d.getMinutes();
				var seconds = d.getSeconds();
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			}
		},
		mounted() {
			$('.halo').toggleClass('input');
			this.backgroundAnimation();
			this.iconShow()
		}
	}
</script>

<style>
	.eventinformation_root {
		width: 97%;
		height: 90%;
		margin: 0 auto;
		overflow: hidden;
		background-color: #F7F7F7;
		border-radius: 6px;
		box-shadow: 0px 0px 3px #CCCCCC;
	}
	
	.eventinformation_root .wramp {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
		display: none;
		z-index: 9999;
	}
	
	.eventinformation_root .wramp .capacity {
		width: 50%;
		height: 80%;
		background-color: #C7C7C7;
		position: absolute;
		top: 15%;
		left: 25%;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.con_root {
		width: 98%;
		height: 98%;
		border: 2px solid #FFFFFF;
		margin: 0 auto;
		margin-top: 0.5%;
		border-radius: 8px;
		overflow: hidden;
		background-color: #FFFFFF;
	}
	
	.eventinformation_root .wramp .capacity .title {
		width: 100%;
		height: 5%;
		border-bottom: 1px solid #C2C2C2;
		font-size: 1.6rem;
		line-height: 35px;
		padding-left: 15px;
		font-weight: bold;
		overflow: hidden;
		/*	background-color: #20A0FF;*/
	}
	
	.eventinformation_root .wramp .capacity .realTimeProgress {
		width: 15%;
		height: 23%;
		margin: 0 auto;
		margin-top: 20px;
	}
	
	.eventinformation_root .wramp .capacity p {
		margin-left: 30px;
	}
	
	.eventinformation_root .wramp .capacity .contain {
		width: 95%;
		height: 60%;
		border-bottom: 1px solid #C2C2C2;
		border-top: 1px solid #C2C2C2;
		padding-left: 2.5%;
		padding-right: 2.5%;
		padding-top: 1.5%;
		font-size: 1.4rem;
	}
	
	.eventinformation_root .wramp .capacity .time {
		width: 50%;
		height: 5%;
		margin-top: 10px;
		line-height: 35px;
		float: left;
	}
	
	.eventinformation_root .wramp .capacity .btn {
		width: 5%;
		height: 5%;
		margin-top: 10px;
		float: right;
		margin-right: 30px;
	}
	
	.eventinformation_root .topBar {
		width: 100%;
		height: 70px;
		color: #3398DB;
		font-size: 1.6rem;
		border-bottom: 1px solid #D1DBE5;
	}
	
	.ipublic {
		width: 15px;
		height: 15px;
		display: block;
		margin-left: 20px;
		float: left;
		margin-top: 7px;
	}
	
	.eventinformation_root .topBar a {
		display: block;
		margin-right: 30px;
		width: 120px;
		height: 30px;
		float: left;
		border-radius: 4px;
		border: 1px solid #FFCCCC;
		background-color: #FFECEC;
		color: #FF605E;
		margin-left: 30px;
		margin-top: 1%;
		cursor: pointer;
		text-align: center;
		line-height: 30px;
	}
	
	.eventinformation_root .topBar .start {
		display: block;
		margin-right: 50px;
		width: 120px;
		height: 30px;
		float: left;
		border: 1px solid #FFCCCC;
		background-color: #FFECEC;
		color: #FF605E;
		border-radius: 4px;
		margin-top: 1%;
		cursor: pointer;
		text-align: center;
		line-height: 30px;
	}
	
	.el-table .info-row {
		background: #c9e5f5;
	}
	
	.el-table .positive-row {
		background: #e2f0e4;
	}
	
	.eventinfor_nav {
		width: 20%;
		height: 100%;
		float: left;
		background-color: #FCFCFC;
		border: 1px solid #D1DBE5;
		border-radius: 6px;
	}
	
	.eventinfor_nav_top .topBar a {
		color: #25C3F0;
	}
	
	.eventinfor_nav_top .topBar a:link {
		color: #0000FF;
	}
	
	.eventinfor_nav_top .topBar a:active {
		color: #0000FF;
	}
	
	.eventinfor_nav_top .topBar a:hover {
		color: #0000FF;
	}
	
	.eventinfor_nav_top .topBar a:visited {
		color: #25C3F0;
	}
	
	.con_step {
		width: 90%;
		height: 15%;
		border-radius: 6px;
		font-size: 1.4rem;
		/*margin-top: 10px;*/
	}
	
	.con_step li {
		width: 200px;
		height: 100%;
		line-height: 30px;
		padding-left: 1%;
		float: left;
		border: 1px solid #BFE4FF;
		background-color: #E8F5FF;
		color: #46A5FF;
		border-radius: 4px;
		margin-right: 1%;
		margin-top: 2%;
		margin-left: 1.8%;
	}
	
	.con_history {
		width: 97.3%;
		height: 65%;
		float: left;
		margin-left: 0.5%;
		border: 1px solid #D1DBE5;
		border-radius: 6px;
		margin-top: 20px;
		margin-left: 25px;
	}
	
	.con_history p {
		width: 100%;
		height: 10%;
		line-height: 40px;
		text-align: center;
		font-size: 1.6rem;
	}
	
	.eventinformation_root .cell {
		text-align: center;
		padding-left: 0;
	}
	
	.page {
		margin-left: 75%;
		margin-top: 1.5%;
		margin-bottom: 30px;
	}
	
	.rate {
		width: 99%;
		height: 10%;
		margin-left: 40%;
	}
	
	#back {
		/*width:22px;
		height: 22px;*/
		background: url(goback.png) no-repeat center center;
		background-size: cover;
	}
	
	.radar {
		background: -webkit-radial-gradient(center, rgba(246, 54, 54, 0.3) 0%, rgba(246, 54, 54, 0) 75%), -webkit-repeating-radial-gradient(rgba(246, 54, 54, 0) 5.8%, rgba(246, 54, 54, 0) 18%, #F14510 18.6%, rgba(246, 54, 54, 0) 18.9%), -webkit-linear-gradient(90deg, rgba(246, 54, 54, 0) 49.5%, #F14510 50%, #F14510 50%, rgba(246, 54, 54, 0) 50.2%), -webkit-linear-gradient(0deg, rgba(246, 54, 54, 0) 49.5%, #F14510 50%, #F14510 50%, rgba(246, 54, 54, 0) 50.2%);
		background: radial-gradient(center, rgba(246, 54, 54, 0.3) 0%, rgba(246, 54, 54, 0) 75%), repeating-radial-gradient(rgba(246, 54, 54, 0) 5.8%, rgba(246, 54, 54, 0) 18%, #F14510 18.6%, rgba(246, 54, 54, 0) 18.9%), linear-gradient(90deg, rgba(246, 54, 54, 0) 49.5%, #F14510 50%, #F14510 50%, rgba(246, 54, 54, 0) 50.2%), linear-gradient(0deg, rgba(246, 54, 54, 0) 49.5%, #F14510 50%, #F14510 50%, rgba(246, 54, 54, 0) 50.2%);
		width:15px;
		height: 15px;
		position: absolute;
		left: 20px;
		top: 15px;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		border: 1px solid #F14510;
		overflow: hidden;
		margin-right: 15px;
	}
	
	.radar:before {
		content: ' ';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		animation: blips 5s infinite;
		animation-timing-function: linear;
		animation-delay: 1.4s;
	}
	
	.radar:after {
		content: ' ';
		display: block;
		background-image: linear-gradient(44deg, rgba(246, 54, 54, 0) 50%, #F14510 100%);
		width: 50%;
		height: 50%;
		position: absolute;
		top: 0;
		left: 0;
		animation: radar-beam 5s infinite;
		animation-timing-function: linear;
		transform-origin: bottom right;
		border-radius: 100% 0 0 0;
	}
	
	@keyframes radar-beam {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	@keyframes blips {
		14% {
			background: radial-gradient(2vmin circle at 75% 70%, rgba(251, 218, 214, 0) 10%, rgba(251, 218, 214, 0) 30%, rgba(251, 218, 214, 0) 100%);
		}
	}
	
	.button {
		background: #222 url(overlay-button.png) repeat-x 0 0;
		display: inline-block;
		padding: 5px 15px 6px;
		color: #fff !important;
		font-size: 13px;
		font-weight: bold;
		line-height: 10px;
		text-decoration: none;
		-moz-border-radius: 10px;
		-webkit-border-radius: 10px;
		-moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
		-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
		text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.25);
		border-bottom: 1px solid rgba(0, 0, 0, 0.25);
		position: relative;
		cursor: pointer;
		overflow: visible;
		width: 25px;
		height: 10px;
		margin-left: 30%;
	}
	
	button::-moz-focus-inner {
		border: 0;
		padding: 0;
	}
	
	.button:hover {
		background-color: #111;
		color: #fff;
	}
	
	.button:active {
		-webkit-transform: translateY(1px);
		-moz-transform: translateY(1px);
	}
	
	.large.button {
		font-size: 12px;
		padding: 5px 10px 5px;
	}
	
	.red.button {
		background-color: #e33100;
	}
	
	.red.button:hover {
		background-color: #872300;
	}
	
	@-webkit-keyframes redPulse {
		from {
			background-color: #bc330d;
			-webkit-box-shadow: 0 0 9px #333;
		}
		50% {
			background-color: #e33100;
			-webkit-box-shadow: 0 0 18px #e33100;
		}
		to {
			background-color: #bc330d;
			-webkit-box-shadow: 0 0 9px #333;
		}
	}
	
	a.button {
		-webkit-animation-duration: 2s;
		-webkit-animation-iteration-count: infinite;
	}
	
	.red.button {
		-webkit-animation-name: redPulse;
		-webkit-animation-duration: 1s;
	}
</style>