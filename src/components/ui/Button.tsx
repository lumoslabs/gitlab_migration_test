import React from "react"

export interface IButtonProps {
  text: string;
  onClick?(e: React.MouseEvent<any>): any;
}

const Button = React.forwardRef(({ onClick = () => void (0), text }: IButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  return <button ref={ref} onClick={onClick}>
    {text}
  </button>
})

export default Button
