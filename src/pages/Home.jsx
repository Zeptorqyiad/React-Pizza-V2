import React from 'react'

import { Categories, Sort, PizzaBlock, Skeleton } from '../components'

const Home = ({ searchValue }) => {
   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)
   const [categoryId, setCategoryId] = React.useState(0)
   const [sortType, setSortType] = React.useState({
      name: 'популярности',
      sortProperty: 'rating',
   })

   React.useEffect(() => {
      setIsLoading(true)

      const category = categoryId > 0 ? `category=${categoryId}` : ''
      const sortBy = sortType.sortProperty.replace('-', '')
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'

      fetch(
         `https://6764787b52b2a7619f5cae9d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
      )
         .then((response) => response.json())
         .then((json) => {
            setItems(json)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [categoryId, sortType])

   const pizzas = items
      .filter((obj) => {
         if (
            obj.title
               .toLowerCase()
               .trim()
               .includes(searchValue.toLowerCase().trim())
         ) {
            return true
         }
         return false
      })
      .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

   const skeletons = [...new Array(10)].map((_, index) => (
      <Skeleton key={index} />
   ))

   return (
      <div className="container">
         <div className="content__top">
            <Categories
               value={categoryId}
               onChangeCategory={(index) => setCategoryId(index)}
            />
            <Sort
               value={sortType}
               onChangeSort={(index) => setSortType(index)}
            />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      </div>
   )
}

export default Home
