import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'qs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { SearchContext } from '../App'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

import {
   Categories,
   Sort,
   PizzaBlock,
   Skeleton,
   Pagination,
} from '../components'

const Home = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { categoryId, sort, currentPage } = useSelector(
      (state) => state.filter
   )

   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   const onChangePage = () => (number) => {
      dispatch(setCurrentPage(number))
   }

   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
   }

   const { searchValue } = React.useContext(SearchContext)

   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))
      }
   }, [])

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

   React.useEffect(() => {
      const queryString = qs.stringify({
         sortProperty: sort.sortProperty,
         categoryId,
         currentPage,
      })

      navigate(`?${queryString}`)
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
         <Pagination currnetPage={currentPage} onChangePage={onChangePage} />
      </div>
   )
}

export default Home
