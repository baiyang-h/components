---
title: Form
order: 3
---

# 表单

## 封装表单

封装了 antd 的表单，我们只要专注于数据，该组件会自动帮我们渲染。

- 支持 `Form` 组件的所有属性，可以直接在组件上传入 `Form` 属性。
- 支持 `Form.Item` 上的所有属性，可以在 `config` 属性的对象中写 antd `Form.Item` Api 中的相关属性
- 支持如 `Input`、`Select`、`CheckBox` 等控件的所有 Api 属性，可以直接在 `config.attrs` 属性中编写

<br/>

```jsx
import React, {useRef} from 'react';
import {TreeSelect, Input, Button, Form, Select} from 'antd';
import { AdvancedForm } from 'components';

const { Option } = Select
const { SHOW_PARENT } = TreeSelect;

function MyInput(props) {
  return <Input {...props} />
}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const prefixSelector = (
  <Form.Item noStyle >
    <Select style={{ width: 70 }} defaultValue="86">
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

export default () => {
  const searchRef = useRef();

  const config = [
    {
      type: 'text',
      label: '文本框',
      key: 'text',
      rules: [
        {
          required: true,
          message: '请输入值'
        }
      ],
      attrs: {
        reg: /\d/,
        maxLength: 4,
      }
    },
    {
      type: 'number',
      label: '数字输入框',
      key: 'inputNumber',
      attrs: {
        defaultValue: 111,   // 优先 defaultValue， value 也可以， 内部做了处理
        value: 2
      }
    },
    {
      type: 'text',
      label: '手机号',
      key: 'phone',
      attrs: {
        addonBefore: prefixSelector
      }
    },
    {
      type: 'select',
      label: '选择框',
      key: 'select',
      attrs: {
        defaultValue: 1,
        options: [
          {
            label: 'One',
            value: 1
          },
          {
            label: 'Two',
            value: 2
          },
          {
            label: 'Three',
            value: 3
          }
        ]
      },
    },
    {
      type: 'select',
      label: '多选选择框',
      key: 'select2',
      attrs: {
        mode: 'multiple',
        options: [
          {
            label: 'One',
            value: 1
          },
          {
            label: 'Two',
            value: 2
          },
          {
            label: 'Three',
            value: 3
          }
        ]
      },
    },
    {
      type: 'time',
      label: '时间选择框',
      key: 'time',
    },
    {
      type: 'time',
      label: '时间范围选择框',
      key: 'time2',
      attrs: {
        type: 'rangepicker'
      }
    },
    {
      type: 'date',
      label: '日期选择框',
      key: 'date',
    },
    {
      type: 'date',
      label: '日期选择框',
      key: 'date2',
      attrs: {
        type: 'rangepicker'
      }
    },
    {
      type: 'cascader',
      label: '级联选择',
      key: 'cascader',
      attrs: {
        defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ]
      }
    },
    {
      type: 'treeselect',
      label: '树形选择器',
      key: 'treeselect',
      attrs: {
        treeData: [
          {
            title: 'Node1',
            value: '0-0',
            children: [
              {
                title: 'Child Node1',
                value: '0-0-1',
              },
              {
                title: 'Child Node2',
                value: '0-0-2',
              },
            ],
          },
          {
            title: 'Node2',
            value: '0-1',
          },
        ]
      }
    },
    {
      type: 'treeselect',
      label: '树形复选框选择器',
      key: 'treeselect2',
      attrs: {
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        value: ['0-1-1'],
        treeData: [
          {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
              {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
              },
            ],
          },
          {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
              {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
              },
              {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
              },
              {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
              },
            ],
          },
        ]
      }
    },
    {
      type: 'switch',
      label: 'Switch',
      key: 'switch',
    },
    {
      type: 'slider',
      label: 'Slider',
      key: 'slider',
    },
    {
      type: 'radioGroup',
      label: 'Radio.Group',
      key: 'radioGroup',
      attrs: {
        options: [
          {
            label: 'One',
            value: 1
          },
          {
            label: 'Two',
            value: 2
          },
          {
            label: 'Three',
            value: 3
          }
        ]
      }
    },
    {
      type: 'checkbox',
      label: 'Checkbox',
      key: 'checkbox',
    },
    {
      type: 'checkboxGroup',
      label: 'CheckboxGroup',
      key: 'checkboxGroup',
      attrs: {
        options: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]
      }
    },
    {
      type: 'custom',
      label: '自定义',
      key: 'custom',
      attrs: {
        defaultValue: 123,
      },
      component: MyInput
    },
  ]

  function onFinish(values) {
    console.log(values)
  }

  function onValuesChange(changedValues, allValues) {
    console.log(changedValues, allValues)
  }

  return (
    <div className="App" style={{width: '500px'}}>
      <AdvancedForm
        ref={searchRef}
        {...formItemLayout}
        config={config}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      />
    </div>
  );
};
```

