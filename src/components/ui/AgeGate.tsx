import React from 'react'
import DatePicker from 'react-mobile-datepicker'
import { StyleSheet, css } from 'aphrodite'
import { Container, Row } from 'react-bootstrap'
import base from '@styles/colors/base'
import commonStyles from '@styles/commonStyles'
import Button from '@components/ui/Button'

const styles = StyleSheet.create({
  title: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '32px',
    fontWeight: 700,
    display: 'flex',
    padding: '0px',
    marginTop: '10vh',
    textAlign: 'center'
  },
  buttonDiv: {
    bottom: '12vmin'
  },
  datePickerRow: {
    height: '50vh'
  }
})

// TODO: handle saving date
const handleClick = () => { window.location.href = 'https://lumos-assistant.ngrok.io' }

export interface IAgeGateProps {
  text: string;
  onClick?(e: React.MouseEvent<any>): any;
  buttonStyles?: any;
}

// const AgeGate = (({ onClick = () => void (0), text, buttonStyles }: IAgeGateProps): JSX.Element => {
//   return (
//     <button className={css([styles.button, buttonStyles])} onClick={onClick} >
//       {text}
//     </button>
//   )
// })

class AgeGate extends React.Component {
  state = {
      time: new Date('1985-01-03'),
      isOpen: true,
  }

  handleClick = () => {
      this.setState({ isOpen: true })
  }

  handleCancel = () => {
      this.setState({ isOpen: false })
  }

  handleSelect = (time) => {
      this.setState({ time, isOpen: false })
  }

  render() {
    const monthMap = {
      '1': 'Jan',
      '2': 'Feb',
      '3': 'Mar',
      '4': 'Apr',
      '5': 'May',
      '6': 'Jun',
      '7': 'Jul',
      '8': 'Aug',
      '9': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec',
    }

    const dateConfig = {
      'month': {
          format: value => monthMap[value.getMonth() + 1],
          caption: 'Mon',
          step: 1,
      },
      'date': {
        format: 'DD',
        caption: 'Day',
        step: 1,
      },
      'year': {
        format: 'YYYY',
        caption: 'Year',
        step: 1,
      },
    }

    return (
      <Container className={css(commonStyles.flexRowAllCenter)}>
        <Row className={css(commonStyles.flexRowAllCenter)}>
          <p className={css(styles.title)}>
            {'Please select your birthdate:'}
          </p>
        </Row>
        <Row className={css(commonStyles.flexRowAllCenter, styles.datePickerRow)}>
          <DatePicker
            theme='android'
            dateConfig={dateConfig}
            showHeader={false}
            showFooter={false}
            value={this.state.time}
            isOpen={this.state.isOpen}
            onSelect={this.handleSelect}
            onCancel={this.handleCancel}
            isPopup={false}
            max={new Date(Date.now() - 86400000)}
            min={new Date('1900-01-02')}
          />
        </Row>
        <Row className={css(commonStyles.flexRowAllCenter, styles.buttonDiv)}>
          <Button onClick={handleClick} text='Submit' />
        </Row>
      </Container>
    )
  }
}

export default AgeGate
