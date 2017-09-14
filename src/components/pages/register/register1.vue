<template>
	 <div id='register'>
	 	<component v-bind:is="component" v-on:alert_emit="alert_emit" :alert_options='alert_options'></component> 
    	<section>
	    	<div class='section suateam_banner' v-bind:style="{backgroundImage:banner}" :class='{suateam_banner_hasbanner:banner!=null}'>
	    	</div>
    	</section>
    	<section>
    		<div class='suateam suateam_container_frame'>
    			
    			<div class='register_content'>
    				<p class='title'>注册</p>
    				<div class='suateam_input_frame'>
    					<label>昵称:</label>
    					<input type="text" v-model='nickname' placeholder='请输入您的昵称' v-on:blur="validateFtn(3)"/>
    					<span v-if='nickname_tips!==null' class='suateam_validate red'>{{nickname_tips}}</span>
    				</div>
    				<div class='suateam_input_frame'>
    					<label>手机号:</label>
    					<input type="text" v-model='cellphone' v-on:blur="validateFtn(1)" placeholder="请输入您的手机号"/>
						<span v-if='cellphone_tips!==null' class='suateam_validate red'>{{cellphone_tips}}</span>
    				</div>
    				<div class='suateam_input_frame'>
    					<label>手机验证:</label>
    					<input type="text" v-model='authcode' style="width: 45%;" placeholder='请输入短信验证码'/>
    					<button class='bluecolor suateam_fl suateam_margin_horizontal_10' v-on:click="sendauthcode()">短信验证码</button>
    				</div>
    				<div class='suateam_input_frame'>
    					<label>设置密码:</label>
    					<input type="password" placeholder='请输入密码8-20位' v-model='f_password'/>
    					<span v-if='f_password_tips!==null' class='suateam_validate red'>{{f_password_tips}}</span>
    				</div>
    				<div class='suateam_input_frame'>
    					<label>确认密码:</label>
    					<input type="password" v-model='v_password' v-on:blur="validateFtn(2)" placeholder='请确认密码8-20位'/>
    					<span v-if='v_password_tips!==null' class='suateam_validate red'>{{v_password_tips}}</span>
    				</div>
    				<div class='suateam_select_frame'>
    					<label>所在区域:</label>
    					<District v-on:district_emit="district_emit" style='width: 62%;'></District>
    					
    				</div>
    				<div class='suateam_select_frame'>
    					<label>业务需求:</label>
    					<select v-model='business_name' @change='changebusiness($event.target)'>
    						<option v-for='items in businessArray' v-bind:id='items.code'>{{items.name}}</option>
    					</select>
    				</div>
    				<div class='agreement_frame'>
    					<Agreement></Agreement>
    				</div>
    				<p class='agreement_confirm'>
						<input type="checkbox" v-model='agreement_confirm'/>
						<span>我已阅读并同意《注册协议》</span>
					</p>
    				
    				<div class='suateam_input_frame_btn1'>
    					<button class='bluecolor' v-on:click='sendinfo()'>注册</button>
    				</div>
    			</div>
    		</div>
    	</section>
    	
	 </div>
