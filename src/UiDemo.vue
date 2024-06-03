<template>
  <div>
    <el-button @click="isShowModel = true">新增</el-button>
    <model
      v-show="isShowModel"
      :z-index="2"
      :config="config"
      @setting-click="
        openEditor({
          resetEditorFn: resetEditorHandle,
          saveEditorFn: saveEditorHandle,
          quitEditorFn: quitEditorHandle,
        })
      "
    ></model>
    <editor
      v-if="isShowEditor"
      :config="config"
      @update:config="(v) => config = v"
      :z-index="1"
      @reset="resetEditorFn"
      @quit="quitEditorFn"
      @save="saveEditorFn"
    ></editor>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { ref } from "vue";
import Editor from "./Editor.vue";
import Model from "./Model.vue";
import {
  isShowEditor,
  openEditor,
  quitEditorFn,
  saveEditorFn,
  resetEditorFn,
} from "./editor";

const isShowModel = ref(false);

const config = ref({
  col: 2,
  style: "small",
  labelPosition: "top",
});

const resetEditorHandle = (cf: any) => {
  config.value = cf;
  isShowEditor.value = false;
};

const quitEditorHandle = () => {
  isShowEditor.value = false;
};

const saveEditorHandle = (cf:any) => {
  console.log(cf,'保存后端');
  alert('保存成功');
};
</script>

<style scoped>
</style>

