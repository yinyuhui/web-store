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
		<!-- <nav-bread>
			<span>商品管理</span>
		</nav-bread> -->
		<nav-menu :activeIndex="'2-2'"></nav-menu>

		<div class="product-form">
			<el-card class="box-card">
				<div slot="header" class="clearfix fz16">
					<el-button icon="el-icon-arrow-left" circle style="padding: 5px;" @click="goBack"></el-button>
					<span> 编辑商品</span>

					<el-button type="danger" icon="el-icon-delete" circle style="float: right; padding: 5px;" @click="deleteProduct(productId) "></el-button>
				</div>
				<el-form :label-position="labelPosition" label-width="100px" :model="formData">
					<el-form-item label="商品名">
						<el-input v-model="formData.productName" class="width680"></el-input>
					</el-form-item>
					<el-form-item label="售价">
						<el-input v-model.number="formData.salePrice" class="width680"></el-input>
					</el-form-item>
					<el-form-item label="图片">
						<el-upload class="avatar-uploader" action="http://upload.qiniu.com" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="form" :show-file-list="false">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="描述">
						<el-input class="width680" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入商品描述" v-model="formData.describe">
						</el-input>
					</el-form-item>
					<el-form-item label="所属分类">
						<el-select v-model="formData.classify" placeholder="请选择商品分类">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button @click="goList">取消</el-button>
						<el-button type="primary" @click="submitForm">确认</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<el-dialog :visible.sync='isDeleteDialogShow'>
				<div>
					<p>你确定要删除这个商品吗？</p>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="onSubmitDelete">确 定</el-button>
					<el-button @click="onCancelDelete">取 消</el-button>
				</div>
			</el-dialog>

			<el-dialog :visible.sync='tip'>
				<div>
					<p>提交成功</p>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="goList">去管理商品</el-button>
					<el-button @click="tip=false">留在此页面</el-button>
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
				productName: '',
				describe: '',
				classify:'',
				salePrice: ''
			},
			imageUrl: '',
			uploadToken: '',
			form: {
				key: '',
				token: ''
			},
			isDeleteDialogShow: false,
			tip: false,
			productId: '',
			options:[{
				value: 'phone',
				label: '手机'
			},{
				value: 'computer',
				label: '笔记本'
			},{
				value: 'headset',
				label: '耳机'
			},{
				value: 'soundBox',
				label: '音箱'
			},{
				value: 'other',
				label: '其他'
			}],
			
		}
	},
	mounted() {
		this.getToken()
		this.productId = this.$route.query.productId
		this.init()
		// console.log(this.imageUrl)
	},
	methods: {
		init() {
			axios.post('/goods/productDetail', { productId: this.productId }).then(res => {
				this.formData.productName = res.data.result.productName
				this.formData.describe = res.data.result.describe
				this.formData.salePrice = res.data.result.salePrice
				this.formData.classify = res.data.result.classify
				this.formData.productImage = res.data.result.productImage
				this.imageUrl = 'http://p04f9mqe1.bkt.clouddn.com/' + res.data.result.productImage
			})
		},

		// 图片成功传到七牛上
		handleAvatarSuccess(res, file) {
			this.imageUrl = 'http://p04f9mqe1.bkt.clouddn.com/' + res.key
			this.formData.productImage = res.key
			console.log(this.formData.productImage)
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

		// 取消按钮 取消编辑商品 
		// 编辑时取消不能置空，直接返回列表
		// cancelEdit() {
		// 	this.formData = {
		// 		productName: '',
		// 		describe: '',
		// 		salePrice: '',
		// 		classify:''
		// 	}
		// 	this.imageUrl = ''
		// 	this.formData.productImage = ''
		// },

		// 点击表单确认，提交表单
		submitForm() {
			// console.log(this.formData)
			axios
				.post('/goods/editProduct', {
					productId: this.productId,
					productName: this.formData.productName,
					describe: this.formData.describe,
					salePrice: this.formData.salePrice,
					productImage: this.formData.productImage,
					classify: this.formData.classify
				})
				// .post('/goods/editProduct', this.formData)
				.then(res => {
					// this.formData = {
					// 	productName: '',
					// 	describe: '',
					// 	salePrice: '',
					// 	productImage: ''
					// }
					// this.imageUrl = ''
					this.tip = true
				})
		},

		// 确认删除商品
		onSubmitDelete() {
			axios
				.post('/goods/productDel', {
					productId: this.productId
				})
				.then(res => {
					if (res.data.status === '0') {
						this.isDeleteDialogShow = false
						this.init()
					}
				})
		},

		// 删除按钮
		deleteProduct() {
			this.isDeleteDialogShow = true
		},

		// 弹出框点取消
		onCancelDelete() {
			this.isDeleteDialogShow = false
		},

		// 去管理商品页面
		goList() {
			this.$router.push('/editProduct')
		},

		// 后退
		goBack() {
			this.$router.go(-1)
		},
	}
}
</script>

