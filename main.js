import Vue from 'vue'
import App from './App.vue'
import { Upload ,Dialog,Button,Input} from 'element-ui';
// 需要安装对于版本的npm i pdfjs-dist@2.5.207
// import * as pdfjsLib from 'pdfjs-dist';

// 报错pdf.js:2580 Uncaught (in promise) Error: Setting up fake worker failed: "Cannot load script at: http://localhost:8080/js/app.worker.js"
// 报上面的错，就添加下面这个话
window.pdfjsWorker=require('/node_modules/pdfjs-dist/build/pdf.worker') 

Vue.config.productionTip = false

// Vue.prototype.$pdfjsLib = pdfjsLib;


Vue.use(Upload);
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
new Vue({
  render: h => h(App),
}).$mount('#app')
