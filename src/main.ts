import { createApp } from 'vue'
import App from './App.vue'
import JlgFormUi from 'jlg-form-ui'
import 'jlg-form-ui/dist/style.css'
import JlgUI from 'jlg-ui';
import 'jlg-ui/dist/style.css'


createApp(App).use(JlgFormUi).use(JlgUI).mount('#app')
