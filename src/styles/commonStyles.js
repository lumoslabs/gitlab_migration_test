import { StyleSheet } from 'aphrodite'
import { base } from './colors'

const commonStyles = StyleSheet.create({
  simpleFlex: {
    display: 'flex',
    padding: 0,
    margin: 0
  },
  fullWidth: {
    width: '100%',
    maxWidth: '100%'
  },
  fullHeight: {
    height: '100vh',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    margin: 0
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0
  },
  flexRowAllCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  flexColumnAllCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  flexRowAlignCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  flexColumnAlignCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRowJustifyCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  flexColumnJustifyCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  flexJustifyCenter: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  titlediv: {
    marginBottom: 10
  },
  headerTitle: {
    color: base.lumosWhite,
    fontFamily: 'MuseoSans500',
    fontSize: 24,
    textAlign: 'flex-start'
  },
  pageTitle: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: 20,
    fontWeight: 600,
    display: 'flex'
  },
  horizontalRule: {
    border: '1px solid',
    width: '100%'
  },
  card: {
    cursor: 'pointer',
    borderRadius: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    overflow: 'hidden'
  },
  spaceEvenly: {
    justifyContent: 'space-evenly'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  alignStretch: {
    alignItems: 'stretch'
  },
  spaceBetweenAndAlignNormal: {
    justifyContent: 'space-between',
    alignSelf: 'normal'
  }
})

export default commonStyles
