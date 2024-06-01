import React from 'react'
import styles from './Card.module.css';

type Props = {}

const Card = (props: Props) => {
  return (
    <div className={styles.card}>
        <div className={styles.details}>
            <img src="https://images.unsplash.com/flagged/photo-1601316587579-187125db32c8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <h2>AAPL</h2>
            <p>$110</p>
            <p className={styles.info}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officia adipisci vero consectetur libero, quaerat dicta minus nemo, sed eius molestias possimus aut optio pariatur sequi, similique fugiat exercitationem nobis. Possimus dignissimos velit sunt alias facilis consequatur, reiciendis porro doloribus ad harum accusantium numquam ipsum, quibusdam quo in quidem tempora optio! Consequatur laudantium dicta dignissimos nesciunt exercitationem vitae aut assumenda dolorum, explicabo voluptate aliquid soluta quisquam, alias numquam? Consectetur, rerum similique. Ea voluptatibus optio debitis eligendi vero delectus quo odit illum beatae omnis iure autem saepe, aspernatur ullam dignissimos, officiis amet at, magni est vitae voluptatem sunt quidem ex iusto?</p>
        </div>
    </div>
  )
}

export default Card