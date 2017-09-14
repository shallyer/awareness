<template>
	<div class="login-wrap">
		<div class="stars" style= "width:1000px;height:800px;">

		</div>
		<div class="ms-title">态势感知系统</div>
		<div class="ms-login">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
				<el-form-item prop="username">
					<el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				</div>
				<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
			</el-form>
		</div>
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
			submitForm(formName) {
				const _self = this;
				_self.$refs[formName].validate((valid) => {
					if(valid) {
						localStorage.setItem('ms_username', _self.ruleForm.username);
						_self.$router.push('/main');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		},
		mounted: function() {
			var mychart = this.$echarts.init($('.stars')[0]);
			console.log(mychart);
			mychart.setOption({
				backgroundColor: '#000',
				globe: {
					baseTexture: './data-1491890179041-Hkj-elqpe.jpg',
					heightTexture: './data-1491889019097-rJQYikcpl.jpg',

					displacementScale: 0.1,

					shading: 'lambert',

					environment: './data-1491837999815-H1_44Qtal.jpg',

					light: {
						ambient: {
							intensity: 0.1
						},
						main: {
							intensity: 1.5
						}
					},

					layers: [{
						type: 'blend',
						blendTo: 'emission',
						texture: './data-1491890291849-rJ2uee5ag.jpg'
					}, {
						type: 'overlay',
						texture: './data-1491890092270-BJEhJg96l.png',
						shading: 'lambert',
						distance: 5
					}]
				},
				series: []

			})
		}
	}
</script>

<style scoped>
	.login-wrap {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		/*perspective: 340px;*/
	}
	
	.ms-title {
		position: absolute;
		top: 50%;
		width: 100%;
		margin-top: -200px;
		text-align: center;
		font-size: 30px;
		color: #fff;
	}
	
	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 300px;
		height: 160px;
		margin: -130px 0 0 -190px;
		padding: 40px;
		border-radius: 5px;
		background: #fff;
	}
	
	.login-btn {
		text-align: center;
	}
	
	.login-btn button {
		width: 100%;
		height: 36px;
	}
</style>