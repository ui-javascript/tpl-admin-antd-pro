/**
 * 自定义表单元件,
 * 在column中如果需要用form控制
    return form.getFieldDecorator('xxx')(
      // ...
    );
 */
export default ({ form, render, record, ...otherProps }) => render(record, form, otherProps);
