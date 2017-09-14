 <template>
    <div class="register-wrap">
        <div class="containera">
            <h1>找回密码</h1>
            <el-form class="registerForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">	
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.userName" placeholder="Username" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                     <el-form-item prop="email">
                    <el-input v-model="ruleForm.email" placeholder="email"></el-input>
                </el-form-item>  
                <el-form-item prop="Verification Code">
                    <el-input v-model="ruleForm.passWord" placeholder="Verification Code" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="register-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </div>
                <div class="tips">
                    <span @click="login">直接登录</span>
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
var common_tools = require("common_tools");
export default {
    data: function() {
        return {
            ruleForm: {
                userName: '',
                email: ''
            },
            rules: {
                email: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur,change'
                    }
                ],
                userName: [{
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
            }
        }
    },
    methods: {
        login() {
            this.$router.push('/login')
        },
        submitForm(formName) {
            var _self = this;
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    // common_tools.AJAX('POST', 'http://192.168.120.231:8080/user/regist', _self.ruleForm, function(data) {
                    // 	console.log(data)
                    //     if (data.flag == 0) {
                    //         $('.registerForm').fadeOut(500);
                    //         $('.register-wrap').addClass('form-success');
                    //         setTimeout(function() {
                    //             _self.$router.push('/main');
                    //         }, 1000)
                    //     } else{
                    //         console.log('用户已存在')
                    //     }

                    // }, function(data) {
                    		
                    //     console.log(data.status)
                    // })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })



        }
    },
    mounted: function() {

    }
}
</script>
<style>
.register-wrap {
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

.register-wrap.form-su  ccess .containera h1 {
    -webkit-transform: translateY(200px);
    -ms-transform: translateY(200px);
    transform: translateY(200px);
}

.containera {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 350px;
    padding: 80px 0;
    height: 400px;
    text-align: center;
    transform: translate(-50%, -50%);
    z-index: 9999;
}

.containera h1 {
    font-size: 40px;
    font-family: 'Source Sans Pro', sans-serif;
    color: #fff;
    -webkit-transition-duration: 1s;
    transition-duration: 1s;
    -webkit-transition-timing-function: ease-in-put;
    transition-timing-function: ease-in-put;
    font-weight: 200;
}

.registerForm {
    padding: 20px 0;
    position: relative;
    z-index: 2;
}

.registerForm .el-form-item.is-error .el-input__inner {
    border-bottom: 1px solid #fff;
}

.registerForm .el-form-item__error {
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

.registerForm ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
}

.registerForm :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    opacity: 1;
    font-weight: 300;
}

.registerForm ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    opacity: 1;
    font-weight: 300;
}

.registerForm :-ms-input-placeholder {
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

.registerForm .el-form-item {
    margin-top: 8%;
    margin-bottom: 0;
}

.registerForm input {
    color: #fff;
    border: none;
    border-bottom: 1px solid #fff;
    background: none;
    border-radius: 0;
    margin-bottom: 10px;
}

.registerForm input:hover {
    border-bottom: 1px solid #fff;
}

.registerForm input:focus {
    border-bottom: 1px solid #fff;
}

.register-btn .el-button--primary {
    margin-top: 8%;
    width: 350px;
    color: #fff;
    border: 1px solid #fff;
    background: rgba(255, 255, 255, .2);
    font-size: 1.5rem;
    line-height: 21px;
}

.register-btn .el-button--primary:hover {
    background: rgba(255, 255, 255, .4)
}

.register-btn {
    margin-bottom: 14px;
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
    margin-top: 10%;
    height: 36px;
    /*line-height: 36px;*/
    padding: 0 10px;
    color: #fff;
    margin-bottom: 10px;
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