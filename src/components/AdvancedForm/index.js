import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { processWidthAndHeightProps, isPropsHasWOrH } from '@/libs/util'
import { Form, Button } from 'antd';
import { CUSTOM } from './constant'
import { baseFormControlProps } from './props'

// 控件
import Input from './components/Input';
import InputNumber from './components/InputNumber'
import Select from './components/Select';
import TimePicker from './components/TimePicker';
import DatePicker from './components/DatePicker';
import Cascader from './components/Cascader';
import TreeSelect from './components/TreeSelect';
import Switch from './components/Switch';
import Slider from './components/Slider';
import Custom from './components/Custom';
import RadioGroup from './components/RadioGroup';
import Checkbox from './components/Checkbox'
import CheckboxGroup from './components/Checkbox/CheckboxGroup'

// 控件
const Control = {
  text: Input,                    // text
  select: Select,                 // select
  time: TimePicker,               // 时间选择器
  date: DatePicker,               // 日期选择器
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

// 设置初始化默认值
const setInitialValues = (data) => {
  let initialValues = {};
  data.forEach(item => {
    if(item.attrs && (item.attrs.defaultValue || item.attrs.value)) {
      initialValues[item.key] = item.attrs.defaultValue || item.attrs.value
    }
  })
  return initialValues
}

class AdvancedForm extends React.Component {

  static propTypes = {
    layout: PropTypes.string,                 // horizontal、vertical、inline， 表单显示形式
    config: PropTypes.array.isRequired,       // 配置
    labelCol: PropTypes.object,               // form-item 布局
    wrapperCol: PropTypes.object,             // form-item 布局
    showBtns: PropTypes.bool,                 //  是否显示 提交、重置按钮组
    showResetBtn: PropTypes.bool,             //  是否显示 重置按钮
    btnTexts: PropTypes.array,                // 按钮文字排序  ['重置', '搜索']  按照这个顺序
    onFinish: PropTypes.func,
    onValuesChange: PropTypes.func,
  }

  static defaultProps = {
    layout: 'horizontal',
    config: [],
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    showBtns: false,
    showResetBtn: true,
    btnTexts: ['重置', '提交'],
  }

  formRef = React.createRef()

  state = {
    initialValues: {}
  }

  // 初始化 state
  static getDerivedStateFromProps(props, state) {
    return {
      // 默认值
      initialValues: setInitialValues(props.config),
      isRule: props.config.some(item => item.rules)
    }
  }

  // 重置
  onReset = () => {
    this.formRef.current.resetFields();
  }

  // 提交
  onFinish = (values) => {
    if(this.props.onFinish) {
      Object.keys(values).forEach(key => {
        if(Array.isArray(values[key]) && !values[key].length) {
          values[key] = undefined;
        }
      })
      this.props.onFinish(values)
    }
  }

  // 表单变化即触发事件
  onValuesChange = (changedValues, allValues) => {
    this.props.onValuesChange && this.props.onValuesChange(changedValues, allValues)
  }

  render() {
    const {
      config,
      layout,
      labelCol,
      wrapperCol,
      showBtns,
      showResetBtn,
      btnTexts,
      ..._props
    } = this.props;

    const { initialValues } = this.state;

    return <Form
      ref={this.formRef}
      name="advanced-form"
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      layout={layout}
      {..._props}
      initialValues={initialValues}
      onFinish={this.onFinish}
      onValuesChange={this.onValuesChange}
    >
      {
        config.map(row => {

          let {
            type,
            label,
            key,
            component,
            attrs={},
            ...formItemProps
          } = row

          // 如果有 defaultValue 则去掉，因为在form表单中，用initialValues 来填写默认值，如果使用 defaultValue 则会报警告
          if(attrs.defaultValue) {
            let { defaultValue, ..._attrs } = attrs
            attrs = _attrs
          }

          // 增加 width、height、maxWidth、maxHeight、minWidth、minHeight
          if(isPropsHasWOrH(attrs)) {   // 存在这些属性的时候才做处理
            const widthAndHeightStyles = processWidthAndHeightProps(attrs)
            attrs.style = {...attrs.style, ...widthAndHeightStyles}
          }

          // 根据 type 传入的类型 判断 什么表单组件
          let Com;
          if(type.toLowerCase() === CUSTOM) {
            Com = component || Control[type.toLowerCase()]
          } else {
            Com = Control[type.toLowerCase()]
          }

          return <Form.Item
              label={label}
              name={key}
              key={key}
              {...formItemProps}
          >
            <Com {...attrs} {...baseFormControlProps} />
          </Form.Item>
        })
      }

      {
        showBtns && <Form.Item label=" " className="advanced-form-btns">
          {showResetBtn && <Button onClick={this.onReset}>{btnTexts[0]}</Button>}
          <Button type="primary" htmlType="submit">{btnTexts[1]}</Button>
        </Form.Item>
      }

    </Form>
  }
}

export default AdvancedForm
