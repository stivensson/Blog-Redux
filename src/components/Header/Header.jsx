import React from 'react'
import { Button } from 'antd'

import './Header.scss'

const Header = () => {
  return (
    <div className="header">
      <span>Realworld Blog</span>
      <div className="header-sign">
        <Button className="header-button sign-in" type="text">
          Sign In
        </Button>
        <Button className="header-button sign-up">Sign Up</Button>
      </div>
      <div className="header-autorisation"></div>
    </div>
  )
}

export default Header
