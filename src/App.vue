<template>
  <div>
    <jlg-form-item label="列数">
      <jlg-radio-group v-model="config.col">
        <jlg-radio :value="2">2</jlg-radio>
        <jlg-radio :value="3">3</jlg-radio>
        <jlg-radio :value="4">4</jlg-radio>
        <jlg-radio :value="5">5</jlg-radio>
      </jlg-radio-group>
    </jlg-form-item>

    <jlg-form-item label="风格">
      <jlg-radio-group v-model="config.style">
        <jlg-radio value="small">紧凑</jlg-radio>
        <jlg-radio value="default">适中</jlg-radio>
        <jlg-radio value="lager">宽松</jlg-radio>
      </jlg-radio-group>
    </jlg-form-item>

    <jlg-form-item label="label样式">
      <jlg-radio-group v-model="config.labelPosition">
        <jlg-radio value="top">居上</jlg-radio>
        <jlg-radio value="top-embedded">内嵌</jlg-radio>
        <jlg-radio value="left">左对齐</jlg-radio>
        <jlg-radio value="right">右对齐</jlg-radio>
      </jlg-radio-group>
    </jlg-form-item>

    <el-button @click="gather">收集数据</el-button>
    <el-button @click="validator">校验</el-button>
    <jlg-form
      ref="JlgFormRef"
      :label-position="config.labelPosition"
      label-width="100px"
      :gather-props="{ col: 1, allCol: 3 }"
      :model="formData"
      :rules="rules"
      :size="config.style"
    >
      <jlg-grid-layout v-bind="gridLayoutProps">
        <jlg-grid-cell :width="1" :height="1">
          <jlg-form-item
            label="Input测试placeholder"
            prop="input"
            :validate-rules="[[E_FormValidatorRulesValidateFunEnum.必填校验], [E_FormValidatorRulesValidateFunEnum.小数位校验, 0]]"
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
            :validate-rules="[[E_FormValidatorRulesValidateFunEnum.必填校验]]"
          >
            <jlg-date-picker v-model="formData.datePicker" type="date" />
          </jlg-form-item>
        </jlg-grid-cell>
        <jlg-grid-cell :width="1" :height="1">
          <jlg-form-item label="number">
            <jlg-input-number v-model="formData.number" @change="valueChange"></jlg-input-number>
          </jlg-form-item>
        </jlg-grid-cell>
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
        <jlg-grid-cell :width="1" :height="1">
          <jlg-form-item label="time-select">
            <jlg-time-select v-model="formData.timeSelect" start="08:30" step="00:15" end="18:30" />
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
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { JlgGridLayout, JlgGridCell } from "jlg-ui";
import {
  JlgForm,
  JlgFormItem,
  JlgRadioGroup,
  JlgRadio,
  JlgRate,
  JlgDatePicker,
  JlgInput,
  JlgInputNumber,
  JlgSelect,
  JlgOption,
  JlgTimeSelect,
  E_FormValidatorRulesValidateFunEnum
} from "jlg-form-ui";
import { ElButton } from "element-plus";
import { T_JlgForm_Props } from "../node_modules/jlg-form-ui/dist/packages/form/type";

const JlgFormRef = ref();

const config = ref({
  col: 5,
  style: 'small',
  labelPosition: 'left'
});

const formData = ref({
  input: "",
  select: 1,
  number: 0,
  datePicker: "",
  timeSelect: "",
  rate: 0,
  radio: ""
});

const rules = reactive({
  input: [{ required: true, message: "Please input input", trigger: "blur" }]
});

const gridLayoutProps = computed<T_JlgForm_Props["gridLayoutProps"]>(() => {
  return {
    padding: {
      small: "0px",
      default: "10px",
      lager: "20px"
    }[config.value.style],
    flow: "row",
    columns: config.value.col,
    gap: {
      small: "10px",
      default: "50px",
      lager: "100px"
    }[config.value.style],
    inline: true,
    border: false
  }
});

const options = computed(() => {
  return new Array(10).fill(0, 0, 10).map((_i, index) => {
    return {
      value: index,
      label: "Option" + index
    };
  });
});

const valueChange = (v: number | undefined) => {
  console.log(v);
};

const gather = () => {
  console.log(JlgFormRef.value.getGatherData());
};

const validator = () => {
  JlgFormRef.value._ref.validate((valid: boolean) => {
    if (valid) {
      alert("submit!");
    } else {
      alert("error submit!");
    }
  });
};
</script>

<style scoped></style>