</template>
<script>
	// import Alert from '../../components/global/alert';
	// import District from '../../components/district/district';
	// import Agreement from './components/agreement';
	var common_tools=require("common_tools");
	export default {
		// components: {District,Agreement},
		name: 'register',
		data: function () {
            return {
            	// banner:'url(' + require('./banner.jpg') + ')',
            	nickname:'',
            	authcode:'',
            	cellphone:'',
            	f_password:'',
            	v_password:'',
            	provinceid:'',
            	districtid:'',
            	countyid:'',
            	businesstype:'',
            	business_name:'',
            	businessArray:[],
            	component:'',
            	alert_options:['',''],	//['标题'，'内容']
            	isregistersucess:false,
            	cellphone_tips:null,
            	v_password_tips:null,
            	f_password_tips:null,
            	nickname_tips:null,
            	agreement_confirm:false,
            	usertoken:{}
              	
            }
       	},
       	beforeRouteEnter (to, from, next) {
       		var _self = this;	
    		common_tools.AJAX('POST',common_tools.interfaceurl+'suateamEbBusiDemand/listSuateamEbBusiDemand',{
       			
       		},function(data){
   				//success callback
   				if(data.rspCode=='999999'){
   					
   					
   				}else if(data.rspCode!=='999999'){
   					next(vm=>{
						vm.businessArray=data.data.resultSet;
						vm.business_name=data.data.resultSet[0].name;
						vm.businesstype=data.data.resultSet[0].code;
   					})
				};
   	
   			},function(data){
   				//error callback
   				console.log(data);
       		});
			
		},
      
        methods:{
        	validateFtn:function(_type){
				switch (_type){
				case 1:	
					//cellphone
	   				var pattern = new RegExp("^[1][358][0-9]{9}$");
			   		if(!this.cellphone==''){
			   			var cellphone=this.cellphone;
			   			if(!cellphone.match(pattern)){
			    			this.cellphone_tips='请输入正确的手机号';
				   		}else{
				   			this.cellphone_tips=null;
				   		}
				   	}else{
				   		this.cellphone_tips='手机号为空';
				   	};
				   	break
				case 2:	
					//password
					var pattern = new RegExp("^[0-9_a-zA-Z]{8,20}$");
					if(this.f_password!==this.v_password){
						this.v_password_tips=this.f_password_tips='密码输入不一致'
					}else{
						if(!this.v_password==''){
				   			var getuserpw=this.v_password;
				   			if(!getuserpw.match(pattern)){
				    			this.v_password_tips='请输入正确的密码';
				    			
					   		}else{
					   			this.v_password_tips=null;
					   			this.f_password_tips=null;
				    			
					   		}
				   		}else{
					   		this.v_password_tips='密码为空';
					   	};
					}
			   		
					break
				case 3:	
					//nickname
			   		if(!this.nickname==''){
				   		this.nickname_tips=null;
			   		}else{
				   		this.nickname_tips='昵称不能为空';
				   	};
					break
			   	}
			},
        	Alert:function(_title,_content){
        		common_tools.Shade_on('register');
        		this.alert_options=[_title,_content];
        		this.component=Alert;
        	},
        	alert_emit:function(_val){
        		common_tools.Shade_off();
        		this.component='';
        		if(this.isregistersucess==true){
        			this.$store.commit('userislogin',this.usertoken);
	   				this.$router.push('/index');
	   				$(window).scrollTop(0);
	   				sessionStorage.setItem("username", this.usertoken.username);
	   				sessionStorage.setItem("userid", this.usertoken.id);
        		};
        	},
        	district_emit:function(_val){
        		var _self = this;
        		_self.provinceid=_val.provinceid;
        		_self.districtid=_val.districtid;
        		_self.countyid=_val.countyid;
				//console.log(_val.provinceid+"===="+_val.districtid+"===="+_val.countyid);
        	},
        	changebusiness:function(_target){
        		this.businesstype=_target.selectedOptions[0].id;
        	},
        	sendauthcode:function(){
        		var _self = this;
        		common_tools.AJAX('POST',common_tools.interfaceurl+'login2/phoneAuthCode',{
	       			"condition": {"cellphone": _self.cellphone}
	       		},function(data){
	   				//success callback
	   				if(data.rspCode=='999999'){
	   					alert("传参错误，请重新检查");
	   				}else if(data.rspCode!=='999999'){
	   					console.log("验证码:"+data.data.authCode);
	   				};
	   				
	   			},function(data){
	   				//error callback
	   				console.log(data);
	       		});
        	},
        	sendinfo:function(){
        		var _self = this;
        		$(window).scrollTop(0);
        		this.validateFtn(1);this.validateFtn(2);this.validateFtn(3);
        		if(this.cellphone_tips==null&&this.v_password_tips==null&&this.nickname_tips==null){
        			if(this.agreement_confirm==true){
        				common_tools.AJAX('POST',common_tools.interfaceurl+'memberInfo/memberRegister',{
			       			"condition": {
								"nickname": _self.nickname,
								"cellphone": _self.cellphone,
								"password": _self.v_password,
								"province": _self.provinceid,
								"city": _self.districtid,
								"region": _self.countyid,
								"busiDemand": _self.businesstype,
								"authCode": _self.authcode
							}
			       		},function(data){
			   				//success callback
			   				if(data.rspCode!=='100000'){
			   					_self.Alert('注册失败',data.rspMsg);
			   				}else if(data.rspCode=='100000'){
			   					_self.isregistersucess=true;
			   					_self.Alert('注册成功','欢迎您的加入');
			   					_self.usertoken=data.userToken;
			   				};
			   			},function(data){
			   				console.log(data);
			   				_self.Alert('注册失败',data.rspMsg);
			       		});
        			}else{
        				_self.Alert('注册失败','您未阅读或同意注册协议');
        			}
        		}
        		
        	}
        }     
	}
</script>
<style>
	div.register_content{
		width: 70%;
		margin: 0 auto;
		box-sizing: border-box;
	}
	div.register_content p.title{
		text-align: center;
		margin: 30px 0;
		font-weight: 600;
		font-size: 1.8rem;
	}
	p.paragraph{
		font-size: 1.4rem;
		line-height: 1.9;
		text-indent: 2em;
		color: #818181;
		text-align: justify;
	}
	div.agreement_frame{
		overflow-y: scroll;
		overflow-x: hidden;
		height: 400px;
		padding: 0 20px;
		box-sizing: border-box;
	}
	p.agreement_confirm{
		font-size: 1.2rem;
    	text-align: center;
    	width: 100%;
   		display: block;
	}
</style>