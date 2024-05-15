import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import JlgFormUi from 'jlg-form-ui'
import 'jlg-form-ui/dist/style.css'
import JlgUI from 'jlg-ui';
import 'jlg-ui/dist/style.css'
import App from './App.vue'


createApp(App).use(ElementPlus).use(JlgFormUi).use(JlgUI).mount('#app')
