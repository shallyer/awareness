<template>
	<div class="analysis_Two_root">
		<el-table
				:data="tableData2"
				stripe
				border
				style="width: 100%">
			<el-table-column
					prop="application"
					label="应用"
					width="150">
			</el-table-column>
			<el-table-column
					prop="L4_Proto"
					label="协议"
					width="130">
			</el-table-column>
			<el-table-column
					prop="Client"
					label="客户机"
					width="250">
			</el-table-column>
			<el-table-column
					prop="Server"
					label="服务器"
					width="250">
			</el-table-column>
			<el-table-column
					prop="Duration"
					label="监测时间"
					width="250">
			</el-table-column>
			<el-table-column label="Breakdown" width="250">
				<template scope="scope">
					<div class="breakDown-bar-two">
						<div class="bar-client" style="">Client{{one}}</div>
						<div class="bar-server" style="">Server{{two}}</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column
					prop="Actual_Thpt"
					label="实际/峰值吞吐量"
					width="180">
			</el-table-column>
			<el-table-column
					prop="Total_Bytes"
					label="总字节数"
					width="180">
			</el-table-column>
			<el-table-column label="查看"  show-overflow-tooltip="false">
				<template scope="scope">
					<el-button class="analysis_Two_root-info" type="primary" icon="search" @click="handleClick">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页部分-->
		<div class="analysis_Two_root-page">
			<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
			</el-pagination>
		</div>

		<!--详情-->
		<div class="blackBg"></div>
		<div class="analysis_wramp">
			<div class="infoCont">
				<div class="infoContTitleK">
					<p class="infoCont-title floatLe"><span>AMQP&nbsp;&nbsp;详情信息</span></p>
					<div class="closeBtn floatLe" >
						<div class="closeBtnT" @click="btnclose">×</div>
					</div>
				</div>
				<div class="infoCont-cont">
					<div class="part1">
						<div class="partS-K detail-time">
							<div class="bg-white">
								<p class="bigfont">AMQP</p>
								<p class="smallfont">应用</p>
							</div>
						</div>
						<div class="partS-K detail-proto">
							<div class="bg-white">
								<p class="bigfont">TCP</p>
								<p class="smallfont">协议</p>
							</div>
						</div>
						<div class="partS-K detail-total-bytes">
							<div class="bg-white">
								<p class="bigfont">235.15M</p>
								<p class="smallfont">总字节数</p>
							</div>
						</div>
						<div class="detail-sc">
								<div class="detail-sc-s">
									<div class="bg-white-h">
										<p><span>客户机:&nbsp;&nbsp;</span><span class="curName">23suateam:39062</span></p>
									</div>
								</div>
								<div class="detail-sc-c">
									<div class="bg-white-h">
										<p><span>服务器:&nbsp;&nbsp;</span><span class="curName">controller:amqp</span></p>
									</div>
								</div>

						</div>
					</div>
					<div class="part2">
						<div class="part21">
							<div class="part-title">实际峰值吞吐量</div>
							<div class="chartK">
								<div class="part2-chart" id="zyhchart1"></div>
							</div>
						</div>
						<div class="part21">
							<div class="part-title">BreakDown</div>
							<div class="chartK">
								<div class="part2-chart" id="zyhchart2"></div>
							</div>
						</div>
						<div class="part21">
							<div class="breakDownKK">
								<div class="breakDown-num">
									<div class="bk-title">
										<span class="">流量状态:&nbsp;&nbsp;</span>
										<span class="curName">正常</span>
									</div>
									<div class="bk-cont">
										<div class="bk-c-s bk-cont-1">
											<p>服务器 → 客户机: </p>
											<p id="bkStyle">153.25M</p>
										</div>
										<div class="bk-s-c bk-cont-1">
											<p>客户机 → 服务器: </p>
											<p id="bkStyle">456.21M</p>
										</div>
									</div>
								</div>

								<div class="duration">监测时间&nbsp;&nbsp;<span class="curName">23&nbsp;day,50&nbsp;min,44&nbsp;sec</span></div>
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
    import actual from '../../../public_resource/vendor/jquery.actual.min.js';
	export default {
		data() {
			return {
				one:'60%',
				two:'40%',
				tableData2: [{
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {

					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}, {
					application: 'AMQP ',
					L4_Proto: 'TCP',
					Client: 'controller:amqp',
					Server: '23suateam:39062',
					Duration: '3 days, 48 min, 25 sec',
					Breakdown: '',
					Actual_Thpt: '1.11 Kbit ',
					Total_Bytes: '239.18 MB'
				}]
			}
		},
		methods:{
			handleClick(){
				$('.analysis_wramp,.blackBg').show();
			},
			btnclose(){
                $('.analysis_wramp,.blackBg').hide();
			},
			actualThptChart(){
                var chart2W=$('.chartK').actual('width');
                var chart2H=$('.chartK').actual('height');
                $('#zyhchart1').css('width',chart2W);
                $('#zyhchart1').css('height',chart2H);
			    var mychart=this.$echarts.init(document.getElementById('zyhchart1'));
                window.onresize = mychart.resize;

                function randomData() {
                    now = new Date(+now + oneDay);
                    value = value + Math.random() * 21 - 10;
                    return {
                        name: now.toString(),
                        value: [
                            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                            Math.round(value)
                        ]
                    }
                }

                var data = [];
                var now = +new Date(1997, 9, 3);
                var oneDay = 24 * 3600 * 1000;
                var value = Math.random() * 1000;
                for (var i = 0; i < 1000; i++) {
                    data.push(randomData());
                }

                var option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            params = params[0];
                            var date = new Date(params.name);
                            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '13%',
                        bottom: '10%',
                        top:'17%',
                        containLabel: true,
                    },
                    xAxis: {
                        name:'时间',
                        type: 'time',
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        name:'峰值吞吐量',
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        name: '模拟数据',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        lineStyle:{
                            normal:{
                                color:'#389A9E',
                                opacity:0.4
                            }
                        },
                        areaStyle : {
                            normal : {
                                color : '#389A9E',
                                opacity : 0.5
                            }
                        },
                        data: data
                    }]
                };

                setInterval(function () {
                    for (var i = 0; i < 5; i++) {
                        data.shift();
                        data.push(randomData());
                    }
                    option.series[0].data=data;
                    mychart.setOption(option,false);
                }, 1000);

			},
            breakDownChart(){
			    var chart2W=$('.chartK').actual('width');
			    var chart2H=$('.chartK').actual('height');
			    $('#zyhchart2').css('width',chart2W);
			    $('#zyhchart2').css('height',chart2H);
                var mychart=this.$echarts.init(document.getElementById('zyhchart2'));
                window.onresize = mychart.resize;

                mychart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        x: 'center',
						y:'5%',
                        data:['客户机','服务器']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['40%', '60%'],
							center:['50%','50%'],
							color:['#59ADF3','#FF999A'],
                            label: {
                                normal: {
                                    show: true,
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[
                                {value:335, name:'服务器'},
                                {value:310, name:'客户机'},

                            ]
                        }
                    ]
                })
            }
		},
		mounted:function () {
            this.breakDownChart();
            this.actualThptChart();

        }
	}
