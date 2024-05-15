import { ref } from "vue";

export const isShowEditor = ref(false);

export const resetEditorFn = ref();

export const saveEditorFn = ref();

export const quitEditorFn = ref();

export const openEditor = (option:any) => {
    option.resetEditorFn && (resetEditorFn.value = option.resetEditorFn);
    option.saveEditorFn && (saveEditorFn.value = option.saveEditorFn);
    option.quitEditorFn && (quitEditorFn.value = option.quitEditorFn);
    isShowEditor.value = true;
}