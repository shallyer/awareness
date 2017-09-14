<template>
	<div class="analysisOne_root">
		<div class="analysis_root_echarts">
			<div class="analysis_echarts_Box">
				<div id="analysis_echartsAll" style="width: 100%;height:500px;margin-left: 5%;"></div>

			</div>
			<div id="analysis_root_echarts_echarts_details">
				<div class="analysis_echarts_oneBox">
					<i></i>
					<p>进出IP(个数)</p>
					<div class="analysis_echarts_Box_btn">
						<button @click='hour()'>时</button>
						<button @click='day()'>日</button>
						<button @click='month()'>月</button>
					</div>
					<div id="analysis_echarts_one" style="width: 100%;height:300px;float: left;margin-left: 4%;"></div>
				</div>
				<div class="analysis_echarts_oneBox">
					<i></i>
					<p>进出IP(大小)</p>
					<div class="analysis_echarts_Box_btn">
						<button @click='Sizehour()'>时</button>
						<button @click='Sizeday()'>日</button>
						<button @click='Sizemonth()'>月</button>
					</div>
					<div id="analysis_echarts_two" style="width: 100%;height:300px;float: left;margin-left: 2%;"></div>
				</div>
				<div class="analysis_echarts_oneBox">
					<i></i>
					<p>IP访问量Top10</p>
					<div id="analysis_echarts_three" style="width:100%;height: 300px;"></div>
				</div>
				<div class="analysis_echarts_oneBox">
					<i></i>
					<p>IP访问量大小Top10</p>
					<div id="analysis_echarts_four" style="width: 100%;height:300px;float: left;"></div>
				</div>

			</div>
		</div>

		</el-tabs>
	</div>
</template>

