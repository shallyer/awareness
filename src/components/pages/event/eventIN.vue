<template>
	<div class="details_root">
		<div class="goback">
			<a href="javascript:history.back(-1);"><i class="fa fa-mail-reply " style="margin-right: 5px;"></i>返回上一页</a>
		</div>
		<div class="details_ID clearfix">
			<div class="details_ID_title title">
				<i class="fa fa-window-maximize fa-4x iconstyle"></i>
				<div class="details_ID_text textstyle">
					<p>ID:</p>
					<span>{{ID}}</span>
					<p>TIME:</p>
					<span>{{time}}</span>
				</div>
			</div>
			<div class="liststyle">
				<el-table :data="tableData" style="width: 100%" fit="true">
					<el-table-column prop="time" label="攻击时间">
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
					<el-table-column prop="major" label="主分类">
					</el-table-column>
					<el-table-column prop="minor" label="子分类">
					</el-table-column>
					<el-table-column prop="level" label="危险等级" width="100">
					</el-table-column>
				</el-table>
			</div>

		</div>
		<div class="details_middle">
			<div class="details_middle_left">
				<div id="details_middle_map" style="width: 100%; height: 100%;">

				</div>
			</div>
			<div class="details_middle_right">
				<div class="details_eventDetails">
					<div class="details_eventDetails_sensor">
						<i class="fa fa-podcast fa-5x puliciconstyle"></i>
						<span class="pulictextstyle">探测器</span>
					</div>
					<div class="details_eventDetails_sensor_list">
						<el-table :data="tableData1" border style="width: 100%">
							<el-table-column prop="adress" label="探测器地址">
							</el-table-column>
							<el-table-column prop="interface" label="界面">
							</el-table-column>
							<el-table-column prop="leach" label="过滤器">
							</el-table-column>
						</el-table>
					</div>

				</div>
				<div class="details_middle_right_keywords">
					<p class="details_middle_right_keywords_title">攻击字解详情</p>
					<div class="details_middle_right_keywords_content"></div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import world from '../../../public_resource/vendor/world';
	export default {
		data() {
			return {
				ID: "SQL use of sleep function ",
				time: new Date(),
				tableData: [{
					name: '跨站脚本攻击跨站脚本攻击跨站脚本攻击跨站脚本攻击跨站脚本攻击跨站脚本攻击跨站脚本攻击跨站脚本攻击',
					time: '2017-08-0115:36:21',
					source: '分析日志',
					srcIp: '192.168.120.211',
					step: '信息收集',
					dstIp: '172.68.34.201',
					major: '',
					minor: '',
					level: '1'
				}],
				tableData1: [{
						adress: 'localhost:eth0',
						interface: 'eth0',
						leach: 'none'
					}

				]
			}
		},
		methods: {
			attrack() {
				var details_middle_map = this.$echarts.init(document.getElementById('details_middle_map'));
				var nameMap = {
					'Afghanistan': '阿富汗',
					'Angola': '安哥拉',
					'Albania': '阿尔巴尼亚',
					'United Arab Emirates': '阿联酋',
					'Argentina': '阿根廷',
					'Armenia': '亚美尼亚',
					'French Southern and Antarctic Lands': '法属南半球和南极领地',
					'Australia': '澳大利亚',
					'Austria': '奥地利',
					'Azerbaijan': '阿塞拜疆',
					'Burundi': '布隆迪',
					'Belgium': '比利时',
					'Benin': '贝宁',
					'Burkina Faso': '布基纳法索',
					'Bangladesh': '孟加拉国',
					'Bulgaria': '保加利亚',
					'The Bahamas': '巴哈马',
					'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
					'Belarus': '白俄罗斯',
					'Belize': '伯利兹',
					'Bermuda': '百慕大',
					'Bolivia': '玻利维亚',
					'Brazil': '巴西',
					'Brunei': '文莱',
					'Bhutan': '不丹',
					'Botswana': '博茨瓦纳',
					'Central African Republic': '中非共和国',
					'Canada': '加拿大',
					'Switzerland': '瑞士',
					'Chile': '智利',
					'China': '中国',
					'Ivory Coast': '象牙海岸',
					'Cameroon': '喀麦隆',
					'Democratic Republic of the Congo': '刚果民主共和国',
					'Republic of the Congo': '刚果共和国',
					'Colombia': '哥伦比亚',
					'Costa Rica': '哥斯达黎加',
					'Cuba': '古巴',
					'Northern Cyprus': '北塞浦路斯',
					'Cyprus': '塞浦路斯',
					'Czech Republic': '捷克共和国',
					'Germany': '德国',
					'Djibouti': '吉布提',
					'Denmark': '丹麦',
					'Dominican Republic': '多明尼加共和国',
					'Algeria': '阿尔及利亚',
					'Ecuador': '厄瓜多尔',
					'Egypt': '埃及',
					'Eritrea': '厄立特里亚',
					'Spain': '西班牙',
					'Estonia': '爱沙尼亚',
					'Ethiopia': '埃塞俄比亚',
					'Finland': '芬兰',
					'Fiji': '斐',
					'Falkland Islands': '福克兰群岛',
					'France': '法国',
					'Gabon': '加蓬',
					'United Kingdom': '英国',
					'Georgia': '格鲁吉亚',
					'Ghana': '加纳',
					'Guinea': '几内亚',
					'Gambia': '冈比亚',
					'Guinea Bissau': '几内亚比绍',
					'Equatorial Guinea': '赤道几内亚',
					'Greece': '希腊',
					'Greenland': '格陵兰',
					'Guatemala': '危地马拉',
					'French Guiana': '法属圭亚那',
					'Guyana': '圭亚那',
					'Honduras': '洪都拉斯',
					'Croatia': '克罗地亚',
					'Haiti': '海地',
					'Hungary': '匈牙利',
					'Indonesia': '印尼',
					'India': '印度',
					'Ireland': '爱尔兰',
					'Iran': '伊朗',
					'Iraq': '伊拉克',
					'Iceland': '冰岛',
					'Israel': '以色列',
					'Italy': '意大利',
					'Jamaica': '牙买加',
					'Jordan': '约旦',
					'Japan': '日本',
					'Kazakhstan': '哈萨克斯坦',
					'Kenya': '肯尼亚',
					'Kyrgyzstan': '吉尔吉斯斯坦',
					'Cambodia': '柬埔寨',
					'South Korea': '韩国',
					'Kosovo': '科索沃',
					'Kuwait': '科威特',
					'Laos': '老挝',
					'Lebanon': '黎巴嫩',
					'Liberia': '利比里亚',
					'Libya': '利比亚',
					'Sri Lanka': '斯里兰卡',
					'Lesotho': '莱索托',
					'Lithuania': '立陶宛',
					'Luxembourg': '卢森堡',
					'Latvia': '拉脱维亚',
					'Morocco': '摩洛哥',
					'Moldova': '摩尔多瓦',
					'Madagascar': '马达加斯加',
					'Mexico': '墨西哥',
					'Macedonia': '马其顿',
					'Mali': '马里',
					'Myanmar': '缅甸',
					'Montenegro': '黑山',
					'Mongolia': '蒙古',
					'Mozambique': '莫桑比克',
					'Mauritania': '毛里塔尼亚',
					'Malawi': '马拉维',
					'Malaysia': '马来西亚',
					'Namibia': '纳米比亚',
					'New Caledonia': '新喀里多尼亚',
					'Niger': '尼日尔',
					'Nigeria': '尼日利亚',
					'Nicaragua': '尼加拉瓜',
					'Netherlands': '荷兰',
					'Norway': '挪威',
					'Nepal': '尼泊尔',
					'New Zealand': '新西兰',
					'Oman': '阿曼',
					'Pakistan': '巴基斯坦',
					'Panama': '巴拿马',
					'Peru': '秘鲁',
					'Philippines': '菲律宾',
					'Papua New Guinea': '巴布亚新几内亚',
					'Poland': '波兰',
					'Puerto Rico': '波多黎各',
					'North Korea': '北朝鲜',
					'Portugal': '葡萄牙',
					'Paraguay': '巴拉圭',
					'Qatar': '卡塔尔',
					'Romania': '罗马尼亚',
					'Russia': '俄罗斯',
					'Rwanda': '卢旺达',
					'Western Sahara': '西撒哈拉',
					'Saudi Arabia': '沙特阿拉伯',
					'Sudan': '苏丹',
					'South Sudan': '南苏丹',
					'Senegal': '塞内加尔',
					'Solomon Islands': '所罗门群岛',
					'Sierra Leone': '塞拉利昂',
					'El Salvador': '萨尔瓦多',
					'Somaliland': '索马里兰',
					'Somalia': '索马里',
					'Republic of Serbia': '塞尔维亚共和国',
					'Suriname': '苏里南',
					'Slovakia': '斯洛伐克',
					'Slovenia': '斯洛文尼亚',
					'Sweden': '瑞典',
					'Swaziland': '斯威士兰',
					'Syria': '叙利亚',
					'Chad': '乍得',
					'Togo': '多哥',
					'Thailand': '泰国',
					'Tajikistan': '塔吉克斯坦',
					'Turkmenistan': '土库曼斯坦',
					'East Timor': '东帝汶',
					'Trinidad and Tobago': '特里尼达和多巴哥',
					'Tunisia': '突尼斯',
					'Turkey': '土耳其',
					'United Republic of Tanzania': '坦桑尼亚联合共和国',
					'Uganda': '乌干达',
					'Ukraine': '乌克兰',
					'Uruguay': '乌拉圭',
					'United States of America': '美国',
					'Uzbekistan': '乌兹别克斯坦',
					'Venezuela': '委内瑞拉',
					'Vietnam': '越南',
					'Vanuatu': '瓦努阿图',
					'West Bank': '西岸',
					'Yemen': '也门',
					'South Africa': '南非',
					'Zambia': '赞比亚',
					'Zimbabwe': '津巴布韦'
				};
				var option = {
					tooltip: {
						trigger: 'item',
						formatter: '{b}'
					},
					geo: [{
						name: '世界地图',
						type: 'map',
						map: 'world',
						roam: true,
						selectedMode: 'single',
						label: {
							normal: {
								show: false,
								formatter: function(params) {
									return nameMap[params.name];
								}
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						itemStyle: {
							normal: {
								color: '#B6E9FC'
							},
							emphasis: {
								color: "#5ED0FB"
							},
						}

					}],
					series: [{
							type: 'effectScatter',
							effectType: 'ripple',
							coordinateSystem: 'geo',
							rippleEffect: {
								period: 4,
								scale: 2.5,
								brushType: 'stroke',
							},
							data: [{
								name:'中国'
							}]
						}

					]
				}

				details_middle_map.setOption(option)
			}

		},
		mounted() {
			this.attrack()
		}
	}
</script>

<style>
	.details_root {
		width: 94%;
		height: 750px;
		margin: 0 auto;
		background-color: #FFFFFF;
		padding: 5px;
	}
	
	.details_ID {
		width: 100%;
		height: 130px;
		padding: 0.5%;
		box-sizing: border-box;
	}
	
	.details_ID_title {
		width: 20%;
		height: 100%;
		background-color: #5ED0FB;
		color: #FFFFFF;
		font-size: 1.6rem;
		border-radius: 6px 0 0 6px;
		float: left;
	}
	
	.details_ID_title .iconstyle {
		width: 30%;
		height: 100%;
		display: block;
		float: left;
		text-align: center;
		line-height: 90px;
	}
	
	.details_root .textstyle {
		width: 62%;
		height: 100%;
		float: left;
	}
	
	.details_root .details_ID_title span {
		width: 100%;
		display: block;
		font-size: 1.2rem;
		margin-top: 5px;
		margin-bottom: 3px;
		margin-left: 30px;
	}
	
	.details_root .details_ID_title p {
		margin-top: 5px;
	}
	
	.details_root .details_ID .liststyle {
		width: 79.8%;
		height: 97.99%;
		float: left;
		border: 1px solid #5ED0FB;
		overflow: hidden;
	}
	
	.details_root .el-table .cell {
		background-color: rgba(255, 255, 255, 0.1);
		padding: 0;
		/*		color: #FC8675;*/
		text-align: center;
	}
	
	.details_root .el-table td .el-table th.is-leaf {
		border-bottom: 1px solid #5ED0FB;
	}
	
	.details_root .details_ID .el-table th {
		background-color: #B6E9FC;
	}
	
	.details_eventDetails {
		width: 100%;
		height: 30%;
		box-sizing: border-box;
		border-radius: 6px;
	}
	
	.details_root .details_ID .parent {
		width: 100%;
		height: 100px;
		box-sizing: border-box;
		margin-top: 10px;
	}
	
	.details_eventDetails_sensor {
		width: 100%;
		height: 42%;
		background-color: #5ED0FB;
		border-radius: 6px 6px 0 0;
		overflow: hidden;
	}
	
	.details_eventDetails_sensor_list {
		width: 100%;
		height: 58%;
	}
	
	.details_eventDetails_sensor_list .el-table td .el-table th.is-leaf {
		border-bottom: 1px solid #5ED0FB;
	}
	
	.details_eventDetails_sensor_list .el-table th {
		background-color: #AEE7FC;
	}
	
	.details_middle {
		width: 99%;
		height: 78%;
		padding: 0.5%;
		box-sizing: border-box;
		border: 1px solid #5ED0FB;
		margin: 0 auto;
	}
	
	.details_middle_left {
		width: 50%;
		height: 100%;
		border: 1px solid #5ED0FB;
		float: left;
		padding: 5px;
		box-sizing: border-box;
	}
	
	.details_middle_right {
		width: 49.9%;
		height: 100%;
		border: 1px solid #5ED0FB;
		float: left;
		padding: 5px;
		box-sizing: border-box;
	}
	
	.details_middle_right_keywords {
		width: 100%;
		height: 69%;
		border: 1px solid #5ED0FB;
		border-radius: 6px;
	}
	
	.details_middle_right_keywords_title {
		width: 100%;
		height: 10%;
		background-color: #5ED0FB;
		color: #FFFFFF;
		font-size: 1.6rem;
		text-align: center;
		line-height: 35px;
	}
	
	.details_middle_right_keywords_content {
		width: 100%;
		height: 90%;
	}
	
	.puliciconstyle {
		display: block;
		width: 30%;
		height: 100%;
		color: #FFFFFF;
		float: left;
		text-align: right;
		margin-top: 15px;
	}
	
	.pulictextstyle {
		width: 70%;
		height: 100%;
		color: #FFFFFF;
		float: left;
		font-size: 2rem;
		text-align: center;
		margin-top: 15px;
	}
	
	.goback {
		width: 100px;
		height: 20px;
		padding: 0.5%;
		background-color: #13CE66;
		color: #FFFFFF;
		font-size: 1.4rem;
		margin-left: 10px;
		border-radius: 6px;
		text-align: center;
	}
	
	a:link {
		color: #FFFFFF;
	}
</style>