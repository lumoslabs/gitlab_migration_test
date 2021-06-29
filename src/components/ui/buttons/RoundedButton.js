
// TODO: Use this from  a common lumos react component repo once it's ready.
// This is temporarily here as we're phasing out react_lux package.

import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';
import propsWithoutStyleProp from '../../utils/prop_utils';
import { orange6 } from '../../styles/colors';

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (let key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const _createClass = function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

const styles = StyleSheet.create({
  rounded: {
    borderRadius: 55,
    borderBottom: 'none',
    transform: 'scale(1.0)',
    transition: 'transform 0.18s'
  },
  pseudoClasses: {
    ':active': {
      transform: 'scale(0.98)',
      transition: 'transform 0.1s'
    },
    ':focus': {
      transform: 'scale(0.98)',
      transition: 'transform 0.1s'
    },
    ':hover': {
      backgroundColor: orange6
    }
  }
});

const RoundedButton = function (_React$Component) {
  _inherits(RoundedButton, _React$Component);

  function RoundedButton() {
    _classCallCheck(this, RoundedButton);

    return _possibleConstructorReturn(this, (RoundedButton.__proto__ || Object.getPrototypeOf(RoundedButton)).apply(this, arguments));
  }

  _createClass(RoundedButton, [{
    key: 'render',
    value: function render() {
      return React.createElement(PrimaryButton, _extends({
        styles: [styles.rounded, styles.pseudoClasses].concat(_toConsumableArray(this.props.styles))
      }, propsWithoutStyleProp(this.props)));
    }
  }]);

  return RoundedButton;
}(React.Component);
// FIXME: Remove this duplication.
// We're duplicating these proptypes here so Storybook can properly parse them.
// We should be doing `RoundedButton.propTypes = BasicButton.propTypes` instead.

export default RoundedButton;
RoundedButton.propTypes = {
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
  html: PropTypes.object,
  /** Aphrodite css overrides */
  styles: PropTypes.array
};

RoundedButton.defaultProps = {
  styles: [],
  track: ''
};