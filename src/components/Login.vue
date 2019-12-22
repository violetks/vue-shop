<template>
  <div class="login_container">
    <div>
      <div class="login_box">
        <!-- 标题区域 -->
        <div class="title-container">
          <h1>电商后台管理系统</h1>
        </div>

        <!-- Logo区域 -->
        <div class="avatar_box">
          <img src="../assets/logo.png" alt />
        </div>

        <!-- 登录表单区域 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              type="text"
              tabindex="1"
              v-model="loginForm.username"
              prefix-icon="iconfont icon-user"
              placeholder="Username"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              tabindex="2"
              v-model="loginForm.password"
              prefix-icon="iconfont icon-3702mima"
              placeholder="Password"
              show-password
            >
            </el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // valid验证结果：true/false
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm) // 解构赋值
        // console.log(res); // res里面有token
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success(res.meta.msg)
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token只在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped>
.login_container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;
}

.login_box {
  position: absolute;
  width: 520px;
  max-width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 标题区域 */
.title-container {
  position: relative;
}

.title-container h1 {
  color: #eee;
  text-align: center;
  margin: 0 auto 60px auto;
}

/* 表单区域 */
.login_form {
  bottom: 0;
  background-color: rgba(250, 242, 242, 0.8);
  padding: 70px 20px 5px 20px;
  box-sizing: border-box;
  border-radius: 3px;
}

.avatar_box {
  width: 80px;
  height: 80px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>