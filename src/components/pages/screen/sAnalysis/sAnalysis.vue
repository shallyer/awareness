<template>
    <div class="sAnalsis_root">
        <div class="sAnalysis_echart_middle">
            <div class="sAnalysis_echart_middle_One">
                <p class="public_chart_p">应用层协议Top5</p>
                <div class="publicchart">
                    <div id="sAnalysis_echart_middle_One" style="width:100%;height: 100%;"></div>
                </div>
            </div>
            <div class="sAnalysis_echart_middle_Two">
                <p class="public_chart_p">外部国家访问Top5</p>
                <div class="publicchart">
                    <div id="sAnalysis_echart_middle_Two" style="width:100%;height: 100%;"></div>
                </div>
            </div>
            <div class="sAnalysis_echart_middle_Three">
                <p class="public_chart_p">统计信息(单位/KB)</p>
                <div class="publicchart">
                    <div id="total">
                        TCP：<span class="num">{{tcp}}</span>
                    </div>
                    <div id="total1">
                        UDP：<span class="num">{{udp}}</span>
                    </div>
                    <div id="total2">
                        当前进入：<span class="num">{{input}}</span>
                    </div>
                    <div id="total3">
                        当前输出：<span class="num">{{output}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sAnalsis_left">
            <div class="worldMap">
                <div id="worldMap_main" style="width: 100%;height: 100%;"></div>
            </div>
            <div class="count_map">
                <div class="count_map_left">
                    <p class="public_chart_p ">内部访问流量排行榜</p>
                    <div class="publicchart" style="width: 100%; height: 100%;">
                        <div id="count_map_left_chart" style="width: 100%;height: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sAnalsis_right">
            <div class="sAnalsis_right_chart_line">
                <p class="public_chart_p">进出IP统计图</p>
                <div class="publicchart">
                    <div id="sAnalsis_right_chart_line" style="width:98%;height: 100%;"></div>
                </div>
            </div>
            <div class="sAnalysis_rigth_chart_two">
                <p class="public_chart_p">协议分布</p>
                <div class="publicchart">
                    <div id="sAnalysis_rigth_chart_two" style="width:98%;height: 100%;"></div>
                </div>
            </div>
            <div class="sAnalsis_right_chart_pie">
                <p class="public_chart_p">外部访问IP TOP5</p>
                <div class="publicchart">
                    <div id="sAnalsis_right_chart_pie" style="width:98%;height: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var common_tools = require("common_tools");
//  require("../../../../public_resource/vendor/jquery.actual.min.js")
require("../../../../public_resource/vendor/world.js")
export default {
    data() {
            return {
                input: '',
                output: '',
                tcp: '',
                udp: ''
            }
        },

        methods: {

            //时间格式化
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
            sevendate() {
                var _this = this;
                var myDate = new Date();
                myDate.setDate(myDate.getDate() - 7);
                var newDate = _this.dateformat(myDate);
                console.log(newDate);
                return newDate;

            },
            linechart() {
                let worldMap_main = this.$echarts.init(document.getElementById('worldMap_main'));
                worldMap_main.showLoading();
                common_tools.AJAX('get', 'http://192.168.120.231:8080/flow/flowRendChart', {}, function(data) {
                    worldMap_main.hideLoading();
                    console.log(data.data);
                    worldMap_main.setOption({
                        title: {
                            text: '流量走势桑基图',
                            top: 10,
                            textStyle: {
                                color: '#c9daf4'
                            },
                            left: '41%'
                        },
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'

                        },
                        series: [{
                            top: 55,
                            right: 70,
                            left: 10,
                            type: 'sankey',
                            layout: 'none',

                            data: data.data.nodes,
                            links: data.data.links,

                            label: {
                                normal: {

                                    textStyle: {
                                        color: "#c9daf4"
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0,
                                            color: '#E8F8FB' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#05D1F6' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    borderWidth: 1,
                                    borderColor: '#aaa'

                                }
                            },
                            lineStyle: {
                                normal: {
                                    curveness: 0.5,
                                    color: '#B8EDF7'

                                }

                            },

                        }]
                    })

                })
            },
            linechart1() {
                var _this = this;
                var publicdate = new Date();
                var endDate = _this.dateformat(publicdate);
                var startDate = _this.sevendate();
                let sAnalsis_right_chart_line = this.$echarts.init(document.getElementById('sAnalsis_right_chart_line'));
                common_tools.AJAX('post', 'http://192.168.120.231:8080//flow/flowIpByTypeAndDateCount', {
                    "startDate": startDate,
                    "endDate": endDate
                }, function(data) {
                    console.log(data.data);
                    sAnalsis_right_chart_line.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            }
                        },
                        legend: {
                            icon: 'rect',
                            itemWidth: 14,
                            itemHeight: 5,
                            itemGap: 13,
                            data: ['进', '出'],
                            right: '4%',
                            textStyle: {
                                fontSize: 12,
                                color: '#F1F1F3'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            top: '20%',
                            bottom: '10%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#CCCCCC'
                                }
                            },
                            data: data.data.schema
                        }],
                        yAxis: [{
                            type: 'value',
                            name: '单位（个）',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#CCCCCC'
                                }
                            },
                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            }
                        }],
                        series: [{
                            name: '进',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 5,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(137, 189, 27, 0.3)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(137, 189, 27, 0)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(137,189,27)',
                                    borderColor: 'rgba(137,189,2,0.27)',
                                    borderWidth: 12

                                }
                            },
                            data: data.data.list[0].value
                        }, {
                            name: '出',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 5,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0, 136, 212, 0.3)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(0, 136, 212, 0)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(0,136,212)',
                                    borderColor: 'rgba(0,136,212,0.2)',
                                    borderWidth: 12

                                }
                            },
                            data: data.data.list[1].value
                        }]
                    })
                   
              })

            },
            linechart2() {
                let sAnalsis_right_chart_pie = this.$echarts.init(document.getElementById('sAnalsis_right_chart_pie'));
                common_tools.AJAX('post', "http://192.168.120.231:8080/flow/flowInputIpCount", {
                    "top": "5"
                }, function(data) {
                    console.log(data.data.list);

                    sAnalsis_right_chart_pie.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: data.data.list,
                            textStyle: {
                                color: '#ffffff'
                            },
                            top: '15',
                            left: '15'
                        },
                        series: [{
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center:['65%','40%'],
                            color: ['#CBBD67','#CB5D5C',  '#3CA6C1','#3CA696', '#C2A72B',  ],
                            data: data.data.list,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    })
                })

            },
            protocolClassification() {
                let sAnalysis_rigth_chart_two = this.$echarts.init(document.getElementById('sAnalysis_rigth_chart_two'));
                common_tools.AJAX('get', 'http://192.168.120.231:8080/flow/flowProto', {}, function(data) {
                    console.log(data.data);
                    sAnalysis_rigth_chart_two.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            data: data.data.schema,
                            textStyle: {
                                color: "#c9daf4"
                            },
                            left: '3%',
                            top: '3%'

                        },
                        series: [{
                            center: ['60%', '90%'],
                            name: '访问来源',
                            type: 'pie',
                            top: "5%",
                            bottom: '5%',
                            selectedMode: 'single',
                            color: ["#ADD8E6", "#ADFF2F"],
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    color: '#fff'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: data.data.schema
                        }, {
                            center: ['60%', '50%'],
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            color: ['#3CA696', '#CB5D5C', '#C2A72B', '#86AC18', '#3CA6C1', '#CBBD67'],
                            data: data.data.list
                        }]

                    })
                })

            },
            applicationLayer() {
                let sAnalysis_echart_middle_One = this.$echarts.init(document.getElementById('sAnalysis_echart_middle_One'));
                 common_tools.AJAX('get', 'http://192.168.120.231:8080/flow/flowProto',{},function(data){
                 sAnalysis_echart_middle_One.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        left: 'left',
                        data: ['FTP', 'Telnet', 'SMTP', 'HTTP', 'NFS'],
                        textStyle: {
                            color: "#c9daf4"
                        },
                        left: '3%',
                        top: '4%'
                    },

                    grid: {
                        top: '5%',
                        bottom: '1%'
                    },
                    series: [{
                        name: '应用层协议排行',
                        type: 'pie',
                        radius: '62%',
                        color: ['#3CA696', '#CB5D5C', '#C2A72B', '#86AC18', '#3CA6C1', '#CBBD67'],
                        data: [{
                            value: 305,
                            name: 'FTP'
                        }, {
                            value: 310,
                            name: 'Telnet'
                        }, {
                            value: 234,
                            name: 'SMTP'

                        }, {
                            value: 135,
                            name: 'HTTP'
                        }, {
                            value: 154,
                            name: 'NFS'
                        }],

                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]

                })
                 })
               
            },
            otherState() {
                let sAnalysis_echart_middle_Two = this.$echarts.init(document.getElementById('sAnalysis_echart_middle_Two'));
                sAnalysis_echart_middle_Two.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    grid: {
                        top: "1%"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['美国', '德国', '英国', '澳大利亚', '日本'],
                        textStyle: {
                            color: "#c9daf4"
                        },
                        left: '3%',
                        top: '4%'

                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '62%',
                        color: ['#3CA696', '#CB5D5C', '#C2A72B', '#86AC18', '#3CA6C1', '#CBBD67'],
                        data: [{
                                value: 215,
                                name: '美国'
                            }, {
                                value: 110,
                                name: '德国'
                            },

                            {
                                value: 234,

                                name: '英国'
                            }, {
                                value: 135,
                                name: '澳大利亚'
                            }, {
                                value: 154,
                                name: '日本'
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]

                })
            },
            analysisrank() {
                let count_map_left_chart = this.$echarts.init(document.getElementById('count_map_left_chart'));
                common_tools.AJAX('post', 'http://192.168.120.231:8080/flow/flowOutputIpCount', {
                    'top': '10'
                }, function(data) {
                    console.log(data.data);
                    count_map_left_chart.setOption({
                        tooltip: {
                            trigger: 'axis'
                        },
                        calculable: true,
                        xAxis: [{
                            axisLine: {
                                lineStyle: {
                                    color: '#CCCCCC'
                                }
                            },
                            type: 'category',
                            data: data.data.list.map(function(item){
                                var name=item.name;
                                return name
                            })
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#CCCCCC'
                                }
                            }
                        }],
                        grid: {
                            bottom: '58',
                            top: '30'
                        },
                        series: [{
                            name: data.data.list.name,
                            type: 'bar',
                            data: data.data.list,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        // build a color map as your need.
                                        var colorList = ['#CB5D5C','#CB5D5C','#3CA696',  '#C2A72B', '#86AC18', '#3CA6C1', '#CBBD67'];
                                        return colorList[params.dataIndex]
                                    },
                                }
                            }
                        }]

                    })
                })

            },
            numberRefresh() {
                var timer = null,
                    _this = this;
                timer = setInterval(function() {
                    common_tools.AJAX('get', "http://192.168.120.231:8080/flow/flowStat", {},
                        function(data) {
                            _this.tcp = data.data.tcp;
                            _this.udp = data.data.udp;
                            _this.input = data.data.input;
                            _this.output = data.data.output
                        })
                }, 2000)

            }


        },

        mounted() {
            this.linechart(),
                this.linechart1(),
                this.linechart2(),
                this.protocolClassification(),
                this.applicationLayer(),
                this.otherState(),
                this.analysisrank(),
                // this.sevendate(),
                this.numberRefresh()

        }
}
</script>
<style>
@import "sAnalysis.css";
</style>
