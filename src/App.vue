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
            :validate-rules="[[E_FormValidatorRulesValidateFunEnum.必填校验]]"
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

    <div>
      <div
        v-for="item in CollapseRef?.collapseItems"
        :key="item.title"
        @click="CollapseRef?.jumpAnchor(item.name)"
      >
        {{ item.title }} 锚点
      </div>
      <br />
      <span>{{ value }}</span>
      <br />
      <div style="height: 200px; overflow: auto">
        <jlg-collapse ref="CollapseRef" v-model="value" accordion>
          <jlg-collapse-item name="1" title="Consistency">
            <template #title="{ _ref }"
              >{{ _ref?.isActive }} Consistency
            </template>
            <div>
              Consistent with real life: in line with the process and logic of
              real life, and comply with languages and habits that the users are
              used to;
            </div>
            <div>
              Consistent within interface: all elements should be consistent,
              such as: design style, icons and texts, position of elements, etc.
            </div>
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
          <jlg-collapse-item title="Efficiency" name="3">
            <div>
              Simplify the process: keep operating process simple and intuitive;
            </div>
            <div>
              Definite and clear: enunciate your intentions clearly so that the
              users can quickly understand and make decisions;
            </div>
            <div>
              Easy to identify: the interface should be straightforward, which
              hjlgps the users to identify and frees them from memorizing and
              recalling.
            </div>
          </jlg-collapse-item>
          <jlg-collapse-item title="Controllability4" name="4">
            <div>
              Decision making: giving advices about operations is acceptable,
              but do not make decisions for the users;
            </div>
            <div>
              Controlled consequences: users should be granted the freedom to
              operate, including cancjlging, aborting or terminating current
              operation.
            </div>
          </jlg-collapse-item>
          <jlg-collapse-item title="Controllability5" name="5">
            <div>
              Decision making: giving advices about operations is acceptable,
              but do not make decisions for the users;
            </div>
            <div>
              Controlled consequences: users should be granted the freedom to
              operate, including cancjlging, aborting or terminating current
              operation.
            </div>
          </jlg-collapse-item>

          <jlg-collapse-item title="Controllability6" name="6">
            <div>
              Decision making: giving advices about operations is acceptable,
              but do not make decisions for the users;
            </div>
            <div>
              Controlled consequences: users should be granted the freedom to
              operate, including cancjlging, aborting or terminating current
              operation.
            </div>
          </jlg-collapse-item>
          <jlg-collapse-item title="Controllability7" name="7">
            <div>
              Decision making: giving advices about operations is acceptable,
              but do not make decisions for the users;
            </div>
            <div>
              Controlled consequences: users should be granted the freedom to
              operate, including cancjlging, aborting or terminating current
              operation.
            </div>
          </jlg-collapse-item>
          <jlg-collapse-item title="Controllability8" name="8">
            <div>
              Decision making: giving advices about operations is acceptable,
              but do not make decisions for the users;
            </div>
            <div>
              Controlled consequences: users should be granted the freedom to
              operate, including cancjlging, aborting or terminating current
              operation.
            </div>
          </jlg-collapse-item>
        </jlg-collapse>
      </div>
    </div>
    <grid-layout
      width="80%"
      padding="20px"
      flow="row"
      :rows="10"
      :columns="10"
      gap="10px"
      inline
      border
      style="border: 1px solid #ccc"
    >
      <grid-cell :height="1">1</grid-cell>
      <grid-cell :width="3" :height="5" center> 2 </grid-cell>
      <grid-cell :width="2" :height="3" center> 3 </grid-cell>
      <grid-cell :width="4">4</grid-cell>
      <grid-cell :width="2" :height="2"> 5 </grid-cell>
      <grid-cell :left="7" :top="7" :width="2" :height="3"> 6 </grid-cell>
    </grid-layout>
    <jlg-menu :menu-data="menuData" default-active="2">
      <template #logo> 系统logo </template>
    </jlg-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { JlgCollapse } from "jlg-ui";
