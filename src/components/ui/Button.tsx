import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import base from '@styles/colors/base'
import useAmplitude from '@hooks/useAmplitude'

const { lumosWhite, lumosOrange, darkOrange } = base

const styles = StyleSheet.create({
  button: {
    borderWidth: '0 0 2px 0',
    fontSize: '24px',
    fontWeight: 500,
    fontFamily: '"Museo Sans", "Lucida Grande", Arial, sans-serif',
    padding: '14px 30px 14px 30px',
    textShadow: 'none',
    width: 'auto',
    borderRadius: '100px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: lumosWhite,
    backgroundColor: lumosOrange,
    border: 'none',
    transform: 'scale(1.0)',
    transition: 'transform 0.18s',
    ':disabled': { opacity: 0.65 },
    ':hover': { backgroundColor: darkOrange },
    ':active': {
      transform: 'scale(0.98)',
      transition: 'transform 0.1s',
      backgroundColor: darkOrange
    },
    ':selected': {
      transform: 'scale(0.98)',
      transition: 'transform 0.1s',
      backgroundColor: darkOrange
    }
  }
})

export interface IButtonProps {
  text: string;
  onClick?(e: React.MouseEvent<any>): any;
  buttonStyles?: any;
  eventData?: Record<string, any>
  disabled?: boolean;
}

const Button = ({ text, onClick, buttonStyles, eventData, disabled }: IButtonProps): JSX.Element => {
  const track = useAmplitude()

  return (
    <button
      className={css([styles.button, buttonStyles])}
      onClick={e => {
        track('button_click', { ...eventData, message: text})
        onClick(e)
        e.preventDefault()
      }}
      disabled={Boolean(disabled)}
    >
      {text}
    </button>
  )
}

export default Button
