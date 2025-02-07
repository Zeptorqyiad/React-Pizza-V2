import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { cartSelector } from '../redux/slices/cartSlice'
import logoSvg from '../assets/img/pizza-logo.svg'
import cartSvg from '../assets/img/cart.svg'
import Search from './Search'

function Header() {
   const { items, totalPrice } = useSelector(cartSelector)

   const totalCount = items.reduce((sum, item) => sum + item.count, 0)

   return (
      <div className="header">
         <div className="container">
            <Link to="/">
               <div className="header__logo">
                  <img width="38" src={logoSvg} alt="Pizza logo" />
                  <div>
                     <h1>React Pizza v2</h1>
                     <p>самая вкусная пицца во вселенной</p>
                  </div>
               </div>
            </Link>
            <Search />
            <div className="header__cart">
               <Link to="/cart" className="button button--cart">
                  <span>{totalPrice} ₽</span>
                  <div className="button__delimiter"></div>
                  <img
                     className="cartImage"
                     width="16"
                     src={cartSvg}
                     alt="CartSvg"
                  />
                  <span>{totalCount}</span>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Header
