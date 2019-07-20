<template>
  <div>
    <!-- 头部 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
  <el-card>
    <el-row :gutter="20">
      <el-col :span="10" >
        <el-input placeholder="请输入内容"   clearable @clear='getUserList' v-model='queryInfo.query'>
           <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
          <el-col :span="4"><el-button type="primary" @click="dialogVisible=true">添加用户</el-button></el-col>
    </el-row>
<!-- 主内容 -->
  <el-table
    :data="users"
    border stripe
    >
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      >
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      >
    </el-table-column>
     <el-table-column
      prop="role_name"
      label="角色"
      >
    </el-table-column>
    <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
    
    <el-table-column label="操作" width="175px">
     <template slot-scope="scope">
             <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="XiuaddUser(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="DelUser(scope.row.id)" ></el-button>
        <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
             <!-- 设置 -->
            <el-button type="warning" icon="el-icon-setting" size="mini" ></el-button>
        </el-tooltip>
    
     </template>
    </el-table-column>
  </el-table>
  <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size=" queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        <!-- current-change	currentPage 改变时会触发	当前页 -->
    <!-- size-change	pageSize 改变时会触发	每页条数 -->
    <!-- current-page	当前页数， -->
    <!-- page-size	每页显示条目个数 -->
    <!-- page-sizes	每页显示个数选择器的选项设置 -->
    <!-- total	总条目数 -->
    <!-- layout	组件布局，子组件名用逗号分隔 -->
    <el-dialog
     title="提示"
     :visible.sync="dialogVisible"
     width="50%"
     @close='addDialogClosed'
    >
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 添加用户 -->
   <el-dialog
     title="添加用户"
     :visible.sync="dialogVisible"
     width="50%"
     @close='addDialogClosed'
    >
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  <!-- 修改用户 -->
</el-dialog>
   <el-dialog
     title="修改用户"
     :visible.sync="editdialy"
     width="50%"
      @close='edDialogClosed'
     >
    <el-form :model="edmian" :rules="addFormRules" ref="edFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="edmian.username"  disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="edmian.email"></el-input>
        </el-form-item>
          <el-form-item label="手机" prop="mobile">
          <el-input v-model="edmian.mobile"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialy = false">取 消</el-button>
    <el-button type="primary" @click="edUserfrom">确 定</el-button>
  </span>
</el-dialog>
 
   
  </el-card>
  </div>
</template>
<script>
export default {
   data(){
     // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return{
      users:[],
      total:0,
      // 添加用户
      dialogVisible:false,
      // 修改用户
      editdialy:false,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
       // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      // 修改用户数据
      edmian:{

          }
    }
  },
  created(){
     this.getUserList()
  },
  methods:{
    async getUserList(){
        const {data:res}= await this.$http.get('users',{params:this.queryInfo})
        // console.log(res)
      if(res.meta.status!==200) return this.$message.error('获取用户失败')
        // this.$message.success('获取用户成功')
        this.users=res.data.users
        this.total=res.data.total
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum=newPage
      this.getUserList()
    },
    async userStateChanged(userIfon){
        const {data:{data,meta}}= await this.$http.put(`users/${userIfon.id}}/state/${userIfon.mg_state}`)
        // console.log(data)
      if(meta.status!==200){
        userIfon.mg_state=!userIfon.mg_state
         return this.$message.error('用户获取失败')
      }
        this.$message.success('用户获取成功')
    },
    // 监听添加用户对话框的关闭事件
   addDialogClosed(){
     this.$refs.addFormRef.resetFields()
   },
  //添加用户  点击确定
   addUser(){
    //  重置
     this.$refs.addFormRef.validate( async valid=>{
         if(!valid) return
         const {data:res}= await this.$http.post('users',this.addForm)
        //  console.log(res)
       if(res.meta.status!==201){
         this.$message.error('添加失败')
       }
         this.$message.success('添加成功')
         this.dialogVisible=false
         this.getUserList()

     })
    
   },
  //  修改
   async  XiuaddUser(id){
     const {data:res}= await this.$http.get('users/'+ id)
    //  console.log(res)
     if(res.meta.status!==200) {
      return this.$message.error('修改用户失败')
     }
      //  this.$message.success('修改用户成功')
       this.edmian=res.data
       this.editdialy = true
   },
   edDialogClosed(){
    this.$refs.edFormRef.resetFields()
   },
    //  修改 点击确定
   edUserfrom(){
    //  console.log(1);
      this.$refs.edFormRef.validate( async valid=>{
         if(!valid) return
         const {data:res}= await this.$http.put('users/'+ this.edmian.id ,this.edmian)
        //  console.log(res)
       if(res.meta.status!==200){
         this.$message.error('修改失败')
       }
         this.$message.success('修改成功')
         this.editdialy=false
         this.getUserList()

      })
   },
    //  点击删除
   async DelUser(id){
     try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
           const {data:res}= await this.$http.delete('users/'+id)
        //  console.log(res)
       if(res.meta.status!==200){
         this.$message.error('删除失败')
       }
         this.$message.success('删除成功')
        //  this.editdialy=false
         this.getUserList()
      }  
      catch(err){
       this.$message.info('取消删除')
      }
   }
  }
}
</script>
<style >
</style>