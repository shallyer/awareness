/*  === common.js 全局变量===  */

/* ===通用变量===  */

var suateam_tools={
	version:'v1.0',
	interfaceurl:'http://192.168.120.231:8080/',
	AJAX_callback:{},
	option:function(){
		
	},
	Alert:function(_textstring,_option,_callback){
		
	},
	Dialog:function(_tiptext,_option,_callback){
		
	},
	Shade_on:function(_containerID){
		var shade="<div class='suateam_shade'></div>";
		$('#'+_containerID).prepend(shade);
	},
	Shade_off:function(){
		$("div.suateam_shade").remove();
	},
	AJAX:function(_method,_url,_data,_success,_error){
		var _self =this;
		jQuery.support.cors = true;
		$.ajax({
	        type:_method ||'post',
	        url:_url,
	        xhrFields: {withCredentials: true},
	        dataType:'json',
	        contentType:"application/json",
	        data:JSON.stringify(_data),
//			data: $.toJSON(userData),
//        	dataType: 'jsonp',
// 	      	jsonpCallback:'callback',
	        success:_success,
	        error:_error
    	});
	},
	//批量删除
	/*deleteSelection:function(multipleSelection,tableData,_self) {
		if(multipleSelection.length != 0) {
			_self.$confirm('此操作将删除所选行, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				for(var i = 0; i < multipleSelection.length; i++) {
					console.log("删除对应id的数据");
					for(var n = 0; n < tableData.length; n++) {
						if(tableData[n].id == multipleSelection[i].id) {
							tableData.splice(n, 1);
							break;
						}
					}
				}
				_self.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				_self.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		} else {
			_self.$alert('请先选择要删除的行', '提示', {
				confirmButtonText: '确定',
				type: 'warning'
				//alert("请先选择要删除的行！");
			})
		}
	},*/
	/*deleteSelection:function(multipleSelection,tableData,_self) {
		if(multipleSelection.length != 0) {
			if(_self.$confirm('此操作将删除所选行, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})) {
				for(var i = 0; i < multipleSelection.length; i++) {
					console.log("删除对应id的数据");
					for(var n = 0; n < tableData.length; n++) {
						if(tableData[n].id == multipleSelection[i].id) {
							tableData.splice(n, 1);
							_self.$message({
								type: 'success',
								message: '删除成功!'
							});
							break;
						}
					}
				}
				
			}else{
				_self.$message({
					type: 'info',
					message: '已取消删除'
				});
			};
		} else {
			_self.$alert('请先选择要删除的行', '提示', {
				confirmButtonText: '确定',
				type: 'warning'
				//alert("请先选择要删除的行！");
			})
		}
	},*/
	GetParam:function(){
		var url = window.location;
		var reg = /[^\/]*$/;
		var fileName = reg.exec(url)[0];
		
		return fileName;	
	}
}
module.exports = suateam_tools;