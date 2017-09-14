<template>
	<div class="analysis_root">
		<div class="analysis_header">
			<el-menu :default-active="defaultActive" :active="navselected" class="el-menu-demo" mode="horizontal" @select="handleSelect" router="true" theme="dark">
				<el-menu-item index="analysisOne">监控面板</el-menu-item>
				<el-menu-item index="analysis_Two">链接分析</el-menu-item>
				<el-submenu index="analysis_Three">
					<template slot="title">IP</template>
					<el-menu-item index="analysis_Three_IP">IP</el-menu-item>
					<el-menu-item index="analysis_Three_OS">OS</el-menu-item>
					<!--<el-menu-item index="2-3"></el-menu-item>-->
				</el-submenu>
			</el-menu>
		</div>
		<div class="analysis_content_root">
               <router-view></router-view>	
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                defaultActive:'analysisOne'
            }
        }

    }
</script>
<style>
	.analysis_root {
		width: 96%;
		height: 100%;
		margin-left: 2%;
		margin-right: 2%;
		border-radius: 6px 6px 0 0;
		overflow: hidden;
	}
	.analysis_header{
		height: 40px;
	    width: 100%;
	}
	.analysis_header .el-menu-demo {
		height: 40px;
		padding: 0;
		line-height: 40px;
	}
	
	.analysis_header .el-menu-item {
		padding: 0;
		line-height: 40px;
		margin-right: 40px;
		margin-left: 55px;
		height: 40px;
	}
	
	.analysis_header .el-menu--horizontal .el-submenu .el-submenu__title {
		line-height: 40px;
		margin-right: 40px;
		margin-left: 55px;
		padding: 0;
		height: 40px;
	}
	.analysis_content_root{
		width:100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.analysis_root .el-menu--horizontal .el-submenu>.el-menu{
		top:40px;
		width:60px;
		
	}
	.analysis_root .el-menu--horizontal .el-submenu>.el-menu li{
		width: 100%;
		margin-left: 0px;
		text-align: center;
		
	}
</style>