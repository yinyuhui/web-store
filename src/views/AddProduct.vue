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
</style>

<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>商品管理</span>
		</nav-bread>

		<div class="product-form">
			<!-- <div class="page-title-normal">
				<h2 class="page-title-h2">
					<span>商品管理</span>
				</h2>
			</div> -->
			<el-card class="box-card">
				<div slot="header" class="clearfix" v-if="addNew">
					<span class="fz16">新增商品</span>
				</div>
				<div slot="header" class="clearfix" v-if="!addNew">
					<span>编辑商品</span>
					<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
				</div>
				<el-form :label-position="labelPosition" label-width="80px" :model="formData">
					<el-form-item label="商品名">
						<el-input v-model="formData.productName" class="width680"></el-input>
					</el-form-item>
					<el-form-item label="售价">
						<el-input v-model.number="formData.salePrice" class="width680"></el-input>
					</el-form-item>
					<el-form-item label="商品图片">
						<el-upload class="avatar-uploader" action="http://upload.qiniu.com" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="form">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="商品描述">
						<el-input class="width680" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入商品描述" v-model="formData.describe">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="cancelAdd" v-if="addNew">取消</el-button>
						<el-button @click="cancelEdit" v-if="!addNew">取消</el-button>
						<el-button type="primary" @click="submitForm">确认</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<el-dialog :visible.sync='isDeleteDialogShow' width="300px">
				<div>
					<p>你确定要删除这个商品吗？</p>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="onSubmitDelete">确 定</el-button>
					<el-button @click="onCancelDelete">取 消</el-button>
				</div>
			</el-dialog>
		</div>

		<!-- action="https://jsonplaceholder.typicode.com/photos/"  -->

		<nav-footer></nav-footer>
	</div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import './../assets/css/checkout.css'
import NavHeader from './Header'
import NavFooter from './Footer'
import NavBread from './Bread'
import axios from 'axios'

export default {
	components: {
		NavHeader,
		NavFooter,
		NavBread
	},

	data() {
		return {
			labelPosition: 'right',
			formData: {
				productName: '',
				describe: '',
				salePrice: ''
			},
			imageUrl: '',
			uploadToken: '1111',
			form: {
				key: '',
				token: ''
			},
			addNew: true,
			isDeleteDialogShow: false
		}
	},
	mounted() {
		this.getToken()
	},
	methods: {
		// 图片成功传到七牛上
		handleAvatarSuccess(res, file) {
			this.imageUrl = 'http://p04f9mqe1.bkt.clouddn.com/' + res.key
			// console.log(this.imageUrl)
			this.formData.productImage = res.key
			// console.log(this.formData.productImage)
		},

		// 图片上传之前
		beforeAvatarUpload(file) {
			this.form.key = file.name
			this.getToken()
		},

		// 获取图片上传token
		getToken() {
			axios.get('/goods/getToken').then(res => {
				this.form.token = res.data.result.uploadToken
			})
		},

		// 取消新增商品
		cancelAdd() {
			//
		},

		// 取消编辑商品
		cancelEdit() {
			//
		},

		// 点击表单确认，提交表单
		submitForm() {
			// console.log(this.formData)
			axios
				.post('/goods/addProduct', {
					productName: this.formData.productName,
					describe: this.formData.describe,
					salePrice: this.formData.salePrice,
					productImage: this.formData.productImage
				})
				// .post('/goods/addProduct', this.formData)
				.then(res => {
					// console.log(res.data)
				})
		},

		// 确定删除商品信息
		onSubmitDelete() {
			//
		},

		// 弹出框点取消
		onCancelDelete() {
			//
		}
	}
}
</script>