import { E_FormValidatorRulesValidateFunEnum } from "jlg-form-ui";
import { ElButton } from "element-plus";
import { T_JlgForm_Props } from "../node_modules/jlg-form-ui/dist/packages/form/type";
import { I_JlgMenu_Props } from "../node_modules/jlg-ui/dist/packages/menu/type";

const JlgFormRef = ref();

const CollapseRef = ref<InstanceType<typeof JlgCollapse> | null>(null);

const value = ref("2");

const config = ref({
  col: 5,
  style: "small",
  labelPosition: "left",
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

const rules = reactive({
  input: [{ required: true, message: "Please input input", trigger: "blur" }],
});

const gridLayoutProps = computed<T_JlgForm_Props["gridLayoutProps"]>(() => {
  return {
    padding: {
      small: "0px",
      default: "10px",
      lager: "20px",
    }[config.value.style],
    flow: "row",
    columns: config.value.col,
    gap: {
      small: "10px",
      default: "50px",
      lager: "100px",
    }[config.value.style],
    inline: true,
    border: false,
  };
});

const options = computed(() => {
  return new Array(10).fill(0, 0, 10).map((_i, index) => {
    return {
      value: index,
      label: "Option" + index,
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

const menuData = ref<I_JlgMenu_Props["menuData"]>([
  {
    title: "菜单名称很长很长1",
    iconClass: "",
    index: "1",
    isCollect: false,
    children: [
      {
        title: "菜单1-1",
        iconClass: "",
        index: "1-1",
        isCollect: false,
        children: [
          {
            title: "菜单1-1-1",
            iconClass: "",
            index: "1-1-1",
            isCollect: false,
          },
          {
            title: "菜单1-1-2",
            iconClass: "",
            index: "1-1-2",
            isCollect: true,
          },
        ],
      },
      {
        title: "菜单1-2",
        iconClass: "",
        index: "1-2",
        isCollect: false,
        children: [
          {
            title: "菜单1-2-1",
            iconClass: "",
            index: "1-2-1",
            isCollect: false,
          },
          {
            title: "菜单1-2-2",
            iconClass: "",
            index: "1-2-2",
            isCollect: false,
          },
          {
            title: "菜单1-2-3",
            iconClass: "",
            index: "1-2-3",
            isCollect: false,
          },
        ],
      },
      {
        title: "菜单1-3",
        iconClass: "",
        index: "1-3",
        isCollect: false,
        children: [
          {
            title: "菜单1-3-1",
            iconClass: "",
            index: "1-3-1",
            isCollect: false,
          },
          {
            title: "菜单1-3-2",
            iconClass: "",
            index: "1-3-2",
            isCollect: false,
          },
          {
            title: "菜单1-3-3",
            iconClass: "",
            index: "1-3-3",
            isCollect: false,
          },
          {
            title: "菜单1-3-4",
            iconClass: "",
            index: "1-3-4",
            isCollect: false,
          },
        ],
      },
    ],
  },
  {
    title: "菜单2",
    iconClass: "",
    index: "2",
    isCollect: false,
    children: [
      {
        title: "菜单2-1",
        iconClass: "",
        index: "2-1",
        isCollect: false,
        children: [
          {
            title: "菜单2-1-1",
            iconClass: "",
            index: "2-1-1",
            isCollect: false,
          },
        ],
      },
    ],
  },
  {
    title: "菜单3",
    iconClass: "",
    index: "3",
    isCollect: false,
  },
  {
    title: "菜单4",
    iconClass: "",
    index: "4",
    isCollect: false,
  },
  {
    title: "菜单5",
    iconClass: "",
    index: "5",
    isCollect: false,
  },
  {
    title: "菜单6",
    iconClass: "",
    index: "6",
    isCollect: false,
  },
]);
</script>

<style scoped></style>
