import React from 'react';
import { Form, Row, Col, Button, message } from 'antd';
import cx from 'classnames';
import $$ from 'cmn-utils';
import './index.less';

const createForm = Form.create;

const PlainComp = ({ className, children }) => (
  <div className={className}>{children}</div>
);

/**
 * 搜索条
 */
class Index extends React.Component {
  static defaultProps = {
    prefixCls: 'antui-searchbar',
    type: 'inline',
  };

  // 当type为grid时，指定每行元素个数
  cols = {
    xs: 8,
    md: 6,
    xl: 4,
  };

  // 内联元素默认宽
  width = {
    date: 100,
    month: 100,
    'date~': 280,
    datetime: 140,
    select: 100,
    default: 110,
    treeSelect: 110,
    cascade: 110,
    cascader: 110,
  };

  // 当type为grid时，指定每两个元素的间隔
  rows = {
    gutter: 8,
  };

  resetForm(e) {
    this.props.form.resetFields();
    this.searchForm(true);
  }

  searchForm(isReset) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        let errs = [];
        Object.keys(errors).forEach(fieldName => {
          errs = errors[fieldName].errors || [];
        });
        if (errs && errs.length) message.error(errs[0].message);
        return;
      }

      this.props.onSearch && this.props.onSearch(values, isReset);
    });
  }

  render() {
    const {
      className,
      prefixCls,
      type,
      rows,
      cols,
      columns,
      group,
      children,
      form,
      appendTo,
      record,
      ...otherProps
    } = this.props;

    const colopts = type === 'grid' ? cols || this.cols : {};
    const rowopts = type === 'grid' ? rows || this.rows : {};

    const ComponentRow = type === 'inline' ? PlainComp : Row;
    const ComponentCol = type === 'inline' ? PlainComp : Col;
    const ComponentItem = type === 'inline' ? PlainComp : Form.Item;
    const formItemLayout =
      type === 'grid'
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }
        : {};

    const ComponentBtnGroup = type === 'inline' ? Button.Group : PlainComp;

    let searchFields = columns.filter(col => col.searchItem);
    searchFields = group
      ? searchFields.filter(
          col => col.searchItem && col.searchItem.group === group,
        )
      : searchFields;

    if (!searchFields.length) return null;

    delete otherProps.onSearch;

    let getPopupContainer = null;
    if (appendTo) {
      if ($$.isFunction(appendTo)) getPopupContainer = appendTo;
      else if (appendTo === true) getPopupContainer = triggerNode => triggerNode.parentNode;
      else getPopupContainer = _ => appendTo;
    }

    return (
      <div className={cx(prefixCls, className)} {...otherProps}>
        <Form
          className={cx({
            'form-inline': type === 'inline',
            'form-grid': type === 'grid',
          })}
        >
          <ComponentRow className="row-item" {...rowopts}>
            {searchFields.map((field, i) => {
              let col = { ...colopts };
              if (type === 'grid' && field.searchItem.col) {
                col = field.searchItem.col;
              } else if (type !== 'grid') {
                col = {};
              }

              const fieldType = field.searchItem.type || 'input';

              const formProps = {
                form,
                name: field.name,
                title: field.title,
                record,
                ...field.searchItem,
              };

              if (type === 'inline') {
                formProps.style = {
                  width: formProps.width || this.width[fieldType],
                };
              }

              if (getPopupContainer) {
                formProps.getPopupContainer = getPopupContainer;
              }

              if (field.dict) {
                formProps.dict = field.dict;
              }

              let FieldComp;
              switch (fieldType) {
                case 'date~': // 日期范围
                case 'datetime': // 日期时间
                case 'date': // 日期
                case 'month': // 月
                case 'time': // 时间
                  FieldComp = require(`../Form/model/date`).default(formProps);
                  break;
                case 'input': // 输入框
                case 'textarea': // 多行文本
                  formProps.formFieldOptions = {
                    rules: [
                      {
                        pattern: /^[^'%&<>=?*!]*$/,
                        message: '查询条件中不能包含特殊字符',
                      },
                    ],
                  };
                  formProps.maxLength = field.searchItem.maxLength || 100;
                  formProps.autoComplete = 'off';
                  FieldComp = require(`../Form/model/input`).default(formProps);
                  break;
                case 'hidden': // 隐藏域
                  return (
                    <span key={`col-${i}`}>
                      {require(`../Form/model/input`).default(formProps)}
                    </span>
                  );
                case 'select':
                  formProps.optionFilterProp = 'children';
                // eslint-disable-next-line no-fallthrough
                case 'treeSelect':
                case 'cascade':
                  formProps.allowClear = true;
                  formProps.showSearch = true;
                // eslint-disable-next-line no-fallthrough
                default:
                  // 通用
                  FieldComp = require(`../Form/model/${fieldType.toLowerCase()}`).default(
                    formProps,
                  );
              }

              return (
                <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                  <ComponentItem
                    {...formItemLayout}
                    label={field.title}
                    className="col-item-content"
                  >
                    {FieldComp}
                  </ComponentItem>
                </ComponentCol>
              );
            })}
            {children}
          </ComponentRow>
          <ComponentBtnGroup className="search-btns">
            <Button
              title="查询"
              type={type === 'grid' ? 'primary' : 'default'}
              onClick={e => this.searchForm()}
              htmlType="submit"
              icon="search"
            >
              查询
            </Button>
            <Button title="重置" onClick={e => this.resetForm()} icon="reload">
              重置
            </Button>
          </ComponentBtnGroup>
        </Form>
      </div>
    );
  }
}

export default createForm()(Index);
