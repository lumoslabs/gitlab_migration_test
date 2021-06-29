
// TODO: Use this from  a common lumos react component repo once it's ready.
// This is temporarily here as we're phasing out react_lux package.

import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

import { StyleSheet, css } from 'aphrodite';
import { grayWhiteSmoke, lumosBlack } from '../../styles/colors';

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (let key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const _createClass = function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

const styles = StyleSheet.create({
  button: {
    borderWidth: '0 0 2px 0 ',
    cursor: 'pointer',
    fontSize: '1.15em',
    fontWeight: '500',
    fontFamily: '"Museo Sans", "Lucida Grande", Arial, sans-serif',
    padding: '14px 30px 12px 30px',
    textShadow: 'none',
    width: 'auto',
    color: lumosBlack,
    backgroundColor: grayWhiteSmoke,
    borderRadius: '4px',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  },
  hover: {
    ':hover': {
      backgroundColor: '#E6E6E6'
    }
  },
  disabled: {
    cursor: 'default',
    backgroundImage: 'none',
    opacity: 0.65,
    filter: 'alpha(opacity=65)',
    boxShadow: 'none'
  }
});

const BasicButton = function (_React$Component) {
  _inherits(BasicButton, _React$Component);

  function BasicButton(props) {
    _classCallCheck(this, BasicButton);

    const _this = _possibleConstructorReturn(this, (BasicButton.__proto__ || Object.getPrototypeOf(BasicButton)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(BasicButton, [{
    key: 'handleClick',
    value: function handleClick(event) {
      if (!this.props.disabled && this.props.onClick) {
        this.props.onClick(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      const _props = this.props,
        value = _props.value,
        children = _props.children,
        href = _props.href,
        html = _props.html,
        track = _props.track,
        trackButtonPress = _props.trackButtonPress,
        trackLocation = _props.trackLocation,
        disabled = _props.disabled;


      const contents = value || children;

      const attrs = _extends({
        href: href
      }, cloneDeep(html));

      if (track) {
        attrs['data-track'] = track;
      }

      if (trackButtonPress) {
        attrs['data-track-button-press'] = trackButtonPress;
        attrs['data-track'] = attrs['data-track'] || 'true';
      }

      if (trackLocation) {
        attrs['data-track-location'] = trackLocation;
      }

      if (disabled && !href) {
        attrs.disabled = true;
      }
      attrs.onClick = this.handleClick;

      const classNames = css(styles.button, styles.hover, this.props.disabled && styles.disabled, this.props.styles);

      if (href) {
        return React.createElement(
          'a',
          _extends({}, attrs, { className: classNames }),
          contents
        );
      }
      return React.createElement('input', _extends({ type: 'submit', className: classNames, value: contents }, attrs));
    }
  }]);

  return BasicButton;
}(React.Component);

BasicButton.propTypes = {
  /** Event attributes passed to the html (as "data-track=name") */
  track: PropTypes.string,
  /** Event attributes for button presses (as "data-track-button-press=name") */
  trackButtonPress: PropTypes.string,
  /** Event attributes for location (as "data-track-location=name") */
  trackLocation: PropTypes.string,
  /** Whether the button is disabled or not */
  disabled: PropTypes.bool,
  /** Text to be displayed on the button (takes precedence over children) */
  value: PropTypes.node,
  /** Children Component(s) to be displayed as the button text */
  children: PropTypes.node,
  /** Callback triggered onClick */
  onClick: PropTypes.func,
  /** href class passed directly to the link component  */
  href: PropTypes.string,
  /** Extra html properties  */
  html: PropTypes.shape({
    'data-sample-attribute': PropTypes.string
  }),
  /** Aphrodite css overrides */
  styles: PropTypes.arrayOf(PropTypes.object)
};

BasicButton.defaultProps = {
  styles: [],
  track: '',
  trackButtonPress: '',
  trackLocation: '',
  disabled: false,
  value: null,
  children: null,
  onClick: function onClick() {
    return null;
  },
  href: null,
  html: {}
};

export default BasicButton;