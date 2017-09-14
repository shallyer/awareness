<template>
	<div class="screenWrapper">
		<s-header :isActive='isActive'></s-header>
		<div class="screenContent">
			<transition name="move" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>
<script>
	import sHeader from '../../common/sHeader/sHeader.vue';
	var common_tools = require("common_tools");
	require("../../../public_resource/vendor/jquery.actual.min.js")
	require("../../../public_resource/vendor/world.js")
	export default {
		components:{sHeader},
		data() {
			return {
				isActive:'0'
			}
		},

		methods: {
			
		},
		mounted: function() {
			if(this.$route.path==='/wholeNetwork'){
				this.isActive='0';
			}else if(this.$route.path==='/sMonitor'){
				this.isActive='1';
			}else if(this.$route.path==='/sAnalysis'){
				this.isActive='2';
			}else if(this.$route.path==='/sAssets'){
				this.isActive='3';
			}
		},
	}
</script>
<style>
	.screenWrapper{
		height:100%;
		overflow:hidden;
		background:url('./background.jpg') no-repeat left top;
		
		/*-webkit-animation:bg 500s linear infinite;
		-moz-animation:bg 500s linear infinite;
		-ms-animation:bg 500s linear infinite;
		animation:bg 500s linear infinite;*/
	}
	@-webkit-keyframes bg{
		0{
			background:url('./background.jpg') no-repeat left top;
		}
		25%{
			background:url('./background.jpg') no-repeat right top;
		}
		50%{
			background:url('./background.jpg') no-repeat right bottom;
		}
		75%{
			background:url('./background.jpg') no-repeat left bottom;
		}
		100%{
			background:url('./background.jpg') no-repeat left top;
		}
	}
	.screenContent{
		position:absolute;
		width:100%;
		height:90%;
		padding:1.5% 2.5% 2% 1.5%;
		box-sizing: border-box;
		top:10%;
		left:0;
		background:url('frame.png') no-repeat;
		background-size:100% 100%;
	}
</style>