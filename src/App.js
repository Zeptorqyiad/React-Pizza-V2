import React from 'react'

import './scss/app.scss'
import { Header, Categories, Sort, PizzaBlock, Skeleton } from './components'

function App() {
   const [items, setItems] = React.useState([])

   React.useEffect(() => {
      fetch('https://6764787b52b2a7619f5cae9d.mockapi.io/items')
         .then((response) => response.json())
         .then((json) => {
            setItems(json)
         })
   }, [])

   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <div className="container">
               <div className="content__top">
                  <Categories />
                  <Sort />
               </div>
               <h2 className="content__title">Все пиццы</h2>
               <div className="content__items">
                  {items.map((obj) => (
                     <Skeleton key={obj.id} {...obj} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default App
