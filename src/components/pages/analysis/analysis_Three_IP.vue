
<template>
	<div class="analysis_Three_OS" style="width: 100%;height: 100%">
		<el-table :data="tableData4" style="width: 100%" :row-class-name="tableRowClassName" border stripe>
			<el-table-column prop="IPAddress" label="IP地址" width="230" align="center">
			</el-table-column>
			<el-table-column prop="Location" label="位置"  align="center">
			</el-table-column>
			<el-table-column prop="Alert" label="警报"  align="center">
			</el-table-column>
			<el-table-column prop="Name" label="名字" width="230" align="center">
			</el-table-column>
			<el-table-column prop="SeenSince" label="监测时间" width="230" align="center">
			</el-table-column>
			<el-table-column prop="breakdown" label="breakdown" width="260" align="center">
				<template scope="scope">
					<div class="breakDown-bar-ip">
						<div class="bar-client" style="">Client{{one}}</div>
						<div class="bar-server" style="">Server{{two}}</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="Throughput" label="峰值吞吐量" align="center">
			</el-table-column>
			<el-table-column prop="TrafficL" label="通信量" align="center">
			</el-table-column>
		</el-table>
		<!--分页部分-->
		<div class="analysis_Three_root-page">
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
	</div>
</template>

<script>
	import actual from '../../../public_resource/vendor/jquery.actual.min.js';
	export default {
		data() {
			return {

				tableData4: [
				    {
						IPAddress:'123.25.123.456',
						Location:'Location',
						Name: "Windows NT 10.0",
						Hosts: '1',
						Alert: '48',
						ASN:'CNCGROUP China169 Backbone',
						Name:'cache.ctnt.com.cn',
						SeenSince: '8 h, 27 min, 37 sec',
						Throughput: '635.69 Kbit ',
						TrafficL: '691.42 MB'
					},
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Location',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'CNCGROUP China169 Backbone',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Location',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'CNCGROUP China169 Backbone',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Location',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'CNCGROUP China169 Backbone',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Location',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'CNCGROUP China169 Backbone',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },
                    {
                        IPAddress:'123.25.123.456',
                        Location:'Remote',
                        Name: "Windows NT 10.0",
                        Hosts: '1',
                        Alert: '48',
                        ASN:'ASN for TIANJIN Provincial Net of CT',
                        Name:'cache.ctnt.com.cn',
                        SeenSince: '8 h, 27 min, 37 sec',
                        Throughput: '635.69 Kbit ',
                        TrafficL: '691.42 MB'
                    },

				]
			}
		},
		mounted(){

		},
		methods: {

		}
	}
</script>

<style>
	   .analysis_Three_root-page{
		   height: 12%;
		   margin: 1.5%;
		   text-align: right;
	   }
	   .breakDown-bar-ip{
		   width:100%;
		   height: 20px;
		   border-radius: 10px;
		   overflow: hidden;
		   margin:0 auto;
	   }
	   .breakDown-bar-ip .bar-client{
		   width: 60%;
		   height: 20px;
		   float: left;
		   background-color: #eea33a;
	   }
	   .breakDown-bar-ip .bar-server{
		   width: 40%;
		   height: 20px;
		   float: left;
		   background-color:#45b8d9;
	   }

</style>