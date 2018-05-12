
<template>
	<div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">首页</el-menu-item>

			<el-submenu index="2" v-if="roleType==='admin'">
				<template slot="title">商品管理</template>
				<el-menu-item index="2-1">新增商品</el-menu-item>
				<el-menu-item index="2-2">编辑商品</el-menu-item>
			</el-submenu>

			<el-menu-item index="3" v-if="roleType==='user'">订单管理</el-menu-item>

			<el-menu-item index="4" v-if="roleType==='user'">地址管理</el-menu-item>

			<el-menu-item index="5" v-if="roleType==='admin'">转化率</el-menu-item>
			
			<el-submenu index="6" v-if="roleType==='admin'">
				<template slot="title">用户管理</template>
				<el-menu-item index="6-1">新增用户</el-menu-item>
				<el-menu-item index="6-2">编辑用户</el-menu-item>
			</el-submenu>

		</el-menu>

	</div>
</template>

<script>
// import { getCookie } from './../util/util'

export default {
	props: {
		activeIndex: {
			type: String,
			default: '1'
		}
	},

	data() {
		return {
			roleType: 'visitor'
		}
	},

	mounted() {
		this.roleType = this.getCookie('roleType')
		console.log(this.roleType)
	},

	methods: {
		handleSelect(key) {
			if (key === '1') {
				this.$router.push({ path: '/' })
			}
			if (key === '2-1') {
				this.$router.push({ path: '/addProduct' })
			}
			if (key === '2-2') {
				this.$router.push({ path: '/editProduct' })
			}
			if (key === '3') {
				this.$router.push({ path: '/orderList' })
			}
			if (key === '4') {
				this.$router.push({ path: '/addressList' })
			}
			if (key === '5') {
				this.$router.push({ path: '/statistics' })
			}
			if (key === '6-1') {
				this.$router.push({ path: '/addUser' })
			}
			if (key === '6-2') {
				this.$router.push({ path: '/userList' })
			}
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
