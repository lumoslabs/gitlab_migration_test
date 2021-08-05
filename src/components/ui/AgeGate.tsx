import React, { useState } from 'react'
import DatePicker from 'react-mobile-datepicker'
import { StyleSheet, css } from 'aphrodite'
import { Container, Row } from 'react-bootstrap'
import base from '@styles/colors/base'
import commonStyles from '@styles/commonStyles'
import Button from '@components/ui/Button'

export interface IAgeGateProps {
  onSubmit(birthday: Date): any;
  max?: Date,
  min?: Date,
  disabled?: boolean
}

const AgeGate = (({ onSubmit, max = (new Date(Date.now() - 86400000)), min = (new Date('1900-01-02')), disabled = false }: IAgeGateProps): JSX.Element => {

  const [date, setDate] = useState(new Date('1985-01-02'))

  const handleClick = () => {
    //    const isUnderage = !(new Date(Date.now()).getTime() - new Date(date).getTime() > 410310589331)
    onSubmit(date)
  }

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

  //TODO: add text like "your birthdate will be stored to verify you meet the age requirements to play this game"
  return (
    <Container className={css(commonStyles.flexColumnAlignCenter)}>
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
          value={date}
          onChange={(date) => { setDate(new Date(date)) }}
          isOpen={true}
          isPopup={false}
          max={max}
          min={min}
        />
      </Row>
      <Row className={css(commonStyles.flexRowAllCenter, styles.buttonDiv)}>
        <Button
          disabled={disabled}
          onClick={handleClick}
          text='Submit'
          eventData={{ id: 'submit_birthdate', message: 'Submit' }}
        />
      </Row>
    </Container>
  )
})

export default AgeGate

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
