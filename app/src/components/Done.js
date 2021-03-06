import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moneyImg from '../images/money.svg'

export default class Done extends Component {
  render() {
    return (
      <div className="intro">
        <img src={moneyImg} className="intro__img" alt="Money Emoji" />
        <p className="intro__text">
          Thank You! <br />
        </p>
        <Link to="/dashboard" className="Submit__next-button">Play Again</Link>
        <Link to="https://capmetro.org/projectconnect/" className="center-text">
          Learn More about Project Connect
        </Link>
      </div>
    )
  }
}
