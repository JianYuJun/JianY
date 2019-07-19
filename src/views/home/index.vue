<template>
  <!-- <div class="home">home</div> -->
  <el-container class="home-container">
    <!-- 头部 -->
   <el-header> 
     <div>  
        <img src="./heima.png" alt="">
        <span>电商后台管理系统</span>
     </div>
     <el-button type='info' @click='login'>退出</el-button>
   </el-header>
  <el-container>
    <!-- 侧边栏 -->
   <el-aside :width="isCollapse ? '64px' : '200px' ">
      <div class="toggle-button" @click='toggleSub'>||| </div> 
    <el-menu 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse='isCollapse' 
      unique-opened 
      :collapse-transition='false'
       router
      :default-active='activePath'>
      <!--:default-active  当前激活菜单的 index -->
    <!--:collapse='isCollapse'  是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） -->
    <!--:collapse-transition='false'  取消动画 -->
      <el-submenu :index="menu.id+''" v-for='menu in menus' :key='menu.id'>
          <template slot="title">
             <i :class="iconsObj[menu.id]"></i>
             <span>{{menu.authName}}</span>
          </template>
        <el-menu-item :index="'/'+subMenus.path+''"
                      v-for='subMenus in menu.children' 
                      :key='subMenus.id' 
                      @click="activeStop('/'+subMenus.path)">
          <template slot="title"> 
             <i class="el-icon-location"></i>
             <span slot="title">{{subMenus.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
   </el-aside>
    <!-- 主内容 -->
   <el-main>
     <router-view></router-view>
     </el-main>
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

      isCollapse:false,
     // 被激活的链接地址
      activePath: ''

    }
  },
  created(){
    this.getMenus()
    this.activePath =sessionStorage.getItem('activePath')
  },
  methods:{
    login(){
      sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleSub(){
       this.isCollapse=!this.isCollapse
    },
     async getMenus(){
      const {data:{data,meta}}= await this.$http.get('menus')
      // console.log(data)
      // console.log(meta)
      if(meta.status!==200) return this.$message.error(meta.msg)
      this.menus=data
    },
    activeStop(activePath){
     sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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