## API


### Form

- 组件根部可传入 `Form` 属性
- `config.item` 可传入 `Form.Item` 属性
- `attrs` 传入单个表单控件的属性

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| config | 这是表单内容的配置项，每一个对象对应一个表单控件 [Control](#control-attrs) | array | `[]` |
| showBtns | 是否显示按钮部分 | boolean | `true` |
| showResetBtn | 是否显示第一个按钮，如取消按钮 | boolean | `true` |
| btnTexts | 可以修改按钮名字| array | `['重置', '提交']` |
| 其他属性 | 可以参考 Antd Form 的 API 部分，里面的属性都可以传入 | - | - |

### Form.Item（config.item）

`type` 接受的类型：

```js
{
  text: Input,                    // text
  select: Select,                 // select
  time: TimePicker,               // 时间选择器   如果想范围选择器 需在 attrs.type 中配置 rangepicker
  date: DatePicker,               // 日期选择器   如果想范围选择器 需在 attrs.type 中配置 rangepicker
  cascader: Cascader,             // 级联选择器
  number: InputNumber,            // 数字输入框
  treeselect: TreeSelect,         // 树选择器
  switch: Switch,                 // Switch 选择
  slider: Slider,                 // 滑块
  radiogroup: RadioGroup,         // 单选框组
  checkbox: Checkbox,             // 复选框
  checkboxgroup: CheckboxGroup,   // 复选框组
  custom: Custom,                 // 自定义选择器
};
```

<br/>

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | Form 表单集中单个控件的名字 | string | - |
| label | Form.Item 的 label | string | - |
| key | Form.Item 的 name 名字 | string | - |
| rules | Form.Item 中写上规则，那么在提交的时候就会验证 | array | - |
| attrs | 相当于给单个表单控件传入属性，属性可直接查看各个控件的API | object | - |
| component | 如果是自定义控件，可以传入这个属性，并且 type 必须是 custom  | React.node | - |
| 其他属性 | 可以参考 Form.Item 的 API 部分  | - | - |


### Control (attrs)

`Config` 中配置的单个表单控件对象

```js
{
  type: '控件类型',
  label: '单个表单控件前面的 label 名称',
  key: '表单name名，即你得到的参数名',
  // 如果你需要对表单进行验证，则可以给每个 Form.Item 增加验证规则
  rules: [
    {
      required: true,
      message: '请输入值'
    }
  ],
  attrs: {
    defaultValue | value: '这是默认值，如果你需要的。内部做了处理，所以你写 defaultValue 和 value 都可以',
    type: '对于日期选择器和时间选择器中的范围控件，我们需要用 type: rangepicker 来表示是范围选择器，不写则是单个的',
    // ...
    //其他属性全都是 Antd中 各个表单控件的属性，可以直接在 API 中查看，如 Input 的属性
  },
  component: MyInput,   // 如果是自定表单，可以自己写你想的内容， 注意上面 type 必须是 custom
  // ...
  // 其他属性 可以直接查看 Form.Item 的 API 属性
}
```
