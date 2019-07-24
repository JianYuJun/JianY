<template>
  <div> 
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <!-- 按钮 -->
          <el-button type="primary" @click="dialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!--主内容 -->
      <el-table :data="RolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
           <el-row  v-for="(item1,index) in scope.row.children" :key='item1.id' 
                    :class="['bdbottom ',index===0 ?'bdtop':'','vcenter']">
              <!-- 渲染一级权限 -->
              <el-col :span="5" >
                 <el-tag  closable @close="removeRightById(scope.row, item1.id)" >{{item1.authName}}</el-tag>
                 <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <el-row v-for="(item2,index) in item1.children" :key='item2.id' 
                        :class="[index===0?'':'bdtop', 'vcenter']" >
                        <el-col :span="6">
                      <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--渲染三级权限  -->
                  <el-col :span="18">
                  <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id"  closable @close="removeRightById(scope.row, item3.id)" >
                     {{item3.authName}}
                  </el-tag>
                  </el-col>
               </el-row>
              </el-col>
           </el-row>
          </template>
        </el-table-column>
         <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
           <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit"
                       @click="XiuaddUser(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete"
                       @click="DelUser(scope.row.id)">删除</el-button>
              <el-button size="mini" type="warning" icon="el-icon-setting" 
                       @click="showSetRightDialog(scope.row)">分配权限</el-button>
           </template>
        </el-table-column>
      </el-table>
<!-- 添加用户 -->
<el-dialog
     title="添加用户"
     :visible.sync="dialogVisible"
     width="50%"
     @close='addDialogClosed'
    >
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
        
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  
</el-dialog>
<!-- 修改用户 -->
  <el-dialog
     title="修改用户"
     :visible.sync="editdialy"
     width="50%"
      @close='edDialogClosed'
     >
    <el-form :model="edmian" :rules="addFormRules" ref="edFormRef" label-width="70px">
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="edmian.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="edmian.roleDesc"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialy = false">取 消</el-button>
    <el-button type="primary" @click="edUserfrom">确 定</el-button>
  </span>
</el-dialog>
  
    </el-card>
    <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%"
        @close="setRightDialogClosed"
        >
        <!-- 树形控件 -->
        <el-tree :data="addRights" 
                 :props="defaultProps"
                  show-checkbox node-key="id"
                 default-expand-all 
                 :default-checked-keys="defKeys" 
                  ref="treeRef">
      </el-tree>
     <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
     </span>
    </el-dialog>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
        RolesList:[],
         // 所有权限的数据
        rightslist: [],
           // 添加用户
        dialogVisible:false,
         // 控制分配权限对话框的显示与隐藏
        setRightDialogVisible: false,
        rightsdialogVisible:false,
          // 所有权限的数据
        addRights:[],
          // 修改用户
        editdialy:false,
          // 默认选中的节点Id值数组
        defKeys: [],
         // 当前即将分配权限的角色id
        roleId: '',
        //  <!-- 树形控件 -->
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
         // 添加用户的表单数据
      addForm: {
        roleName: '',
        roleDesc: '',
      },
      // <!-- 修改用户 -->
        edmian:{}, 
      // <!-- 添加用户  修改用户-->
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {min: 2,max: 10,message: '名称长度在2~10个字符之间',trigger: 'blur'}
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          {min: 2,max: 10,message: '描述长度在2~10个字符之间',trigger: 'blur'}
        ],
      }
    }
  },
  // 初始化
  created(){
    this.getRolesList()
  },
  methods:{
    // 主内容
    async  getRolesList(){
        const {data:res} = await this.$http.get('roles')
        // console.log(res)
      if(res.meta.status!==200){
         this.$message.error('失败')
      }
        this.RolesList=res.data
    },
    // 权限 删除
   async removeRightById(row,rightId){
     try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
            const {data:res}= await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
        //  console.log(res)
        if(res.meta.status!==200){
             this.$message.error('删除失败')
        }
             this.$message.success('删除成功')
            //  this.editdialy=false
            //  this.getUserList()
            row.children=res.data
   }  
      catch(err){
       this.$message.info('取消删除')
      }
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
         const {data:res}= await this.$http.post('roles',this.addForm)
        //  console.log(res)
       if(res.meta.status!==201){
         this.$message.error('添加失败')
       }
         this.$message.success('添加成功')
         this.dialogVisible=false
        //  console.log(res.data)
         this.addForm=res.data
         this.getRolesList()
     })
   },
       //  编辑
   async  XiuaddUser(id){
     const {data:res}= await this.$http.get('roles/'+ id)
    //  console.log(res)
     if(res.meta.status!==200) {
         return this.$message.error('修改用户失败')
     }
         //  this.$message.success('修改用户成功')
         this.edmian=res.data
         // this.getRolesList()
         this.editdialy = true
   },
   edDialogClosed(){
        this.$refs.edFormRef.resetFields()
   },
     //  编辑 点击确定
   edUserfrom(){
    //  console.log(1);
      this.$refs.edFormRef.validate( async valid=>{
           if(!valid) return
           const {data:res}= await this.$http.put('roles/'+ this.edmian.roleId ,this.edmian)
        //  console.log(res)
        if(res.meta.status!==200){
           this.$message.error('修改失败')
        }
           this.$message.success('修改成功')
           this.editdialy=false
           this.getRolesList()
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
           const {data:res}= await this.$http.delete('roles/'+id)
        //  console.log(res)
        if(res.meta.status!==200){
         this.$message.error('删除失败')
        }
         this.$message.success('删除成功')
        //  this.editdialy=false
         this.getRolesList()
     }  
      catch(err){
       this.$message.info('取消删除')
      }
   },
      //  分配权限
    async showSetRightDialog(role){
        const {data:res} = await this.$http.get('rights/tree')
        // console.log(res)
      if(res.meta.status!==200) return this.$message.error('失败')
           // 递归获取三级节点的Id
          this.getLeafKeys(role, this.defKeys)
          // console.log(res.data)
          this.addRights = res.data
          // console.log(this.addRights)
          this.setRightDialogVisible= true
          // this.$message.success('成功') 
    },
   
     // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
     // 点击为角色分配权限
    async allotRights() {
       // console.log(1)
      //getCheckedKeys()  若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
      //getHalfCheckedKeys() 	若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(keys)
       const idStr = keys.join(',')
      // console.log(idStr)
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
          //  console.log(111)
      if (res.meta.status !== 200) return this.$message.error('分配权限失败！')
      this.$message.success('分配权限成功！')
      this.getRolesList()
      this.setRightDialogVisible = false
    }
  }
}
</script>
<style lang='less' scoped >
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>