
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">商品管理</template>
                <el-menu-item index="2-1">新增商品</el-menu-item>
                <el-menu-item index="2-2">编辑商品</el-menu-item>

            </el-submenu>
            <el-menu-item index="3">订单管理</el-menu-item>
            <el-menu-item index="4">地址管理</el-menu-item>
        </el-menu>

    </div>
</template>

<script>
export default {
	props: {
		activeIndex: {
			type: String,
			default: '1'
		}
	},

	data() {
		return {
			// activeIndex: '1',
		}
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
        }
	}
}
</script>
