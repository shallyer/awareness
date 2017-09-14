<template>
	<div class="weakMonitor clearfix">
		<div class="leftContent">
			<div class="box-card asset-content1">
				<h3 class="card-header">漏洞扫描</h3>
				<div class="card-body">
					<el-form ref="form" :model="startScanForm" label-width="80px">
						<el-form-item label="任务名称">
							<el-input v-model="startScanForm.name"></el-input>
						</el-form-item>
						<el-form-item label="扫描器">
							<el-select v-model="startScanForm.sensor">
								<el-option label="First Available Sensor-Distributed" value="0"></el-option>
								<el-option label="VirtualUSMAllInOne[192.168.120.125]" value="1"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="扫描方式">
							<el-select v-model="startScanForm.method">
								<el-option label="deep" value="0"></el-option>
								<el-option label="default" value="1"></el-option>
								<el-option label="Ultimate" value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="计划扫描">
							<el-select v-model="startScanForm.scheme">
								<el-option label="immediately" value="0"></el-option>
								<el-option label="Run Once" value="1"></el-option>
								<el-option label="Daily" value="2"></el-option>
								<el-option label="Day of the Week" value="3"></el-option>
								<el-option label="Day of the Month" value="4"></el-option>
								<el-option label="Nth week of the month" value="5"></el-option>
							</el-select>
						</el-form-item>
						<el-menu class="advancedSearch">
							<el-submenu index="1">
								<template slot="title">高级搜索</template>
								<el-menu-item-group>
									<el-menu-item>
										<el-form-item label="SSH凭证">
											<el-select v-model="startScanForm.ssh">
												<el-option label="deep" value="0"></el-option>
												<el-option label="default" value="1"></el-option>
												<el-option label="Ultimate" value="2"></el-option>
											</el-select>
										</el-form-item>
									</el-menu-item>
									<el-menu-item>
										<el-form-item label="SMB凭证">
											<el-select v-model="startScanForm.smb">
												<el-option label="deep" value="0"></el-option>
												<el-option label="default" value="1"></el-option>
												<el-option label="Ultimate" value="2"></el-option>
											</el-select>
										</el-form-item>
									</el-menu-item>
									<el-menu-item>
										<el-form-item label="超时">
											<el-input v-model="startScanForm.timeOut"></el-input>
										</el-form-item>
									</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						</el-menu>
						<el-form-item label="排除端口">
							<el-input v-model="startScanForm.exclude"></el-input>
						</el-form-item>
						<el-form-item style="text-align:right;padding-right:20px;margin:0;">
							<el-button class="startScanBtn" type="primary" @click="startScan" :loading="tableLoading"><span class="btnStart">开始扫描</span><span class="btnProgress">扫描中</span></el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<div class="rightContent">
			<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane name="first">
					<span slot="label"><i class="el-icon-date"></i> 漏洞列表</span>
					<div class="box-card">
						<div class="card-body searchBox">
							<el-form ref="form" class="loopHoleSearchArea">
								<el-form-item label="主机名：" label-width="90px">
									<el-input></el-input>
								</el-form-item>
								<el-form-item label="IP地址：" label-width="90px">
									<el-input></el-input>
								</el-form-item>
								<el-form-item label="设备类型：" label-width="90px">
									<el-input></el-input>
								</el-form-item>
								<el-form-item label="漏洞ID：" label-width="90px">
									<el-input></el-input>
								</el-form-item>
								<el-button type="primary" style="margin-left:1%;padding:0px 10px;height:30px;line-height: 30px;position:relative;top:2px;" icon="search">查询</el-button>
							</el-form>
						</div>
					</div>
					<div class="commonTable">
						<el-table :data="commonTable" highlight-current-row v-loading="tableLoading" border stripe style="width: 100%" @selection-change="handleSelectionChange1">
							<el-table-column prop="hostname" label="主机名">
							</el-table-column>
							<el-table-column prop="IP" label="IP地址">
							</el-table-column>
							<el-table-column prop="protocol" label="协议">
							</el-table-column>
							<el-table-column prop="ID" label="漏洞ID">
							</el-table-column>
							<el-table-column prop="cvss" label="CVSS">
							</el-table-column>
							<el-table-column prop="cves" label="CVES">
							</el-table-column>
							<el-table-column prop="riskGrade" label="危险等级">
							</el-table-column>
							<el-table-column prop="loopholeSub" label="漏洞类别">
							</el-table-column>
						</el-table>
						<!--分页-->
						<div class="pagination">
							<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :page-size="10" :total="total">
							</el-pagination>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"><i class="el-icon-picture"></i> 概览</span>
					<el-row style="margin-top:20px;">
						<el-col :span="11" class="chartModal">
							<div class="chart-header"><img v-bind:src="chartIcon01" /> 危险等级</div>
							<div class="weakChart"></div>
						</el-col>
						<el-col :span="11" class="chartModal">
							<div class="chart-header"><img v-bind:src="chartIcon01" /> 漏洞类别</div>
							<div class="weakChart"></div>
						</el-col>
					</el-row>
					<el-row style="margin-top:20px;">
						<el-col :span="11" class="chartModal ">
							<div class="chart-header"><img v-bind:src="chartIcon01" /> 高危漏洞（按IP查询Top10）</div>
							<div class="weakChart bar"></div>
						</el-col>
						<el-col :span="11" class="chartModal bar">
							<div class="chart-header"><img v-bind:src="chartIcon01" /> 高危漏洞（按Host查询Top10）</div>
							<div class="weakChart bar"></div>
						</el-col>
					</el-row>
					<el-row style="margin-top:20px;">
						<el-col :span="22" class="chartModal ">
							<div class="chart-header"><img v-bind:src="chartIcon01" /> 漏洞随时间变化</div>
							<div class="chartBtns">
								<ul>
									<li v-for="(item,index) in timeOptions" :class="{active:isActive==index}" @click="timeChange(index)">{{item.name}}</li>
								</ul>
								<div class="block">
									<el-date-picker class="datePicker" v-model="dateValue" @change="dateChange" type="daterange" align="left" placeholder="选择日期范围" :picker-options="pickerOptions">
									</el-date-picker>
								</div>
							</div>
							<div class="weakChart line"></div>
							<div class="lineCheckBox">
								<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
								<div style="margin: 15px 0;"></div>
								<el-checkbox-group v-model="checkedCheckBox" @change="handleCheckedIPChange">
									<el-checkbox v-for="item in IPList" :label="item" :key="item">{{item}}</el-checkbox>
								</el-checkbox-group>
								<p style="text-align: center;padding-top:10px;">
									<el-button type="primary" size="mini">提交</el-button>
								</p>
							</div>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"><i class="el-icon-document"></i> 历史扫描记录</span>
					<div class="card-body">
						<el-table :data="tableData" stripe style="width: 100%">
							<el-table-column prop="destination" label="目标" style="width:43%;">
							</el-table-column>
							<el-table-column prop="scanner" label="扫描器" style="width:32%;">
							</el-table-column>
							<el-table-column label="进度" style="width:25%;">
								<template scope="props">
									<el-progress :percentage="props.row.progress"></el-progress>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	var common_tools = require("common_tools");
	require("../../../public_resource/vendor/jquery.actual.min.js")
	export default {
		data() {
			return {
				chartIcon01: require('./chart-icon02.png'),
				chart1:'',
				chart2:'',
				chart3:'',
				chart4:'',
				chart5:'',
				timeOut: '57600',
				total: '',
				addLoading: false,
				startScanForm: {
					name: '',
					sensor: '',
					method: '',
					scheme: '',
					ssh: '',
					smb: '',
					timeOut: '',
					exclude: '',
				},
				tableLoading: false,
				commonTable: [],
				currentPage: 1,
				activeTab2: 'first',
				activeName: 'first',
				timeOptions:[
					{name:"天"},{name:"周"},{name:"月"}
				],
				isActive:0,
				//日期
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				dateValue: '',
				checkAll: true, //多选框
				checkedCheckBox: [],
				isIndeterminate: true,
				IPList: ['180.149.132.47', '202.108.22.15', '220.118.222.13', '123.125.114.144', '155.263.186.45', '124.145.18.20', '192.158.45.120', '124.138.231.2', '168.156.25.98', '192.156.85.4' ],
				tableData: [{
					destination: '192.168.120.211',
					scanner: 'First Available Sensor-Distributed',
					progress: '0'
				}, {
					destination: '192.168.120.211',
					scanner: 'VirtualUSMAllInOne[192.168.120.125]',
					progress: '25'
				}, {
					destination: '192.168.120.211',
					scanner: 'First Available Sensor-Distributed',
					progress: '75'
				}, {
					destination: '192.168.120.211',
					scanner: 'VirtualUSMAllInOne[192.168.120.125]',
					progress: '100'
				}],
			}
		},

		methods: {
			timeChange(index) {
				var _self = this;
				_self.isActive = index;
				_self.chart5.showLoading({
					text: '数据获取中',
				});
				switch(index) {
					case 0:
						_self.chart5.hideLoading();
						_self.chart5.setOption({
							series: [{
								name: '全部',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [20, 24, 26, 30, 20, 26, 40, 41, 36, 34, 31, ]
							}, {
								name: '风险提示',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [22, 25, 26, 28, 30, 29, 32, 27, 24, 25, 26]
							}, {
								name: '低危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [25, 38, 40, 35, 34, 32, 28, 25, 30, 28, 30]
							}, {
								name: '中危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [38, 36, 40, 42, 46, 51, 49, 46, 45, 41, 36]
							}, {
								name: '高危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [31, 38, 42, 45, 48, 50, 54, 45, 47, 40, 34]
							}]
						});
						break;
					case 1:
						_self.chart5.hideLoading();
						_self.chart5.setOption({
							series: [{
								name: '全部',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [22, 25, 26, 28, 30, 29, 32, 27, 24, 25, 26]

							}, {
								name: '风险提示',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [31, 38, 42, 45, 48, 50, 54, 45, 47, 40, 34]
							}, {
								name: '低危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [25, 38, 40, 35, 34, 32, 28, 25, 30, 28, 30]
							}, {
								name: '中危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [38, 36, 40, 42, 46, 51, 49, 46, 45, 41, 36]
							}, {
								name: '高危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},

								data: [20, 24, 26, 30, 20, 26, 40, 41, 36, 34, 31]
							}]
						});
						break;
					case 2:
						_self.chart5.hideLoading();
						_self.chart5.setOption({
							series: [{
								name: '全部',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [38, 36, 40, 42, 46, 51, 49, 46, 45, 41, 36]
							}, {
								name: '风险提示',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [25, 38, 40, 35, 34, 32, 28, 25, 30, 28, 30]
							}, {
								name: '低危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [22, 25, 26, 28, 30, 29, 32, 27, 24, 25, 26]
							}, {
								name: '中危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [20, 24, 26, 30, 20, 26, 40, 41, 36, 34, 31]
							}, {
								name: '高危',
								type: 'line',
								lineStyle: {
									normal: {
										width: 2,
									}
								},
								data: [31, 38, 42, 45, 48, 50, 54, 45, 47, 40, 34]
							}]
						});
						break;
				}

			},
			dateChange(val) {
				var _self = this;
				console.log(val);
				_self.chart5.setOption({
					series: [{
						name: '全部',
						type: 'line',
						lineStyle: {
							normal: {
								width: 2,
							}
						},
						data: [22, 25, 26, 28, 30, 29, 32, 27, 24, 25, 26]

					}, {
						name: '风险提示',
						type: 'line',
						lineStyle: {
							normal: {
								width: 2,
							}
						},
						data: [20, 24, 26, 30, 20, 26, 40, 41, 36, 34, 31]
					}, {
						name: '低危',
						type: 'line',
						lineStyle: {
							normal: {
								width: 2,
							}
						},
						data: [25, 38, 40, 35, 34, 32, 28, 25, 30, 28, 30]
					}, {
						name: '中危',
						type: 'line',
						lineStyle: {
							normal: {
								width: 2,
							}
						},
						data: [38, 36, 40, 42, 46, 51, 49, 46, 45, 41, 36]
					}, {
						name: '高危',
						type: 'line',
						lineStyle: {
							normal: {
								width: 2,
							}
						},
						data: [31, 38, 42, 45, 48, 50, 54, 45, 47, 40, 34]
					}]
				});
			},
			startScan() {
				var _self = this;
				_self.tableLoading = true;
				$('.btnStart').hide();
				$('.btnProgress').show();
				common_tools.AJAX('POST', common_tools.interfaceurl + 'weakMonitor.json', {}, function(data) {
					_self.tableLoading = false;
					$('.btnStart').show()
					$('.btnProgress').hide();
					_self.commonTable = data.data;
					_self.total = _self.commonTable.length;
					_self.total = 36;
				}, function(data) {
					console.log(data);
				});
			},
			handleCurrentChange(val) {
				_self.addLoading = true;
				common_tools.AJAX('POST', common_tools.interfaceurl + 'weakMonitor.json', {}, function(data) {
					_self.addLoading = false;
					_self.commonTable = data.data;
					//					_self.total=_self.commonTable.length;
					_self.total = "36";
				}, function(data) {
					console.log(data);
				});
			},
			handleClick(tab, event) {
				var _self = this;
				if(tab.index == 1) {
					this.drawChart();
				}
			},
			//多选框全选设置
			handleCheckAllChange(event) {
				this.checkedCheckBox = event.target.checked ? this.IPList : [];
				this.isIndeterminate = false;
			},
			handleCheckedIPChange(value) {
				console.log(value);
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.IPList.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.IPList.length;
			},
			drawChart() {
				var options = [{
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							left: '2%',
							top: '3%',
							data: ['风险提示', '低危', '中危', '高危']
						},
						series: [{
							name: '危险等级占比',
							type: 'pie',
							radius: '55%',
							center: ['55%', '50%'],
							data: [{
									value: 135,
									name: '风险提示',
									itemStyle: {
										normal: {
											color: '#23b1d0'
										}
									},
								},
								{
									value: 50,
									name: '低危',
									itemStyle: {
										normal: {
											color: '#2da282'
										}
									},
								},
								{
									value: 34,
									name: '中危',
									itemStyle: {
										normal: {
											color: '#f5b54a'
										}
									},
								},
								{
									value: 15,
									name: '高危',
									itemStyle: {
										normal: {
											color: '#dc613a'
										}
									},
								}
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}],
						color: ['#23b1d0', '#144d69', '#2da282', '#f5b54a', '#dc613a']
					},
					{
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							left: '2%',
							top: '3%',
							data: ['SSH', 'HTTP', 'Samba', 'SMB', 'RPC']
						},
						series: [{
							name: '漏洞分布占比',
							type: 'pie',
							radius: '55%',
							center: ['55%', '50%'],
							data: [{
									value: 223,
									name: 'SSH',
								},
								{
									value: 121,
									name: 'HTTP'
								},
								{
									value: 90,
									name: 'Samba'
								},
								{
									value: 45,
									name: 'SMB'
								},
								{
									value: 15,
									name: 'RPC'
								}
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}],
						color: ['#23b1d0', '#144d69', '#2da282', '#f5b54a', '#dc613a']
					},
					{
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							top: '15',
							selectedMode: 'single',
							selected: {
								// 选中'系列1'
								'全部': true,
								// 不选中'系列2'
								'风险提示': false,
								'低危': false,
								'中危': false,
								'高危': false,
							},
							data: ['全部', '风险提示', '低危', '中危', '高危']
						},
						grid: {
							left: '2%',
							right: '10%',
							top: '14%',
							bottom: '5%',
							containLabel: true
						},
						xAxis: {
							type: 'value',
							name: '漏洞数',
						},
						yAxis: {
							type: 'category',
							name: 'IP地址',
							data: ['180.149.132.47', '202.108.22.15', '220.118.222.13', '123.125.114.144', '155.263.186,45', '124.145.18.20', '192.158.45.120', '124.138.231.2', '168.156.25.98', '192.156.85.4' ]
						},
						series: [{
								name: '风险提示',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#144d69'
									}
								},
								data: [80, 92, 131, 154, 170, 210, 240, 324, 360, 390]
							},
							{
								name: '低危',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#2da282'
									}
								},
								data: [42, 52, 61, 74, 90, 130, 150, 164, 200, 240]
							},
							{
								name: '中危',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#f5b54a'
									}
								},
								data: [112, 122, 142, 154, 160, 180, 210, 264, 290, 330]
							},
							{
								name: '高危',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#dc613a'
									}
								},
								data: [12, 16, 21, 34, 42, 50, 60, 84, 90, 130]
							},
							{
								name: '全部',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#3398DB'
									}
								},
								data: [320, 432, 561, 614, 737, 850, 884, 1104, 1200, 1330]
							}
						],
					},
					{
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							top: '15',
							selectedMode: 'single',
							selected: {
								// 选中'系列1'
								'全部': true,
								// 不选中'系列2'
								'风险提示': false,
								'低危': false,
								'中危': false,
								'高危': false,
							},
							data: ['全部', '风险提示', '低危', '中危', '高危']
						},
						grid: {
							left: '2%',
							right: '10%',
							top: '15%',
							bottom: '5%',
							containLabel: true
						},
						xAxis: {
							type: 'value',
							name: '漏洞数'
						},
						yAxis: {
							type: 'category',
							name: '主机名',
							data: ['DESKTOP-NLGAQ41', 'DESKTOP-6SMH0PF', 'PC0k-5JHJ0PF', 'PCNET-6ERTUIO', 'PCTOP-78FGHLS', 'PCHE-RTYUYU5', 'PC5G-HJJOIUY', 'PC8I-8ERTYYU', 'PCE-RT85YUI', 'PC8F-CVBBHJK', ]
						},
						series: [{
								name: '风险提示',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#144d69'
									}
								},
								data: [50, 82, 91, 104, 150, 230, 240, 304, 340, 390]
							},
							{
								name: '低危',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#2da282'
									}
								},
								data: [62, 82, 101, 134, 160, 170, 210, 224, 230, 240]
							},
							{
								name: '中危',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#f5b54a'
									}
								},
								data: [112, 122, 142, 154, 160, 180, 210, 264, 290, 330]
							},
							{
								name: '高危',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#dc613a'
									}
								},
								data: [12, 16, 21, 34, 42, 50, 60, 84, 90, 130]
							},
							{
								name: '全部',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								itemStyle: {
									normal: {
										color: '#3398DB'
									}
								},
								data: [270, 332, 351, 484, 537, 650, 684, 704, 890, 930]
							}
						],
					},
					{
						tooltip: {
							trigger: 'axis'
						},
						color: ["#FF0000", "#00BFFF", "#FF00FF", "#1ce322", "#000000", '#EE7942'],
						legend: {
							bottom: '15',
							selectedMode: 'single',
							selected: {
								// 选中'系列1'
								'全部': true,
								// 不选中'系列2'
								'风险提示': false,
								'低危': false,
								'中危': false,
								'高危': false,
							},
							data: ['全部', '风险提示', '低危', '中危', '高危']
						},
						grid: {
							top: "14%",
							left: '3%',
							right: '15%',
							bottom: '10%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2017/6/18', '2017/6/19', '2017/6/20', '2017/6/21', '2017/6/22', '2017/6/23', '2017/6/24', '2017/6/25', '2017/6/26', '2017/6/27', '2017/6/28']
						},
						yAxis: [{
							type: 'value',
							axisLabel: {
								formatter: '{value} '
							},
						}],
						series: [{
							name: '全部',
							type: 'line',
							lineStyle: {
								normal: {
									width: 2,
								}
							},
							data: [20, 24, 26, 30, 20, 26, 40, 41, 36, 34, 31, ]
						}, {
							name: '风险提示',
							type: 'line',
							lineStyle: {
								normal: {
									width: 2,
								}
							},
							data: [22, 25, 26, 28, 30, 29, 32, 27, 24, 25, 26]
						}, {
							name: '低危',
							type: 'line',
							lineStyle: {
								normal: {
									width: 2,
								}
							},
							data: [25, 38, 40, 35, 34, 32, 28, 25, 30, 28, 30]
						}, {
							name: '中危',
							type: 'line',
							lineStyle: {
								normal: {
									width: 2,
								}
							},
							data: [38, 36, 40, 42, 46, 51, 49, 46, 45, 41, 36]
						}, {
							name: '高危',
							type: 'line',
							lineStyle: {
								normal: {
									width: 2,
								}
							},
							data: [31, 38, 42, 45, 48, 50, 54, 45, 47, 40, 34]
						}]
					},
				]
				var _self = this;
				for(var i = 0; i < options.length; i++) {
					$(".weakChart").eq(i).css('width', $(".weakChart").eq(i).actual('width'));
					$(".weakChart").eq(i).css('height', $(".weakChart").eq(i).actual('height'));
				}
				_self.chart1 = _self.$echarts.init($('.weakChart')[0]);
				_self.chart2 = _self.$echarts.init($('.weakChart')[1]);
				_self.chart3 = _self.$echarts.init($('.weakChart')[2]);
				_self.chart4 = _self.$echarts.init($('.weakChart')[3]);
				_self.chart5 = _self.$echarts.init($('.weakChart')[4]);
				_self.chart1.setOption(options[0]);
				_self.chart2.setOption(options[1]);
				_self.chart3.setOption(options[2]);
				_self.chart4.setOption(options[3]);
				_self.chart5.setOption(options[4]);

			},
		},

		mounted: function() {
			
		}
	}
