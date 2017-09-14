<template>
	<div class="weakMonitor clearfix">
		<div class="leftContent">
			<div class="box-card asset-content1">
				<h3 class="card-header">查询条件</h3>
				<div class="card-body">
					<el-form ref="form" :model="searchOptions" label-width="80px">
						<el-form-item label="事件名">
							<el-input v-model="searchOptions.name"></el-input>
						</el-form-item>
						<el-form-item label="攻击源">
							<el-input v-model="searchOptions.source"></el-input>
						</el-form-item>
						<el-form-item label="攻击目标">
							<el-input v-model="searchOptions.destination"></el-input>
						</el-form-item>
						<el-form-item label="开始时间">
							<el-date-picker
									v-model="searchOptions.startDate"
									type="date"
									placeholder="选择开始日期"
									:picker-options="pickerOptions0">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="结束时间">
							<el-date-picker
									v-model="searchOptions.endDate"
									type="date"
									placeholder="选择结束日期"
									:picker-options="pickerOptions1">
							</el-date-picker>
						</el-form-item>
						
						<el-form-item label="状态">
							<el-select v-model="searchOptions.status">
								<el-option label="开启" value="0"></el-option>
								<el-option label="关闭" value="1"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item style="text-align:right;padding-right:20px;margin:0;">
							<el-button class="startScanBtn" type="primary" @click="startSearch" :loading="tableLoading"><span class="btnStart">开始查询</span><span class="btnProgress">扫描中</span></el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<div class="rightContent">
			<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane name="first">
					<span slot="label"><i class="el-icon-date"></i> 关联分析列表</span>
					<div class="commonTable">
						<el-table :data="commonTable" highlight-current-row v-loading="tableLoading"  stripe style="width: 100%" @selection-change="handleSelectionChange1">
							<el-table-column prop="name" label="事件名称" show-overflow-tooltip='true'>
							</el-table-column>
							<el-table-column prop="time" label="时间" width="250">
							</el-table-column>
							<el-table-column prop="source" label="源IP">
							</el-table-column>
							<el-table-column prop="destination" label="目的IP" >
							</el-table-column>
							<el-table-column prop="risk" label="风险值" width="100">
							</el-table-column>
							<el-table-column label="操作" width="150">
								<template scope="scope">
									<el-button size="small" @click="detailDialog(scope.$index,scope.row)"><i class="fa fa-info"></i>&nbsp;&nbsp;&nbsp;<span>查看</span></el-button>

								</template>
							</el-table-column>
							
						</el-table>
						<!--分页-->
						<div class="pagination">
							<el-pagination @current-change="" :current-page.sync="currentPage" layout="total, prev, pager, next" :page-size="10" :total="total">
							</el-pagination>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!--弹出框-->
		<el-dialog title="SQL use of sleep function in HTTP header - likely SQL injection attempt事件---详细信息" :visible.sync="detailDialogVisible" size="large">
			<!--<span>这是详细信息，具体内容敬请期待</span>-->
			<div class=" DD-all">
				<div class="detail-part">
					<div class="demo1 first">
						<div class="demo1-cont">
							<div class="demo1-title">源IP</div>
							<div class="demo1-num demo1-numip">123.25.365.256</div>

						</div>
					</div>
					<div class="demo1">
						<div class="demo1-cont">
							<div class="demo1-title">目的IP</div>
							<div class="demo1-num demo1-numip">123.25.365.256</div>
						</div>
					</div>
					<div class="demo1">
						<div class="demo1-cont">
							<div class="demo1-title">分值</div>
							<div class="demo1-num demo1-numgrade">123.25</div>
						</div>
					</div>
					<div class="demo1">
						<div class="demo1-cont">
							<div class="demo1-title">风险值</div>
							<div class="demo1-num demo1-numrisk">123</div>
						</div>
					</div>
					<div class="demo1">
						<div class="demo1-cont">
							<div class="demo1-title">危险等级</div>
							<div class="demo1-num demo1-numdegree">中等</div>
						</div>
					</div>
					<div class="demo1">
						<div class="demo1-cont">
							<div class="demo1-title">优先级</div>
							<div class="demo1-num demo1-numlevel">6</div>
						</div>
					</div>
					<div class="demo1">
						<div class="demo1-cont">
							<div class="demo1-title">时间</div>
							<div class="demo1-num">2141.03.74</div>
						</div>
					</div>

				</div>
				<div class="tableList-part">
					<p>关联事件------共{{dialogTableLength}}条</p>
					<template>
						<el-table :data="dialogTable" stripe   height="390" style="width: 100%">
							<el-table-column
									prop="name"
									label="事件名"
									align="center"
									width="" show-overflow-tooltip='true'>
							</el-table-column>
							<el-table-column
									prop="time"
									label="时间"
									align="center"
									width="220">
							</el-table-column>
							<el-table-column
									prop="soucre"
									width="120"
									align="center"
									label="来源">
							</el-table-column>
							<el-table-column
									prop="srcIp"
									align="center"
									label="源IP">
							</el-table-column>
							<el-table-column
									prop="dstIp"
									align="center"
									label="目的IP">
							</el-table-column>
							<el-table-column
									prop="level"
									width="150"
									align="center"
									label="危险等级">
							</el-table-column>
							<el-table-column
									prop="step"
									align="center"
									label="攻击阶段">
							</el-table-column>
							<el-table-column label="操作" align="center" width="140">
								<template scope="scope">
									<!--<router-link :to="{name:'eventInformationMB',params:{eventId:eventId}}">-->
										<el-button size="small" @click="detailEventInfo(scope.$index,scope.row)">

												<i class="fa fa-info"></i>&nbsp;&nbsp;&nbsp;<span>查看</span>

										</el-button>
									<!--</router-link>-->
								</template>
							</el-table-column>
						</el-table>
					</template>

				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	var common_tools = require("common_tools");
	require("../../../public_resource/vendor/jquery.actual.min.js")
	export default {
		data() {
			return {
				addLoading: false,
				searchOptions: {    //搜索表格标题的数据
					name: '',
					source: '',
					destination: '',
					startDate:'',
					endDate: '',
					status: '',
				},
				tableLoading: false,
				commonTable:[],
				commonTablefu: [
					{
					    id:'0',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
						time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
					},
                    {
                        id:'1',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'2',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'3',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'4',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'5',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'6',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'7',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'8',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'9',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'10',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'11',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'12',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    },
                    {
                        id:'13',
                        name:'SQL use of sleep function in HTTP header - likely SQL injection attempt',
                        time:'2017-08-01 04:06:50',
                        source:'123.26.236.235',
                        destination:'154.256.356.256',
                        risk:'125'
                    }
				],     //搜索结果信息内容
                commonTableId:[],
				dialogTable:[
                    {
                        "name": "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
                        "time": "2017-08-01 04:09:20",
                        "srcIp": "192.168.2.37",
                        "dstIp": "60.28.137.247",
                        "step": "Point Of Entry",
                        "level": "高危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
                        "time": "2017-08-01 04:08:51",
                        "srcIp": "123.207.238.34",
                        "dstIp": "192.168.62.153",
                        "step": "Intelligence Gathering",
                        "level": "低危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"OS-WINDOWS Microsoft Windows SMB remote code execution attempt\"",
                        "time": "2017-08-01 04:08:50",
                        "srcIp": "192.168.120.1",
                        "dstIp": "192.168.120.29",
                        "step": "Privilege Escalation",
                        "level": "高危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
                        "time": "2017-08-01 04:08:20",
                        "srcIp": "123.207.238.34",
                        "dstIp": "192.168.62.153",
                        "step": "Intelligence Gathering",
                        "level": "低危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
                        "time": "2017-08-01 04:08:20",
                        "srcIp": "192.168.2.37",
                        "dstIp": "60.28.137.247",
                        "step": "Point Of Entry",
                        "level": "高危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
                        "time": "2017-08-01 04:07:51",
                        "srcIp": "123.207.238.34",
                        "dstIp": "192.168.62.153",
                        "step": "Intelligence Gathering",
                        "level": "低危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"OS-WINDOWS Microsoft Windows SMB remote code execution attempt\"",
                        "time": "2017-08-01 04:07:51",
                        "srcIp": "192.168.120.1",
                        "dstIp": "192.168.120.29",
                        "step": "Privilege Escalation",
                        "level": "高危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
                        "time": "2017-08-01 04:07:20",
                        "srcIp": "123.207.238.34",
                        "dstIp": "192.168.62.153",
                        "step": "Intelligence Gathering",
                        "level": "低危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"SQL use of sleep function in HTTP header - likely SQL injection attempt\"",
                        "time": "2017-08-01 04:07:20",
                        "srcIp": "192.168.2.37",
                        "dstIp": "60.28.137.247",
                        "step": "Point Of Entry",
                        "level": "高危",
                        "soucre": "snort"
                    },
                    {
                        "name": "\"SERVER-OTHER OpenSSL TLSv1.1 large heartbeat response - possible ssl heartbleed attempt\"",
                        "time": "2017-08-01 04:06:50",
                        "srcIp": "123.207.238.34",
                        "dstIp": "192.168.62.153",
                        "step": "Intelligence Gathering",
                        "level": "低危",
                        "soucre": "snort"
                    }
				],   //弹出框内表格的内容（目前是安全事件接口）
				eventId:0,
                dialogTableLength:0,
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
				isActive: 0,
				detailDialogVisible:false
			}
		},

		methods: {

		    //点击开始查询
			startSearch() {
				var _self = this;
				_self.tableLoading = true;
				$('.btnStart').hide();
				$('.btnProgress').show();
				_self.commonTable=_self.commonTablefu;
				if(_self.commonTable==_self.commonTablefu){
                    _self.tableLoading = false;
                    $('.btnStart').show();
                    $('.btnProgress').hide();
                    _self.total=_self.commonTable.length;
				}
				console.log(_self.searchOptions.startDate);
				//中国标准时间转换为

                var d = new Date(_self.searchOptions.startDate);
                var youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
				console.log(youWant);
                /*
                common_tools.AJAX('POST', common_tools.interfaceurl + 'associationAnalysis.json', {}, function(data) {
                    _self.tableLoading = false;
                    $('.btnStart').show();
                    $('.btnProgress').hide();
                    _self.commonTable = data.data;
                    _self.total = _self.commonTable.length;
                    _self.total = 36;  //信息总条数
                }, function(data) {
                    console.log(data);  //输出错误信息
                });*/
			},
			/*
			//分页设置
			handleCurrentChange(val) {
				_self.addLoading = true;

				//获得数据的总条数，进行页码设置
				common_tools.AJAX('POST', common_tools.interfaceurl + 'weakMonitor.json', {}, function(data) {
					_self.addLoading = false;
					_self.commonTable = data.data;
					_self.total = "36";
				}, function(data) {
					console.log(data);
				});
			},*/
			//详情
			detailDialog(row){
			    var _self=this;
			    console.log(row);
//                common_tools.AJAX('post','http://192.168.120.231:8080/event/list',{"page":'1'},function (data) {
//					_self.dialogTable=data.data;
//					_self.dialogTableLength=_self.dialogTable.length;
//
//                },function (data) {
//					console.log(data);
//                })
                this.detailDialogVisible=true;


            },
			//查看详情中的关联事件
            detailEventInfo(row){
				var _self=this;
                _self.eventId=row;
                console.log(_self.eventId);
                _self.$router.push({name:'eventInformation',params:{eventId:_self.eventId}})
				console.log('详情'+row)
			},
			demo(){
                var _self=this;
                common_tools.AJAX('post','http://192.168.120.231:8080/event/list',_self.searchOptions,function (data) {

                })
			}
		},
		mounted: function() {
			console.log(this.searchOptions.startDate);

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
		padding: 20px;
		height: 600px;
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
	.analysisTime.el-date-editor--daterange.el-input{
		width:100%;
	}
	.el-table--enable-row-transition .el-table__body td{padding: 0 1%;}
	/*2017.08.02*/
	.el-date-editor.el-input{width: 100%;}
	.DD-all{
		width: 100%;
		height: 100%;
		border-radius: 4px;
		overflow: hidden;
	}
	.detail-part{
		width: 100%;
		height: 25%;
		box-sizing: border-box;
		position:relative;
		border-top: 1px solid rgba(195, 203, 204, 0.42);
	}
	.tableList-part{
		width: 100%;
		height:75%;
		margin-bottom: 20px;
		overflow: auto;
	}
	.tableList-part p{
		box-sizing: border-box;
		border:1px solid #D1DBE5;
		border-bottom: 0;
		font-size: 1.6rem;
		width: 100%;
		line-height: 40px;
		text-align: center;
	}
	.demo1{
		width: 14.28%;
		height: 100%;
		min-width: 115px;
		box-sizing: border-box;
		padding: 0 0 1% 10px;
		margin-top: 1%;
		float: left;
	}
	.first{
		padding-left: 0;
	}
	.demo1-cont{
		width: 100%;
		height: 100%;
		border-radius: 8px;
		border:1px solid #f1f1f1;
		text-align: center;
	}
	.demo1-cont div{
		width: 100%;
		height: 50%;
		position: relative;
		line-height: 75px;
	}
	.demo1-title:after{
		content: '';
		width: 0;
		height: 0;
		border-left:10px solid transparent;
		border-right:10px solid transparent;
		border-top: 10px solid #f2f2f2;
		position: absolute;
		bottom: -10px;
		z-index: 9;
		left: 50%;
		-webkit-transform: translateX(-50%);
	}
	.demo1-title{
		background-color: #f2f2f2;
		font-size: 1.9rem;
	}
	.demo1-num{font-size: 2.5rem;}
	/*.demo1-numip{color:#8a2be2;}*/
	/*.demo1-numgrade{color: #3398DB;}*/
	/*.demo1-numrisk,.demo1-numdegree{color: #e7505a;}*/
	/*.demo1-numlevel{color: #008b8b;}*/
	.weakMonitor .commonTable .el-table .cell{
		padding: 0 1%;
	}


</style>






