<script src="http://192.168.14.197/vue/situationAwareness/src/json/flow2.json"></script>
<script>
	var common_tools = require("common_tools");
	import actual from '../../../public_resource/vendor/jquery.actual.min.js';
	export default {
		data() {
			return {

				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				mychart1: null,
				mychart2:null,
				exampleData:[{
                    value: 335,
                    name: '180.149.132.47'
                },
                    {
                        value: 310,
                        name: '202.108.22.5'
                    },
                    {
                        value: 234,
                        name: '202.108.22.103'
                    },
                    {
                        value: 135,
                        name: '202.108.23.237'
                    },
                    {
                        value: 548,
                        name: '202.108.23.153'
                    }, {
                        value: 548,
                        name: '202.108.23.154'

                    }, {
                        value: 1548,
                        name: '202.108.23.106'
                    }, {
                        value: 158,
                        name: '123.125.114.144'
                    }, {
                        value: 85,
                        name: '198.222.145.63'
                    }, {
                        value: 54,
                        name: '155.263.189'
                    }
                ],

			}
		},

		mounted() {
			this.drawline();
			this.hour();
			this.Sizehour()

		},
		methods: {
			tableRowClassName(row, index) {
				if(index === 1) {
					return 'info-row';
				} else if(index === 3) {
					return 'positive-row';
				}
				return '';
			},

			drawline() {

                var dataName=[];
                var dataValue=[];
                var colorList= ['#d87c7c', '#919e8b', '#d7ab82', '#46d185', '#61a0a8', '#efa18d', '#234797','#48b3d3','#7c1b99', '#cc7e63', '#724e58', '#db5087','#f2c955','#787464'];
                for(var i=0;i<this.exampleData.length;i++){
                    dataValue.push(this.exampleData[i].value);
                    dataName.push(this.exampleData[i].name);
				}
//                echarts.util.each(this.exampleData, function(item, index) {
//                    item.itemStyle = {
//                        normal: {
//                            color: colorList[index]
//                        }
//                    };
//                });


                var re3width = $("#analysis_echarts_three").actual('width');
				var re1width = $("#analysis_echarts_one").actual('width');
				var re2width = $("#analysis_echarts_two").actual('width');
				var re4width = $("#analysis_echarts_four").actual('width');
				$('#analysis_echarts_three').css("width", re3width);
				$('#analysis_echarts_one').css("width", re1width);
				$('#analysis_echarts_two').css("width", re2width);
				$('#analysis_echarts_four').css("width", re4width);
				console.log($('#analysis_echarts_three').css("width"));
				console.log($("#analysis_echarts_three").actual('width'));

				let mychart = this.$echarts.init(document.getElementById('analysis_echartsAll'));
				window.onresize = mychart.resize;
				let mychart1 = this.$echarts.init(document.getElementById('analysis_echarts_one'));
				this.mychart1 = mychart1;
				let mychart2 = this.$echarts.init(document.getElementById('analysis_echarts_two'));
				this.mychart2 = mychart2;
				let mychart3 = this.$echarts.init(document.getElementById('analysis_echarts_three'));
				let mychart4 = this.$echarts.init(document.getElementById('analysis_echarts_four'));
				window.onresize = mychart.resize;
				common_tools.AJAX('get', 'http://192.168.14.197/vue/situationAwareness/src/json/flow2.json', {}, function(data) {
					mychart.hideLoading();
					var skOption={
                        title: {

                            text: '流量走势概览图',
                            top: 10
                        },
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'

                        },
                        series: [{
                            top: 50,
                            type: 'sankey',
                            layout: 'none',
                            color: ['#d87c7c', '#919e8b', '#d7ab82', '#46d185', '#61a0a8', '#efa18d', '#234797','#48b3d3','#7c1b99', '#cc7e63', '#724e58', '#db5087','#f2c955','#787464'],
                            data: data.nodes,
                            links: data.links,
                            itemStyle: {
                                normal: {
                                    borderWidth: 0,
                                    borderColor: '#aaa'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    curveness: 0.5
                                }
                            }
                        }]
					}
					for(var i=0;i<skOption.series[0].data.length;i++){
					    var el=skOption.series[0].data[i];
					    el.itemStyle={};
					    el.itemStyle.normal={};
                        el.itemStyle.normal.color=skOption.series[0].color[i];

					}
                    for(var i=0;i<skOption.series[0].links.length;i++){
                        var el=skOption.series[0].links[i];
                        el.lineStyle={};
                        el.lineStyle.normal={};
                        el.lineStyle.normal.color=skOption.series[0].color[i];

                    }

					mychart.setOption(skOption,false);
					/*
					mychart.setOption({
						title: {

							text: '流量走势概览图',
							top: 10
						},
						tooltip: {
							trigger: 'item',
							triggerOn: 'mousemove'

						},
						series: [{
							top: 50,
							type: 'sankey',
							layout: 'none',
							data: data.nodes,
							links: data.links,


						}]
					})
					*/
				});

				
					mychart3.setOption({

//                        graphic: {
//                            elements: [{
//                                type: 'image',
//                                style: {
//                                    image: giftImageUrl,
//                                    width: 30,
//                                    height: 30
//                                },
//                                left: 'center',
//                                top: 'center'
//                            }]
//                        },
                        legend: {
                            width: 300,
                            orient: 'vertical',
                            left: '3%',
                            rigth: '3%',
                            data: dataName
                        },
                        series: [{
                            type: 'pie',
                            radius: [30, '55%'],
                            center: ['55%', '60%'],
                            roseType: 'radius',
                            color: ['#f2c955', '#00a69d', '#46d185', '#ec5845','#5ebcd2','#e3572a','#db5087'],
                            data: this.exampleData,
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: 14
                                    },
                                    formatter: function(param) {
//                                        return param.name + ':\n' + Math.round(param.percent) + '%';
                                        return param.name;
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    smooth: true,
                                    lineStyle: {
                                        width: 2
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    shadowBlur: 30,
                                    shadowColor: 'rgba(0, 0, 0, 0.4)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function(idx) {
                                return Math.random() * 200;
                            }
                        }]

					}),
					mychart4.setOption({
                        legend: {
                            width: 300,
                            orient: 'vertical',
                            left: '3%',
                            rigth: '3%',
                            data: dataName
                        },
                        series: [{
                            type: 'pie',
                            radius: [30, '55%'],
                            center: ['55%', '60%'],
                            roseType: 'radius',
                            color: ['#f2c955', '#00a69d', '#46d185', '#ec5845','#5ebcd2','#e3572a','#db5087'],
                            data: this.exampleData,
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: 14
                                    },
                                    formatter: function(param) {
//                                        return param.name + ':\n' + Math.round(param.percent) + '%';
                                        return param.name;
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    smooth: true,
                                    lineStyle: {
                                        width: 2
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    shadowBlur: 30,
                                    shadowColor: 'rgba(0, 0, 0, 0.4)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function(idx) {
                                return Math.random() * 200;
                            }
                        }]

					})

			},
			hour() {
				this.mychart1.setOption({
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['进', '出'],
						left:'50%',
						top:'10'

					},

			
					calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: ['1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '此时'],

					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							formatter: '{value} 个'
						}
					}],
					series: [{
							name: '进',
							type: 'line',
							smooth: true,
							data: [304, 256, 604, 659, 626, 698, 798, 849, 707, 684, 665, 937]
						},
						{
							name: '出',
							type: 'line',
							smooth: true,
							data: [323, 463, 655, 565, 536, 347, 558, 563, 476, 387, 528, 521]
						}

					]

				})
			},
            day() {
				this.mychart1.setOption({
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: ['进', '出'],
							selectedMode: "false",
							left:'50%',
						    top:'10'

						},
						
						calculable: true,
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: ['6.4', '6.5', '6.6', '6.7', '6.8', '6.9', '6.10','6.11','6.12','6.13','6.14','6.15','6.16','6.17','6.18','6.19','6.20','6.21','6.22','6.23','6.24','6.25','6.26','6.27','6.28','6.29','6.30','7.1','7.2'],

						}],
						yAxis: [{
							type: 'value',
							axisLabel: {
							formatter: '{value} 个'
						}
						}],
						series: [{
								name: '进',
								type: 'line',
								smooth: true,
								data: [30434, 25645, 60467, 65923, 62345, 69856, 73956, 78434, 77756, 68467, 68523, 69378, 25645, 60467, 65923, 62345, 69856, 73956, 78434, 77756, 68467, 68523, 69378, 25645, 60467, 65923, 62345, 69856, 73956, 78434, 77756, 68467, 68523, 69378, 25645, 60467, 65923, 62345, 69856, 73956, 78434, 77756, 68467, 68523, 69378]
							},
							{
								name: '出',
								type: 'line',
								smooth: true,
								data: [51134, 49156, 50178, 50289, 53389, 53445, 53535, 54634, 60756, 50856, 52967, 50288, 49156, 50178, 50289, 53389, 53445, 53535, 54634, 60756, 50856, 52967, 50288, 49156, 50178, 50289, 53389, 53445, 53535, 54634, 60756, 50856, 52967, 50288, 49156, 50178, 50289, 53389, 53445, 53535, 54634, 60756, 50856, 52967, 50288]
							}

						]
					}

				)
			},
			month() {
				this.mychart1.setOption({
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: ['进', '出'],
							selectedMode: "false",
							left:'50%',
						    top:'10'

						},
						
						calculable: true,
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月'],

						}],
						yAxis: [{
							type: 'value',
							axisLabel: {
							formatter: '{value} 个'
						}
						}],
						series: [{
								name: '进',
								type: 'line',
								smooth: true,
								data:[3042, 2563, 6044, 6595, 6236, 6978, 7398, 7849, 7707, 6854, 6865, 6937]
							},
							{
								name: '出',
								type: 'line',
								smooth: true,
								data: [3243, 5463, 6355, 5465, 5336, 5347, 5358, 5463, 6076, 5087, 5298, 5021]
							}

						]
					}

				)
			},

		    Sizehour(){
		    	this.mychart2.setOption({

							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: ['进', '出'],
								left:'50%',
						        top:'10'

							},
							
							calculable: true,
							xAxis: [{
								type: 'category',
								boundaryGap: false,
								data: ['1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '此时'],

							}],
							yAxis: [{
								type: 'value',
								axisLabel: {
							formatter: '{value} KB'
						}
							}],
							series: [{
									name: '进',
									type: 'line',
									smooth: true,
									data: [1341332, 4325435, 4314325, 26546345, 4352543, 2543543, 2433452, 6574657, 2432524, 642342, 4666522, 4324524]
								},
								{
									name: '出',
									type: 'line',
									smooth: true,
									data: [1341332, 4325455, 43143753, 26542345, 4352443, 2543533, 2433252, 6574687, 2432529, 6423400, 4666524, 4344524]
								}

							]
						}

					)
		    },
		    Sizeday(){
		    	this.mychart2.setOption({

							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: ['进', '出'],
								left:'50%',
						        top:'10'
								
							},
							
							calculable: true,
							xAxis: [{
								type: 'category',
								boundaryGap: false,
								data: ['6.4', '6.5', '6.6', '6.7', '6.8', '6.9', '6.10','6.11','6.12','6.13','6.14','6.15','6.16','6.17','6.18','6.19','6.20','6.21','6.22','6.23','6.24','6.25','6.26','6.27','6.28','6.29','6.30','7.1','7.2'],

							}],
							yAxis: [{
								type: 'value',
								axisLabel: {
							formatter: '{value} KB'
						}
							}],
							series: [{
									name: '进',
									type: 'line',
									smooth: true,
									data: [13413350, 43254356, 43132567, 2634578, 4354378, 2534345, 2435245 ,4354378, 2534345, 2435245, 43254356, 43132567, 2634578, 4354378, 2534345, 2435245 ,4354378, 2534345, 2435245, 43254356, 43132567, 2634578, 4354378, 2534345, 2435245 ,4354378, 2534345, 2435245, 43254356, 43132567, 2634578, 4354378, 2534345, 2435245 ,4354378, 2534345, 2435245]
								},
								{
									name: '出',
									type: 'line',
									smooth: true,
									data: [1313324, 4325556, 43137334, 26534523, 4354345, 2543334, 2425245, 4325556, 43137334, 26534523, 4354345, 2543334, 2425245, 4325556, 43137334, 26534523, 4354345, 2543334, 2425245, 4325556, 43137334, 26534523, 4354345, 2543334, 2425245, 4325556, 43137334, 26534523, 4354345, 2543334, 2425245, 4325556, 43137334, 26534523, 4354345, 2543334, 2425245]
								}

							]
						}

					)
		    },
		    Sizemonth(){
		    	this.mychart2.setOption({

							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: ['进', '出'],
								left:'50%',
						        top:'10'

							},
							
							calculable: true,
							xAxis: [{
								type: 'category',
								boundaryGap: false,
								data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月']

							}],
							yAxis: [{
								type: 'value',
								axisLabel: {
							formatter: '{value} KB'
						}
							}],
							series: [{
									name: '进',
									type: 'line',
									smooth: true,
									data: [13413321, 43254352, 43143255, 65463456, 43525437, 25435437, 24334528, 65746577, 24325246, 64234275, 46665228, 43245245]
								},
								{
									name: '出',
									type: 'line',
									smooth: true,
									data: [13413325, 43254555, 431437535, 265423455, 43524435, 25435335, 24332525, 65746875, 24325295, 64234005, 46665245, 43445245]
								}

							]
						}

					)
		    },
		
		 
		
		}

	}
