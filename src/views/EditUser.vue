<style>
.product-form {
	margin: 30px 0;
	padding: 0 10px;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}

.width680 {
	max-width: 680px;
}

.el-card__body {
	padding: 40px 20px 20px 20px;
}

.el-form {
	margin: 10px auto;
}

.tips {
	color: #f26951;
}
</style>

<template>
	<div>
		<nav-header></nav-header>
		<!-- <nav-bread>
			<span>商品管理</span>
		</nav-bread> -->
		<nav-menu :activeIndex="'6-2'"></nav-menu>

		<div class="product-form">
			<el-card class="box-card">
				<div slot="header" class="clearfix fz16">
					<el-button icon="el-icon-arrow-left" circle style="padding: 5px;" @click="goBack"></el-button>
					<span>编辑用户</span>

					<el-button type="danger" icon="el-icon-delete" circle style="float: right; padding: 5px;" @click="deleteUser(userId) "></el-button>
				</div>
				<el-form :label-position="labelPosition" label-width="100px" :model="formData">
					<el-form-item label="用户名">
						<el-input v-model="formData.userName" class="width680"></el-input>
					</el-form-item>

					<el-form-item label="密码">
						<el-input v-model="formData.userPwd" class="width680"></el-input>
					</el-form-item>

					<el-form-item label="用户角色">
						<el-select v-model="formData.roleType" placeholder="请选择用户角色">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<p class="tips">消费者可以查看首页、详情页，商品加入购物车，查看、编辑购物车，完成下单流程，管理地址与订单</p>
						<p class="tips">管理员可以查看首页、详情页，管理和新增商品、用户，查看商品下单与支付转化率</p>
					</el-form-item>

					<el-form-item></el-form-item>
					<el-form-item>
						<el-button @click="goBack">取消</el-button>
						<el-button type="primary" @click="submitForm">确认</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<el-dialog :visible.sync='isDeleteDialogShow'>
				<div>
					<p>你确定要删除这个用户吗？</p>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="onSubmitDelete">确 定</el-button>
					<el-button @click="onCancelDelete">取 消</el-button>
				</div>
			</el-dialog>
		</div>

		<nav-footer></nav-footer>
	</div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import './../assets/css/checkout.css'
import NavHeader from './../components/Header'
import NavFooter from './../components/Footer'
import NavBread from './../components/Bread'
import NavMenu from './../components/Menu'
import axios from 'axios'

export default {
	components: {
		NavHeader,
		NavFooter,
		NavBread,
		NavMenu
	},

	data() {
		return {
			labelPosition: 'right',
			formData: {
				userName: '',
				userPwd: '',
				roleType: ''
			},

			options: [
				{
					value: 'user',
					label: '消费者'
				},
				{
					value: 'admin',
					label: '管理者'
				}
			],

			userId: '',
			isDeleteDialogShow: false
		}
	},
	mounted() {
		this.userId = this.$route.query.userId
		this.init()
	},
	methods: {
		init() {
			axios.post('/users/userDetail', { userId: this.userId }).then(res => {
				this.formData = res.data.result
				// console.log(this.formData)
			})
		},

		// 点击表单确认，提交表单
		submitForm() {
			axios
				.post('/users/editUser', {
					userId: this.userId,
					userName: this.formData.userName,
					userPwd: this.formData.userPwd,
					roleType: this.formData.roleType
				})
				// .post('/goods/addProduct', this.formData)
				.then(res => {
					this.$router.go(-1)
				})
		},

		// 后退
		goBack() {
			this.$router.go(-1)
		},

		// 弹出框点取消
		onCancelDelete() {
			this.isDeleteDialogShow = false
		},

		// 删除按钮
		deleteUser() {
			this.isDeleteDialogShow = true
		},

		// 确认删除用户
		onSubmitDelete() {
			axios
				.post('/users/userDel', {
					userId: this.userId
				})
				.then(res => {
					if (res.data.status === '0') {
						this.isDeleteDialogShow = false
						this.goBack()
					}
				})
		},
	}
}
</script>

