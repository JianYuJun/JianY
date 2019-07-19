<template>
  <div class="login">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar-box">
        <img src="./logo.png">
      </div>
      <!--:model='logins'  是绑定我们form表单中需要提交给后台的一个对象 -->
      <!-- :rules='ResultFrom'  是动态绑定的rules，表单验证规则 -->
       <el-form class="login_form" :model='logins' :rules='ResultFrom'  ref='resetLogin'>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- autofocus   自动获得焦点--> 
          <el-input prefix-icon="iconfont icon-user" v-model='logins.username' autofocus></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model='logins.password'></el-input>
        </el-form-item>
        <!-- ------------------------------ -->
       
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click='del' >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { constants } from 'crypto';
// 暴露
export default {
  data(){
    return{
      logins:{
          username:'admin',
          password:'123456'
      },
      // 表单验证规则
      ResultFrom:{
        username:[
          // required: true, 表示必填
          // trigger: 'blur'  失去焦点触发
               { required: true, message: '请输入用户名称', trigger: 'blur' },
               { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password:[ 
               { required: true, message: '请输入用户密码', trigger: 'blur' },
               { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    // 重置
    del(){
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.resetLogin.resetFields()
      this.logins.username=this.logins.password=''
    },
    // 登录
    login(){
      // validate  对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
      // 并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
     this.$refs.resetLogin.validate(async valid=>{
        //  console.log(valid)   true   false
        if(!valid) return
        // promise  
        // this.logins 请求数据
        // 'login' 请求地址
        // 发送axios
      const {data:res}= await  this.$http.post('login',this.logins)
      // console.log(res)
      if(res.meta.status!==200) return this.$message.error('登录失败')
      this.$message('登录成功')
      //  this.$message(res.meta.msg)
      // 获取本地存储token值
      sessionStorage.setItem('token',res.data.token)
      // 跳转页面
          this.$router.push('/home')
    })
   }
  }
};
</script>
<style lang='less' scoped>
.login{
  height: 100%;
  background-color: #2b4b6b;
.login-box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
 .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .btns {
  display: flex;
  justify-content: flex-end;
}


   }
  }
}
</style>