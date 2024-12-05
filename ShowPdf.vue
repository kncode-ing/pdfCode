<template>
  <div>
    <el-upload
    ref="upload"
  class="upload-demo"
  v-show="!dialogVisible"
  drag
  accept='.pdf'
  :limit="1"
  action="#"
  :auto-upload="false"
   :on-preview="handlePreview"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>

</el-upload>
      <div class="showBtn">
        <el-button circle @click="zoomIn" icon="el-icon-plus" v-show="dialogVisible"></el-button>
        <el-button circle @click="zoomOut" icon="el-icon-minus" v-show="dialogVisible"></el-button>
        <el-button circle @click="prevPage" icon="el-icon-caret-left" :disabled="pageNum === 1" v-show="dialogVisible"></el-button>     
        <el-button circle @click="nextPage" icon="el-icon-caret-right" v-show="dialogVisible" :disabled="numPage"></el-button>
      </div>
      <div class="details">
        <span v-show="dialogVisible">总页数：{{numPages}}</span>
        <span v-show="dialogVisible&&password">权限密码：{{password}}</span>
      </div>
       <div>
        <canvas ref="pdfCanvas" v-show="dialogVisible"></canvas>
      </div>
  <el-dialog
  title="请输入密码"
  :visible.sync="passwordDialogVisible"
  width="30%">
  <el-input v-model="password" show-password placeholder="请输入密码"></el-input>
  <span slot="footer" class="dialog-footer"> 
    <el-button @click="passwordDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="loadPDFWithPassword">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist'
export default {
  name:'ShowPdf',
  data(){
    return{      
      // 存储pdf文档对象
      pdfDoc:null,
      arrayBuffer : null,
      // 存储用户输入的密码
      password:'',
      // 控制预览是否显示
      dialogVisible: false,
      // 控制密码输入框是否显示
      passwordDialogVisible:false,
      pageNum:1,
      // 初始缩放值
      scale: 1.5,
      numPages:0
      }
  },
  computed:{
    // 下一页判断
    numPage(){
      if(this.pdfDoc){
      return this.pdfDoc.numPages > 1 && this.pageNum !=this.pdfDoc.numPages? false : true
      }
      else return false

    }
  },
  methods:{

// 放大
   zoomIn() {
      this.scale *= 1.2;
      this.renderPage(this.pageNum);
    },
    // 缩小
    zoomOut() {
      this.scale /= 1.2;
      this.renderPage(this.pageNum);
    },
    // 上一页
    prevPage() {
      if (this.pageNum > 1) {
        this.pageNum--;
        this.renderPage(this.pageNum);
      }
    },
    // 下一页
    nextPage() {
      if (this.pageNum < this.pdfDoc.numPages) {
        this.pageNum++;
        this.renderPage(this.pageNum);
      }
    },
    // 文件上传后调用
     handlePreview(file){
       if (file.raw) {
       const reader = new FileReader();
      reader.onload =  e =>{
        // 将文件内容存储到arrayBuffer中
         this.arrayBuffer = e.target.result;
         this.loadAndPreviewPDF(this.arrayBuffer);        
      };
      reader.readAsArrayBuffer(file.raw)
      this.$refs.upload.clearFiles()
   }    
    },
  // 预览pdf
    loadAndPreviewPDF(arrayBuffer) {
      pdfjsLib.getDocument(arrayBuffer)
      .promise.then((pdf)=> {
        this.pdfDoc = pdf;   
        this.renderPage(this.pageNum)
      }).catch((error) => {
       if (error.name === "PasswordException") {
        // 显示密码输入框
         this.passwordDialogVisible = true
       } else {
         console.error("文件无法加载:", error);
       }
     });
    },
    // 渲染某一页
       renderPage() {
        this.numPages = this.pdfDoc.numPages
      this.pdfDoc.getPage(this.pageNum).then((page) => {
        const viewport = page.getViewport({ scale: this.scale });
        const canvas = this.$refs.pdfCanvas;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };
        page.render(renderContext);
        this.dialogVisible = true;
      });
    },
    // 需要密码时
   loadPDFWithPassword() {
   pdfjsLib
     .getDocument({
       data:this.arrayBuffer,
       password: this.password, 
     })
     .promise.then( (pdf)=> {
       this.pdfDoc = pdf;
        this.renderPage(this.pageNum)
       this.passwordDialogVisible = false
     })
     .catch( (error)=> {
      alert("密码输入不正确，请重新输入")
      this.password = ''
       console.error("密码输入不正确", error);
     });
 }
  }
}

</script>

<style>
.showBtn{
 display: flex;
 justify-content:center;
}
.details {
  margin-top: 10px;
}
.details span{
  text-align: center;
  margin-right: 10px;
}
</style>