<template>
	<div id='topo'>
		<div class='topo_linkTypeframe'>
			<div class='topo_linkType_btn' v-for='items in topoLinkTypeArray'>
				<div class='topo_linkType_btn_imgframe' v-on:click="choseLinkType(items.id,$event)">
					<img v-bind:src='items.imgurl'>
				</div>
				<span class='topo_linkType_btn_name'>{{items.linkName}}</span>
			</div>
		</div>
		<div class='topo_canvasframe'>
			<div class='topo_control_btn'>
				<el-button :plain="true" style='float: right; margin-right: 10px;' v-on:click='getJson()'>保存</el-button>
    			<el-button :plain="true" style='float: right; margin-right: 10px;'>取消</el-button>
    			<el-button icon="delete" style='float: right; margin-right: 10px;' v-on:click='dellink()'></el-button>
			</div>
			<canvas id ='canvas'></canvas>
		</div>
	</div>
</template>
<script>
	require.ensure(['jtopo'], function(){
    }, 'jtopoasd'); // 第三个参数设置打包名称
	var common_tools = require("common_tools");
	var topo_ftn=require('./topo_config');
	export default {
		name: 'topo',
		data: function () {
            return {
            	mode:1,		//1预览模式，2编辑模式
            	stage:{},	// 创建一个舞台对象
            	scene:{},	// 创建一个场景对象
            	addNodeArray:[],
            	topoLinkTypeArray:[
            		{imgurl:require('./img/link.png'),linkName:'连线',id:'link'},
            		{imgurl:require('./img/fold_link.png'),linkName:'折线',id:'fold_link'},
            		{imgurl:require('./img/flexional_link.png'),linkName:'二次折线',id:'flexional_link'}
        		]
			}
        },
		props:['topoIsOpen'],
		mounted:function(){
			require('jtopo');
			var _self=this;
			var getWidth=$('.el-tabs__content').width()-131;
			var getHeight=$('.el-tabs__content').height();
			var getJson= require('./demo.json');
			var canvas = document.getElementById('canvas');
			canvas.width=(getWidth-2);
			canvas.height=575;
			this.stage = new JTopo.Stage(canvas); 
			this.scene = new JTopo.Scene(this.stage);
			//this.stage.wheelZoom = 0.85; 
			this.stage.wheelZoom = null;
			this.scene.backgroundColor="255,255,255";
			//this.scene.background = require('./img/backimg.png');
			topo_ftn.initRender(getJson,this.scene,this.stage);
			window.onresize = function(){
				var getWidth=$('.el-tabs__content').width()-131;
				var getHeight=$('.el-tabs__content').height();
				canvas.width=(getWidth-2);
				canvas.height=575;
				_self.scene.centerAndZoom();
			};
		},
		methods:{
			getJson:function(){
				console.log(topo_ftn.getJson(this.scene));
			},
			clearEventListener:function(){
				this.scene.removeAllEventListener();
			},
			choseLinkType:function(_linkType,_event){
				var getDom=_event.target;
				$("div.topo_linkType_btn_imgframe").removeClass("active");
				$(getDom).parents(".topo_linkType_btn_imgframe").addClass("active");
				$(getDom).addClass("active");
				var _self =this;
				topo_ftn.addLinkNode(_linkType,this.scene,function(_val){
					console.log(_val);
					//_self.scene.removeAllEventListener() ;
				});
			},
			zoom:function(){
				this.stage.centerAndZoom(0);
			},
			changemode:function(_val){
				this.mode=_val;
			},
			dellink:function(){
				topo_ftn.removeLinkNode(this.scene);
			}
			
		},
	}
</script>
<style>
div#topo{
	margin: 0 auto;
	display: block;
	width: 100%;
	height: 640px;
	overflow: hidden;
	border-radius: 4px;
	box-sizing: border-box;
	position: relative;
}
div.topo_canvasframe{
	float: right;
	display: block;
	border: 1px #d1dbe5 solid;
	box-sizing: border-box;
	border-radius: 5px;
}
canvas#canvas{
	box-sizing: border-box;
}
div.topo_linkTypeframe{
	width: 116px;
	box-sizing: border-box;
	float: left;
}
div.topo_linkType_btn{
	float: left;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 7px;
}
div.topo_linkType_btn span.topo_linkType_btn_name{
	width: 100%;
	text-align: center;
	float: left;
	margin-top: 7px;
	font-size: 1.4rem;
	color: #656565;
}
div.topo_linkType_btn_imgframe{
	background-color: #eef1f6;
	border-radius: 5px;
	border: 2px #e6e6e6 solid;
	width: 100%;
	height: 60px;
	box-sizing: border-box;
	overflow: hidden;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
}
div.topo_linkType_btn_imgframe img{
	width: 80px;
	display: block;
	margin: 9px auto;
}
div.topo_linkType_btn_imgframe:hover{
	border: 2px #737d8c solid;
}
div.topo_linkType_btn_imgframe.active{
	border: 2px #737d8c solid;
}
div.topo_control_btn{
	height: 60px;
	overflow: hidden;
	width: 100%;
	padding: 12px 0;
	background-color: #eef1f6;
	box-sizing: border-box;
	border-bottom: 1px solid #d1dbe5;
}
div.topo_popover{
	position: absolute; 
	width: 200px; 
    background: #fff;
    min-width: 150px;
    border-radius: 2px;
    border: 1px solid #d1dbe5;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    min-height: 30px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
</style>