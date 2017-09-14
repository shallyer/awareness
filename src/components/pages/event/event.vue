<template>
	<div class="event_root">
		<!--侧边栏-->
		<div class="aside">
			<!--标题栏-->
			<div class="aside_top">
				<div class="title-top">
					筛选条件
				</div>
				<!--搜索列表-->
				<div class="search clearfix">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="开始时间">
							<el-col :span="10">
								<el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
							</el-col>
							<el-col class="line" :span="1">——</el-col>
							<el-col :span="10">
								<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
							</el-col>
						</el-form-item>
						<el-form-item label="终止时间">
							<el-col :span="10">
								<el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
							</el-col>
							<el-col class="line" :span="1">——</el-col>
							<el-col :span="10">
								<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date4" style="width: 100%;"></el-time-picker>
							</el-col>
						</el-form-item>
						<el-form-item label="攻击类型">
							<el-select v-model="form.step" placeholder="请选择" style="width: 87%;" clearable>
								<el-option label="Point Of Entry" value="Point Of Entry"></el-option>
								<el-option label="Intelligence Gathering" value="Intelligence Gathering"></el-option>
								<el-option label="Privilege Escalation" value="Privilege Escalation"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="危险程度">
							<el-select v-model="form.level" placeholder="请选择" style="width: 87%;" clearable>
								<el-option label="高危" value="高危"></el-option>
								<el-option label="低危" value="低危"></el-option>
								<el-option label="中危" value="中危"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit" style="margin-left: 65%;margin-top:20px;">搜索</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!--事件刷新栏-->
			<div class="real_time">
				<div class="title-bottom">
					<p>设置刷新时间</p>
				</div>
				<div class="timer">
					<div id="timer_input">
						<el-select v-model="value4" clearable placeholder="请选择" @change="changeSelect1();">
							<el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div id="shadepar">
						<div id="shade"></div>
						<el-switch v-model="value" on-color="#13ce66" off-color="#ff4949">
						</el-switch>
					</div>
				</div>
			</div>
		</div>
		<!--右边数据主体-->
		<div class="contain">
			<!--数据主体标题标签栏-->
			<div class="contain_ctro">
				<p>事件列表</p>
			</div>
			<!--数据列表-->
			<div class="eventList">
				<el-table v-loading="loading" :data="tableData3" style="width: 100%" :row-class-name="tableRowClassName" @row-click='clickFunction'>
					<el-table-column prop="time" label="攻击时间" sortable>
					</el-table-column>
					<el-table-column prop="name" label="事件名称" show-overflow-tooltip="ture">
					</el-table-column>
					<el-table-column prop="srcIp" label="源IP">
					</el-table-column>
					<el-table-column prop="step" label="攻击类型">
					</el-table-column>
					<el-table-column prop="dstIp" label="目的IP">
					</el-table-column>
					<el-table-column prop="soucre" label="事件来源">
					</el-table-column>
					<el-table-column prop="level" label="危险等级">
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button @click="handleClick" type="text" size="small">
								<router-link :to="{ path: 'eventIN', query: { plan: 'private' }}"><i class="fa fa-info" style="margin-right: 10px;"></i>详情</router-link>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="contain_bottom">
				<div class="contain_bottom_left">
				</div>
				<div class="block contain_bottom_right">
					<el-pagination @size-change="handleSizeChange(10)" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="this.totalRecord">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	var common_tools = require("common_tools");
	export default {
		data() {
			return {
				value: false,
				formInline: {
					user: '',
					region: ''
				},
				form: {
					name: '',
					step: '',
					date3: '',
					date4: '',
					delivery: false,
					level: "",
					startDate: "",
					endDate: "",
				},
				tableData3: [{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},
					{
						name: "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
						time: "2017-08-01 04:08:51",
						srcIp: "123.207.238.34",
						dstIp: "192.168.62.153",
						step: "Intelligence Gathering",
						level: "低危",
						soucre: "snort"
					},
					{
						name: "\"OS-WINDOWS Microsoft Windows SMB remote code execution attempt\"",
						time: "2017-08-01 04:08:50",
						srcIp: "192.168.120.1",
						dstIp: "192.168.120.29",
						step: "Privilege Escalation",
						level: "高危",
						soucre: "snort"
					},
					{
						name: "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
						time: "2017-08-01 04:08:20",
						srcIp: "123.207.238.34",
						dstIp: "192.168.62.153",
						step: "Intelligence Gathering",
						level: "低危",
						soucre: "snort"
					},
					{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:08:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},
					{
						name: "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
						time: "2017-08-01 04:07:51",
						srcIp: "123.207.238.34",
						dstIp: "192.168.62.153",
						step: "Intelligence Gathering",
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					},{
						name: "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
						time: "2017-08-01 04:09:20",
						srcIp: "192.168.2.37",
						dstIp: "60.28.137.247",
						step: "Point Of Entry",
						level: "高危",
						soucre: "snort"
					}],
					inputVisible: false,
					totalRecord: "",
					num_page: 1,
					total: 0,
					currentPage4: "1",
					pageCount: '',
					options: [{
						value: '10s',
						label: '10s'
					}, {
						value: '20s',
						label: '20s'
					}],
					value4: '',
					loading: true
				}
			},
			methods: {
					//刷新
					changeSelect1() {
						var _this = this;
						var timer = null;
						var one = parseInt(_this.options[0].label) * 100;
						var two = parseInt(_this.options[1].label) * 100;
						console.log(_this.value4);
						if(_this.value4 == "10s") {
							_this.value = true;
							_this.loading = true;
							timer = setInterval(_this.getUser(), one);
							console.log("10s刷新一次")
						} else if(_this.value4 == "20s") {
							_this.value = true;
							timer = setInterval(_this.getUser(), two);
							console.log("20s刷新一次")
						} else {
							_this.value = false;
						}
					},
					//获取数据
					getUser() {
						var _that = this;
						alert(1);
						common_tools.AJAX('post', 'http://192.168.120.231:8080/event/list', {
							"size": "15",
							"page": "1"
						}, function(data) {
							_that.tableData3 = data.data;
							console.log(data.data)
						}, function() {
							console.log("报错啦")
						});
						console.log("运行完一次")
					},
					//分页
					handleCurrentChange(val) {
						var _that = this
						_that.Loading = true;
						common_tools.AJAX('post', 'http://192.168.120.231:8080/event/list', {
							"size": "15",
							"page": val
						}, function(data) {
							_that.totalRecord = data.dataCount;
							_that.tableData3 = data.data;
							_that.pageCount = data.pageCount;
							_that.loading = false;
						})
					},
					tableRowClassName(row, index) {
						if(index % 2 == 0) {
							return 'info-row';
						};
						return '';
					},
					// 搜索
					onSubmit() {
						var _this = this;
						common_tools.AJAX('post', 'http://192.168.120.231:8080/event/list', _this.form,
							function(data) {
								_this.tableData3 = data.data;
							})
					}
				},
				mounted() {
					this.handleCurrentChange()
				}
		}