</script>

<style>
	.analysisOne_root {
		width: 100%;
		height: 100%;
		padding-top: 20px;
	}
	
	#analysis_wramp {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
		/*display: none;*/
		z-index: 9999;
	}
	
	.analysis_echarts_oneBox {
		width: 49%;
		height: 45%;
		border: 1px solid #D1DBE5;
		border-radius: 4px;
		overflow: hidden;
		float: left;
		/*margin-right: 1%;*/
		margin-top: 1.7%;
	/*	margin-left: 2%;*/
		position: relative;
	}
	#analysis_root_echarts_echarts_details .analysis_echarts_oneBox:nth-child(2n){
		margin-left:1.7%;
	}
	
	.analysis_echarts_Box {
		width: 94%;
		height: 30%;
		border: 1px solid #D1DBE5;
		border-radius: 4px;
		overflow: hidden;
		margin-left: 3%;
		margin-right: 3%;
	}
	
	.analysis_echarts_oneBox p {
		width: 100%;
		height: 36px;
		background-color: #f5f5f5;
		font-size: 1.4rem;
		padding-left: 45px;
		padding-top: 1.5%;
	}
	
	#analysis_echarts_one {
		margin: 0 auto;
	}
	
	.tab_one .analysis_root {
		width: 100%;
		height: 100%;
	/*	margin: 0% 2%;*/
	}
	
	.analysis_root_echarts {
      
		width: 100%;
		height: 90%;
		
	}
	
	.analysisOne_root .analysis_echartsInfo {
		width: 20%;
		height: 150px;
		border: 1px solid #D1DBE5;
		float: right;
		margin-right: 5%;
		margin-top: 2%;
		border-radius: 4px;
		overflow: hidden;
	}
	
	.analysisOne_root .analysis_echartsInfo p {
		width: 100%;
		height: 25px;
		font-size: 1.4rem;
		background-color: #f5f5f5;
		padding: 3px;
		border: 1px solid #f5f5f5;
	}
	
	#analysis_root_echarts_echarts_details {
		width: 94%;
		height: 850px;
		margin-left: 3%;
		margin-right: 3%;
	}
	
	.el-tab-pane .tab_one {
		width: 100%;
		height: 100%;
	}
	
	#analysis_echartsAll {
		float: left;
	}
	
	.analysis_echarts_oneBox>i {
		width: 20px;
		height: 20px;
		display: block;
		position: absolute;
		top: 12px;
		left: 5px;
		background:url(../../../public_resource/img/graph.png) no-repeat center center;
		background-size:cover ;
	}
	
	.analysis_echarts_Box_btn {
		width: 200px;
		height: 20px;
		margin-left: 50px;
		position: absolute;
		z-index: 99999;
		margin-top: 5px;
	}
	
	.analysis_echarts_Box_btn button {
		    display: inline-block;
    padding: 4px 20px;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #3398DB;
    border: 1px solid #3398DB;
    border-radius: 60px;
    cursor: pointer;
    margin-right: 10px;
    background-color: #FFFFFF;
    overflow: hidden;
    outline-style: none;
	}
	.analysis_echarts_Box_btn button:hover{
		background-color: #20A0FF;
		color:#FFFFFF;
	}
	.analysis_echarts_oneBox i{
		display: block;
		width: 30px;
		height: 30px;	
		background:url(../../../public_resource/img/chart-icon03.png) no-repeat center center;
		background-size: cover;
		margin-top: -5px;
	}
</style>