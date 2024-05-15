<template>
  <div draggable class="model" :style="{ zIndex: props.zIndex }">
    <div class="model-title">
      <p>弹窗标题</p>
      <div>
        <el-icon @click="emits('settingClick')"><Setting /></el-icon>
      </div>
    </div>
    <div class="model-body">
      <jlg-collapse ref="CollapseRef" v-model="collapse">
        <jlg-collapse-item :name="1" title="基本信息">
          <jlg-form
            ref="JlgFormRef"
            :label-position="props.config.labelPosition"
            label-width="100px"
            :gather-props="{ col: 1, allCol: 3 }"
            :model="formData"
            :rules="rules"
            :size="props.config.style"
          >
            <jlg-grid-layout v-bind="gridLayoutProps">
              <jlg-grid-cell :width="1" :height="1">
                <jlg-form-item
                  label="Input测试placeholder"
                  prop="input"
                  :validate-rules="[
                    [E_FormValidatorRulesValidateFunEnum.必填校验],
                    [E_FormValidatorRulesValidateFunEnum.小数位校验, 0],
                  ]"
                >
                  <jlg-input
                    v-model="formData.input"
                    :tool-tip-props="{
                      effect: 'light',
                    }"
                  ></jlg-input>
                </jlg-form-item>
              </jlg-grid-cell>
              <jlg-grid-cell :width="1" :height="1">
                <jlg-form-item
                  label="datePicker"
                  prop="datePicker"
                  :validate-rules="[
                    [E_FormValidatorRulesValidateFunEnum.必填校验],
                  ]"
                >
                  <jlg-date-picker v-model="formData.datePicker" type="date" />
                </jlg-form-item>
              </jlg-grid-cell>
              <jlg-grid-cell :width="1" :height="1">
                <jlg-form-item label="number">
                  <jlg-input-number
                    v-model="formData.number"
                    @change="valueChange"
                  ></jlg-input-number>
                </jlg-form-item>
              </jlg-grid-cell>
              <jlg-grid-cell :width="1" :height="1">
                <jlg-form-item label="Select测试placeholder">
                  <jlg-select v-model="formData.select">
                    <jlg-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </jlg-select>
                </jlg-form-item>
              </jlg-grid-cell>
              <jlg-grid-cell :width="1" :height="1">
                <jlg-form-item label="time-select">
                  <jlg-time-select
                    v-model="formData.timeSelect"
                    start="08:30"
                    step="00:15"
                    end="18:30"
                  />
                </jlg-form-item>
              </jlg-grid-cell>
              <jlg-grid-cell :width="1" :height="1">
                <jlg-form-item label="rate">
                  <jlg-rate v-model="formData.rate" />
                </jlg-form-item>
              </jlg-grid-cell>
              <jlg-grid-cell :width="1" :height="1">
                <jlg-form-item label="radio">
                  <jlg-radio-group v-model="formData.radio">
                    <jlg-radio value="1" label="Option1">Option 1</jlg-radio>
                    <jlg-radio value="2" label="Option2">Option 2</jlg-radio>
                  </jlg-radio-group>
                </jlg-form-item>
              </jlg-grid-cell>
            </jlg-grid-layout>
          </jlg-form>
        </jlg-collapse-item>
        <jlg-collapse-item title="Feedback" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            jlgements of the page.
          </div>
        </jlg-collapse-item>
      </jlg-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { E_FormValidatorRulesValidateFunEnum } from "jlg-form-ui";
import { T_JlgForm_Props } from "../node_modules/jlg-form-ui/dist/packages/form/type";
import {Setting} from '@element-plus/icons-vue';

const props = withDefaults(
  defineProps<{
    zIndex: number;
    config: any;
  }>(),
  {}
);

const collapse = ref(1);

const emits = defineEmits(["settingClick"]);

const rules = reactive({
  input: [{ required: true, message: "Please input input", trigger: "blur" }],
});

const formData = ref({
  input: "",
  select: 1,
  number: 0,
  datePicker: "",
  timeSelect: "",
  rate: 0,
  radio: "",
});

const options = computed(() => {
  return new Array(10).fill(0, 0, 10).map((_i, index) => {
    return {
      value: index,
      label: "Option" + index,
    };
  });
});

const gridLayoutProps = computed<T_JlgForm_Props["gridLayoutProps"]>(() => {
  return {
    padding: {
      small: "0px",
      default: "10px",
      lager: "20px",
    }[props.config.style as string],
    flow: "row",
    columns: props.config.col,
    gap: {
      small: "10px",
      default: "50px",
      lager: "100px",
    }[props.config.style as string],
    inline: true,
    border: false,
  };
});

const valueChange = (v: number | undefined) => {
  console.log(v);
};
</script>

<style scoped>
.model {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 30vw;
  border: 1px solid #ccc;
  background-color: #fff;
}

.model .model-title {
    background-color: #fff;
  height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
}

.model .model-body {
  height: calc(100% - 40px);
  padding:0 10px;
}
</style>