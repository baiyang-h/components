import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';
import AdvancedForm from "../AdvancedForm";

FormModal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    config: PropTypes.array.isRequired,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}

FormModal.defaultProps = {
    title: '标题',
    visible: false,
    config: [],
    maskClosable: false,
    okText: '确定',
    cancelText: '取消',
}

export default function FormModal(props) {

    const formRef = useRef();

    function onOk() {
        const current = formRef.current.formRef.current;
        current.validateFields().then(values => {
            props.onOk && props.onOk(values)
        })
    }

    function onCancel() {
        props.onCancel && props.onCancel()
    }

    useEffect(() => {
      if(!props.visible) {
        if(formRef.current) {
          const current = formRef.current.formRef.current;
          current.resetFields()
        }
      }
    }, [props.visible])

    return <div className="form-modal">
        <Modal
            {...props}
            title={props.title}
            visible={props.visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <AdvancedForm
                ref={formRef}
                layout="inline"
                config={props.config}
            />
        </Modal>
    </div>
}
