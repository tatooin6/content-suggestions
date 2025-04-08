import React from "react"
import "./Card.css";

interface CardProps {
    message: React.ReactNode;
}

const Card = ({message}: CardProps) => {
  return (
    <div className="card">
        <div className="card-text">{message}</div>
    </div>
  )
}

export default Card