</script>
<style>
	.box-card {
		border-radius: 6px;
		background-color: #fff;
		overflow: hidden;
	}
	
	.card-header {
		font-size: 1.4rem;
		color: #fff;
		padding-left: 14px;
		background: #737e8d;
		height: 42px;
		line-height: 42px;
	}
	
	.card-body {
		padding: 14px 20px 14px 10px;
	}
	
	.card-body .el-input__inner {
		height: 30px;
	}
	
	.card-body .el-select {
		width: 100%;
	}
	
	.card-body .el-form-item {
		margin-bottom: 20px;
		margin-bottom: 14px;
	}
	
	.card-body .el-button {
		padding: 10px;
	}
	
	.leftContent,
	.rightContent {
		float: left;
		margin-left: 1.5%;
	}
	
	.leftContent {
		width: 20%;
	}
	
	.rightContent {
		width: 75%;
		overflow: hidden;
		box-shadow: 0 4px 10px #ccc;
	}
	
	.el-tabs.el-tabs--border-card {
		border-radius: 6px;
		overflow: hidden;
	}
	
	.asset-content1 {
		box-shadow: 0 4px 10px #ccc;
	}
	
	.card-body .el-table th,
	.card-body .el-table td {
		padding: 5px 0;
		text-align: center;
	}
	
	.card-body .el-table .cell {
		padding: 0;
	}
	
	.commonDialog .el-form-item__content .el-select {
		width: 100%;
	}
	
	.demo-table-expand {
		padding: 15px 0 15px 0;
	}
	
	.el-popover {
		position: fixed;
		left: 91%;
	}
	
	.el-dialog {
		border-radius: 5px;
	}
	
	.addForm .el-input__inner {
		height: 36px;
	}
	
	.el-dialog__body {
		padding-bottom: 20px;
	}
	
	.common-title {
		text-align: left;
		font-size: 1.4rem;
		padding-bottom: 22px;
		text-indent: 1em;
	}
	
	.chart {
		margin: 0 auto;
	}
	
	.el-collapse-item__wrap {
		position: relative;
	}
	
	.advancedSearch .el-submenu__title {
		background: #fff;
		color: #20a0ff;
		height: 30px;
		line-height: 20px;
	}
	
	.advancedSearch .el-submenu__title i {
		display: none;
	}
	
	.advancedSearch>li .el-menu {
		background: #fff;
	}
	
	.advancedSearch>li .el-menu>li .el-menu-item-group__title {
		display: none;
	}
	
	.advancedSearch>li .el-menu>li .el-menu-item {
		padding: 0 !important;
	}
	
	.searchBox {
		border: 1px solid #ddd;
		border-radius: 4px;
	}
	
	.searchBox .el-form-item {
		width: 22%;
		display: inline-block;
	}
	
	.btnProgress {
		display: none;
	}
	
	.weakChart {
		width: 100%;
		height: 350px;
	}
	
	.weakChart.bar {
		height: 400px;
	}
	
	.weakChart.line {
		height: 600px;
	}
	
	.chartModal {
		border: 1px solid #ddd;
		border-radius: 6px;
		overflow: hidden;
		margin-left: 2.77%;
	}
	
	.chart-header {
		height: 36px;
		line-height: 36px;
		font-size: 1.4rem;
		background: #f5f5f5;
		border-bottom: 1px solid #ddd;
		text-align: left;
		color: #666;
		padding-left: 10px;
	}
	
	.chart-header img {
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	
	.lineCheckBox {
		position: absolute;
		right: 8%;
		top: 30%;
		/*width:130px;*/
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 6px;
		z-index: 999;
	}
	
	.lineCheckBox .el-checkbox+.el-checkbox {
		margin-left: 0;
	}
	
	.lineCheckBox .el-checkbox-group label {
		display: block;
	}
</style>