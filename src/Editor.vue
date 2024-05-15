<template>
  <div class="editor-container" :style="{ zIndex: props.zIndex }">
    <div class="jlg-tct__menu">
      <div class="jlg-tct__menu--left">
        <!-- Logo -->
        Logo
      </div>
      <div class="jlg-tct__menu--right">
        <el-button text size="small" @click="emits('reset', initConfig)">
          恢复默认</el-button
        >
        <el-button
          style="width: 60px; border: none"
          color="#173FF0"
          type="primary"
          plain
          size="small"
          @click="emits('save', props.config)"
          >保存</el-button
        >
        <el-divider direction="vertical" />
        <el-button text bg size="small" @click="emits('quit')"
          >退出编辑模式</el-button
        >
      </div>
    </div>
    <div class="jlg-tct__body">
      <div class="jlg-tct__body--material-operation">
        <div class="jlg-tct__body--options">
          <div class="jlg-tct__tabs">
            <div
              :class="['tab', tabIndex === 1 ? 'active' : '']"
              @click="tabIndex = 1"
            >
              <el-icon><Crop /></el-icon>
            </div>
            <div
              :class="['tab', tabIndex === 2 ? 'active' : '']"
              @click="tabIndex = 2"
            >
              <el-icon><ScaleToOriginal /></el-icon>
            </div>
          </div>
        </div>
      </div>
      <div v-show="tabIndex !== 0" class="jlg-tct__body--expand">
        <div v-show="tabIndex === 1">
          <h6>列数</h6>
          <div class="col-select">
            <div
              v-for="item in [2, 3, 4, 5]"
              :key="item"
              class="col-select-item"
              :class="config.col === item ? 'col-active' : ''"
              @click="emits('update:config', { ...config, col: item })"
            >
              {{ item }}
            </div>
          </div>

          <h6>风格</h6>
          <div class="style-select">
            <div
              v-for="item in [
                { value: 'small', label: '紧凑' },
                { value: 'default', label: '适中' },
                { value: 'lager', label: '宽松' },
              ]"
              :key="item.value"
              class="style-select-item"
              
              @click="emits('update:config', { ...config, style: item.value })"
            >
              <div class="label" :class="config.style === item.value ? 'style-active' : ''">{{ item.label }}</div>
            </div>
          </div>
        </div>

        <div v-show="tabIndex === 2">
          <h6>
            label样式<span style="font-size: 12px; color: #999"
              >(该配置仅支持全局替换)</span
            >
          </h6>
          <div>
            <div
              v-for="item in [
                {
                  label: '居上',
                  value: 'top',
                },
                {
                  label: '内嵌',
                  value: 'top-embedded',
                },
                {
                  label: '左对齐',
                  value: 'left',
                },
                {
                  label: '右对齐',
                  value: 'right',
                },
              ]"
              :key="item.value"
              class="label-style"
              :class="
                item.value === config.labelPosition
                  ? 'labelPosition-active'
                  : ''
              "
              @click="
                emits('update:config', { ...config, labelPosition: item.value })
              "
            >
              <div class="tag">{{ item.label }}</div>
              <div class="label-input" :class="item.value">
                <div class="label">label</div>
                <div class="input"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="jlg-tct__body--expand-close" @click="tabIndex = 0">
          <el-icon><ArrowLeft /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Crop, ScaleToOriginal, ArrowLeft } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    zIndex: number;
    config: any;
  }>(),
  {}
);

const emits = defineEmits(["reset", "save", "quit", "update:config"]);

const tabIndex = ref(0);

const initConfig = { ...props.config };
</script>

<style scoped>
.editor-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
}

.jlg-tct__menu {
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
}

.jlg-tct__menu--left {
  font-size: 85px;
}

.jlg-tct__menu--left :deep(.icon) {
  vertical-align: -0.08em !important;
}

.jlg-tct__body {
  display: flex;
  height: calc(100% - 40px);
  flex: 1;
}

.jlg-tct__body .jlg-tct__body--material-operation {
  display: inline-flex;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-top: 1px solid #d7def2;
}

.jlg-tct__body .jlg-tct__body--expand {
  position: relative;
  height: 100%;
  background-color: #fff;
  width: 15vw;
  padding: 10px;
}

.jlg-tct__body .jlg-tct__body--expand .col-select {
  display: flex;
  padding: 2px;
  background-color: #f6f7fb;
}

.jlg-tct__body .jlg-tct__body--expand .col-select .col-select-item {
  width: 50px;
  text-align: center;
  margin: 5px;
  height: 44px;
  line-height: 44px;
  border-radius: 5px;
  cursor: pointer;
}

.jlg-tct__body .jlg-tct__body--expand .col-select .col-active {
  background-color: #fff;
  color: #1244ee;
}

.jlg-tct__body .jlg-tct__body--expand .style-select {
  display: flex;
  padding: 2px;
  flex-wrap: wrap;
}

.jlg-tct__body .jlg-tct__body--expand .style-select .style-select-item {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  margin: 10px;
  border-radius: 8px;
  position: relative;
}

.jlg-tct__body .jlg-tct__body--expand .style-select .style-select-item .label {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 5px;
  text-align: center;
  font-size: 14px;
  border-radius: 0 2px 0 2px;
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
}

.jlg-tct__body .jlg-tct__body--expand .style-select .style-select-item .style-active {
  color: #fff;
  background-color: #1244ee;
}

.jlg-tct__body .jlg-tct__body--expand .style-select .style-active {
  background-color: #fff;
  color: #1244ee;
}

.jlg-tct__body .jlg-tct__body--expand .jlg-tct__body--expand-close {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -100%);
  line-height: 80px;
  height: 80px;
  width: 20px;
  background-color: #fff;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
}

.jlg-tct__body--options {
  width: 53px;
  height: 100%;
  border-right: 1px solid #d7def2;
}

.jlg-tct__tabs {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.jlg-tct__tabs .tab {
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.22s;
}

.jlg-tct__tabs .tab:hover {
  color: var(--el-color-primary);
}

.jlg-tct__tabs .tab.active {
  background-color: #f0f2f6;
  color: var(--el-color-primary);
}

.jlg-tct__body .jlg-tct__body--expand .label-style {
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  height: 80px;
  margin-bottom: 10px;
  cursor: pointer;
}

.jlg-tct__body .jlg-tct__body--expand .active {
  background-color: rgb(238, 242, 250);
}

.jlg-tct__body .jlg-tct__body--expand .active .label {
  background-color: rgb(238, 242, 250);
}

.jlg-tct__body .jlg-tct__body--expand .label-style .tag {
  position: absolute;
  top: 0;
  right: 0;
  height: 24px;
  padding: 0 10px;
  text-align: center;
  font-size: 14px;
  background-color: rgb(238, 242, 250);
  border-radius: 0 2px 0 0;
}

.jlg-tct__body .jlg-tct__body--expand .labelPosition-active .tag {
  background-color: #1244ee;
  color: white;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .label-input {
  height: 80px;
  display: flex;
  padding: 0 10px;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .top {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .top-embedded {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .left {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .right {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .top-embedded .label {
  transform: translate(10px, 10px);
  width: 50px;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .right .label {
  flex: 1;
  text-align: right;
}

.jlg-tct__body .label-input .label {
  background-color: #fff;
}

.jlg-tct__body .jlg-tct__body--expand .label-style .label-input .input {
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 10vw;
}
</style>