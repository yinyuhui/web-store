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

.el-form{
	margin: 10px auto
}
</style>

<template>
	<div>
		<nav-header></nav-header>
		<!-- <nav-bread>
			<span>商品管理</span>
		</nav-bread> -->
		<nav-menu :activeIndex="'2-1'"></nav-menu>

		<div class="product-form">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>新增商品</span>
				</div>
				<el-form :label-position="labelPosition" label-width="100px" :model="formData">
					<el-form-item label="商品名">
						<el-input v-model="formData.productName" class="width680"></el-input>
					</el-form-item>
					<el-form-item label="售价">
						<el-input v-model.number="formData.salePrice" class="width680"></el-input>
					</el-form-item>
					<el-form-item label="商品图片">
						<el-upload class="avatar-uploader" action="http://upload.qiniu.com" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="form" :show-file-list="false">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="描述">
						<el-input class="width680" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入商品描述" v-model="formData.describe">
						</el-input>
					</el-form-item>
					<el-form-item label="详情图片">
						<el-upload class="avatar-uploader" action="http://upload.qiniu.com" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload" :data="form" :show-file-list="false">
							<img v-if="imageUrl1" :src="imageUrl1" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="所属分类">
						<el-select v-model="formData.classify" placeholder="请选择商品分类">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button @click="cancelAdd">取消</el-button>
						<el-button type="primary" @click="submitForm">确认</el-button>
					</el-form-item>
				</el-form>
			</el-card>

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
				salePrice: '',
				classify:''
			},
			imageUrl: '',
			imageUrl1: '',
			uploadToken: '',
			form: {
				key: '',
				token: ''
			},
			tip: false,
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
	},
	methods: {
		// 图片成功传到七牛上
		handleAvatarSuccess(res, file) {
			this.imageUrl = 'http://p04f9mqe1.bkt.clouddn.com/' + res.key
			this.formData.productImage = res.key
		},

		handleAvatarSuccess1(res, file) {
			this.imageUrl1 = 'http://p04f9mqe1.bkt.clouddn.com/' + res.key
			this.formData.describeImg = res.key
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
			this.formData= {
				productName: '',
				describe: '',
				salePrice: '',
				classify:''
			},
			this.imageUrl= '',
			this.formData.productImage = ''
		},

		// 点击表单确认，提交表单
		submitForm() {
			axios
				.post('/goods/addProduct', {
					productName: this.formData.productName,
					describe: this.formData.describe,
					salePrice: this.formData.salePrice,
					productImage: this.formData.productImage,
					classify: this.formData.classify,
					describeImg: this.formData.describeImg
				})
				// .post('/goods/addProduct', this.formData)
				.then(res => {
					this.formData = {
						productName: '',
						describe: '',
						salePrice: '',
						productImage: '',
						classify:'',
						describeImg:''
					}
					this.imageUrl = ''
					this.imageUrl1 = ''
					this.tip = true
				})
		},

		// 去管理商品页面
		goList() {
			this.$router.push('/editProduct')
		}
	}
}
</script>

