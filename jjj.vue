<template>
  <!-- <div class="home">home</div> -->
  
  <el-container class="home-container">
    <!-- 头部 -->
   <el-header> 
     <div>  
       <img src="./heima.png" alt="">
       <span>电商后台管理系统</span>
     </div>
      <el-button type='info' @click='logout'>退出</el-button>
   </el-header>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ?'64px':'200px'">
      <div class="toggle-button" @click='toggleSub'>||| </div> 
     <el-menu 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened 
      :collapse='isCollapse'
      :collapse-transition='false'
      >
      <el-submenu :index="menu.id+''" v-for='menu in menus' :key='menu.id'>
        <template slot="title">
          <i :class="iconsObj[menu.id]"></i>
          <span>{{menu.authName}}</span>
        </template>
      <el-menu-item :index="subMenu.id+''" v-for='subMenu in menu.children' :key='subMenu.id'>
        <template slot="title"> 
          <i class="el-icon-location"></i>
        <span slot="title">{{subMenu.authName}}</span>
        </template>
      </el-menu-item>
      </el-submenu>
     
    </el-menu>
    </el-aside>
    <!-- 主内容 -->
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>
<script>
import { constants } from 'crypto';
export default {
  data(){
    return{
      menus:[],
       iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse:false
    }
  },
  created(){
    this.getMenus()
  },
   methods:{
     logout(){
       sessionStorage.clear()
       this.$router.push('/login')
     },
     async getMenus(){
         const {data:{data,meta}}=await this.$http.get('menus')
        //  console.log(res)
         if(meta.status!==200) return this.$message.error(meta.msg)
            // console.log(data)  
           this.menus=data
          
     },
     toggleSub(){
    this.isCollapse=!this.isCollapse
     }
   }
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>