import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import AdvancedForm from "../AdvancedForm";

export default class Search extends React.Component {

  static propTypes = {
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
    config: [],
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    showBtns: true,
    showResetBtn: true,
    btnTexts: ['重置', '搜索'],
  }

  searchRef = createRef()

  onFinish = (values) => {
    this.props.onFinish && this.props.onFinish(values)
  }

  onValuesChange = (changedValues, allValues) => {
    this.props.onValuesChange && this.props.onValuesChange(changedValues, allValues)
  }

  render() {
    return <div>
      <AdvancedForm
        ref={this.searchRef}
        {...this.props}
        layout="inline"
        btnTexts={this.props.btnTexts}
        onFinish={this.onFinish}
        onValuesChange={this.onValuesChange}
      />
    </div>
  }

}


