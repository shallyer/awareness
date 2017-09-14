<template>
	<div class="login-wrap">
		<div class="container">
			<h1>Welcome</h1>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="loginForm">
				<el-form-item prop="username">
					<el-input class="userInput" v-model="ruleForm.username" placeholder="Username"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="Password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
				</el-form-item>
				<div class="tips">
					<span @click="register">注册账号</span>
					<span @click="forgetPaw">忘记密码</span>
				</div>
				<div class="login-btn">
					<el-button type="primary" @click="submitFormScreen('ruleForm')">进入态势观察屏</el-button>
				</div>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm('ruleForm')">进入安全管理系统</el-button>
				</div>
			</el-form>
		</div>

		<ul class="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			register(){
				 this.$router.push('/register');
			},
			forgetPaw(){
              this.$router.push('/forgetPaw')
        },
			submitFormScreen(formName) {
				var _self = this;
				_self.$refs[formName].validate((valid) => {
					if(valid) {
						localStorage.setItem('ms_username', _self.ruleForm.username);
						$('.loginForm').fadeOut(500);
						$('.login-wrap').addClass('form-success');
						setTimeout(function() {
							_self.$router.push('/screen');
						}, 1000)

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitForm(formName) {
				var _self = this;
				_self.$refs[formName].validate((valid) => {
					if(valid) {
						localStorage.setItem('ms_username', _self.ruleForm.username);
						$('.loginForm').fadeOut(500);
						$('.login-wrap').addClass('form-success');
						setTimeout(function() {
							_self.$router.push('/main');
						}, 1000)

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		},
		mounted: function() {
			$('#login-button').click(function() {
				console.log('sd');
				$('.loginForm').fadeOut(500);
				$('.login-wrap').addClass('form-success');
			});
		}
	}
</script>

<style>
	.login-wrap {
		background: #50a3a2;
		background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
		background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
		opacity: 0.8;
		position: absolute;
		top: 0;
		left: 0;
		/*right:0;*/
		/*bottom:0;*/
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.login-wrap.form-success .container h1 {
		-webkit-transform: translateY(200px);
		-ms-transform: translateY(200px);
		transform: translateY(200px);
	}
	
	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 280px;
		padding: 80px 0;
		height: 400px;
		text-align: center;
		transform: translate(-50%, -50%);
		z-index: 9999;
	}
	
	.container h1 {
		font-size: 40px;
		font-family: 'Source Sans Pro', sans-serif;
		color: #fff;
		-webkit-transition-duration: 1s;
		transition-duration: 1s;
		-webkit-transition-timing-function: ease-in-put;
		transition-timing-function: ease-in-put;
		font-weight: 200;
	}
	
	.loginForm {
		padding: 20px 0;
		position: relative;
		z-index: 2;
	}
	
	.loginForm .el-form-item.is-error .el-input__inner {
		border-bottom: 1px solid #fff;
	}
	
	.loginForm .el-form-item__error {
		color: #ff4949;
		font-size: 12px;
		position: absolute;
		top: 0;
		left: 100%;
		width: 160px;
		line-height: 43px;
		text-align: left;
		padding-left: 10px;
	}
	
	.loginForm ::-webkit-input-placeholder {
		/* WebKit browsers */
		font-family: 'Source Sans Pro', sans-serif;
		color: white;
		font-weight: 300;
	}
	
	.loginForm :-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		font-family: 'Source Sans Pro', sans-serif;
		color: white;
		opacity: 1;
		font-weight: 300;
	}
	
	.loginForm ::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		font-family: 'Source Sans Pro', sans-serif;
		color: white;
		opacity: 1;
		font-weight: 300;
	}
	
	.loginForm :-ms-input-placeholder {
		/* Internet Explorer 10+ */
		font-family: 'Source Sans Pro', sans-serif;
		color: white;
		font-weight: 300;
	}
	/* WebKit browsers */
	
	input:focus::-webkit-input-placeholder {
		color: transparent;
	}
	/* Mozilla Firefox 4 to 18 */
	
	input:focus:-moz-placeholder {
		color: transparent;
	}
	/* Mozilla Firefox 19+ */
	
	input:focus::-moz-placeholder {
		color: transparent;
	}
	/* Internet Explorer 10+ */
	
	input:focus:-ms-input-placeholder {
		color: transparent;
	}
	
	.loginForm .el-form-item {
		margin-bottom: 0;
	}
	
	.loginForm input {
		color:#fff;
		border:none;
		border-bottom:1px solid #fff;
		background:none;
		border-radius:0;
		margin-bottom:10px;
	}
	
	.loginForm input:hover {
		border-bottom: 1px solid #fff;
	}
	.loginForm input:focus {
		border-bottom: 1px solid #fff;
	}
	.login-btn .el-button--primary {
		width:280px;
		color: #fff;
		border:1px solid #fff;
		background:rgba(255,255,255,.2);
		font-size:1.5rem;
		line-height:21px;
	}
	.login-btn .el-button--primary:hover{
		background:rgba(255,255,255,.4)
	}
	.login-btn{
		margin-bottom:14px;
	}
	.bg-bubbles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	
	.bg-bubbles li {
		position: absolute;
		list-style: none;
		display: block;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.15);
		bottom: -160px;
		-webkit-animation: square 35s infinite;
		animation: square 35s infinite;
		-webkit-transition-timing-function: linear;
		transition-timing-function: linear;
	}
	
	.bg-bubbles li:nth-child(1) {
		left: 10%;
	}
	
	.bg-bubbles li:nth-child(2) {
		left: 20%;
		width: 80px;
		height: 80px;
		-webkit-animation-delay: 3s;
		animation-delay: 3s;
		-webkit-animation-duration: 27s;
		animation-duration: 27s;
	}
	
	.bg-bubbles li:nth-child(3) {
		left: 25%;
		-webkit-animation-delay: 5s;
		animation-delay: 5s;
	}
	
	.bg-bubbles li:nth-child(4) {
		left: 40%;
		width: 60px;
		height: 60px;
		-webkit-animation-duration: 32s;
		animation-duration: 32s;
		background-color: rgba(255, 255, 255, 0.25);
	}
	
	.bg-bubbles li:nth-child(5) {
		left: 70%;
	}
	
	.bg-bubbles li:nth-child(6) {
		left: 80%;
		width: 120px;
		height: 120px;
		-webkit-animation-delay: 4s;
		animation-delay: 4s;
		background-color: rgba(255, 255, 255, 0.2);
	}
	
	.bg-bubbles li:nth-child(7) {
		left: 32%;
		width: 160px;
		height: 160px;
		-webkit-animation-delay: 8s;
		animation-delay: 8s;
	}
	
	.bg-bubbles li:nth-child(8) {
		left: 55%;
		width: 20px;
		height: 20px;
		-webkit-animation-delay: 16s;
		animation-delay: 16s;
		-webkit-animation-duration: 50s;
		animation-duration: 50s;
	}
	
	.bg-bubbles li:nth-child(9) {
		left: 25%;
		width: 10px;
		height: 10px;
		-webkit-animation-delay: 3s;
		animation-delay: 3s;
		-webkit-animation-duration: 50s;
		animation-duration: 50s;
		background-color: rgba(255, 255, 255, 0.3);
	}
	
	.bg-bubbles li:nth-child(10) {
		left: 90%;
		width: 160px;
		height: 160px;
		-webkit-animation-delay: 12s;
		animation-delay: 12s;
	}
	
	@-webkit-keyframes square {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			-webkit-transform: translateY(-1110px) rotate(800deg);
			transform: translateY(-1110px) rotate(800deg);
		}
	}
	
	@keyframes square {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			-webkit-transform: translateY(-1110px) rotate(800deg);
			transform: translateY(-1110px) rotate(800deg);
		}
	}
	
	.tips {
		height: 36px;
		/*line-height: 36px;*/
		padding:0 10px;
		color: #fff;
		margin-bottom:10px;
	}
	
	.tips span:first-child {
		float: left;
		cursor: pointer;
	}
	
	.tips span:last-child {
		float: right;
		cursor: pointer;
	}
</style>