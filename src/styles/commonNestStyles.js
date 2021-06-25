import { StyleSheet } from 'aphrodite';

const commonNestStyles = StyleSheet.create({
});

const commonNestStylesWithProps = (props) => StyleSheet.create({
  fullHeight: {
    height: `${props.clientHeight}px`,
  },
});

export {
  commonNestStyles,
  commonNestStylesWithProps
};
