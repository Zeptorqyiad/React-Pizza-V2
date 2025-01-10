import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { SearchContext } from '../App'
import { setCategoryId } from '../redux/slices/filterSlice'

import {
   Categories,
   Sort,
   PizzaBlock,
   Skeleton,
   Pagination,
} from '../components'

const Home = () => {
   const dispatch = useDispatch()
   const { categoryId, sort } = useSelector((state) => state.filter)

   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)
   const [currentPage, setCurrentPage] = React.useState(1)

   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
   }

   const { searchValue } = React.useContext(SearchContext)

   React.useEffect(() => {
      setIsLoading(true)

      const category = categoryId > 0 ? `category=${categoryId}` : ''
      const sortBy = sort.sortProperty.replace('-', '')
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'

      axios
         .get(
            `https://6764787b52b2a7619f5cae9d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
         )
         .then((res) => {
            setItems(res.data)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [categoryId, sort.sortProperty, currentPage])

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
               onChangeCategory={onChangeCategory}
            />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{isLoading ? skeletons : pizzas}</div>
         <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
   )
}

export default Home
