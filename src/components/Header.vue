<style scoped>
.errorTip {
	color: #f56c6c;
	margin-bottom: 8px;
}
.elinput {
	margin-bottom: 22px;
}

.navbar-left-container {
	margin-left: 1px;
}

.pointer {
	cursor: pointer;
}
</style>


<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/logo.png">开启智慧生活
        </a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">

          <a href="javascript:void(0)" class="navbar-link" @click="login" v-if="!name">登录</a>
          <el-dropdown v-if="name" class="pointer" @command="handleCommand">
            <span class="el-dropdown-link">
              {{name}}
              <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="editProduct">商品管理</el-dropdown-item>
              <el-dropdown-item command="addProduct">新增商品</el-dropdown-item>
              <el-dropdown-item command="order">订单列表</el-dropdown-item>
              <el-dropdown-item command="address">地址管理</el-dropdown-item> -->
              <!-- <el-dropdown-item command="logout" divided @click="logout">退出</el-dropdown-item> -->
              <el-dropdown-item command="logout" @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-badge :value="cartLength" class="item" v-if="roleType==='user'">
            <div class="navbar-cart-container">
              <span class="navbar-cart-count"></span>
              <a class="navbar-link navbar-cart-link" href="javascript:void(0)" @click="goCart">
                <svg class="navbar-cart-logo">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                </svg>
              </a>
            </div>
          </el-badge>
        </div>

        <!-- 登录弹窗 -->
        <el-dialog title="登录" :visible.sync='dialogFormVisible'>
          <div class="errorTip" v-show="errorTip">
            <p>
              <i class="el-icon-error"> </i> 用户名/密码为空或错误</p>
          </div>
          <el-input v-model="userName" auto-complete="off" class="elinput" placeholder="请输入用户名" prefix-icon="el-icon-edit">
          </el-input>
          <el-input v-model="userPwd" auto-complete="off" class="elinput" placeholder="请输入密码" prefix-icon="el-icon-edit" @keyup.enter.native="onSubmit">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </header>
</template>
<script>
import axios from 'axios'
export default {
	data() {
		return {
			form: {},
			userName: 'user01',
			userPwd: '123456',
			dialogFormVisible: false,
			errorTip: false,
			name: '',
			cartLength: 0,
			roleType: 'visitor'
		}
	},

	mounted() {
		this.checkLogin()

		// 获取购物车中商品数量
		axios.get('/users/cartList').then(res => {
			// console.log(res.data.result)
			res.data.result.forEach(item => {
				this.cartLength += parseInt(item.productNum)
			})
			// this.cartLength = res.data.result.length
		})

		this.roleType = this.getCookie('roleType')
	},
	methods: {
		// 下拉菜单点击处理
		handleCommand(command) {
			if (command === 'logout') {
				this.logout()
			}
			if (command === 'order') {
				this.goOrderList()
			}
			if (command === 'address') {
				this.goAddressList()
			}
			if (command === 'addProduct') {
				this.goAddProduct()
			}
			if (command === 'editProduct') {
				this.goEditProduct()
			}
		},

		// 订单列表页
		goOrderList() {
			this.$router.push({ path: '/orderList' })
		},

		// 商品管理页
		goAddProduct() {
			this.$router.push({ path: '/addProduct' })
		},

		// 商品管理页
		goEditProduct() {
			this.$router.push({ path: '/editProduct' })
		},

		// 地址列表页
		goAddressList() {
			this.$router.push({ path: '/addressList' })
		},

		goCart() {
			this.$router.push({ path: '/cart' })
		},

		// 验证一小时内是否登录了
		checkLogin() {
			axios.get('/users/checkLogin').then(res => {
				if (res.data.status === '0') {
					this.name = res.data.result
				}
			})
		},

		// 登录
		login() {
			this.errorTip = false
			this.dialogFormVisible = true
		},

		// 登出
		logout() {
			axios.post('/users/logout').then(res => {
				if (res.data.status === '0') {
					this.name = ''
					this.$router.push('/')
					location.reload()
				}
			})
		},

		// 登录取消按钮
		onCancel() {
			this.dialogFormVisible = false
		},

		// 登录确认按钮
		onSubmit() {
			if (!this.userName || !this.userPwd) {
				this.errorTip = true
				return
			}
			axios
				.post('/users/login', {
					userName: this.userName,
					userPwd: this.userPwd
				})
				.then(res => {
					if (res.data.status === '0') {
						this.name = res.data.result.userName
						this.dialogFormVisible = false
						this.errorTip = false
					} else {
						this.errorTip = true
					}
				})

				location.reload()
		},

		//我们定义一个函数，用来读取特定的cookie值。
		getCookie(cookie_name) {
			var allcookies = document.cookie
			var cookie_pos = allcookies.indexOf(cookie_name)

			// 如果找到了索引，就代表cookie存在，
			// 反之，就说明不存在。
			if (cookie_pos != -1) {
				// 把cookie_pos放在值的开始，只要给值加1即可。
				cookie_pos += cookie_name.length + 1
				var cookie_end = allcookies.indexOf(';', cookie_pos)

				if (cookie_end == -1) {
					cookie_end = allcookies.length
				}

				var value = unescape(allcookies.substring(cookie_pos, cookie_end))
			}

			return value
		}
	}
}
</script>