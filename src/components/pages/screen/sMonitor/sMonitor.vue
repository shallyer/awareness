<template>
    <div class="sMonitor_root">
        <div class="sMonitor_root_Top">
            <div class="sMonitor_Top_top" style="width: 100%;height: 70%;">
                <div class="sMonitor-top-part1 " style="width: 100%;height: 49%;">
                    <div class="Top_echartFour parentboxstyle">
                        <p class="public_chart_p">攻击事件排行榜</p>
                        <div class="publicchart">
                            <div id="Top_echartFour_chart" style="width: 100%;height:100%;"></div>
                        </div>
                    </div>
                </div>
                <div class="sMonitor-top-part2" style="width: 100%;height: 49%; margin-top: 15px;">
                    <div class="Top_echartOne parentboxstyle">
                        <p class="public_chart_p">访问量Top5</p>
                        <div class="publicchart">
                            <div id="Top_echartOne_top" style="width: 100%;height: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="number">
                <p class="public_chart_p">统计信息</p>
                <div class="publicchart">
                    <ul>
                        <li><i class="el-icon-plus"></i>响应时间最小值:<span>{{minReplay}}</span></li>
                        <li><i class="el-icon-minus"></i>响应时间最大值:<span>{{maxReplay}}</span></li>
                        <li><i class="el-icon-information"></i>平均响应时间:<span>{{avgReplay}}</span></li>
                        <li><i class="el-icon-loading"></i>今日来访IP量：<span>{{todayInputIp}} </span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="chooseWorld" ondragover="drop(ev)">
            <button @click="togglechartWorld" id="togglechartWorld" class="buttonstyle">全世界国家访问源</button>
            <button @click="togglechartChina" id="togglechartChina" class="buttonstyle">全国城市访问源</button>
        </div>
        <div class="sMonitor_left">
            <div class="sMonitor_map">
                <div id="sMonitor_world" style="width:100%;height: 100%;"></div>
                <div id="sMonitor_china" style="width:100%;height: 100%;"></div>
            </div>
            <div class="sMonitor_map_bottom">
                <div class="bottom_left" style="height: 100%;">
                    <p class="public_chart_p">业务功能排行榜</p>
                    <div class="publicchart">
                        <ul>
                            <li v-for="item in tableData4">{{item.url+"访问"+item.time+"次"}}</li>
                        </ul>
                    </div>
                </div>
                <div class="real_time" style="height: 100%;">
                    <p class="public_chart_p">实时访问IP</p>
                    <div class="publicchart">
                        <ul class="worldInfor" v-if="toggle">
                            <li v-for="item in tableData">{{"From"+"&nbsp"+item.state+'&nbsp;&#58'+item.IP+"&nbsp;&nbsp;&nbsp"+item.time}}</li>
                        </ul>
                        <ul class="chinaInfor" v-if="!toggle">
                            <li v-for="item in tableData1">{{"来自"+"&nbsp"+item.city+'&nbsp;&#58'+item.IP+"&nbsp;&nbsp;&nbsp"+item.time}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="sMonitor_events">
            <div class="sMonitor_echarts_Box_btn">
                <button @click='Sizehour()'>日</button>
                <button @click='Sizeday()'>周</button>
                <button @click='Sizemonth()'>月</button>
            </div>
            <div id="sMonitor_events_top">
                <p class="public_chart_p2">IP访问量事件变化折线图</p>
                <div class="publicchart2">
                    <div id="sMonitor_event1" style="width: 100%;height: 100%;"></div>
                </div>
            </div>
            <div class="sMonitor_events_bottom">
                <p class="public_chart_p2">安全事件攻防一体分布图</p>
                <div class="publicchart2">
                    <div id="sMonitor_events_bottom_echart" style="width: 100%;height: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//   import common_tools from'../../../../public_resource/vendor/conmon_tools.js';
import world from '../../../../public_resource/vendor/world';
import china from '../../../../public_resource/vendor/china';
var common_tools = require("common_tools");
export default {
    data() {
            return {
                tableData4:[],
                minReplay: '',
                maxReplay: '',
                avgReplay: '',
                todayInputIp: '',
                toggle: true,
                sMonitor_event1: null,
                tableData: [{
                    state: 'USA',
                    IP: '34.45.56',
                    time: '2017/8/4'
                }, {
                    state: "England",
                    IP: "124.345.546",
                    time: '2017.8.12'
                }, {
                    state: "Australia",
                    IP: "34.345.546",
                    time: '2017.8.12'

                }, {
                    state: "Germany ",
                    IP: "139.345.546",
                    time: '2017.8.12'
                }],
                tableData1: [{
                    city: '上海',
                    IP: '3154.453.536',
                    time: '2017/8/4'
                }, {
                    city: '成都',
                    IP: '144.453.536',
                    time: '2017/8/4'
                }, {
                    city: '北京',
                    IP: '114.453.536',
                    time: '2017/8/4'
                }, {
                    city: '天津',
                    IP: '324.443.336',
                    time: '2017/8/4'
                }],
                tableData2: [{
                    fun: '未知',
                    URL: 'xxx',

                }, {
                    fun: '未知',
                    URL: 'xxx',

                }, {
                    fun: '未知',
                    URL: 'xxx',

                }, {
                    fun: '未知',
                    URL: 'xxx',

                }],
                tableData3: [{
                    name: '徐先生',
                    adress: '河北省',
                    date: '2017/7/12/16:12'
                }, {
                    name: '王先生',
                    adress: '山东省',
                    date: '2017/7/12/16:12'
                }, {
                    name: '张先生',
                    adress: '北京市',
                    date: '2017/7/12/16:12'
                }, {
                    name: '章女士',
                    adress: '天津市',
                    date: '2017/7/12/16:12'
                }],
                lineData:[]

            }
        },

        methods: {
            getDatainfo() {
                var _this=this;
                common_tools.AJAX('post', 'http://192.168.120.231:8080/flow/flowInputIpCount', {}, function(data) {
                    console.log(data.data.list);
                    _this.tableData4.push(data.data.list.map(function(item){
                        return item.name,
                              item.value
                          })
                       
                    ) ;
                    console.log(_this.tableData4);
                })
            },

            ActiveAttacks() {
                var _this = this;
                let Top_echartFour_chart = this.$echarts.init(document.getElementById('Top_echartFour_chart'));
                common_tools.AJAX('post', 'http://192.168.120.231:8080/business/classifyStatics', {
                    "top": '5'
                }, function(data) {
                    console.log(data.data)
                    Top_echartFour_chart.setOption({
                            animation: true,
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow',
                                    shadowStyle: {
                                        // color: 'rgba(255, 109, 0, 0.8)'
                                    }
                                }
                            },
                            grid: {
                                top: 30,
                                bottom: 10,
                                left: 150,
                                right: 15
                            },
                            xAxis: {
                                type: 'value',
                                position: 'bottom',
                                splitLine: {
                                    lineStyle: {
                                        type: 'solid',
                                        color: '#cfc3bd'

                                    }
                                },
                                nameTextStyle: {
                                    color: '#ffffff'
                                }
                            },
                            yAxis: {
                                splitNumber: 25,
                                type: 'category',
                                axisLine: {
                                    lineStyle: {
                                        type: 'solid',
                                    }
                                },
                                nameTextStyle: {
                                    color: '#ffffff'
                                },
                                axisLabel: {
                                    show: true,
                                    rotate: 0,
                                    textStyle: {
                                        color: '#ffffff'
                                    }
                                },
                                axisTick: {
                                    show: true
                                },
                                splitLine: {
                                    lineStyle: {
                                        type: 'solid',
                                        color: '#cfc3bd'
                                    }
                                },
                                data: data.data.list.map(function(item) {
                                    var name = item.name;
                                    return name;
                                })
                            },
                            series: [{
                                name: '攻击事件',
                                type: 'bar',
                                stack: '月份',
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: '#682d19'
                                        },
                                        position: 'left',
                                        show: false,
                                        formatter: '{b}'
                                    }
                                },
                                barCategoryGap: 0,
                                itemStyle: {
                                    normal: {
                                        color: new _this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: 'rgba(45, 171, 208, 0.3)'
                                        }, {
                                            offset: 0.5,
                                            color: 'rgba(45, 171, 208, 0.6)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(45, 171, 208, 0.6)'
                                        }, {
                                            offset: 0.92,
                                            color: 'rgba(45, 171, 208, 0.8)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(45, 171, 208, 0.9)'
                                        }])
                                    }
                                },
                                data: data.data.list
                            }, {
                                type: 'bar',
                                stack: '月份',
                                silent: true,

                                itemStyle: {
                                    normal: {
                                        color: '#ff5a00',
                                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                                        shadowBlur: 10,
                                        shadowOffsetX: -4
                                    }
                                },
                                barMinHeight: 4
                            }]
                        }


                    )
                })

            },
            topChart() {
                var _this = this;
                let Top_echartOne_top = this.$echarts.init(document.getElementById("Top_echartOne_top"));
                common_tools.AJAX('post', 'http://192.168.120.231:8080//flow/flowInputIpCount', {}, function(data) {
                    console.log(data.data)
                    Top_echartOne_top.setOption({
                        tooltip: {
                            trigger: "axis",
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: "shadow" // 默认为直线，可选为："line" | "shadow"
                            }
                        },
                        grid: {
                            left: "3%",
                            right: "10%",
                            bottom: "3%",
                            containLabel: true
                        },
                        yAxis: [{
                            type: "category",
                            data: data.data.list.map(function(item) {
                                var name = item.name;
                                return name
                            }),
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#ffb069"
                                }
                            }
                        }],
                        xAxis: [{
                            type: "value",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }],

                        series: [{
                            name: "IP访问量",
                            type: "bar",
                            data: data.data.list,
                            barCategoryGap: "35%",
                            itemStyle: {
                                normal: {
                                    color: new _this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "#ffb069" // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#ec2e85" // 100% 处的颜色
                                    }], false)
                                }
                            }
                        }]

                    })
                })

            },

            worldline() {
                let sMonitor_world = this.$echarts.init(document.getElementById("sMonitor_world"));
                var latlong = {};
                latlong.AD = {
                    'latitude': 42.5,
                    'longitude': 1.5
                };
                latlong.AE = {
                    'latitude': 24,
                    'longitude': 54
                };
                latlong.AF = {
                    'latitude': 33,
                    'longitude': 65

                };
                latlong.AG = {

                    'latitude': 17.05,
                    'longitude': -61.8
                };
                latlong.AI = {
                    'latitude': 18.15,
                    'longitude': -63.1667
                };
                latlong.AL = {
                    'latitude': 41,
                    'longitude': 20
                };
                latlong.AM = {
                    'latitude': 40,
                    'longitude': 45
                };
                latlong.AN = {
                    'latitude': 12.15,
                    'longitude': -68.75
                };
                latlong.AO = {
                    'latitude': -12.5,
                    'longitude': 18.5
                };
                latlong.AP = {
                    'latitude': 35,
                    'longitude': 105
                };
                latlong.AQ = {
                    'latitude': -90,
                    'longitude': 0
                };
                latlong.AR = {
                    'latitude': -34,
                    'longitude': -64
                };
                latlong.AS = {
                    'latitude': -14.3333,
                    'longitude': -170
                };
                latlong.AT = {
                    'latitude': 47.3333,
                    'longitude': 13.3333
                };
                latlong.AU = {
                    'latitude': -27,
                    'longitude': 133
                };
                latlong.AW = {
                    'latitude': 12.5,
                    'longitude': -69.9667
                };
                latlong.AZ = {
                    'latitude': 40.5,
                    'longitude': 47.5
                };
                latlong.BA = {
                    'latitude': 44,
                    'longitude': 18
                };
                latlong.BB = {
                    'latitude': 13.1667,
                    'longitude': -59.5333
                };
                latlong.BD = {
                    'latitude': 24,
                    'longitude': 90
                };
                latlong.BE = {
                    'latitude': 50.8333,
                    'longitude': 4
                };
                latlong.BF = {
                    'latitude': 13,
                    'longitude': -2
                };
                latlong.BG = {
                    'latitude': 43,
                    'longitude': 25
                };
                latlong.BH = {
                    'latitude': 26,
                    'longitude': 50.55
                };
                latlong.BI = {
                    'latitude': -3.5,
                    'longitude': 30
                };
                latlong.BJ = {
                    'latitude': 9.5,
                    'longitude': 2.15
                };
                latlong.BM = {
                    'latitude': 32.3333,
                    'longitude': -64.75
                };
                latlong.BN = {
                    'latitude': 4.5,
                    'longitude': 114.6667
                };
                latlong.BO = {
                    'latitude': -17,
                    'longitude': -65

                };
                latlong.BR = {
                    'latitude': -10,
                    'longitude': -55
                };
                latlong.BS = {
                    'latitude': 24.15,
                    'longitude': -76
                };
                latlong.BT = {
                    'latitude': 27.5,
                    'longitude': 90.5
                };
                latlong.BV = {
                    'latitude': -54.4333,
                    'longitude': 3.4
                };
                latlong.BW = {
                    'latitude': -22,
                    'longitude': 24
                };
                latlong.BY = {
                    'latitude': 53,
                    'longitude': 28
                };
                latlong.BZ = {
                    'latitude': 17.15,
                    'longitude': -88.75
                };
                latlong.CA = {
                    'latitude': 54,
                    'longitude': -100
                };
                latlong.CC = {
                    'latitude': -12.5,
                    'longitude': 96.8333
                };
                latlong.CD = {
                    'latitude': 0,
                    'longitude': 25
                };
                latlong.CF = {
                    'latitude': 7,
                    'longitude': 21
                };
                latlong.CG = {
                    'latitude': -1,
                    'longitude': 15
                };
                latlong.CH = {
                    'latitude': 47,
                    'longitude': 8
                };
                latlong.CI = {
                    'latitude': 8,
                    'longitude': -5
                };
                latlong.CK = {
                    'latitude': -21.1333,
                    'longitude': -159.7667
                };
                latlong.CL = {
                    'latitude': -30,
                    'longitude': -71
                };
                latlong.CM = {
                    'latitude': 6,
                    'longitude': 12
                };
                latlong.CN = {
                    'latitude': 35,
                    'longitude': 105
                };
                latlong.CO = {
                    'latitude': 4,
                    'longitude': -72
                };
                latlong.CR = {
                    'latitude': 10,
                    'longitude': -84
                };
                latlong.CU = {
                    'latitude': 21.5,
                    'longitude': -80
                };
                latlong.CV = {
                    'latitude': 16,
                    'longitude': -24
                };
                latlong.CX = {
                    'latitude': -10.5,
                    'longitude': 105.6667
                };
                latlong.CY = {
                    'latitude': 35,
                    'longitude': 33
                };
                latlong.CZ = {
                    'latitude': 49.75,
                    'longitude': 15.5
                };
                latlong.DE = {
                    'latitude': 51,
                    'longitude': 9
                };
                latlong.DJ = {
                    'latitude': 11.5,
                    'longitude': 43
                };
                latlong.DK = {
                    'latitude': 56,
                    'longitude': 10
                };
                latlong.DM = {
                    'latitude': 15.4167,
                    'longitude': -61.3333
                };
                latlong.DO = {
                    'latitude': 19,
                    'longitude': -70.6667
                };
                latlong.DZ = {
                    'latitude': 28,
                    'longitude': 3
                };
                latlong.EC = {
                    'latitude': -2,
                    'longitude': -77.5
                };
                latlong.EE = {
                    'latitude': 59,
                    'longitude': 26
                };
                latlong.EG = {
                    'latitude': 27,
                    'longitude': 30
                };
                latlong.EH = {
                    'latitude': 24.5,
                    'longitude': -13
                };
                latlong.ER = {
                    'latitude': 15,
                    'longitude': 39
                };
                latlong.ES = {
                    'latitude': 40,
                    'longitude': -4
                };
                latlong.ET = {
                    'latitude': 8,
                    'longitude': 38
                };
                latlong.EU = {
                    'latitude': 47,
                    'longitude': 8
                };
                latlong.FI = {
                    'latitude': 62,
                    'longitude': 26
                };
                latlong.FJ = {
                    'latitude': -18,
                    'longitude': 175
                };
                latlong.FK = {
                    'latitude': -51.75,
                    'longitude': -59
                };
                latlong.FM = {
                    'latitude': 6.9167,
                    'longitude': 158.15
                };
                latlong.FO = {
                    'latitude': 62,
                    'longitude': -7
                };
                latlong.FR = {
                    'latitude': 46,
                    'longitude': 2
                };
                latlong.GA = {
                    'latitude': -1,
                    'longitude': 11.75
                };
                latlong.GB = {
                    'latitude': 54,
                    'longitude': -2
                };
                latlong.GD = {
                    'latitude': 12.1167,
                    'longitude': -61.6667
                };
                latlong.GE = {
                    'latitude': 42,
                    'longitude': 43.5
                };
                latlong.GF = {
                    'latitude': 4,
                    'longitude': -53
                };
                latlong.GH = {
                    'latitude': 8,
                    'longitude': -2
                };
                latlong.GI = {
                    'latitude': 36.1833,
                    'longitude': -5.3667
                };
                latlong.GL = {
                    'latitude': 72,
                    'longitude': -40
                };
                latlong.GM = {
                    'latitude': 13.4667,
                    'longitude': -16.5667
                };
                latlong.GN = {
                    'latitude': 11,
                    'longitude': -10
                };
                latlong.GP = {
                    'latitude': 16.15,
                    'longitude': -61.5833
                };
                latlong.GQ = {
                    'latitude': 2,
                    'longitude': 10
                };
                latlong.GR = {
                    'latitude': 39,
                    'longitude': 22
                };
                latlong.GS = {
                    'latitude': -54.5,
                    'longitude': -37
                };
                latlong.GT = {
                    'latitude': 15.5,
                    'longitude': -90.15
                };
                latlong.GU = {
                    'latitude': 13.4667,
                    'longitude': 144.7833
                };
                latlong.GW = {
                    'latitude': 12,
                    'longitude': -15
                };
                latlong.GY = {
                    'latitude': 5,
                    'longitude': -59
                };
                latlong.HK = {
                    'latitude': 22.15,
                    'longitude': 114.1667
                };
                latlong.HM = {
                    'latitude': -53.1,
                    'longitude': 72.5167
                };
                latlong.HN = {
                    'latitude': 15,
                    'longitude': -86.5
                };
                latlong.HR = {
                    'latitude': 45.1667,
                    'longitude': 15.5
                };
                latlong.HT = {
                    'latitude': 19,
                    'longitude': -72.4167
                };
                latlong.HU = {
                    'latitude': 47,
                    'longitude': 20
                };
                latlong.ID = {
                    'latitude': -5,
                    'longitude': 120
                };
                latlong.IE = {
                    'latitude': 53,
                    'longitude': -8
                };
                latlong.IL = {
                    'latitude': 31.5,
                    'longitude': 34.75
                };
                latlong.IN = {
                    'latitude': 20,
                    'longitude': 77
                };
                latlong.IO = {
                    'latitude': -6,
                    'longitude': 71.5
                };
                latlong.IQ = {
                    'latitude': 33,
                    'longitude': 44
                };
                latlong.IR = {
                    'latitude': 32,
                    'longitude': 53
                };
                latlong.IS = {
                    'latitude': 65,
                    'longitude': -18
                };
                latlong.IT = {
                    'latitude': 42.8333,
                    'longitude': 12.8333
                };
                latlong.JM = {
                    'latitude': 18.15,
                    'longitude': -77.5
                };
                latlong.JO = {
                    'latitude': 31,
                    'longitude': 36
                };
                latlong.JP = {
                    'latitude': 36,
                    'longitude': 138
                };
                latlong.KE = {
                    'latitude': 1,
                    'longitude': 38
                };
                latlong.KG = {
                    'latitude': 41,
                    'longitude': 75
                };
                latlong.KH = {
                    'latitude': 13,
                    'longitude': 105
                };
                latlong.KI = {
                    'latitude': 1.4167,
                    'longitude': 173
                };
                latlong.KM = {
                    'latitude': -12.1667,
                    'longitude': 44.15
                };
                latlong.KN = {
                    'latitude': 17.3333,
                    'longitude': -62.75
                };
                latlong.KP = {
                    'latitude': 40,
                    'longitude': 127
                };
                latlong.KR = {
                    'latitude': 37,
                    'longitude': 127.5
                };
                latlong.KW = {
                    'latitude': 29.3375,
                    'longitude': 47.6581
                };
                latlong.KY = {
                    'latitude': 19.5,
                    'longitude': -80.5
                };
                latlong.KZ = {
                    'latitude': 48,
                    'longitude': 68
                };
                latlong.LA = {
                    'latitude': 18,
                    'longitude': 105
                };
                latlong.LB = {
                    'latitude': 33.8333,
                    'longitude': 35.8333
                };
                latlong.LC = {
                    'latitude': 13.8833,
                    'longitude': -61.1333
                };
                latlong.LI = {
                    'latitude': 47.1667,
                    'longitude': 9.5333
                };
                latlong.LK = {
                    'latitude': 7,
                    'longitude': 81
                };
                latlong.LR = {
                    'latitude': 6.5,
                    'longitude': -9.5
                };
                latlong.LS = {
                    'latitude': -29.5,
                    'longitude': 28.5
                };
                latlong.LT = {
                    'latitude': 55,
                    'longitude': 24
                };
                latlong.LU = {
                    'latitude': 49.75,
                    'longitude': 6
                };
                latlong.LV = {
                    'latitude': 57,
                    'longitude': 25
                };
                latlong.LY = {
                    'latitude': 25,
                    'longitude': 17
                };
                latlong.MA = {
                    'latitude': 32,
                    'longitude': -5
                };
                latlong.MC = {
                    'latitude': 43.7333,
                    'longitude': 7.4
                };
                latlong.MD = {
                    'latitude': 47,
                    'longitude': 29
                };
                latlong.ME = {
                    'latitude': 42.5,
                    'longitude': 19.4
                };
                latlong.MG = {
                    'latitude': -20,
                    'longitude': 47
                };
                latlong.MH = {
                    'latitude': 9,
                    'longitude': 168
                };
                latlong.MK = {
                    'latitude': 41.8333,
                    'longitude': 22
                };
                latlong.ML = {
                    'latitude': 17,
                    'longitude': -4
                };
                latlong.MM = {
                    'latitude': 22,
                    'longitude': 98
                };
                latlong.MN = {
                    'latitude': 46,
                    'longitude': 105
                };
                latlong.MO = {
                    'latitude': 22.1667,
                    'longitude': 113.55
                };
                latlong.MP = {
                    'latitude': 15.1,
                    'longitude': 145.75
                };
                latlong.MQ = {
                    'latitude': 14.6667,
                    'longitude': -61
                };
                latlong.MR = {
                    'latitude': 20,
                    'longitude': -12
                };
                latlong.MS = {
                    'latitude': 16.75,
                    'longitude': -62.1
                };
                latlong.MT = {
                    'latitude': 35.8333,
                    'longitude': 14.5833
                };
                latlong.MU = {
                    'latitude': -20.1833,
                    'longitude': 57.55
                };
                latlong.MV = {
                    'latitude': 3.15,
                    'longitude': 73
                };
                latlong.MW = {
                    'latitude': -13.5,
                    'longitude': 34
                };
                latlong.MX = {
                    'latitude': 23,
                    'longitude': -102
                };
                latlong.MY = {
                    'latitude': 2.5,
                    'longitude': 112.5
                };
                latlong.MZ = {
                    'latitude': -18.15,
                    'longitude': 35
                };
                latlong.NA = {
                    'latitude': -22,
                    'longitude': 17
                };
                latlong.NC = {
                    'latitude': -21.5,
                    'longitude': 165.5
                };
                latlong.NE = {
                    'latitude': 16,
                    'longitude': 8
                };
                latlong.NF = {
                    'latitude': -29.0333,
                    'longitude': 167.95
                };
                latlong.NG = {
                    'latitude': 10,
                    'longitude': 8
                };
                latlong.NI = {
                    'latitude': 13,
                    'longitude': -85
                };
                latlong.NL = {
                    'latitude': 52.5,
                    'longitude': 5.75
                };
                latlong.NO = {
                    'latitude': 62,
                    'longitude': 10
                };
                latlong.NP = {
                    'latitude': 28,
                    'longitude': 84
                };
                latlong.NR = {
                    'latitude': -0.5333,
                    'longitude': 166.9167
                };
                latlong.NU = {
                    'latitude': -19.0333,
                    'longitude': -169.8667
                };
                latlong.NZ = {
                    'latitude': -41,
                    'longitude': 174
                };
                latlong.OM = {
                    'latitude': 21,
                    'longitude': 57
                };
                latlong.PA = {
                    'latitude': 9,
                    'longitude': -80
                };
                latlong.PE = {
                    'latitude': -10,
                    'longitude': -76
                };
                latlong.PF = {
                    'latitude': -15,
                    'longitude': -140
                };
                latlong.PG = {
                    'latitude': -6,
                    'longitude': 147
                };
                latlong.PH = {
                    'latitude': 13,
                    'longitude': 122
                };
                latlong.PK = {
                    'latitude': 30,
                    'longitude': 70
                };
                latlong.PL = {
                    'latitude': 52,
                    'longitude': 20
                };
                latlong.PM = {
                    'latitude': 46.8333,
                    'longitude': -56.3333
                };
                latlong.PR = {
                    'latitude': 18.15,
                    'longitude': -66.5
                };
                latlong.PS = {
                    'latitude': 32,
                    'longitude': 35.15
                };
                latlong.PT = {
                    'latitude': 39.5,
                    'longitude': -8
                };
                latlong.PW = {
                    'latitude': 7.5,
                    'longitude': 134.5
                };
                latlong.PY = {
                    'latitude': -23,
                    'longitude': -58
                };
                latlong.QA = {
                    'latitude': 25.5,
                    'longitude': 51.15
                };
                latlong.RE = {
                    'latitude': -21.1,
                    'longitude': 55.6
                };
                latlong.RO = {
                    'latitude': 46,
                    'longitude': 25
                };
                latlong.RS = {
                    'latitude': 44,
                    'longitude': 21
                };
                latlong.RU = {
                    'latitude': 60,
                    'longitude': 100
                };
                latlong.RW = {
                    'latitude': -2,
                    'longitude': 30
                };
                latlong.SA = {
                    'latitude': 25,
                    'longitude': 45
                };
                latlong.SB = {
                    'latitude': -8,
                    'longitude': 159
                };
                latlong.SC = {
                    'latitude': -4.5833,
                    'longitude': 55.6667
                };
                latlong.SD = {
                    'latitude': 15,
                    'longitude': 30
                };
                latlong.SE = {
                    'latitude': 62,
                    'longitude': 15
                };
                latlong.SG = {
                    'latitude': 1.3667,
                    'longitude': 103.8
                };
                latlong.SH = {
                    'latitude': -15.9333,
                    'longitude': -5.7
                };
                latlong.SI = {
                    'latitude': 46,
                    'longitude': 15
                };
                latlong.SJ = {
                    'latitude': 78,
                    'longitude': 20
                };
                latlong.SK = {
                    'latitude': 48.6667,
                    'longitude': 19.5
                };
                latlong.SL = {
                    'latitude': 8.5,
                    'longitude': -11.5
                };
                latlong.SM = {
                    'latitude': 43.7667,
                    'longitude': 12.4167
                };
                latlong.SN = {
                    'latitude': 14,
                    'longitude': -14
                };
                latlong.SO = {
                    'latitude': 10,
                    'longitude': 49
                };
                latlong.SR = {
                    'latitude': 4,
                    'longitude': -56
                };
                latlong.ST = {
                    'latitude': 1,
                    'longitude': 7
                };
                latlong.SV = {
                    'latitude': 13.8333,
                    'longitude': -88.9167
                };
                latlong.SY = {
                    'latitude': 35,
                    'longitude': 38
                };
                latlong.SZ = {
                    'latitude': -26.5,
                    'longitude': 31.5
                };
                latlong.TC = {
                    'latitude': 21.75,
                    'longitude': -71.5833
                };
                latlong.TD = {
                    'latitude': 15,
                    'longitude': 19
                };
                latlong.TF = {
                    'latitude': -43,
                    'longitude': 67
                };
                latlong.TG = {
                    'latitude': 8,
                    'longitude': 1.1667
                };
                latlong.TH = {
                    'latitude': 15,
                    'longitude': 100
                };
                latlong.TJ = {
                    'latitude': 39,
                    'longitude': 71
                };
                latlong.TK = {
                    'latitude': -9,
                    'longitude': -172
                };
                latlong.TM = {
                    'latitude': 40,
                    'longitude': 60
                };
                latlong.TN = {
                    'latitude': 34,
                    'longitude': 9
                };
                latlong.TO = {
                    'latitude': -20,
                    'longitude': -175
                };
                latlong.TR = {
                    'latitude': 39,
                    'longitude': 35
                };
                latlong.TT = {
                    'latitude': 11,
                    'longitude': -61
                };
                latlong.TV = {
                    'latitude': -8,
                    'longitude': 178
                };
                latlong.TW = {
                    'latitude': 23.5,
                    'longitude': 121
                };
                latlong.TZ = {
                    'latitude': -6,
                    'longitude': 35
                };
                latlong.UA = {
                    'latitude': 49,
                    'longitude': 32
                };
                latlong.UG = {
                    'latitude': 1,
                    'longitude': 32
                };
                latlong.UM = {
                    'latitude': 19.1833,
                    'longitude': 166.6
                };
                latlong.US = {
                    'latitude': 38,
                    'longitude': -97
                };
                latlong.UY = {
                    'latitude': -33,
                    'longitude': -56
                };
                latlong.UZ = {
                    'latitude': 41,
                    'longitude': 64
                };
                latlong.VA = {
                    'latitude': 41.9,
                    'longitude': 12.45
                };
                latlong.VC = {
                    'latitude': 13.15,
                    'longitude': -61.1
                };
                latlong.VE = {
                    'latitude': 8,
                    'longitude': -66
                };
                latlong.VG = {
                    'latitude': 18.5,
                    'longitude': -64.5
                };
                latlong.VI = {
                    'latitude': 18.3333,
                    'longitude': -64.8333
                };
                latlong.VN = {
                    'latitude': 16,
                    'longitude': 106
                };
                latlong.VU = {
                    'latitude': -16,
                    'longitude': 167
                };
                latlong.WF = {
                    'latitude': -13.3,
                    'longitude': -176.1
                };
                latlong.WS = {
                    'latitude': -13.5833,
                    'longitude': -172.3333
                };
                latlong.YE = {
                    'latitude': 15,
                    'longitude': 48
                };
                latlong.YT = {
                    'latitude': -12.8333,
                    'longitude': 45.1667
                };
                latlong.ZA = {
                    'latitude': -29,
                    'longitude': 24
                };
                latlong.ZM = {
                    'latitude': -15,
                    'longitude': 30
                };
                latlong.ZW = {
                    'latitude': -20,
                    'longitude': 30
                };

                var mapData = [{
                        'code': 'AF',
                        'name': 'Afghanistan',
                        'value': 3235826,
                        'color': '#eea638'
                    }, {
                        'code': 'AL',
                        'name': 'Albania',
                        'value': 3215988,
                        'color': '#d8854f'
                    }, {
                        'code': 'DZ',
                        'name': 'Algeria',
                        'value': 3598019,
                        'color': '#de4c4f'
                    }, {
                        'code': 'AO',
                        'name': 'Angola',
                        'value': 1961843,
                        'color': '#de4c4f'
                    }, {
                        'code': 'AR',
                        'name': 'Argentina',
                        'value': 4076456,
                        'color': '#86a965'
                    }, {
                        'code': 'AM',
                        'name': 'Armenia',
                        'value': 3100236,
                        'color': '#d8854f'
                    }, {
                        'code': 'AU',
                        'name': 'Australia',
                        'value': 2260573,
                        'color': '#8aabb0'
                    }, {
                        'code': 'AT',
                        'name': 'Austria',
                        'value': 8413429,
                        'color': '#d8854f'
                    }, {
                        'code': 'AZ',
                        'name': 'Azerbaijan',
                        'value': 9306023,
                        'color': '#d8854f'
                    }, {
                        'code': 'BH',
                        'name': 'Bahrain',
                        'value': 1323535,
                        'color': '#eea638'
                    }, {
                        'code': 'BD',
                        'name': 'Bangladesh',
                        'value': 1504936,
                        'color': '#eea638'
                    }, {
                        'code': 'BY',
                        'name': 'Belarus',
                        'value': 9559441,
                        'color': '#d8854f'
                    }, {
                        'code': 'BE',
                        'name': 'Belgium',
                        'value': 10754056,
                        'color': '#d8854f'
                    }, {
                        'code': 'BJ',
                        'name': 'Benin',
                        'value': 9099922,
                        'color': '#de4c4f'
                    }, {
                        'code': 'BT',
                        'name': 'Bhutan',
                        'value': 738267,
                        'color': '#eea638'
                    }, {
                        'code': 'BO',
                        'name': 'Bolivia',
                        'value': 100881,
                        'color': '#86a965'
                    }, {
                        'code': 'BA',
                        'name': 'Bosnia and Herzegovina',
                        'value': 3752228,
                        'color': '#d8854f'
                    }, {
                        'code': 'BW',
                        'name': 'Botswana',
                        'value': 2030738,
                        'color': '#de4c4f'
                    }, {
                        'code': 'BR',
                        'name': 'Brazil',
                        'value': 1966550,
                        'color': '#86a965'
                    }, {
                        'code': 'BN',
                        'name': 'Brunei',
                        'value': 405938,
                        'color': '#eea638'
                    }, {
                        'code': 'BG',
                        'name': 'Bulgaria',
                        'value': 7446135,
                        'color': '#d8854f'
                    }, {
                        'code': 'BF',
                        'name': 'Burkina Faso',
                        'value': 16967845,
                        'color': '#de4c4f'
                    }, {
                        'code': 'BI',
                        'name': 'Burundi',
                        'value': 8575172,
                        'color': '#de4c4f'
                    }, {
                        'code': 'KH',
                        'name': 'Cambodia',
                        'value': 14305183,
                        'color': '#eea638'
                    }, {
                        'code': 'CM',
                        'name': 'Cameroon',
                        'value': 20030362,
                        'color': '#de4c4f'
                    }, {
                        'code': 'CA',
                        'name': 'Canada',
                        'value': 34349561,
                        'color': '#a7a737'
                    }, {
                        'code': 'CV',
                        'name': 'Cape Verde',
                        'value': 5005854,
                        'color': '#de4c4f'
                    }, {
                        'code': 'CF',
                        'name': 'Central African Rep.',
                        'value': 4486837,
                        'color': '#de4c4f'
                    }, {
                        'code': 'TD',
                        'name': 'Chad',
                        'value': 1152549,
                        'color': '#de4c4f'
                    }, {
                        'code': 'CL',
                        'name': 'Chile',
                        'value': 1726952,
                        'color': '#86a965'
                    }, {
                        'code': 'CN',
                        'name': 'China',
                        'value': 1347565,
                        'color': '#eea638'
                    }, {
                        'code': 'CO',
                        'name': 'Colombia',
                        'value': 46927125,
                        'color': '#86a965'
                    }, {
                        'code': 'KM',
                        'name': 'Comoros',
                        'value': 7539441,
                        'color': '#de4c4f'
                    }, {
                        'code': 'CD',
                        'name': 'Congo, Dem. Rep.',
                        'value': 6775757,
                        'color': '#de4c4f'
                    }, {
                        'code': 'CG',
                        'name': 'Congo, Rep.',
                        'value': 4139748,
                        'color': '#de4c4f'
                    }, {
                        'code': 'CR',
                        'name': 'Costa Rica',
                        'value': 4726575,
                        'color': '#a7a737'
                    }, {
                        'code': 'CI',
                        'name': 'Cote d\'Ivoire',
                        'value': 20152894,
                        'color': '#de4c4f'
                    }, {
                        'code': 'HR',
                        'name': 'Croatia',
                        'value': 4395560,
                        'color': '#d8854f'
                    }, {
                        'code': 'CU',
                        'name': 'Cuba',
                        'value': 1125366,
                        'color': '#a7a737'
                    }, {
                        'code': 'CY',
                        'name': 'Cyprus',
                        'value': 1116564,
                        'color': '#d8854f'
                    }, {
                        'code': 'CZ',
                        'name': 'Czech Rep.',
                        'value': 10534293,
                        'color': '#d8854f'
                    }, {
                        'code': 'DK',
                        'name': 'Denmark',
                        'value': 5572594,
                        'color': '#d8854f'
                    }, {
                        'code': 'DJ',
                        'name': 'Djibouti',
                        'value': 905564,
                        'color': '#de4c4f'
                    },

                    {
                        'code': 'IL',
                        'name': 'Israel',
                        'value': 7562194,
                        'color': '#eea638'
                    }, {
                        'code': 'IT',
                        'name': 'Italy',
                        'value': 60788694,
                        'color': '#d8854f'
                    }, {
                        'code': 'JM',
                        'name': 'Jamaica',
                        'value': 2751273,
                        'color': '#a7a737'
                    }, {
                        'code': 'JP',
                        'name': 'Japan',
                        'value': 1264972,
                        'color': '#eea638'
                    }, {
                        'code': 'JO',
                        'name': 'Jordan',
                        'value': 6330169,
                        'color': '#eea638'
                    }, {
                        'code': 'KZ',
                        'name': 'Kazakhstan',
                        'value': 16206750,
                        'color': '#eea638'
                    }, {
                        'code': 'KE',
                        'name': 'Kenya',
                        'value': 41609728,
                        'color': '#de4c4f'
                    }, {
                        'code': 'KP',
                        'name': 'Korea, Dem. Rep.',
                        'value': 24451285,
                        'color': '#eea638'
                    },

                    {
                        'code': 'ZM',
                        'name': 'Zambia',
                        'value': 13474959,
                        'color': '#de4c4f'
                    }, {
                        'code': 'ZW',
                        'name': 'Zimbabwe',
                        'value': 12754378,
                        'color': '#de4c4f'
                    }
                ];

                var max = -Infinity;
                var min = Infinity;
                mapData.forEach(function(itemOpt) {
                    if (itemOpt.value > max) {
                        max = itemOpt.value;
                    }
                    if (itemOpt.value < min) {
                        min = itemOpt.value;
                    }
                });

                sMonitor_world.setOption({

                    tooltip: {

                        trigger: 'item',
                        formatter: function(params) {
                            var value = (params.value + '').split('.');
                            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') +
                                '.' + value[1];
                            return params.seriesName + '<br/>' + params.name + ' : ' + value;
                        }
                    },
                    visualMap: {
                        show: false,
                        min: 0,
                        max: max,
                        inRange: {
                            symbolSize: [2, 15]
                        }
                    },
                    geo: {
                        left: '5%',
                        right: '5%',
                        name: 'World',
                        type: 'map',
                        map: 'world',
                        roam: true,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0,0.8)',
                                areaColor: "#004571",
                                borderColor: "#6AC6E6"
                            },
                            emphasis: {
                                areaColor: "#00385E"
                            }
                        }
                    },
                    series: [{
                        type: 'effectScatter',
                        effectType: 'ripple',
                        coordinateSystem: 'geo',
                        rippleEffect: {
                            period: 4,
                            scale: 2.5,
                            brushType: 'stroke',
                        },
                        data: mapData.map(function(itemOpt) {
                            return {
                                name: itemOpt.name,
                                value: [
                                    latlong[itemOpt.code].longitude,

                                    latlong[itemOpt.code].latitude,
                                    itemOpt.value
                                ],
                                label: {
                                    emphasis: {
                                        position: 'right',
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: itemOpt.color
                                    }
                                }
                            };
                        })
                    }]

                })

            },

            chinaline() {
                let sMonitor_china = this.$echarts.init(document.getElementById("sMonitor_china"));
                var geoCoordMap = {
                    '合肥': [117.17, 31.52],
                    '安庆': [117.02, 30.31],
                    '蚌埠': [117.21, 32.56],
                    '亳州': [115.47, 33.52],
                    '巢湖': [117.52, 31.36],
                    '滁州': [118.18, 32.18],
                    '阜阳': [115.48, 32.54],
                    '贵池': [117.28, 30.39],
                    '淮北': [116.47, 33.57],
                    '淮南': [116.58, 32.37],
                    '黄山': [118.18, 29.43],
                    '界首': [115.21, 33.15],
                    '六安': [116.28, 31.44],
                    '马鞍山': [118.28, 31.43],
                    '明光': [117.58, 32.47],
                    '宿州': [116.58, 33.38],
                    '天长': [118.59, 32.41],
                    '铜陵': [117.48, 30.56],
                    '芜湖': [118.22, 31.19],
                    '宣州': [118.44, 30.57],
                    '澳门': [115.07, 21.33],
                    '北京': [116.24, 39.55],
                    '福州': [119.18, 26.05],
                    '长乐': [119.31, 25.58],
                    '福安': [119.39, 27.06],
                    '福清': [119.23, 25.42],
                    '建瓯': [118.2, 27.03],
                    '建阳': [118.07, 27.21],
                    '晋江': [118.35, 24.49],
                    '龙海': [117.48, 24.26],
                    '龙岩': [117.01, 25.06],
                    '南安': [118.23, 24.57],
                    '南平': [118.1, 26.38],
                    '宁德': [119.31, 26.39],
                    '莆田': [119.01, 24.26],
                    '泉州': [118.36, 24.56],
                    '三明': [117.36, 26.13],
                    '邵武': [117.29, 27.2],
                    '石狮': [118.38, 24.44],
                    '武夷山': [118.02, 27.46],
                    '厦门': [118.06, 24.27],
                    '永安': [117.23, 25.58],
                    '漳平': [117.24, 25.17],
                    '漳州': [117.39, 24.31],
                    '兰州': [103.51, 36.04],
                    '白银': [104.12, 36.33],
                    '敦煌': [94.41, 40.08],
                    '嘉峪关': [98.14, 39.48],
                    '金昌': [102.1, 38.28],
                    '酒泉': [98.31, 39.44],
                    '临夏': [103.12, 35.37],
                    '平凉': [106.4, 35.32],
                    '天水': [105.42, 34.37],
                    '武威': [102.39, 37.56],
                    '西峰': [107.4, 35.45],
                    '玉门': [97.35, 39.49],
                    '张掖': [100.26, 38.56],
                    '广州': [113.14, 23.08],
                    '潮阳': [116.36, 23.16],
                    '潮州': [116.38, 23.4],
                    '澄海': [116.46, 23.28],
                    '从化': [113.33, 23.33],
                    '东莞': [113.45, 23.02],
                    '恩平': [112.19, 22.12],
                    '佛山': [113.06, 23.02],
                    '高明': [112.5, 22.53],
                    '高要': [112.26, 23.02],
                    '高州': [110.5, 21.54],
                    '鹤山': [112.57, 22.46],
                    '河源': [114.41, 23.43],
                    '花都': [113.12, 23.23],
                    '化州': [110.37, 21.39],
                    '惠阳': [114.28, 22.48],
                    '惠州': [114.22, 23.05],
                    '江门': [113.04, 22.35],
                    '揭阳': [116.21, 22.32],
                    '开平': [112.4, 22.22],
                    '乐昌': [113.21, 25.09],
                    '雷州': [110.04, 20.54],
                    '廉江': [110.17, 21.37],
                    '连州': [112.23, 24.48],
                    '罗定': [111.33, 22.46],
                    '茂名': [110.53, 21.4],
                    '梅州': [116.07, 24.19],
                    '南海': [113.09, 23.01],
                    '番禺': [113.22, 22.57],
                    '普宁': [116.1, 23.18],
                    '清远': [113.01, 23.42],
                    '三水': [112.52, 23.1],
                    '汕头': [116.41, 23.22],
                    '汕尾': [115.21, 22.47],
                    '韶关': [113.37, 24.48],
                    '深圳': [114.07, 22.33],
                    '顺德': [113.15, 22.5],
                    '四会': [112.41, 23.21],
                    '台山': [112.48, 22.15],
                    '吴川': [110.47, 21.26],
                    '新会': [113.01, 22.32],
                    '兴宁': [115.43, 24.09],
                    '阳春': [111.48, 22.1],
                    '阳江': [111.58, 21.5],
                    '英德': [113.22, 24.1],
                    '云浮': [112.02, 22.57],
                    '增城': [113.49, 23.18],
                    '湛江': [110.24, 21.11],
                    '肇庆': [112.27, 23.03],
                    '中山': [113.22, 22.31],
                    '珠海': [113.34, 22.17],
                    '南宁': [108.19, 22.48],
                    '北海': [109.07, 21.28],
                    '北流': [110.21, 22.42],
                    '百色': [106.36, 23.54],
                    '防城港': [108.2, 21.37],
                    '贵港': [109.36, 23.06],
                    '桂林': [110.17, 25.17],
                    '桂平': [110.04, 23.22],
                    '河池': [108.03, 24.42],
                    '合山': [108.52, 23.47],
                    '柳州': [109.24, 23.19],
                    '赁祥': [106.44, 22.07],
                    '钦州': [108.37, 21.57],
                    '梧州': [111.2, 23.29],
                    '玉林': [110.09, 22.38],
                    '宜州': [108.4, 24.28],
                    '贵阳': [106.42, 26.35],
                    '安顺': [105.55, 26.14],
                    '毕节': [105.18, 27.18],
                    '赤水': [105.42, 28.34],
                    '都匀': [107.31, 26.15],
                    '凯里': [107.58, 26.35],
                    '六盘水': [104.5, 26.35],
                    '清镇': [106.27, 26.33],
                    '铜仁': [109.12, 27.43],
                    '兴义': [104.53, 25.05],
                    '遵义': [106.55, 27.42],
                    '海口': [110.2, 20.02],
                    '儋州': [109.34, 19.31],
                    '琼海': [110.28, 19.14],
                    '琼山': [110.21, 19.59],
                    '三亚': [109.31, 18.14],
                    '通什': [109.31, 18.46],
                    '石家庄': [114.3, 38.02],
                    '安国': [115.2, 38.24],
                    '保定': [115.3, 38.51],
                    '霸州': [116.24, 39.06],
                    '泊头': [116.34, 38.04],
                    '沧州': [116.52, 38.18],
                    '承德': [117.57, 40.59],
                    '定州': [115, 38.3],
                    '丰南': [118.06, 39.34],
                    '高碑店': [115.51, 39.2],
                    '蒿城': [114.5, 38.02],
                    '邯郸': [114.28, 36.36],
                    '河间': [116.05, 38.26],
                    '衡水': [115.42, 37.44],
                    '黄骅': [117.21, 38.21],
                    '晋州': [115.02, 38.02],
                    '冀州': [115.33, 37.34],
                    '廓坊': [116.42, 39.31],
                    '鹿泉': [114.19, 38.04],
                    '南宫': [115.23, 37.22],
                    '秦皇岛': [119.35, 39.55],
                    '任丘': [116.07, 38.42],
                    '三河': [117.04, 39.58],
                    '沙河': [114.3, 36.51],
                    '深州': [115.32, 38.01],
                    '唐山': [118.11, 39.36],
                    '武安': [114.11, 36.42],
                    '邢台': [114.3, 37.04],
                    '辛集': [115.12, 37.54],
                    '新乐': [114.41, 38.2],
                    '张家口': [114.53, 40.48],
                    '涿州': [115.59, 39.29],
                    '遵化': [117.58, 40.11],
                    '郑州': [11340, 34.46],
                    '安阳': [114.21, 36.06],
                    '长葛': [113.47, 34.12],
                    '登封': [113.02, 34.27],
                    '邓州': [112.05, 32.42],
                    '巩义': [112.58, 34.46],
                    '鹤壁': [114.11, 35.54],
                    '辉县': [113.47, 35.27],
                    '焦作': [113.12, 35.14],
                    '济源': [112.35, 35.04],
                    '开封': [114.21, 34.47],
                    '灵宝': [110.52, 34.31],
                    '林州': [113.49, 36.03],
                    '漯河': [114.02, 33.33],
                    '洛阳': [112.27, 34.41],
                    '南阳': [112.32, 33],
                    '平顶山': [113.17, 33.44],
                    '濮阳': [115.01, 35.44],
                    '沁阳': [112.57, 35.05],
                    '汝州': [112.5, 34.09],
                    '三门峡': [111.12, 34.47],
                    '商丘': [115.38, 34.26],
                    '卫辉': [114.03, 35.24],
                    '舞钢': [113.3, 33.17],
                    '项城': [114.54, 33.26],
                    '荥阳': [113.21, 34.46],
                    '新密': [113.22, 34.31],
                    '新乡': [113.52, 35.18],
                    '信阳': [114.04, 32.07],
                    '新郑': [113.43, 34.24],
                    '许昌': [113.49, 34.01],
                    '偃师': [112.47, 34.43],
                    '义马': [111.55, 34.43],
                    '禹州': [113.28, 34.09],
                    '周口': [114.38, 33.37],
                    '驻马店': [114.01, 32.58],
                    '哈尔滨': [126.36, 45.44],
                    '阿城': [126.58, 45.32],
                    '安达': [125.18, 46.24],
                    '北安': [126.31, 48.15],
                    '大庆': [125.01, 46.36],
                    '富锦': [132.02, 47.15],
                    '海林': [129.21, 44.35],
                    '海伦': [126.57, 47.28],
                    '鹤岗': [130.16, 47.2],
                    '黑河': [127.29, 50.14],
                    '佳木斯': [130.22, 46.47],
                    '鸡西': [130.57, 45.17],
                    '密山': [131.5, 45.32],
                    '牡丹江': [129.36, 44.35],
                    '讷河': [124.51, 48.29],
                    '宁安': [129.28, 44.21],
                    '齐齐哈尔': [123.57, 47.2],
                    '七台河': [130.49, 45.48],
                    '双城': [126.15, 45.22],
                    '尚志': [127.55, 45.14],
                    '双鸭山': [131.11, 46.38],
                    '绥芬河': [131.11, 44.25],
                    '绥化': [126.59, 46.38],
                    '铁力': [128.01, 46.59],
                    '同江': [132.3, 47.39],
                    '五常': [127.11, 44.55],
                    '五大连池': [126.07, 48.38],
                    '伊春': [128.56, 47.42],
                    '肇东': [125.58, 46.04],
                    '武汉': [114.17, 30.35],
                    '安陆': [113.41, 31.15],
                    '当阳': [111.47, 30.5],
                    '丹江口': [108.3, 32.33],
                    '大冶': [114.58, 30.06],
                    '恩施': [109.29, 30.16],
                    '鄂州': [114.52, 30.23],
                    '广水': [113.48, 31.37],
                    '洪湖': [113.27, 29.48],
                    '黄石': [115.06, 30.12],
                    '黄州': [114.52, 30.27],
                    '荆门': [112.12, 31.02],
                    '荆沙': [112.16, 30.18],
                    '老河口': [111.4, 32.23],
                    '利川': [108.56, 30.18],
                    '麻城': [115.01, 31.1],
                    '浦圻': [113.51, 29.42],
                    '潜江': [112.53, 30.26],
                    '石首': [112.24, 29.43],
                    '十堰': [110.47, 32.4],
                    '随州': [113.22, 31.42],
                    '天门': [113.1, 60.39],
                    '武穴': [115.33, 29.51],
                    '襄樊': [112.08, 32.02],
                    '咸宁': [114.17, 29.53],
                    '仙桃': [113.27, 30.22],
                    '孝感': [113.54, 30.56],
                    '宜昌': [111.17, 30.42],
                    '宜城': [112.15, 31.42],
                    '应城': [113.33, 30.57],
                    '枣阳': [112.44, 32.07],
                    '枝城': [111.27, 30.23],
                    '钟祥': [112.34, 31.1],
                    '长沙': [112.59, 28.12],
                    '常德': [111.51, 29.02],
                    '郴州': [113.02, 25.46],
                    '衡阳': [112.37, 26.53],
                    '洪江': [109.59, 27.07],
                    '怀化': [109.58, 27.33],
                    '津': [111.52, 29.38],
                    '吉首': [109.43, 28.18],
                    '耒阳': [112.51, 26.24],
                    '冷水江': [111.26, 27.42],
                    '冷水滩': [111.35, 26.26],
                    '涟源': [111.41, 27.41],
                    '醴陵': [113.3, 27.4],
                    '临湘': [113.27, 29.29],
                    '浏阳': [113.37, 28.09],
                    '娄底': [111.59, 27.44],
                    '汨罗': [113.03, 28.49],
                    '韶山': [112.29, 27.54],
                    '邵阳': [111.28, 27.14],
                    '武冈': [110.37, 26.43],
                    '湘潭': [112.53, 27.52],
                    '湘乡': [112.31, 27.44],
                    '益阳': [112.2, 28.36],
                    '永州': [111.37, 26.13],
                    '沅江': [112.22, 28.5],
                    '岳阳': [113.06, 29.22],
                    '张家界': [110.29, 29.08],
                    '株洲': [113.09, 27.51],
                    '资兴': [113.13, 25.58],
                    '长春': [125.19, 43.54],
                    '白城': [122.5, 45.38],
                    '白山': [126.26, 41.56],
                    '大安': [124.18, 45.3],
                    '德惠': [125.42, 44.32],
                    '敦化': [128.13, 43.22],
                    '公主岭': [124.49, 43.31],
                    '和龙': [129, 42.32],
                    '桦甸': [126.44, 42.58],
                    '珲春': [130.22, 42.52],
                    '集安': [126.11, 41.08],
                    '蛟河': [127.21, 43.42],
                    '吉林': [126.33, 43.52],
                    '九台': [125.51, 44.09],
                    '辽源': [125.09, 42.54],
                    '临江': [126.53, 41.49],
                    '龙井': [129.26, 42.46],
                    '梅河口': [125.4, 42.32],
                    '舒兰': [126.57, 44.24],
                    '四平': [124.22, 43.1],
                    '松原': [124.49, 45.11],
                    '洮南': [122.47, 45.2],
                    '通化': [125.56, 41.43],
                    '图们': [129.51, 42.57],
                    '延吉': [129.3, 42.54],
                    '愉树': [126.32, 44.49],
                    '南京': [118.46, 32.03],
                    '常熟': [120.43, 31.39],
                    '常州': [119.58, 31.47],
                    '丹阳': [119.32, 32],
                    '东台': [120.19, 32.51],
                    '高邮': [119.27, 32.47],
                    '海门': [121.09, 31.53],
                    '淮安': [119.09, 33.3],
                    '淮阴': [119.02, 33.36],
                    '江都': [119.32, 32.26],
                    '姜堰': [120.08, 32.34],
                    '江阴': [120.17, 31.54],
                    '靖江': [120.17, 32.02],
                    '金坛': [119.33, 31.46],
                    '昆山': [120.57, 31.23],
                    '连去港': [119.1, 34.36],
                    '溧阳': [119.29, 31.26],
                    '南通': [120.51, 32.01],
                    '邳州': [117.59, 34.19],
                    '启乐': [121.39, 31.48],
                    '如皋': [120.33, 32.23],
                    '宿迁': [118.18, 33.58],
                    '苏州': [120.37, 31.19],
                    '太仓': [121.06, 31.27],
                    '泰兴': [120.01, 32.1],
                    '泰州': [119.54, 32.3],
                    '通州': [121.03, 32.05],
                    '吴江': [120.39, 31.1],
                    '无锡': [120.18, 31.34],
                    '兴化': [119.5, 32.56],
                    '新沂': [118.2, 34.22],
                    '徐州': [117.11, 34.15],
                    '盐在': [120.08, 33.22],
                    '扬中': [119.49, 32.14],
                    '扬州': [119.26, 32.23],
                    '宜兴': [119.49, 31.21],
                    '仪征': [119.1, 32.16],
                    '张家港': [120.32, 31.52],
                    '镇江': [119.27, 32.11],
                    '南昌': [115.55, 28.4],
                    '德兴': [117.35, 28.57],
                    '丰城': [115.48, 28.12],
                    '赣州': [114.56, 28.52],
                    '高安': [115.22, 28.25],
                    '吉安': [114.58, 27.07],
                    '景德镇': [117.13, 29.17],
                    '井冈山': [114.1, 26.34],
                    '九江': [115.58, 29.43],
                    '乐平': [117.08, 28.58],
                    '临川': [116.21, 27.59],
                    '萍乡': [113.5, 27.37],
                    '瑞昌': [115.38, 29.4],
                    '瑞金': [116.01, 25.53],
                    '上饶': [117.58, 25.27],
                    '新余': [114.56, 27.48],
                    '宜春': [114.23, 27.47],
                    '鹰潭': [117.03, 28.14],
                    '樟树': [115.32, 28.03],
                    '沈阳': [123.25, 41.48],
                    '鞍山': [123, 41.07],
                    '北票': [120.47, 41.48],
                    '本溪': [123.46, 41.18],
                    '朝阳': [120.27, 41.34],
                    '大连': [121.36, 38.55],
                    '丹东': [124.22, 40.08],
                    '大石桥': [122.31, 40.37],
                    '东港': [124.08, 39.53],
                    '凤城': [124.02, 40.28],
                    '抚顺': [123.54, 41.51],
                    '阜新': [121.39, 42.01],
                    '盖州': [122.21, 40.24],
                    '海城': [122.43, 40.51],
                    '葫芦岛': [120.51, 40.45],
                    '锦州': [121.09, 41.07],
                    '开原': [124.02, 42.32],
                    '辽阳': [123.12, 41.16],
                    '凌海': [121.21, 41.1],
                    '凌源': [119.22, 41.14],
                    '盘锦': [122.03, 41.07],
                    '普兰店': [121.58, 39.23],
                    '铁法': [123.32, 42.28],
                    '铁岭': [123.51, 42.18],
                    '瓦房店': [122, 39.37],
                    '兴城': [120.41, 40.37],
                    '新民': [122.49, 41.59],
                    '营口': [122.13, 40.39],
                    '庄河': [122.58, 39.41],
                    '呼和浩特': [111.41, 40.48],
                    '包头': [109.49, 40.39],
                    '赤峰': [118.58, 42.17],
                    '东胜': [109.59, 39.48],
                    '二连浩特': [111.58, 43.38],
                    '额尔古纳': [120.11, 50.13],
                    '丰镇': [113.09, 40.27],
                    '根河': [121.29, 50.48],
                    '海拉尔': [119.39, 49.12],
                    '霍林郭勒': [119.38, 45.32],
                    '集宁': [113.06, 41.02],
                    '临河': [107.22, 40.46],
                    '满洲里': [117.23, 49.35],
                    '通辽': [122.16, 43.37],
                    '乌兰浩特': [122.03, 46.03],
                    '乌海': [106.48, 39.4],
                    '锡林浩特': [116.03, 43.57],
                    '牙克石': [120.4, 49.17],
                    '扎兰屯': [122.47, 48],
                    '银川': [106.16, 38.27],
                    '青铜峡': [105.59, 37.56],
                    '石嘴山': [106.22, 39.02],
                    '吴忠': [106.11, 37.59],
                    '西宁': [101.48, 36.38],
                    '德令哈': [97.23, 37.22],
                    '格尔木': [94.55, 36.26],
                    '济南': [117, 36.4],
                    '安丘': [119.12, 36.25],
                    '滨州': [118.02, 37.22],
                    '昌邑': [119.24, 39.52],
                    '德州': [116.17, 37.26],
                    '东营': [118.3, 37.27],
                    '肥城': [116.46, 36.14],
                    '高密': [119.44, 36.22],
                    '菏泽': [115.26, 35.14],
                    '胶南': [119.58, 35.53],
                    '胶州': [120, 36.17],
                    '即墨': [120.28, 36.22],
                    '济宁': [116.33, 35.23],
                    '莱芜': [117.4, 36.12],
                    '莱西': [120.31, 36.52],
                    '莱阳': [120.42, 36.58],
                    '莱州': [119.57, 37.1],
                    '乐陵': [117.12, 37.44],
                    '聊城': [115.57, 36.26],
                    '临清': [115.42, 36.51],
                    '临沂': [118.2, 35.03],
                    '龙口': [120.21, 37.39],
                    '蓬莱': [120.45, 37.48],
                    '平度': [119.58, 36.47],
                    '青岛': [120.18, 36.03],
                    '青州': [118.28, 36.42],
                    '曲阜': [116.58, 35.36],
                    '日照': [119.32, 35.23],
                    '荣成': [122.25, 37.1],
                    '乳山': [121.31, 36.54],
                    '寿光': [118.44, 36.53],
                    '泰安': [117.08, 36.11],
                    '滕州': [117.09, 35.06],
                    '潍坊': [119.06, 36.43],
                    '威海': [122.07, 37.31],
                    '文登': [122.03, 37.12],
                    '新泰': [117.45, 35.54],
                    '烟台': [121.24, 37.32],
                    '兖州': [116.49, 35.32],
                    '禹城': [116.39, 36.56],
                    '枣庄': [117.33, 34.52],
                    '章丘': [117.32, 36.43],
                    '招远': [120.23, 37.21],
                    '诸城': [119.24, 35.59],
                    '淄博': [118.03, 36.48],
                    '邹城': [116.58, 35.24],
                    '太原': [112.33, 37.54],
                    '长治': [113.06, 36.11],
                    '大同': [113.17, 40.06],
                    '高平': [112.55, 35.48],
                    '古交': [112.09, 37.54],
                    '河津': [110.41, 35.35],
                    '侯马': [111.21, 35.37],
                    '霍州': [111.42, 36.34],
                    '介休': [111.55, 37.02],
                    '晋城': [112.51, 35.3],
                    '临汾': [111.31, 36.05],
                    '潞城': [113.14, 36.21],
                    '朔州': [112.26, 39.19],
                    '孝义': [111.48, 37.08],
                    '忻州': [112.43, 38.24],
                    '阳泉': [113.34, 37.51],
                    '永济': [110.27, 34.52],
                    '原平': [112.42, 38.43],
                    '榆次': [112.43, 37.41],
                    '运城': [110.59, 35.02],
                    '西安': [108.57, 34.17],
                    '安康': [109.01, 32.41],
                    '宝鸡': [107.09, 34.22],
                    '韩城': [110.27, 35.28],
                    '汉中': [107.01, 33.04],
                    '华阴': [110.05, 34.34],
                    '商州': [109.57, 33.52],
                    '铜川': [109.07, 35.06],
                    '渭南': [109.3, 34.3],
                    '咸阳': [108.43, 34.2],
                    '兴平': [108.29, 34.18],
                    '延安': [109.28, 36.35],
                    '榆林': [109.47, 38.18],
                    '上海': [121.48, 31.22],
                    '成都': [104.04, 30.4],
                    '巴中': [106.43, 31.51],
                    '崇州': [103.4, 30.39],
                    '达川': [107.29, 31.14],
                    '德阳': [104.22, 31.09],
                    '都江堰': [103.37, 31.01],
                    '峨眉山': [103.29, 29.36],
                    '涪陵': [107.22, 29.42],
                    '广汉': [104.15, 30.58],
                    '广元': [105.51, 32.28],
                    '华蓥': [106.44, 30.26],
                    '简阳': [104.32, 30.24],
                    '江油': [104.42, 31.48],
                    '阆中': [105.58, 31.36],
                    '乐山': [103.44, 29.36],
                    '泸州': [105.24, 28.54],
                    '绵阳': [104.42, 31.3],
                    '南充': [106.04, 30.49],
                    '内江': [105.02, 29.36],
                    '攀枝花': [101.43, 26.34],
                    '彭州': [103.57, 30.59],
                    '邛崃': [103.28, 30.26],
                    '遂宁': [105.33, 30.31],
                    '万县': [108.21, 30.5],
                    '万源': [108.03, 32.03],
                    '西昌': [102.16, 27.54],
                    '雅安': [102.59, 29.59],
                    '宜宾': [104.34, 28.47],
                    '自贡': [104.46, 29.23],
                    '资阳': [104.38, 30.09],
                    '台北': [121.3, 25.03],
                    '天津': [117.12, 39.02],
                    '拉萨': [91.08, 29.39],
                    '日喀则': [88.51, 29.16],
                    '香港': [115.12, 21.23],
                    '乌鲁木齐': [87.36, 43.45],
                    '阿克苏': [80.19, 41.09],
                    '阿勒泰': [88.12, 47.5],
                    '阿图什': [76.08, 39.42],
                    '博乐': [82.08, 44.57],
                    '昌吉': [87.18, 44.02],
                    '阜康': [87.58, 44.09],
                    '哈密': [93.28, 42.5],
                    '和田': [79.55, 37.09],
                    '克拉玛依': [84.51, 45.36],
                    '喀什': [75.59, 39.3],
                    '库尔勒': [86.07, 41.46],
                    '奎屯': [84.56, 44.27],
                    '石河子': [86, 44.18],
                    '塔城': [82.59, 46.46],
                    '吐鲁番': [89.11, 42.54],
                    '伊宁': [81.2, 43.55],
                    '昆明': [102.42, 25.04],
                    '保山': [99.1, 25.08],
                    '楚雄': [101.32, 25.01],
                    '大理': [100.13, 25.34],
                    '东川': [103.12, 26.06],
                    '个旧': [103.09, 23.21],
                    '景洪': [100.48, 22.01],
                    '开远': [103.13, 23.43],
                    '曲靖': [103.48, 25.3],
                    '瑞丽': [97.5, 24],
                    '思茅': [100.58, 22.48],
                    '畹町': [98.04, 24.06],
                    '宣威': [104.06, 26.13],
                    '玉溪': [102.32, 24.22],
                    '昭通': [103.42, 27.2],
                    '杭州': [120.1, 30.16],
                    '慈溪': [121.15, 30.11],
                    '东阳': [120.14, 29.16],
                    '奉化': [121.24, 29.39],
                    '富阳': [119.57, 30.03],
                    '海宁': [120.42, 30.32],
                    '湖州': [120.06, 30.52],
                    '建德': [119.16, 29.29],
                    '江山': [118.37, 28.45],
                    '嘉兴': [120.45, 30.46],
                    '金华': [119.39, 29.07],
                    '兰溪': [119.28, 29.12],
                    '临海': [121.08, 28.51],
                    '丽水': [119.54, 28.27],
                    '龙泉': [119.08, 28.04],
                    '宁波': [121.33, 29.52],
                    '平湖': [121.01, 30.42],
                    '衢州': [118.52, 28.58],
                    '瑞安': [120.38, 27.48],
                    '上虞': [120.52, 30.01],
                    '绍兴': [120.34, 30],
                    '台州': [121.27, 28.41],
                    '桐乡': [120.32, 30.38],
                    '温岭': [121.21, 28.22],
                    '温州': [120.39, 28.01],
                    '萧山': [120.16, 30.09],
                    '义乌': [120.04, 29.18],
                    '乐清': [120.58, 28.08],
                    '余杭': [120.18, 30.26],
                    '余姚': [121.1, 30.02],
                    '永康': [120.01, 29.54],
                    '舟山': [122.06, 30.01],
                    '诸暨': [120.14, 29.43],
                    '重庆': [106.33, 29.35],
                    '合川': [106.15, 30.02],
                    '江津': [106.16, 29.18],
                    '南川': [107.05, 29.1],
                    '永川': [105.53, 29.23]

                };

                var allData = [
                    [{
                        name: '北京'
                    }, {

                        name: '上海',
                        value: 95

                    }],
                    [{

                        name: '北京'
                    }, {
                        name: '广州',
                        value: 90
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '大连',

                        value: 80
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '南宁',
                        value: 70
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '南昌',
                        value: 60
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '拉萨',
                        value: 50
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '长春',
                        value: 40
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '包头',
                        value: 30
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '重庆',
                        value: 20
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '常州',
                        value: 10
                    }]
                ];

                var color = ['#FD9173', "#8CEEA9"];
                var series = [];
                [
                    ['北京', allData]
                ].forEach(function(item, i) {
                    series.push({
                        name: "访问次数",
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'

                            }

                        },
                        symbolSize: function(val) {
                            return val[2] / 8;
                        },

                        data: item[1].map(function(dataItem) {
                            return {
                                name: dataItem[1].name,
                                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                            };
                        })
                    });
                });
                sMonitor_china.setOption({

                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: '80%',
                        left: '80%',
                        data: ['北京 Top10'],
                        textStyle: {
                            color: '#fff'
                        },

                        selectedMode: 'single'
                    },
                    geo: {
                        left: '6%',
                        right: '6%',
                        top: "4%",
                        bottom: "5%",
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0,0.8)',
                                areaColor: "#004571",
                                borderColor: "#6AC6E6"
                            },
                            emphasis: {
                                areaColor: "#00385E"
                            }
                        },
                    },
                    series: series
                })

            },
            linechart() {
                let sMonitor_event1 = this.$echarts.init(document.getElementById('sMonitor_event1'));
                this.sMonitor_event1 = sMonitor_event1;
                let sMonitor_events_bottom_echart = this.$echarts.init(document.getElementById('sMonitor_events_bottom_echart'));
                common_tools.AJAX('post', 'http://192.168.120.231:8080/business/classifyStatics', {
                    'top': '40'
                }, function(data) {
                    sMonitor_events_bottom_echart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        color: ['#fd9173', '#f36f8a', '#4ac7f5', '#5f71d2', '#42a4eb'],
                        legend: { //图例组件，颜色和名字
                            left: '20',
                            top: '10',
                            orient: 'left',
                            itemGap: 12, //图例每项之间的间隔
                            itemWidth: 10,
                            itemHeight: 10,
                            icon: 'rect',
                            data: data.data.list,
                            textStyle: {
                                color: '#cccccc',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            }
                        },
                        series: [{
                            name: '占比',
                            type: 'pie',
                            clockwise: false, //饼图的扇区是否是顺时针排布
                            minAngle: 20, //最小的扇区角度（0 ~ 360）
                            center: ['65%', '50%'], //饼图的中心（圆心）坐标
                            radius: [60, 100], //饼图的半径
                            avoidLabelOverlap: true, ////是否启用防止标签重叠
                            itemStyle: { //图形样式
                                normal: {
                                    borderColor: '#1e2239',
                                    borderWidth: 1.5,
                                },
                            },
                            label: { //标签的位置
                                normal: {
                                    show: true,
                                    position: 'inside', //标签的位置
                                    formatter: "{d}%",
                                    textStyle: {
                                        color: '#fff',
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data: data.data.list
                        }, {
                            name: '',
                            type: 'pie',
                            clockwise: false,
                            silent: true,
                            minAngle: 20, //最小的扇区角度（0 ~ 360）
                            center: ['65%', '50%'], //饼图的中心（圆心）坐标
                            radius: [0, 56], //饼图的半径
                            itemStyle: { //图形样式
                                normal: {
                                    borderColor: '#1e2239',
                                    borderWidth: 1.5,
                                    opacity: 0.21,
                                }
                            },
                            label: { //标签的位置
                                normal: {
                                    show: false,
                                }
                            },
                            data: data.data.list
                        }]
                    })
                })
            },
            togglechartWorld() {
                $("#sMonitor_world").show().siblings().hide();
                //              $('.worldInfor').show().nextSibling().hide();
                this.toggle = true
            },
            togglechartChina() {
                $("#sMonitor_china").show().siblings().hide();
                this.toggle = false
            },
            dateformat(date) {
                var newstartDate;
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return newstartDate = Y + M + D + h + m + s
            },
            //获取前七天的时间
            sevendate(n) {
                var _this = this;
                var myDate = new Date();
                myDate.setDate(myDate.getDate() - n);
                var newDate = _this.dateformat(myDate);
                console.log(newDate);
                return newDate;

            },
            Sizehour() {
                var _this = this;
                var endDate = _this.dateformat(new Date()),
                    publicdate = new Date(),
                    Y = publicdate.getFullYear() + '-',
                    M = (publicdate.getMonth() + 1 < 10 ? '0' + (publicdate.getMonth() + 1) : publicdate.getMonth() + 1) + '-',
                    D = publicdate.getDate() + ' ',
                    H = publicdate.getHours() - publicdate.getHours() + "0" + ":",
                    S = publicdate.getSeconds() - publicdate.getSeconds() + "0" + ":",
                    m = publicdate.getMinutes() - publicdate.getMinutes() + "0",
                    startDate = Y + M + D + H + S + m;
                console.log(startDate);
                common_tools.AJAX('post', 'http://192.168.120.231:8080/flow/outInIpCount', {
                    "startDate": startDate,
                    "endDate": endDate
                }, function(data) {
                    console.log(data.data.input);
                   // if(data.data.input==null||data.data.input==undefined){
                   //        _this.lineData=data.data.input
                   // }else{
                   //     _this.lineData=data.data.input
                   // };
                    _this.sMonitor_event1.setOption({

                        tooltip: {
                            trigger: 'axis'

                        },
                        grid: {
                            left: '15%'

                        },
                        legend: {
                            data: ['IP总量'],

                            left: '70%',

                            top: '2%',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },

                        calculable: true,
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: data.data.input,
                            axisLine: {
                                lineStyle: {
                                    color: '#c9daf4'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 个'
                            },
                            textStyle: {

                                color: function(value, index) {
                                    return value >= 0 ? 'green' : 'red';
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#c9daf4'
                                }
                            }
                        }],
                        series: [{
                                areaStyle: { //区域填充样式
                                    normal: {
                                        color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //填充的颜色。
                                            offset: 0, // 0% 处的颜色
                                            color: 'rgba(193, 53, 49, 0.5)'
                                        }, {
                                            offset: 0.5, // 80% 处的颜色
                                            color: 'rgba(193, 53, 49, 0.3)'
                                        }, {
                                            offset: 1, // 80% 处的颜色
                                            color: 'rgba(193, 53, 49, 0.1)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)', //阴影颜色。支持的格式同color
                                        shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                                    }
                                },
                                name: 'IP总量',
                                type: 'line',
                                data:function(){
                                    if(data.data.input==null||data.data.input==undefined){
                                        title.show='ture'
                                    }else{
                                        
                                    }
                                }

                            }

                        ]
                    })
                })


            },
            Sizeday() {
                var _this = this;
                var endDate = _this.dateformat(new Date());
                var startDate = _this.sevendate(7);
                console.log(startDate);
                common_tools.AJAX('post', 'http://192.168.120.231:8080/flow/outInIpCount', {
                    "startDate": startDate,
                    "endDate": endDate
                }, function(data) {
                    _this.sMonitor_event1.setOption({

                        tooltip: {
                            trigger: 'axis'

                        },
                        legend: {
                            data: ['IP总量'],
                            left: '70%',
                            top: '2%',
                            textStyle: {
                                fontSize: 10,
                                color: '#ffffff'
                            }
                        },

                        calculable: true,
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: data.data.input.map(function(item) {
                                var keyData = [];
                                var name = item.key;
                                var value = item.ipCounts;
                                keyData.push(name);
                                return keyData;
                            }),

                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'

                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 个'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#c9daf4'

                                }
                            }
                        }],
                        series: [{
                                name: 'IP总量',
                                type: 'line',
                                areaStyle: { //区域填充样式
                                    normal: {
                                        color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //填充的颜色。
                                            offset: 0, // 0% 处的颜色
                                            color: 'rgba(193, 53, 49, 0.5)'
                                        }, {
                                            offset: 0.5, // 80% 处的颜色
                                            color: 'rgba(193, 53, 49, 0.3)'
                                        }, {
                                            offset: 1, // 80% 处的颜色
                                            color: 'rgba(193, 53, 49, 0.1)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)', //阴影颜色。支持的格式同color
                                        shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                                    }
                                },
                                data: data.data.input.map(function(item) {
                                    var name = item.key;
                                    var value = item.ipCounts;
                                    return name, value;
                                })

                            }

                        ]
                    })
                })

            },
            Sizemonth() {
                var _this = this;
                var endDate = _this.dateformat(new Date());
                var startDate = _this.sevendate(30);
                console.log(startDate);
                common_tools.AJAX('post', 'http://192.168.120.231:8080/flow/outInIpCount', {
                    "startDate": startDate,
                    "endDate": endDate
                }, function(data) {

                    _this.sMonitor_event1.setOption({

                        tooltip: {
                            trigger: 'axis'
                        },
                        title: {

                            x: 'center',

                        },
                        legend: {
                            data: ['IP总量'],
                            left: '70%',
                            top: '2%',
                            color: '#ffffff'

                        },

                        calculable: true,
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: data.data.input.map(function(item) {
                                var keyData = [];
                                var name = item.key;
                                var value = item.ipCounts;
                                keyData.push(name);
                                return keyData;
                            }),
                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'
                                }

                            }

                        }],
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 个'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#c9daf4'
                                }
                            }
                        }],
                        series: [{
                            areaStyle: { //区域填充样式
                                normal: {
                                    color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //填充的颜色。
                                        offset: 0, // 0% 处的颜色
                                        color: 'rgba(193, 53, 49, 0.5)'
                                    }, {
                                        offset: 0.5, // 80% 处的颜色
                                        color: 'rgba(193, 53, 49, 0.3)'
                                    }, {
                                        offset: 1, // 80% 处的颜色
                                        color: 'rgba(193, 53, 49, 0.1)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)', //阴影颜色。支持的格式同color
                                    shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                                }
                            },
                            name: 'IP总量',
                            type: 'line',
                            data: data.data.input.map(function(item) {
                                var name = item.key,
                                    value = item.ipCounts;
                                return name, value

                            }),

                        }]

                    })
                })
            },
            getData() {
                var _this = this,
                    timer = null;
                timer = setInterval(function() {
                    _this.loading = true;
                    common_tools.AJAX('get', 'http://192.168.120.231:8080/flow/flowReplayStat', {}, function(data) {
                        _this.loading = false;
                        _this.minReplay = data.data.minReplay
                        _this.maxReplay = data.data.maxReplay
                        _this.avgReplay = data.data.avgReplay
                        _this.todayInputIp = data.data.todayInputIp

                    })
                }, 5000)

            }


        },

        mounted: function() {
            this.chinaline(),
                this.worldline(),
                $("#sMonitor_world").show(),
                this.linechart(),
                this.Sizehour(),
                $("#sMonitor_china").hide()
            this.topChart(),
                this.ActiveAttacks(),
                this.getData(),
                this.getDatainfo()





        }
}
</script>
<style>
@import 'sMonitor.css'
</style>
