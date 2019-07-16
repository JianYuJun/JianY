<template>
  <div class="login">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar-box">
        <img src="./logo.png">
      </div>
       <el-form class="login_form" :model='login' :rules='FromRelus' ref='resetLogin'>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- autofocus   自动获得焦点--> 
          <el-input prefix-icon="iconfont icon-user" autofocus v-model='login.username'></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model='login.password' ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" >登录</el-button>
          <el-button type="info"  @click='del'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      login:{
        username:'admin',
        password:'123456'
      },
     FromRelus:{
         username:[
               { required: true, message: '请输入用户名称', trigger: 'blur' },
               { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
        //  required: true, 必填   trigger: 'blur'  失去焦点触发
         password:[ { required: true, message: '请输入用户密码', trigger: 'blur' },
               { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
         ]
     }
      
    }
   
  },methods:{
    del(){
      this.$refs.resetLogin.resetFields()
      this.login.username=this.login.password=''
      // console.log(this)
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