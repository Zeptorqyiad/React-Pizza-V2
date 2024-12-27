import React from 'react'

import { Categories, Sort, PizzaBlock, Skeleton } from '../components'

function Home() {
   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   const [categoryId, setCategoryId] = React.useState(1)
   const [sortType, setSostType] = React.useState(0)

   React.useEffect(() => {
      setIsLoading(true)
      fetch(
         `https://6764787b52b2a7619f5cae9d.mockapi.io/items?category=${categoryId}&sortBy=${sortType}`
      )
         .then((response) => response.json())
         .then((json) => {
            setItems(json)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [categoryId])

   return (
      <div className="container">
         <div className="content__top">
            <Categories
               value={categoryId}
               onChangeCategory={(index) => setCategoryId(index)}
            />
            <Sort
               value={sortType}
               onChangeSort={(index) => setSostType(index)}
            />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoading
               ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
               : items.map((obj) => {
                    return <PizzaBlock key={obj.id} {...obj} />
                 })}
         </div>
      </div>
   )
}

export default Home
