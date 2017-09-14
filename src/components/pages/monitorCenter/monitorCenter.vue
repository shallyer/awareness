<template>
	<div>
		<el-tabs class="monitorCenterTabs" type="border-card" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane name="first">
				<span slot="label"><i class="el-icon-date"></i> 系统风险</span>
				<el-row style="margin-top:20px;">
					<el-col :span="8" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 危险等级分布</div>
						<div class="weakChart"></div>
					</el-col>
					<el-col :span="14" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 危险漏洞（按IP查询Top10）</div>
						<div class="weakChart bar"></div>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col :span="8" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 资产漏洞类别</div>
						<div class="weakChart"></div>
					</el-col>
					<el-col :span="14" class="chartModal bar">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 危险漏洞（按Host查询Top10）</div>
						<div class="weakChart bar"></div>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;padding-right:1.2%;">
					<el-col :span="23" class="chartModal">
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
						<!--<div class="lineCheckBox">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCheckBox" @change="handleCheckedIPChange">
								<el-checkbox v-for="item in IPList" :label="item" :key="item">{{item}}</el-checkbox>
							</el-checkbox-group>
							<p style="text-align: center;padding-top:10px;">
								<el-button type="primary" size="mini">提交</el-button>
							</p>
						</div>-->
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label"><i class="el-icon-picture"></i> 威胁事件</span>
				<el-row style="margin-top:20px;">
					<el-col :span="11" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 事件分类</div>
						<div class="threatenEventChart"></div>
					</el-col>
					<el-col :span="11" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 事件攻击阶段分布</div>
						<div class="threatenEventChart"></div>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col :span="11" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 威胁事件随时间变化</div>
						<div class="chartBtns">
							<ul>
								<li v-for="(item,index) in timeOptions2" :class="{active:isActive2==index}" @click="timeChange2(index)">{{item.name}}</li>
							</ul>
							<div class="block">
								<el-date-picker class="datePicker" v-model="dateValue2" @change="dateChange2" type="daterange" align="left" placeholder="选择日期范围" :picker-options="pickerOptions">
								</el-date-picker>
							</div>
						</div>
						<div class="threatenEventChart"></div>
					</el-col>
					<el-col :span="11" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 事件源IP（top10）</div>
						<div class="threatenEventChart"></div>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col :span="11" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 攻击源分布</div>
						<div class="threatenEventChart"></div>
					</el-col>
					<el-col :span="11" class="chartModal">
						<div class="chart-header"><img v-bind:src="chartIcon01" /> 被攻击的资产（top10）</div>
						<div class="threatenEventChart"></div>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	var common_tools = require("common_tools");
	var geoCoordMapWorld = require("../../../public_resource/vendor/geoCoordMapWorld.js");
	require("../../../public_resource/vendor/jquery.actual.min.js");
	require("../../../public_resource/vendor/world.js");
	require("../../../public_resource/vendor/china.js");
	export default {
		data() {
			return {
				chartIcon01: require('./chart-icon02.png'),
				chart1: '',
				chart2: '',
				chart3: '',
				chart4: '',
				chart5: null,
				chart6: '',
				chart7: '',
				chart8: '',
				chart9: '',
				chart10: '',
				chart11: '',
				option1: '',
				option1: '',
				option2: '',
				option3: '',
				option4: '',
				timeOut: '57600',
				total: '',
				addLoading: false,
				tableLoading: false,
				commonTable: [],
				currentPage: 1,
				activeTab2: 'first',
				activeName: 'first',
				timeOptions: [{
					name: "天"
				}, {
					name: "周"
				}, {
					name: "月"
				}],
				timeOptions2: [{
					name: "天"
				}, {
					name: "周"
				}, {
					name: "月"
				}],
				isActive: 0,
				isActive2: 0,
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
				initChart: {},
				dateValue: '',
				dateValue2: '',
				checkAll: true, //多选框
				checkedCheckBox: [],
				isIndeterminate: true,
				IPList: ['180.149.132.47', '202.108.22.15', '220.118.222.13', '123.125.114.144', '155.263.186.45', '124.145.18.20', '192.158.45.120', '124.138.231.2', '168.156.25.98', '192.156.85.4' ],
				chart1LegendData: [],
				chart2LegendData: [],
				chart2yAixsData: [],
				chart2Series: [],
				chart2Level: null,
				chart2SeriesDataItem: [],
				chart3LegendData: [],
				chart4LegendData: [],
				chart4yAixsData: [],
				chart4Series: [],
				chart4Level: null,
				chart4SeriesDataItem: [],
				chart5LegendData: [],
				chart5Series: [],
				chart5SeriesDataItem: [],
				chart5xAixsData: [],
				chart5Level: null,
				chart5StartDate: '',
				chart5EndDate: '',
				chart5SeriesName: '',
				chart6LegendData: [],
				chart6SeriesData: [],
				chart7xAxisData: [],
				chart7SeriesData: [],
				chart8StartDate: '',
				chart8EndDate: '',
				chart8LegendData: [],
				chart8SeriesData: [],
				chart8xAxisData: [],
				chart9LegendData: [],
				chart9SeriesData: [],
				chart11LegendData: [],
				chart11SeriesData: []
			}
		},

		methods: {
			timeChange(index) {
				var _self =this;
				_self.isActive=index;
				switch(index){
					case 0:
					var today=new Date();
					var year=today.getFullYear();
					var month=today.getMonth()+1;
					var date=today.getDate();
					var fullDate=year+"-"+month+"-"+date;
					_self.chart5StartDate=fullDate;
					_self.chart5EndDate=fullDate;
					_self.drawChart5();
					break;
					case 1:
					var today=new Date();
					_self.chart5EndDate=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDate());
					var lastWeekDay=new Date(today.getTime()-6*24*60*60*1000);
					_self.chart5StartDate=lastWeekDay.getFullYear()+"-"+(lastWeekDay.getMonth()+1)+"-"+lastWeekDay.getDate();
					_self.drawChart5();
					break;
					case 2:
					
					var today=new Date();
					_self.chart5EndDate=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDate());
					var lastWeekDay=new Date(today.getTime()-29*24*60*60*1000);
					_self.chart5StartDate=lastWeekDay.getFullYear()+"-"+(lastWeekDay.getMonth()+1)+"-"+lastWeekDay.getDate();
					_self.drawChart5();
					break;
				}
			},
			dateChange(val) {
				var _self = this;
				_self.chart5StartDate=val.slice(0,10);
				_self.chart5EndDate=val.slice(12);
				_self.drawChart5();
			},
			timeChange2(index) {
				var _self =this;
				_self.isActive2=index;
				switch(index){
					case 0:
					var today=new Date("2017-08-01");
					var year=today.getFullYear();
					var month=today.getMonth()+1;
					var date=today.getDate();
					var fullDate=year+"-"+month+"-"+date;
					_self.chart8StartDate=fullDate;
					_self.chart8EndDate=fullDate;
					_self.drawChart8();
					break;
					case 1:
					var today=new Date();
					_self.chart8EndDate=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDate());
					var lastWeekDay=new Date(today.getTime()-6*24*60*60*1000);
					_self.chart8StartDate=lastWeekDay.getFullYear()+"-"+(lastWeekDay.getMonth()+1)+"-"+lastWeekDay.getDate();
					_self.drawChart8();
					break;
					case 2:
					var today=new Date();
					_self.chart8EndDate=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDate());
					var lastWeekDay=new Date(today.getTime()-29*24*60*60*1000);
					_self.chart8StartDate=lastWeekDay.getFullYear()+"-"+(lastWeekDay.getMonth()+1)+"-"+lastWeekDay.getDate();
					_self.drawChart8();
					break;
				}
			},
			
			dateChange2(val) {
				var _self = this;
				_self.chart8StartDate=val.slice(0,10);
				_self.chart8EndDate=val.slice(12);
				_self.drawChart8();
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
					_self.drawChart6();
					_self.drawChart7();
					_self.drawChart8();
					_self.drawChart9();
					_self.drawChart10();
					_self.drawChart11();
				};
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
			drawChart1() {
				var _self = this;
				_self.chart1 = _self.$echarts.init($('.weakChart')[0]);
				_self.chart1.showLoading({
					text:'拼命加载中'
				});
				//chart1
				common_tools.AJAX('GET', common_tools.interfaceurl + 'sysdanger/dangerlevel', {}, function(data) {
					if(data.flag==0){
						_self.chart1.hideLoading();
						for(var i=0;i<data.data.list.length;i++){
							_self.chart1LegendData.push(data.data.list[i].name);
						}
						_self.chart1.setOption({
							tooltip: {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							legend: {
								orient: 'vertical',
								left: '2%',
								top: '3%',
								data: _self.chart1LegendData
							},
							series: [{
								name: '危险等级占比',
								type: 'pie',
								radius: '55%',
								center: ['55%', '55%'],
								data:data.data.list,
								itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
								}
							}],
							color: ['#dc613a', '#f5b54a', '#2da282','#23b1d0' ]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart2() {
				var _self = this;
				_self.chart2 = _self.$echarts.init($('.weakChart')[1]);
				_self.chart2.showLoading({
					text:'拼命加载中'
				});
				//chart2
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerbysrcip', {
					"level":_self.chart2Level
				}, function(data) {
					if(data.flag==0){
						_self.chart2.hideLoading();
						for(var i=0;i<data.data.schema.length;i++){
							_self.chart2LegendData.unshift(data.data.schema[i])
						}
						for(var i=0;i<data.data.list.length;i++){
							_self.chart2yAixsData.push(data.data.list[i].name);
							_self.chart2SeriesDataItem.push(data.data.list[i].value);
						}
						_self.chart2LegendData.unshift('全部');
						for(var i = 0 ;i<_self.chart2LegendData.length; i++){
							_self.chart2Series.push({
								name: _self.chart2LegendData[i],
								type: 'bar',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								data: []
							});
						}
						_self.chart2Series[0].data=_self.chart2SeriesDataItem;
						_self.chart2.setOption({
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
									'全部': true,
								},
								data: _self.chart2LegendData
							},
							grid: {
								left: '5%',
								right: '8%',
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
								data: _self.chart2yAixsData
							},
							series: _self.chart2Series,
							color: ['#3398DB','#2da282','#23b1d0','#f5b54a','#dc613a' ]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
				_self.chart2.on('legendselectchanged',function(params){
					_self.chart2Level = null;
					for(var i=0;i<_self.chart2LegendData.length;i++){
						if(_self.chart2LegendData[i]==params.name&&i!=0){
							_self.chart2Level = i;
						}
					}
					common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerbysrcip', {
						"level":_self.chart2Level
					}, function(data) {
						if(data.flag==0){
							_self.chart2.hideLoading();
							_self.chart2yAixsData=[];
							_self.chart2SeriesDataItem=[];
							for(var i=0;i<data.data.list.length;i++){
								_self.chart2yAixsData.push(data.data.list[i].name);
								_self.chart2SeriesDataItem.push(data.data.list[i].value);
							}
							_self.chart2.setOption({
								yAxis: {
									data: _self.chart2yAixsData
								},
								series: [
									{
										name: params.name,
										type: 'bar',
										label: {
											normal: {
												show: true,
												position: 'insideRight'
											}
										},
										data: _self.chart2SeriesDataItem
									}
								],
								color: ['#3398DB','#2da282','#23b1d0','#f5b54a','#dc613a']
							})
							
						}else{
							alert('传参错误');
						}
					}, function(data) {
						console.log(data);
					});
				})
				
			},
			drawChart3() {
				var _self = this;
				_self.chart3 = _self.$echarts.init($('.weakChart')[2]);
				_self.chart3.showLoading({
					text:'拼命加载中'
				});
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByServer', {}, function(data) {
					if(data.flag==0){
						_self.chart3.hideLoading();
						for(var i=0;i<data.data.list.length;i++){
							_self.chart3LegendData.push(data.data.list[i].name);
						}
						_self.chart3.setOption({
							tooltip: {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							legend: {
								orient: 'vertical',
								left: '2%',
								top: '3%',
								data: _self.chart3LegendData
							},
							series: [{
								name: '楼栋分布占比',
								type: 'pie',
								radius: '55%',
								center: ['55%', '55%'],
								data:data.data.list,
								itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
								}
							}],
							color: ['#dc613a', '#f5b54a', '#2da282','#23b1d0' ]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart4() {
				var _self = this;
				_self.chart4 = _self.$echarts.init($('.weakChart')[3]);
				_self.chart4.showLoading({
					text:'拼命加载中'
				});
				//chart2
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByHost', {
					"level":_self.chart4Level
				}, function(data) {
					if(data.flag==0){
						_self.chart4.hideLoading();
						for(var i=0;i<data.data.schema.length;i++){
							_self.chart4LegendData.unshift(data.data.schema[i])
						}
						for(var i=0;i<data.data.list.length;i++){
							_self.chart4yAixsData.push(data.data.list[i].name);
							_self.chart4SeriesDataItem.push(data.data.list[i].value);
						}
						_self.chart4LegendData.unshift('全部');
						for(var i = 0 ;i<_self.chart4LegendData.length; i++){
							_self.chart4Series.push({
								name: _self.chart4LegendData[i],
								type: 'bar',
								label: {
									normal: {
										show: true,
										position: 'insideRight'
									}
								},
								data: []
							});
						}
						_self.chart4Series[0].data=_self.chart4SeriesDataItem;
						_self.chart4.setOption({
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
									'全部': true,
								},
								data: _self.chart4LegendData
							},
							grid: {
								left: '5%',
								right: '8%',
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
								name: '主机名',
								data: _self.chart4yAixsData
							},
							series: _self.chart4Series,
							color: ['#3398DB','#2da282','#23b1d0','#f5b54a','#dc613a' ]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
				_self.chart4.on('legendselectchanged',function(params){
					_self.chart4Level = null;
					for(var i=0;i<_self.chart4LegendData.length;i++){
						if(_self.chart4LegendData[i]==params.name&&i!=0){
							_self.chart4Level = i;
						}
					}
					common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByHost', {
						"level":_self.chart4Level
					}, function(data) {
						if(data.flag==0){
							_self.chart4.hideLoading();
							_self.chart4yAixsData=[];
							_self.chart4SeriesDataItem=[];
							for(var i=0;i<data.data.list.length;i++){
								_self.chart4yAixsData.push(data.data.list[i].name);
								_self.chart4SeriesDataItem.push(data.data.list[i].value);
							}
							_self.chart4.setOption({
								yAxis: {
									data: _self.chart4yAixsData
								},
								series: [
									{
										name: params.name,
										type: 'bar',
										label: {
											normal: {
												show: true,
												position: 'insideRight'
											}
										},
										data: _self.chart4SeriesDataItem
									}
								],
								color: ['#3398DB','#2da282','#23b1d0','#f5b54a','#dc613a']
							})
							
						}else{
							alert('传参错误');
						}
					}, function(data) {
						console.log(data);
					});
				})
				
			},
			drawChart5() {
				var _self = this;
				_self.chart5 = _self.$echarts.init($('.weakChart')[4]);
				_self.chart5.showLoading({
					text:'拼命加载中'
				});
				//chart5
				if(!_self.chart5StartDate&&!_self.chart5EndDate){
					var today=new Date();
					var year=today.getFullYear();
					var month=today.getMonth()+1;
					var date=today.getDate();
					var fullDate=year+"-"+month+"-"+date;
					_self.chart5StartDate=fullDate;
					_self.chart5EndDate=fullDate;
				}
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByDate', {
					"startDate":_self.chart5StartDate,
					"endDate":_self.chart5EndDate,
					"level":null
				}, function(data) {
					if(data.flag==0){
						_self.chart5.hideLoading();
						_self.chart5LegendData=[];
						_self.chart5xAixsData=[];
						_self.chart5SeriesDataItem=[];
						_self.chart5Series=[];
						for(var i=0;i<data.data.schema.length;i++){
							_self.chart5LegendData.unshift(data.data.schema[i])
						}
						_self.chart5LegendData.unshift('全部');
						for(var i=0;i<data.data.list.length;i++){
							_self.chart5xAixsData.push(data.data.list[i].name);
							_self.chart5SeriesDataItem.push(data.data.list[i].value);
						}
						
						_self.chart5Series.push({
							name:'全部',
							type: 'line',
							lineStyle: {
								normal: {
									width: 2,
								}
							},
							data: _self.chart5SeriesDataItem
						});
						common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByDate', {
							"startDate":_self.chart5StartDate,
							"endDate":_self.chart5EndDate,
							"level":1
						}, function(data) {
							if(data.flag==0){
								_self.chart5SeriesDataItem=[];
								for(var m=0;m<data.data.list.length;m++){
									_self.chart5SeriesDataItem.push(data.data.list[m].value);
								};
								_self.chart5Series.push({
									name: _self.chart5LegendData[1],
									type: 'line',
									lineStyle: {
										normal: {
											width: 2,
										}
									},
									data: _self.chart5SeriesDataItem
								});
								common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByDate', {
									"startDate":_self.chart5StartDate,
									"endDate":_self.chart5EndDate,
									"level":2
								}, function(data) {
									if(data.flag==0){
										_self.chart5SeriesDataItem=[];
										for(var m=0;m<data.data.list.length;m++){
											_self.chart5SeriesDataItem.push(data.data.list[m].value);
										};
										_self.chart5Series.push({
											name: _self.chart5LegendData[2],
											type: 'line',
											lineStyle: {
												normal: {
													width: 2,
												}
											},
											data: _self.chart5SeriesDataItem
										});
										common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByDate', {
											"startDate":_self.chart5StartDate,
											"endDate":_self.chart5EndDate,
											"level":3
										}, function(data) {
											if(data.flag==0){
												_self.chart5SeriesDataItem=[];
												for(var m=0;m<data.data.list.length;m++){
													_self.chart5SeriesDataItem.push(data.data.list[m].value);
												};
												_self.chart5Series.push({
													name: _self.chart5LegendData[3],
													type: 'line',
													lineStyle: {
														normal: {
															width: 2,
														}
													},
													data: _self.chart5SeriesDataItem
												});
												common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerByDate', {
													"startDate":_self.chart5StartDate,
													"endDate":_self.chart5EndDate,
													"level":4
												}, function(data) {
													if(data.flag==0){
														_self.chart5SeriesDataItem=[];
														for(var m=0;m<data.data.list.length;m++){
															_self.chart5SeriesDataItem.push(data.data.list[m].value);
														};
														_self.chart5Series.push({
															name: _self.chart5LegendData[4],
															type: 'line',
															lineStyle: {
																normal: {
																	width: 2,
																}
															},
															data: _self.chart5SeriesDataItem
														});
														if(_self.chart5Series.length==5){
															_self.chart5.setOption({
																tooltip: {
																	trigger: 'axis'
																},
																color: ["#FF0000", "#00BFFF", "#FF00FF", "#1ce322", "#000000", '#EE7942'],
																legend: {
																	bottom: '15',
																	selectedMode: 'single',
																	data: _self.chart5LegendData
																},
																grid: {
																	top: "14%",
																	left: '3%',
																	right: '5%',
																	bottom: '10%',
																	containLabel: true
																},
																xAxis: {
																	name: '时间',
																	type: 'category',
																	boundaryGap: false,
																	data: _self.chart5xAixsData
																},
																yAxis: [{
																	name: '漏洞数',
																	type: 'value',
																	axisLabel: {
																		formatter: '{value} '
																	},
																}],
																series: _self.chart5Series
															})
														}
													}else{
														alert('传参错误');
													}
												}, function(data) {
													console.log(data);
												});
												
											}else{
												alert('传参错误');
											}
										}, function(data) {
											console.log(data);
										});
									}else{
										alert('传参错误');
									}
								}, function(data) {
									console.log(data);
								});
				
							}else{
								alert('传参错误');
							}
						}, function(data) {
							console.log(data);
						});
				
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart6() {
				var _self = this;
				if(!_self.chart6){
					$(".threatenEventChart").eq(0).css('width', $(".threatenEventChart").eq(0).actual('width'));
					_self.chart6 = _self.$echarts.init($('.threatenEventChart')[0]);
				}
				_self.chart6.showLoading({
					text:'拼命加载中'
				});
				common_tools.AJAX('POST', common_tools.interfaceurl + 'business/classifyStatics', {"top":10}, function(data) {
					if(data.flag==0){
						_self.chart6.hideLoading();
						_self.chart6xAixsData=[];
						_self.chart6SeriesData=[];
						for(var i=0;i<data.data.list.length;i++){
							_self.chart6LegendData.push(data.data.list[i].name);
						}
						_self.chart6SeriesData=data.data.list;
						_self.chart6.setOption({
							color:["#D87A80","#FFB980","#5AB1EF","#32D9DD","#B6A2DE","#8D98B3","#E5CF0D","#97B552","#07A2A4","#6F5553","#C9AB00"],
						    tooltip : {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
						    legend: {
								orient: 'vertical',
								left: '2%',
								top: '3%',
								data: _self.chart6LegendData
							},
						    calculable : true,
						    series : [
						        {
						            name:'事件分类',
						            type:'pie',
						            radius : [40, 120],
						            center : ['55%', '55%'],
						            roseType : 'radius',
						            /*labelLine:{
					                	normal:{
					                		length:10,
					                	}
					                },*/
								    data:_self.chart6SeriesData.sort(function(a,b){
								    	return a.value-b.value;
								    })
								},
						    ]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart7() {
				var _self = this;
				
				if(!_self.chart7){
					$(".threatenEventChart").eq(1).css('width', $(".threatenEventChart").eq(1).actual('width'));
					_self.chart7 = _self.$echarts.init($('.threatenEventChart')[1]);
				}
				
				_self.chart7.showLoading({
					text:'拼命加载中'
				});
				
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerbystep', {"top":10}, function(data) {
					if(data.flag==0){
						_self.chart7.hideLoading();
						_self.chart7xAxisData=[];
						_self.chart7SeriesData=[];
						for(var i=0;i<data.data.list.length;i++){
							_self.chart7xAxisData.push(data.data.list[i].name);
							_self.chart7SeriesData.push(data.data.list[i].value);
						}
						_self.chart7SeriesData=data.data.list;
						_self.chart7.setOption({
							color: ['#23b1d0', '#144d69', '#2da282', '#f5b54a', '#dc613a'],
							tooltip: {
								trigger: 'axis',
								axisPointer: { // 坐标轴指示器，坐标轴触发有效
									type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
								}
							},
							grid: {
								left: '3%',
								right: '5%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: [{
								type: 'category',
								data: _self.chart7xAxisData,
								axisTick: {
									alignWithLabel: true
								}
							}],
							yAxis: [{
								type: 'value',
								boundaryGap: ['20%', '20%']
							}],
							series: [{
								type: 'bar',
								barWidth: '60%',
								data: _self.chart7SeriesData
							}]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart8() {
				var _self = this;
				if(!_self.chart8){
					$(".threatenEventChart").eq(2).css('width', $(".threatenEventChart").eq(2).actual('width'));
					_self.chart8 = _self.$echarts.init($('.threatenEventChart')[2]);
				}
				_self.chart8.showLoading({
					text:'拼命加载中'
				});
				if(!_self.chart8StartDate&&!_self.chart8EndDate){
//					var today=new Date();
					//暂时
					var today=new Date("2017-08-01");
					var year=today.getFullYear();
					var month=today.getMonth()+1;
					var date=today.getDate();
					var fullDate=year+"-"+month+"-"+date;
					_self.chart8StartDate=fullDate;
					_self.chart8EndDate=fullDate;
				}
				common_tools.AJAX('POST', common_tools.interfaceurl + 'business/classifyByDatetime', {
					"startDate":_self.chart8StartDate,
					"endDate":_self.chart8EndDate,
				}, function(data) {
					if(data.flag==0){
						_self.chart8.hideLoading();
						_self.chart8LegendData=[];
						_self.chart8xAxisData=[];
						_self.chart8SeriesData=[];
						if(data.data.list.length!=0){
							for(var i = 0; i < data.data.list.length; i++) {
								_self.chart8LegendData.push(data.data.list[i].name)
								_self.chart8SeriesData.push({
									name: data.data.list[i].name,
									type: 'line',
									lineStyle: {
										normal: {
											width: 2,
										}
									},
									data: data.data.list[i].value
								})
							}
						}else{
							for(var m = 0; m < data.data.schema.length; m++) {
								_self.chart8SeriesData.push({
									type: 'line',
									lineStyle: {
										normal: {
											width: 2,
										}
									},
									data: 0
								})
							}
						}
						
						console.log(_self.chart8LegendData,_self.chart8SeriesData);
						for(var m = 0; m < data.data.schema.length; m++) {
							_self.chart8xAxisData.push(data.data.schema[m]);
						}
						_self.chart8.setOption({
							tooltip: {
								trigger: 'axis'
							},
							legend: {
//								top: 'middle',
								bottom: '3%',
//								align: 'left',
//								orient: 'vertical',
								data: _self.chart8LegendData
							},
							grid: {
								top: "15%",
								left: '5%',
								right: '7%',
								bottom: '10%',
								containLabel: true
							},
							xAxis: {
								type: 'category',
								boundaryGap: false,
								name: '时间',
								nameGap: '10',
								data: _self.chart8xAxisData
							},
							yAxis: [{
								type: 'value',
								name: '事件数',
								nameGap: '10',
								axisLabel: {
									formatter: '{value} '
								},
							}],
							series: _self.chart8SeriesData,
							color: ['#dc613a', '#23b1d0', '#144d69', '#2da282', '#f5b54a']
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart9() {
				var _self = this;
				if(!_self.chart9){
					$(".threatenEventChart").eq(3).css('width', $(".threatenEventChart").eq(3).actual('width'));
					_self.chart9 = _self.$echarts.init($('.threatenEventChart')[3]);
				}
				_self.chart9.showLoading({
					text:'拼命加载中'
				});
				//chart9
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerbysrcip', {"top":10}, function(data) {
					if(data.flag==0){
						_self.chart9.hideLoading();
						_self.chart9LegendData=[];
						for(var i=0;i<data.data.list.length;i++){
							_self.chart9LegendData.push(data.data.list[i].name);
						}
						_self.chart9SeriesData=data.data.list;
						_self.chart9.setOption({
							color: ["#D87A80","#FFB980","#32D9DD","#B6A2DE","#97B552","#5AB1EF","#07A2A4","#8D98B3","#6F5553","#C9AB00","#E5CF0D",],
							legend: {
								orient: 'vertical',
								left: '2%',
								top: '2%',
								data: _self.chart9LegendData
							},
							tooltip: {
								trigger: "item",
								formatter: "{a}<br>{b}--{c} {d}%",
							},
							series: [{
									type: "pie",
									name: "事件源IP",
									center: ["55%", "50%"],
									radius: [40, 150],
									roseType: "radius",
									data: _self.chart9SeriesData.sort(function(a,b){
										return a.value-b.value;
									})
								},
							]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart10() {
				var _self = this;
				if(!_self.chart10){
					$(".threatenEventChart").eq(4).css('width', $(".threatenEventChart").eq(4).actual('width'));
					_self.chart10 = _self.$echarts.init($('.threatenEventChart')[4]);
				}
				_self.chart10.showLoading({
					text:'拼命加载中',
				});
				//chart10
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerbygeocountry', {}, function(data) {
					if(data.flag==0){
						_self.chart10.hideLoading();
//						var mapList=data.data.list;
						var mapList=[
					            {
					                "name": "unknow",
					                "value": 807
					            },
					            {
					                "name": "China",
					                "value": 66
					            }
					        ]
						_self.chart10.setOption({
							title: {
								text: '全球攻击源分布图',
								left: 'center',
								top: 'top'
							},
							tooltip: {
								trigger: 'item',
							},
							 visualMap: {
						        min: 0,
						        max: 100,
						        calculable: true,
						        inRange: {
						            color: ['#50a3ba', '#eac736', '#d94e5d']
						        },
						        textStyle: {
						            color: '#fff'
						        }
						    },
						    geo: {
						        map: 'world',
						        label: {
						            emphasis: {
						                show: false
						            }
						        },
						        roam: true,
						        label:{
						        	normal: {
					                    show:false,
					                    formatter: function (params) {
					                        return params.name;
					                    }
					                },
					                emphasis: {
					                    label:{
					                        show:true
					                    }
					                }
						        }
						    },
						   	series: [{
								name: '攻击源',
					            type: 'scatter',
					            coordinateSystem: 'geo',
					            data: _self.convertData(mapList),
					            symbolSize: function (val) {
					                return 2+val[2] /10;
					            },
					            label: {
					                normal: {
					                    formatter: '{b}',
					                    position: 'right',
					                    show: false
					                },
					                emphasis: {
					                    show: true
					                }
					            },
					            itemStyle: {
					                normal: {
					                    color: '#ddb926'
					                }
					            }
							},
						   	{
					            name: 'Top 5',
					            type: 'effectScatter',
					            coordinateSystem: 'geo',
					            data: _self.convertData(mapList.sort(function (a, b) {
					                return b.value - a.value;
					            }).slice(0, 5)),
					            symbolSize: function (val) {
					                return 2+ val[2] / 10;
					            },
					            showEffectOn: 'render',
					            rippleEffect: {
						        	period:4,
						            brushType: 'stroke',
						            scale: 3
						        },
					            hoverAnimation: true,
					            label: {
					                normal: {
					                    formatter: '{b}',
					                    position: 'right',
					                }
					            },
					            itemStyle: {
					                normal: {
					                    color: '#f4e925',
					                }
					            },
					            zlevel: 1
					        }]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			drawChart11() {
				var _self = this;
				if(!_self.chart11){
					$(".threatenEventChart").eq(5).css('width', $(".threatenEventChart").eq(5).actual('width'));
					_self.chart11 = _self.$echarts.init($('.threatenEventChart')[5]);
				}
				_self.chart11.showLoading({
					text:'拼命加载中'
				});
				//chart11
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sysdanger/dangerbydstip', {"top":10}, function(data) {
					if(data.flag==0){
						_self.chart11.hideLoading();
						_self.chart11LegendData=[];
						for(var i=0;i<data.data.list.length;i++){
							_self.chart11LegendData.push(data.data.list[i].name);
						}
						_self.chart11SeriesData=data.data.list;
						_self.chart11.setOption({
							color: ["#D87A80","#FFB980","#5AB1EF","#32D9DD","#B6A2DE","#97B552","#07A2A4","#8D98B3","#6F5553","#C9AB00","#E5CF0D"],
							legend: {
								orient: 'vertical',
								left: '2%',
								top: '2%',
								data: _self.chart11LegendData
							},
							tooltip: {
								trigger: "item",
								formatter: "{a}<br>{b}--{c} {d}%",
							},
							series: [{
									type: "pie",
									name: "被攻击资产",
									center: ["55%", "50%"],
									radius: [40, 150],
									roseType: "radius",
									data: _self.chart11SeriesData.sort(function(a,b){
										return a.value-b.value;
									})
								},
							]
						})
					}else{
						alert('传参错误');
					}
				}, function(data) {
					console.log(data);
				});
			},
			convertData(data) {
			    var res = [];
			    for (var i = 0; i < data.length; i++) {
			        var geoCoord = geoCoordMapWorld[data[i].name];
			        if (geoCoord) {
			            res.push({
			                name: data[i].name,
			                value: geoCoord.concat(data[i].value)
			            });
			        }
			    }
			    return res;
			}
		},

		mounted: function() {
			this.drawChart1();
			this.drawChart2();
			this.drawChart3();
			this.drawChart4();
			this.drawChart5();
		}
	}
</script>
<style>
	.monitorCenterTabs {
		margin-left: 1.5%;
		width: 97%;
	}
	
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
	
	.el-tabs.el-tabs--border-card {
		border-radius: 6px;
		overflow: hidden;
	}
	
	.card-body .el-table th,
	.card-body .el-table td {
		padding: 5px 0;
		text-align: center;
	}
	
	.card-body .el-table .cell {
		padding: 0;
	}
	
	.demo-table-expand {
		padding: 15px 0 15px 0;
	}
	
	.btnProgress {
		display: none;
	}
	
	.weakChart {
		width: 100%;
		height: 400px;
	}
	
	.weakChart.bar {
		height: 400px;
	}
	
	.weakChart.line {
		height: 600px;
	}
	
	.threatenEventChart {
		width: 100%;
		height: 500px;
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
		right: 4.5%;
		top: 30%;
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