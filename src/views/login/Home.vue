<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <div class="avatar_box">
          <img src="../../assets/logo.png" />
        </div>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="quit">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <el-tooltip content="我能伸能缩~~" placement="right">
          <div class="toggle-button" @click="toggleCollapse">
            <span v-if="isCollapse === false">|||</span>
            <span v-else>--</span>
          </div>
        </el-tooltip>
        <el-menu
          router
          background-color="#079992"
          text-color="#fff"
          :default-active="activePath"
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
              @click="saveNavState('/'+subItem.path)"
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
      menulist: [], // 左侧菜单数据
      iconList: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false, // 是否折叠
      activePath: '' // 被激活的链接地址
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    quit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error('获取菜单列表失败！')
      this.menulist = res.data
    },
    // 点击按钮，折叠侧边菜单栏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
  background-color: #2d3a4b;
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