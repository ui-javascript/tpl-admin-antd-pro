// 实现 Input 去除首尾空格
// https://github.com/chenwangji/blog/issues/9

import React, { Component } from 'react';

const withBlurTrim = WrappedComponent =>
  class WrapperComponent extends Component {
    // 去除头尾空格
    handleBlur = e => {
      e.target.value = e.target.value && e.target.value.trim();
      const { onChange } = this.props;
      onChange(e);
    };

    render() {
      return <WrappedComponent onBlur={this.handleBlur} {...this.props} />;
    }
  };

export default withBlurTrim;