</script>

<style>
	.analysis_Two_root-info{
		padding: 5px 15px;
	}
	.analysis_Two_root-page{
		height: 12%;
		margin: 1.5%;
		text-align: right;
	}
	.analysis_Two_root .breakDown-bar-two{
		width:85%;
		height: 20px;
		border-radius: 10px;
		overflow: hidden;
		margin:0 auto;
	}
	.breakDown-bar-two .bar-client{
		width: 60%;
		height: 20px;
		float: left;
		background-color: #eea33a;
	}
	.breakDown-bar-two .bar-server{
		width: 40%;
		height: 20px;
		float: left;
		background-color:#45b8d9;
	}

	/*遮罩层*/
	.blackBg{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0;
		left: 0;
		background-color:rgba(18, 18, 19, 0.45);
		z-index: 2306;
		display: none;
	}
	.analysis_wramp{
		width: 60%;
		height: 80%;
		position: absolute;
		top: 40%;
		left:30%;
		background-color: #FFFFFF;
		-webkit-transform: translate(-20%,-40%);
		transform: translate(-20%,-40%);
		z-index: 9999;
		display: none;
		border-radius: 8px;
	}
	.infoCont{
		width: 100%;
		height: 100%;
	}
	.infoContTitleK{
		width: 100%;
		height: 10%;
		box-sizing: border-box;
		border: 2px solid #e2dfdf;
		box-shadow: 0px 2px 2px #f2f2f2;
		border-radius: 8px 8px 0 0;
	}
	.floatLe{
		float: left;
		height: 100%;
	}
	.infoCont-title{
		width: 95%;
		box-sizing: border-box;
		padding: 0 20px;
		text-align: left;
		display: table;
	}
	.infoCont-title span{
		display: table-cell;
		vertical-align: middle;
		color: #000;
		font-size: 20px;
		font-weight: bold;
	}
	.closeBtn{
		width: 5%;
		text-align: center;
		font-size: 5rem;
	}
	.closeBtnT{
		cursor: pointer;
	}
	.infoCont-cont{
		width: 100%;
		height: 90%;
		box-sizing: border-box;
		padding: 20px 20px 20px 20px;
	}
	.part1{
		width: 100%;
		height: 30%;
		background-color: #e8e8e8;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		border-radius: 2px;
		box-sizing: border-box;
		padding: 20px;
	}
	.partS-K{
		width:20%;
		height: 100%;
		float: left;
		box-sizing: border-box;
		/*padding: 20px;*/
		padding-right: 20px;
	}
	.bg-white{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		text-align: center;
	}
	.bigfont{
		height: 60%;
		font-size: 3rem;
		line-height:90px;
		color: #008b8b;
	}
	.smallfont{
		height: 40%;
		font-size: 1.7rem;
		line-height: 45px;
	}
	.detail-sc{
		width: 40%;
		height: 100%;
		float: left;
	}
	.detail-sc:after{content: '';clear: both;}
	.detail-sc-s,.detail-sc-c{
		width: 100%;
		height: 50%;
		box-sizing: border-box;
		text-align: left;
	}
	.detail-sc-c{padding-top: 5px;}
	.detail-sc-s{padding-bottom: 5px;}
	.bg-white-h{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding-left: 10px;
		font-size: 2.3rem;
		display: table;
	}
	.bg-white-h p{
		display: table-cell;
		vertical-align: middle;
	}
	.curName{color: #008b8b;}
	.part2{
		width: 100%;
		height: 70%;
	}
	.part21{
		width: 33.3%;
		height: 100%;
		float: left;
	}
	.part-title{
		width: 100%;
		height: 15%;
		box-sizing: border-box;
		padding: 20px 20px 0 20px;
		font-size: 2rem;
	}
	.bk-title{
		width: 100%;
		box-sizing: border-box;
		/*padding: 20px 20px 0 20px;*/
		font-size: 2rem;
		text-align: center;
		line-height: 60px;
		background-color: #d2e5f3;
	}
	.chartK{
		width: 100%;
		height: 300px;
	}
	.part2-chart{
		width: 100%;
		height: 100%;
	}
	.breakDownKK{
		width: 100%;
		height: 60%;
		padding: 20px 0 0 0;
	}
	.breakDown-num{
		width: 100%;
		height: 100%;
	}
	.bk-cont{
		width: 100%;
	}
	.bk-c-s,.bk-s-c{
		width: 50%;
		float: left;
		text-align: left;
		background-color:#f0f8ff ;
		box-sizing: border-box;
		padding: 10px;
	}
	.bk-s-c:after{
		content: '';
		clear: both;
	}
	.bk-cont div p{
		line-height: 60px;
		font-size: 2rem;
	}
	.duration{
		width: 100%;
		line-height: 60px;
		font-size: 2rem;
		background: #faebd7;
		box-sizing: border-box;
		padding: 10px 10px;
		margin-top: 10px;
	}
	#bkStyle{
		text-align: center;
		font-size: 3rem;
		color: #008b8b;
	}




	.analysis_Two_root .el-table .info-row {
		background: #c9e5f5;
	}

	.analysis_Two_root .el-table .positive-row {
		background: #e2f0e4;
	}

	.analysis_Two_root .block {
		margin-left: 70%;
		margin-top: 1%;
		margin-bottom: 1%;
	}

	.analysis_Two_root .el-table--enable-row-transition .el-table__body td {
		padding: 0;
	}

	.analysis_Two_root  .el-table th>.cell {
		padding: 0;
	}

	.analysis_Two_root  .el-table td,
	.el-table th.is-leaf {
		padding: 0;
		text-align: center;
	}

	.analysis_Two_root #analysis_echarts_Dashboard {
		margin-left: 50%;
		margin-top: 50%;
	}

	.el-table .cell{
		padding:1px;
	}

</style>