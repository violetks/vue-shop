<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <div class="avatar_box">
          <img src="../assets/logo.png" alt />
        </div>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="quit">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          router
          background-color="#079992"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconList: {
        '101': 'iconfont icon-user',
        '102': 'iconfont icon-tijikongjian',
        '103': 'iconfont icon-shangpin',
        '104': 'iconfont icon-danju',
        '105': 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    quit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      // var ress = JSON.parse(JSON.stringify(res.data))
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取菜单列表失败！')
      } else {
        // let arr = res.data.data
        // let newArr = arr.map(element => {
        //   return JSON.parse(JSON.stringify(element))
        // })
        // console.log('newArr:' + newArr)
        this.menulist = res.data
        console.log('menulist:' + this.menulist)
      }
    },
    // 点击按钮，折叠侧边菜单栏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #c7edcc;
}

.el-header :first-child {
  display: flex;
  justify-content: space-between;
}

.el-header span {
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-weight: bold;
}

.el-aside {
  background-color: #e3edcd;
}

.el-aside .el-menu {
  border-right: none;
}

.el-main {
  background-color: #f0f2f5;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.avatar_box {
  width: 30px;
  height: 30px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid #eee;
  box-shadow: 0 0 3px #ddd;
  background-color: #fff;
}

.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.iconfont {
  color: #fff;
  margin-right: 10px;
}

.el-menu-item i {
  color: #fff;
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