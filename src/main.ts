import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import JlgFormUi from 'jlg-form-ui'
import 'jlg-form-ui/dist/style.css'
import JlgUI from 'jlg-ui';
import 'jlg-ui/dist/style.css'
import App from './ErrorSdkDemo.vue'
import sdk from 'C:/Users/G/Desktop/project/new_jlg_ui/packages/error-sdk/src/index.ts';

const app = createApp(App)

const addMapFileUrl = (fileUrl: string) => {
	const urlPattern = /https?:\/\/\S+/g; // 匹配以http或https开头的URL
	const matches = fileUrl.match(urlPattern);
	const splitArr = matches?.toString().split('/') ?? [];
	let mapFileUrl = splitArr[splitArr.length - 1];
	if (!mapFileUrl) {
		return;
	}
	if (mapFileUrl.indexOf('?') !== -1) {
		mapFileUrl = mapFileUrl.replace(/\?/g, '.map?');
	} else {
		mapFileUrl += '.map';
	}
	splitArr[splitArr.length - 1] = mapFileUrl;
	return splitArr.join('/');
};

sdk({
    xhrCallback: (xhr) => {
        console.log(xhr);
    },
    fetchCallback: (data) => {
        console.log(data);
    },
    jsCallback: (err: any) => {
        console.log({
            fileUrl: addMapFileUrl(err.filename),
            err: {
                lineno: err.lineno,
                colno: err.colno,
            },
        });
    },
    sourceCallback: (err: any) => {
        console.log('文件资源加载错误上报' + err.target.src + '资源请求失败');
    },
    unHandledRejectionCallback: (event) => {
        console.log(event);
    },
    vueErrorOption: {
        vue: app,
        vueErrorCallback: (err: any,vm: any, info: any) => {
            console.log(err);
        }
    }
});

app.use(ElementPlus).use(JlgFormUi).use(JlgUI).mount('#app')

