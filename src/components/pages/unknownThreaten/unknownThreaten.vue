<template>
	<div class="unknown">
		<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" class="unknown-content">
			
			<el-tab-pane name="first">
				<span slot="label"><i class="el-icon-picture"></i> DNS</span>
				<div class="unknownInfo">
					<div class="unknowHeader">
						可疑DNS
					</div>
					<el-table :data="tableDNS" height="440" stripe v-loading="loadingDNS1" class="unknownThreatenTable">
						<el-table-column prop="timestamp" label="Timestamp" >
						</el-table-column>
						<el-table-column prop="dnsServer" label="DNSServer" >
						</el-table-column>
						<el-table-column prop="clientIp" label="Client IP" >
						</el-table-column>
						<el-table-column prop="query" label="Query">
						</el-table-column>
						<el-table-column prop="queryClass" label="Query Class" >
						</el-table-column>
						<el-table-column prop="queryType" label="Query Type" >
						</el-table-column>
						<el-table-column prop="responseCode" label="Response Code">
						</el-table-column>
					</el-table>
					<div class="pagination">
						<el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :page-size="5" :total="total">
						</el-pagination>
					</div>
				</div>
				<div class="relation">
					<div class="unknowHeader">
						DNS关系图
					</div>
					<div class="DNSChart"></div>
				</div>
				<div class="analysisResult">
					<div class="unknowHeader">
						未知DNS深度分析结果
					</div>
					<el-collapse class="analysisResultContent" accordion v-loading="loadingDNS2">
						<el-collapse-item :title="item.title" v-for="item in DNSResult">
							<div>{{item.content}}</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</el-tab-pane>
			
		</el-tabs>

	</div>
</template>

<script>
	var common_tools = require("common_tools");
	require("../../../public_resource/vendor/jquery.actual.min.js");
	export default {
		data() {
			return {
				activeName: 'first',
				loadingDNS1: true,
				loadingDNS2: true,
				DNSResult: [],
				activeNames: ['1'],
				tableDNS:[],
				DNSInitChart: '',
				DNSCategories:[],
				DNSLinks:[],
				DNSData:[],
				DNSDataRepeat:[],
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.cur_page = val;
				this.getData(val);
			},
			drawDNS(){
				var _self=this;
				
				$('.DNSChart').css('width',$('.DNSChart').actual('width'));
				_self.DNSInitChart = _self.$echarts.init($('.DNSChart')[0]);
				_self.DNSInitChart.showLoading({
					text: '拼命加载中',
				});
				common_tools.AJAX('POST', common_tools.interfaceurl + 'dns/list', {}, function(data) {
					if(data.flag == 0) {
						//DNS列表展示
						_self.loadingDNS1 = false;
						_self.tableDNS=data.data.data;
						/*for(var i = 0; i < data.data.data.length; i++) {
							_self.tableDNS.push({
								"Timestamp": data.DNS[i].Timestamp,
								"ClientIP": data.DNS[i].ClientIP,
								"Query": data.DNS[i].Query,
								"QueryClass": data.DNS[i].QueryClass,
								"QueryType": data.DNS[i].QueryType,
								"ResponseCode": data.DNS[i].ResponseCode,
							})
							_self.DNSLinks.push({
								source:data.DNS[i].ClientIP,
								target:'DNS服务器'
							});
						}*/
						//DNS分析结果
						_self.loadingDNS2 = false;
						for(var i = 0; i < data.DNSResult.length; i++) {
							_self.DNSResult.push({
								title: data.DNSResult[i].title,
								content: data.DNSResult[i].content
							})
						}
						//DNS关系图
						_self.DNSInitChart.hideLoading();
						_self.DNSInitChart.setOption({
							tooltip: {},
							animationDurationUpdate: 2500,
							animationEasingUpdate: 'quinticInOut',
							label: {
								normal: {
									show: true,
									textStyle: {
										fontSize: 12
									},
								}
							},
							series: [
								{
									type: 'graph',
									layout: 'force',
									symbol: ['circle'],
									focusNodeAdjacency: true,
									roam: true,
									links:_self.DNSLinks,
									
									label: {
										normal: {
											show: false,
										},
										emphasis: {
											show: false,
										}
									},
									force: {
										repulsion: 200,
										gravity: 0.1,
										edgeLength:[10,50]
									},
									data:data.DNSChart.DNSData,
									symbolSize:30,
									lineStyle: {
										normal: {
											opacity: 0.9,
											width: 1,
											curveness: 0
										}
									}
								}
							]
						})
					} else {
						alert('参数错误，请重新检查');
					}
				}, function(data) {
					console.log(data);
				});
			},
		},
		mounted: function() {
			this.drawDNS();
		}
	}
</script>
<style>
	.unknown-content {
		width: 97%;
		margin: 0 auto;
		border-radius: 6px;
		overflow: hidden;
	}
	
	.unknownInfo {
		float: left;
		margin-left: 0.5%;
		width: 60%;
		border-radius: 6px;
		overflow: hidden;
		box-sizing: border-box;
		border: 1px solid #dfe6ec;
		margin-bottom: 20px;
	}
	
	.unknownThreatenTable {
		width: 96%;
		margin: 0 2%;
		box-sizing: border-box;
		border: none;
	}
	
	.unknownThreatenTable.el-table td,
	.unknownThreatenTable.el-table th {
		text-align: center;
		padding: 5px 0;
	}
	
	.unknownThreatenTable.el-table th,
	.unknownThreatenTable.el-table th .cell {
		background: none;
	}
	
	.unknownThreatenTable.el-table .cell {
		padding: 0;
		/*white-space:nowrap;
		text-overflow:ellipsis;
		overflow: hidden;*/
	}
	
	.relation {
		float: left;
		margin-left: 1%;
		width: 38%;
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid #dfe6ec;
		box-sizing: border-box;
		height: 483px;
		margin-bottom: 20px;
	}
	
	.unknowHeader {
		background: #eef1f6;
		height: 40px;
		font-size: 1.4rem;
		line-height: 40px;
		color: #666;
		border-bottom: 1px solid #dfe6ec;
		padding-left: 10px;
	}
	
	.unknownThreatenTable.el-table::before {
		display: none;
	}
	
	.unknownThreatenTable.el-table::after {
		width: 0;
	}
	
	.analysisResult {
		float: left;
		margin-left: 0.5%;
		width: 60%;
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid #dfe6ec;
		box-sizing: border-box;
		min-height: 200px;
		margin-bottom: 20px;
	}
	
	.analysisResultContent {
		margin: 15px 1.5%;
	}
	
	.el-collapse-item__header .el-collapse-item__header {
		font-size: 1.4rem;
	}
	.flowsChart,.DNSChart{
		height:440px;
	}
</style>