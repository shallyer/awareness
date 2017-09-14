<template>
	<div class="zyh_all">
		<div class="left partStyle">
			<div class="partCont">
				<div class="partH30 borderRad8 ">
					<div class="chartTitle">
						<span>实时监测值</span>
					</div>
					<div class="contH85" >
						<div class="chartall borderRad8B chartBG">
							<div class="chart1-1-2">
								<div class="curk">
									<p>
										<span class="spanT" id="curT">当前风险值：</span>
										<span class="spanN" id="curD">234</span>
									</p>
								</div>
								<div class="curk">
									<p>
										<span class="spanT">当前资产总值：</span>
										<span class="spanN">234</span>
									</p>
								</div>
								<div class="curk">
									<p>
										<span class="spanT">当前漏洞总值：</span>
										<span class="spanN">234</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="partH30 borderRad8 marginTop">
					<div class="chartTitle">
						<span>资产服务流量排行榜</span>
					</div>
					<div class="contH85 ">
						<ul class="chartall chartBG listUL borderRad8B">
							<li v-for="(item,index) in assetsServerData" v-if="index<6">
								<span class="ranking content-font-style">NO.{{index+1}}</span>
								<span class="flowIp content-font-style">{{item.name}}</span>
								<span class="flowNum content-font-style">{{item.value}}M</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="partH35 borderRad8 marginTop">
					<div class="chartTitle">
						<span>漏洞资产 TOP5</span>
					</div>
					<div class="contH85">
						<div class="chartall borderRad8B chartBG" id="chart3-1"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="middle partStyle">
			<div class="partCont">
				<div class="borderRad8 chart4" >
					<div class="chartall borderRad8 chartBG" id="chart4">
						<topo></topo>
					</div>
				</div>
				<div class="partH30 marginTop" id="chart5">
					<div class="chartall borderRad8" id="chart5-1">
						<div class="chartTitle">
							<span>报警历史</span>
						</div>
						<div class="contH85">
							<ul class="chartall chartBG listUL borderRad8B">
								<li v-for="(item,index) in warnHistory" v-if="index<5">
									<span class="warnIp content-font-style">{{item.ip}}</span>
									<span class="warnNews content-font-style" :title="item.news">{{item.news}}</span>
									<span class="warnTime content-font-style">{{item.time}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right partStyle">
			<div class="partCont">
				<div class="partH30 " id="chart6">
					<div class=" chart6-1 " id="chart6-1">
						<div class="chartall borderRad8">
							<div class="chartTitle">
								<span>资产带宽最大 TOP5</span>
							</div>
							<div class="contH85" >
								<div class="chartall borderRad8B chartBG" id="chart6-1-1"></div>
							</div>
						</div>
					</div>

					<div class=" chart6-2" id="chart6-2">
						<div class="chartall borderRad8">
							<div class="chartTitle">
								<span>资产带宽最小 TOP5</span>
							</div>
							<div class="contH85" >
								<div class="chartall borderRad8B chartBG" id="chart6-2-1"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="partH30 borderRad8 marginTop" id="chart7">
					<div class="chartTitle">
						<span>资产总体统计值</span>
					</div>
					<div class="contH85">
						<ul class="chartall chartBG listUL borderRad8B">
							<li>
								<span class="content-font-style tjIP">IP</span>
								<span class="content-font-style tjKernel">内核</span>
								<span class="content-font-style tjCPU">CPU</span>
								<span class="content-font-style tjMemory">内存/占用内存</span>
								<span class="content-font-style tjDisk">磁盘/占用磁盘</span>
							</li>
							<li v-for="(item,index) in assetsTJData" v-if="index<4">
								<span class="content-font-style tjIP">{{item.ip}}</span>
								<span class="content-font-style tjKernel">{{item.neihe}}</span>
								<span class="content-font-style tjCPU">{{item.cpu}}</span>
								<span class="content-font-style tjMemory">{{item.mc}}</span>
								<span class="content-font-style tjDisk">{{item.cp}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="partH35 marginTop" id="chart8">
					<div class=" chart6-1 " id="chart8-1">
						<div class="chartall borderRad8">
							<div class="chartTitle">
								<span>危险程度分布</span>
							</div>
							<div class="contH85" >
								<div class="chartall borderRad8B chartBG" id="chart8-1-1"></div>
							</div>
						</div>
					</div>
					<div class=" chart6-2" id="chart8-2">
						<div class="chartall borderRad8">
							<div class="chartTitle">
								<span>漏洞种类分布</span>
							</div>
							<div class="contH85" >
								<div class="chartall borderRad8B chartBG" id="chart8-2-1"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    var common_tools = require("common_tools");
    import topo from './topo.vue';
    require("../../../../public_resource/vendor/jquery.actual.min.js")
    require("../../../../public_resource/vendor/world.js")
    export default {
        components:{topo},
        data() {
            return {
                loudongAssetsData:[
                    {value:335, name:'123.255.361.461'},
                    {value:274, name:'123.150.144.116'},
                    {value:195, name:'123.235.136.463'},
                    {value:235, name:'123.155.245.155'},
                    {value:400, name:'123.125.136.465'}
                ],
                loudongKindsData:[
                    {value:435, name:'SSH'},
                    {value:174, name:'HTTP'},
                    {value:335, name:'Samba'},
                    {value:285, name:' SMB'},
                    {value:400, name:'RPC'}
                ],
                assetsDKData:[
                    {value:100, name:'123.25.36.462'},
                    {value:258, name:'123.25.36.463'},
                    {value:312, name:'123.25.36.464'},
                    {value:346, name:'123.25.36.465'},
                    {value:452, name:'123.25.36.466'}
                ],
                assetsServerData:[
                    {value:335, name:'123.25.36.416'},
                    {value:310, name:'123.25.36.426'},
                    {value:234, name:'123.25.36.436'},
                    {value:135, name:'123.25.36.446'},
                    {value:456, name:'123.25.36.566'}
                ],
                assetsTJData:[
                    {'ip':'123.255.361.461','neihe':'4','cpu':'39%','mc':'1.6/2.3GB','cp':'2.34/23.21'},
                    {'ip':'123.150.144.116','neihe':'8','cpu':'49%','mc':'2.6/2.3GB','cp':'3.34/23.21'},
                    {'ip':'123.235.136.463','neihe':'4','cpu':'69%','mc':'3.6/2.3GB','cp':'4.34/23.21'},
                    {'ip':'123.155.245.155','neihe':'4','cpu':'29%','mc':'4.6/2.3GB','cp':'5.34/23.21'},
                    {'ip':'123.125.136.465','neihe':'8','cpu':'79%','mc':'5.6/2.3GB','cp':'6.34/23.21'},
                    {'ip':'123.256.251.252','neihe':'8','cpu':'19%','mc':'5.6/2.3GB','cp':'7.34/23.21'},
                    {'ip':'123.125.457.225','neihe':'4','cpu':'29%','mc':'3.6/2.3GB','cp':'8.34/23.21'},
                ],
				warnHistory:[
					{ip:'123.56.452.751',news:'SQL在HTTP头中使用睡眠功能-可能SQL注入尝试',time:'2017.05.18'},
					{ip:'123.56.452.752',news:'SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt',time:'2017.05.17'},
					{ip:'123.56.452.753',news:'SQL use of sleep function in HTTP header - likely SQL injection attempt',time:'2017.05.15'},
					{ip:'123.56.452.755',news:'SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt',time:'2017.05.14'},
					{ip:'123.56.452.756',news:'os-windows微软Windows SMB远程执行代码的尝试',time:'2017.05.14'},
				]
            }
        },

        methods: {
            ldKinds2(){
                var mychart=this.$echarts.init(document.getElementById('chart8-2-1'));
                var _self=this;
                _self.data=this.loudongKindsData;
                _self.dataName=[];
                _self.dataValue=[];
                for(var i=0;i<_self.data.length;i++){
                    var ll=_self.data[i].name;
                    var llV=_self.data[i].value;
                    _self.dataName.push(ll);
                    _self.dataValue.push(llV);
                }
                mychart.setOption({
                    textStyle:{
                        color:'#C9DAF4'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '13%',
                        bottom: '10%',
                        top:'17%',
                        containLabel: true,
                    },
                    xAxis: {
                        show:true,
                        type: 'value',
                        boundaryGap: [0, 0.1],
                        name:'个数',
                        zxisLine:{     //坐标轴设置
                            lineStyle:{
                                color:'#b9b1b1'
                            }
                        },
                        axisTick:{
                            show:true,
                            inside:false,
                            width:'0'
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#C9DAF4',
                                width:1
                            }
                        },
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color:['#2b303c']
                            }
                        },

                    },
                    yAxis: {
                        name:'漏洞种类分布',
                        type: 'category',
                        splitLine:{
                            show:false
                        },
                        axisTick:{
                            show:true,
                            inside:false,
                            width:'0'
                        },
                        axisLine:{
                            show:true,
                            lineStyle:{
                                color:'#C9DAF4',
                                width:1
                            }
                        },
                        data:_self.dataName
                    },
                    series: [
                        {
                            name: '个数',
                            type: 'bar',
                            barWidth:'65%',
                            label:{
                                normal:{
                                    show:true,
                                    position:'right',
                                    textStyle:{
                                        color:'#C9DAF4'
                                    }
                                }
                            },
                            itemStyle:{
                                normal: {
//                                    barBorderRadius: [0, 10, 10, 0],
                                    color: {
                                        type: 'bar',
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(11,42,84,.3)' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#4bf3ff' // 100% 处的颜色
                                        }],
                                        globalCoord: false, // 缺省为 false

                                    }
                                }
                            },

                            data:_self.dataValue
                        }
                    ]
                })
            },
            ldAssets(){
                var mychart=this.$echarts.init(document.getElementById('chart3-1'));
                var _self=this;
                _self.date=this.loudongAssetsData;
                mychart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series : [
                        {
                            name:'漏洞资产',
                            type:'pie',
                            radius : '65%',
                            center: ['48%', '50%'],
                            data:_self.date.sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#C9DAF4',
                                        fontSize:'14'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 3,
                                    length2:3
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                })
            },
            dangerD(){
                var mychart=this.$echarts.init(document.getElementById('chart8-1-1'));
                var _self=this;
//                _self.date=this.dangerData;
                mychart.setOption({
                    textStyle:{
                        color:'#C9DAF4'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '13%',
                        bottom: '10%',
                        top:'17%',
                        containLabel: true,
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.1],
                        name:'个数',
                        zxisLine:{     //坐标轴设置
                            lineStyle:{
                                color:'#b9b1b1'
                            }
                        },
                        axisTick:{
                            show:true,
                            inside:false,
                            width:'0'
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#C9DAF4',
                                width:1
                            }
                        },
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color:['#2b303c']
                            }
                        },

                    },
                    yAxis: {
                        name:'危险程度',
                        type: 'category',
                        splitLine:{
                            show:false
                        },
                        axisTick:{
                            show:true,
                            inside:false,
                            width:'0'
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#C9DAF4',
                                width:1
                            }
                        },
                        data: ['高危','中危','低危','提示']
                    },
                    series: [
                        {
                            name: '个数',
                            type: 'bar',
                            barWidth:'65%',
                            label:{
                                normal:{
                                    show:true,
                                    position:'right',
                                    textStyle:{
                                        color:'#C9DAF4'
                                    }
                                }
                            },
                            data:[
                                {
                                    value:200,
                                    itemStyle:{
                                        normal:{
//                                            barBorderRadius: [0, 10, 10, 0],
                                            color:'#e14e4f',
                                        }
                                    }
                                },
                                {
                                    value:300,
                                    itemStyle:{
                                        normal:{
//                                            barBorderRadius: [0, 10, 10, 0],
                                            color:'#ff9933'
                                        }
                                    }
                                },
                                {
                                    value:100,
                                    itemStyle:{
                                        normal:{
//                                            barBorderRadius: [0, 10, 10, 0],
                                            color:'#ffcc67'
                                        }
                                    }
                                },
                                {
                                    value:460,
                                    itemStyle:{
                                        normal:{
//                                            barBorderRadius: [0, 10, 10, 0],
                                            color:'#95c4aa'
                                        }
                                    }
                                }
                            ],
                        }
                    ]
                })
            },
            assetsDKMax(){
                var mychart= this.$echarts.init(document.getElementById("chart6-1-1"));
                var _self=this;
                mychart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series : [
                        {
                            name:'资产带宽',
                            type:'pie',
                            radius : '65%',
                            center: ['48%', '50%'],
                            data:_self.date.sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#C9DAF4',
                                        fontSize:'14'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 5,
                                    length2: 5
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                })
            },
            assetsDKMin(){
                var mychart= this.$echarts.init(document.getElementById("chart6-2-1"));
                var _self=this;
                _self.data=this.assetsDKData;
                mychart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series : [
                        {
                            name:'资产带宽',
                            type:'pie',
                            radius : '65%',
                            center: ['48%', '50%'],
                            data:_self.date.sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#C9DAF4',
                                        fontSize:'14'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 5,
                                    length2: 5
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]

                })
            },


        },

        mounted: function() {
            this.ldKinds2();
            this.ldAssets();
            this.dangerD();
            this.assetsDKMax();
            this.assetsDKMin();


        }
    }
