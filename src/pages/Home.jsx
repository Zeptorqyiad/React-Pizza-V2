import React from 'react'
import { SearchContext } from '../App'

import {
   Categories,
   Sort,
   PizzaBlock,
   Skeleton,
   Pagination,
} from '../components'

const Home = () => {
   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)
   const [categoryId, setCategoryId] = React.useState(0)
   const [currentPage, setCurrentPage] = React.useState(1)
   const [sortType, setSortType] = React.useState({
      name: 'популярности(↑)',
      sortProperty: 'rating',
   })

   const { searchValue } = React.useContext(SearchContext)

   React.useEffect(() => {
      setIsLoading(true)

      const category = categoryId > 0 ? `category=${categoryId}` : ''
      const sortBy = sortType.sortProperty.replace('-', '')
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'

      fetch(
         `https://6764787b52b2a7619f5cae9d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
         .then((response) => response.json())
         .then((json) => {
            setItems(json)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [categoryId, sortType, currentPage])

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
         <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
   )
}

export default Home
