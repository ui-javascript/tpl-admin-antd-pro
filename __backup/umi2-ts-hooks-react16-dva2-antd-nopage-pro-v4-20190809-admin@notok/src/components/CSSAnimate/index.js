import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import cssAnimate, { isCssAnimationSupported } from 'css-animation';
import cx from 'classnames';
import omit from 'object.omit';

class CSSAnimate extends PureComponent {
  componentDidMount() {
    const { type, callback } = this.props;
    this.animate(type, callback);
  }

  componentDidUpdate(prevProps, prevState) {
    const { type, callback } = this.props;
    this.animate(type, callback);
  }

  animate = (type, callback) => {
    const node = ReactDOM.findDOMNode(this);

    if (isCssAnimationSupported && type) {
      cssAnimate(node, type, callback);
    } else if (!isCssAnimationSupported) {
      console.warn('不支持css动画');
    }
  }

  render() {
    const { className, children, delay, duration, style, ...otherProps } = this.props;
    const classnames = cx(
      'animated',
      className
    );
    const _style = { ...style };
    if (duration) {
      _style.animationDuration = `${duration}ms`;
      _style.WebkitAnimationDuration = `${duration}ms`;
    }

    if (delay) {
      _style.animationDelay = `${delay}ms`;
      _style.WebkitAnimationDelay = `${delay}ms`;
    }

    const divProps = omit(otherProps, ['type', 'callback', 'delay', 'duration']);

    return (
      <div className={classnames} {...divProps} style={_style}>
        {children}
      </div>
    );
  }
}

export default CSSAnimate;
