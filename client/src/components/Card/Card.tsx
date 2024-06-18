import React, { ReactNode } from 'react'
import styles from './Card.module.css'

type Props = {
  children: ReactNode
  className?: string
}

const Card = (props: Props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>
        {props.children}
    </div>
  )
}

export default Card