</script>
<style>
	.event_root {
		width: 100%;
		height: 100%;
	}
	
	.event_root .aside {
		height: 100%;
		width: 20%;
		float: left;
		margin-left: 2%;
	}
	
	.event_root .title-top {
		width: 100%;
		height: 40px;
		background-color: #727E8C;
		border-radius: 6px 6px 0px 0px;
		color: #fff;
		font-size: 1.4rem;
		font-weight: bold;
		line-height: 40px;
		padding-left: 20px;
	}
	
	.event_root .aside .search {
		width: 100%;
		height: 75%;
		background-color: #ffffff;
		box-shadow: 0 4px 10px #ccc;
		padding-top: 30px;
		padding-bottom: 18%;
		position: relative;
		box-sizing: border-box;
		border-radius: 6px;
		overflow: hidden;
	}
	
	.event_root .real_time {
		width: 100%;
		height: 20%;
		border-radius: 6px 6px 0 0;
		margin-top: 15px;
		background-color: #ffffff;
		padding-bottom: 10px;
		box-shadow: 0 4px 10px #ccc;
		border-radius: 6px;
		overflow: hidden;
	}
	
	.event_root .contain {
		/*float: left;*/
		margin-right: 2%;
		width: 75%;
		margin-left: 23%;
		box-sizing: border-box;
		height: 80%;
		box-shadow: 0 4px 10px #ccc;
		background: #fff;
		border-radius: 6px;
		overflow: hidden;
	}
	
	.event_root .contain .contain_ctro {
		width: 100%;
		height: 40px;
		background-color: #727E8C;
		border-radius: 6px 6px 0 0;
		font-size: 1.4rem;
		color: #fff;
		font-weight: bold;
		line-height: 40px;
	}
	
	.event_root .contain .contain_ctro p {
		margin-left: 20px;
	}
	
	.event_root .contain .contain_menu {
		width: 100%;
		height: 50px;
		border: 1px solid #000000;
	}
	
	.eventList i {
		margin-right: 10px;
	}
	
	.eventList span {
		font-size: 12px;
	}
	
	.event_root .title-bottom {
		width: 100%;
		height: 42px;
		background-color: #727E8C;
		border-radius: 6px 6px 0px 0px;
	}
	
	.event_root .title-bottom p {
		color: #fff;
		font-size: 1.4rem;
		font-weight: bold;
		margin-left: 20px;
		line-height: 42px;
	}
	
	.event_root .real_time .refresh {
		display: block;
		float: left;
		margin-left: 20px;
		color: #000;
		font-size: 1.4rem;
		margin-top: 10px;
		margin-right: 10px;
	}
	
	.event_root .real_time .timer {
		width: 100%;
		margin-top: 10%;
		height: 56px;
	}
	
	.event_root .sebtn {
		width: 100%;
		margin-top: 30px;
		margin-right: 1%;
		margin-left: 70%;
	}
	
	.event_root .filtrate {
		width: 20%;
		height: 37px;
		background-color: #20A0FF;
		border: none;
		color: #ffffff;
		margin-left: 48%;
		border-radius: 5px;
		margin-top: 10px;
		font-size: 15px;
	}
	
	.el-table .info-row {
		background: #c9e5f5;
	}
	
	.el-table .positive-row {
		background: #c9e5f5;
	}
	
	.event_root .contain_bottom {
		width: 100%;
		height: 57px;
		background-color: #FFFFFF;
		padding-top: 0.7%;
	}
	
	.event_root .contain_bottom_left {
		width: 5%;
		float: left;
		margin-left: 1%;
		margin-top: 5px;
	}
	
	.event_root .contain_bottom_right {
		width: 50%;
		float: left;
		margin-left: 65%;
	}
	
	.event_root #shadepar {
		float: left;
		width: 20%;
		height: 25px;
		margin-left: 6%;
		margin-top: 8px;
	}
	
	.event_root #shade {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.05);
		width: 58px;
		height: 23px;
		z-index: 999;
		border-radius: 8px;
	}
	
	.event_root .block_form {
		margin-top: 20px;
	}
	
	.event_root #block_right {
		float: right;
		margin-right: 20%;
	}
	
	.event_root .aside_top {
		width: 100%;
		height: 80%;
		overflow: hidden;
		border-radius: 6px 6px 0px 0px;
	}
	
	.event_root .el-form-item__label {
		margin-right: 10px;
	}
	
	.event_root .selection_all {
		width: 20px;
	}
	
	.eventList {
		padding: 30px 20px 0 20px;
		overflow: hidden;
		height: 638px;
	}
	
	.eventTable tr .cell {
		padding: 0;
		text-align: center;
	}
	
	.el-table--enable-row-transition .el-table__body td {
		padding: 0;
	}
	
	#timer_input {
		float: left;
		margin-left: 10%;
		width: 60%;
	}
	
	.el-table .cell {
		text-align: center;
		font-size: 12px;
	}
</style>