import React from 'react'

import { Categories, Sort, PizzaBlock, Skeleton } from '../components'

function Home() {
   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   React.useEffect(() => {
      fetch('https://6764787b52b2a7619f5cae9d.mockapi.io/items')
         .then((response) => response.json())
         .then((json) => {
            setItems(json)
            setIsLoading(false)
         })
   }, [])

   return (
      <React.Fragment>
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoading
               ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
               : items.map((obj) => {
                    return <PizzaBlock key={obj.id} {...obj} />
                 })}
         </div>
      </React.Fragment>
   )
}

export default Home