</script>
<style>
	.zyh_all{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 15px 0px 5px 0px;
		/*overflow: hidden;*/
	}
	.borderRad8{
		border-radius: 8px;
	}
	.left{  width:20%;  }
	.middle,.right{width: 40%}
	.partStyle{
		height: 100%;
		float: left;
	}
	.partCont{
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-left: 15px;
	}
	.partH30{
		width: 100%;
		height: 30%;
		/*overflow: hidden;*/
	}
	.partH35{
		width: 100%;
		height: 35%;
	}
	.contH85{
		width: 100%;
		height: 85%;
	}
	.chart4{
		width: 100%;
		height: 67%;
	}
	.marginTop{
		margin-top: 15px;
		/*overflow: hidden;*/
	}
	.chartall{
		width: 100%;
		height: 100%;
		/*overflow: hidden;*/
	}
	.borderRad8T{border-radius: 8px 8px 0 0;}
	.borderRad8B{border-radius: 0 0 8px 8px;}
	.chartBG{
		background-color:rgba(255, 255, 255, 0.1)!important;
	}
	.chart6-1,.chart6-2{
		width: 50%;
		height: 100%;
		box-sizing: border-box;
		float: left;
		/*overflow: hidden;*/
	}
	.chart6-1{padding-right: 7.5px}
	.chart6-2{padding-left: 7.5px}

	.content-font-style{
		font-weight: normal;
		font-size:1.4rem;
		color: #c8d9f3;
		padding-top: 4px;
		text-align: center;
		/*background:rgba(255, 255, 255, 0.1)!important;*/
	}
	.chartTitle{
		width: 100%;
		height: 15%;
		display: table;
		box-sizing: border-box;
		padding-left: 10px;
		font-size: 1.4rem;
		font-weight: bold;
		color: #C9DAF4;
		margin-bottom: 2px;
		z-index: 999;
		background:rgba(255, 255, 255, 0.1)!important;
		border-radius: 8px 8px 0 0;
	}
	.chartTitle span{
		display: table-cell;
		vertical-align: middle;
	}

	/*当前风险值*/
	.chart1-1-2{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 25px 30px;
		overflow: hidden;
	}
	.curk{
		width: 100%;
		box-sizing: border-box;
		background-color: #fba601;
		color: #FFFFFF;
		font-size: 1.5rem;
		text-align: center;
		padding: 5px 10px;
		font-weight: 600;
	}
	.curk .spanT{display:inline-block;width: 50%;float: left;text-align: left;}
	.curk .spanN{
		display: inline-block;
		width: 50%;
		font-size: 1.8rem;
		box-sizing: border-box;
		text-align: right;
		font-family:'fontNameQarmicsans';
	}
	.curk:first-child{background: transparent;font-size: 2rem;text-align: center}
	.curk:nth-child(2){background-color: #a94ef6;margin-top: 15px;}
	.curk:nth-child(3){background-color: #4d97fa;margin-top: 15px;}
	#curD{
		font-size:3rem;
		text-align: center;
	}
	#curT{text-align: center;}

	/*资产服务流量排行榜   报警历史*/
	.listUL li{
		width: 100%;
		box-sizing: border-box;
		padding: 8px 25px;
		text-align: center;
		font-size: 0;
		cursor: pointer;
	}
	.listUL li span{  display: inline-block; overflow: hidden;}
	.ranking,.flowNum,.warnIp,.warnTime{  width: 20%;  }
	.flowIp,.warnNews{  width: 60%;  }
	.warnNews{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/*资产总体统计值*/
	.tjIP{width: 25%;}
	.tjKernel{width: 10%;}
	.tjCPU{width: 15%;}
	.tjMemory{width: 20%;}
	.tjDisk{width: 20%;}
























</style>