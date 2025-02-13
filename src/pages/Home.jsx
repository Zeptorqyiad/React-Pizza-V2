import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
   selectFilter,
   setCategoryId,
   setCurrentPage,
} from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

import {
   Categories,
   Sort,
   PizzaBlock,
   Skeleton,
   Pagination,
} from '../components'

const Home = () => {
   const dispatch = useDispatch()

   const { categoryId, sort, currentPage, searchValue } =
      useSelector(selectFilter)
   const { items, status } = useSelector(selectPizzaData)

   const onChangePage = () => (number) => {
      dispatch(setCurrentPage(number))
   }

   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
   }

   const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-', '')
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
      const category = categoryId > 0 ? `category=${categoryId}` : ''

      dispatch(
         fetchPizzas({
            sortBy,
            order,
            category,
            currentPage,
         })
      )

      window.scrollTo(0, 0)
   }

   /* eslint-disable react-hooks/exhaustive-deps */
   React.useEffect(() => {
      getPizzas()
   }, [categoryId, sort.sortProperty, searchValue, currentPage])

   const pizzas =
      items && items.length > 0
         ? items
              .filter((obj) => {
                 if (
                    obj.title
                       .toLowerCase()
                       .trim()
                       .includes(searchValue.trim().toLowerCase())
                 ) {
                    return true
                 }
                 return false
              })
              .map((obj) => <PizzaBlock {...obj} key={obj.id} />)
         : null

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
         {status === 'error' ? (
            <div className="content__error-info">
               <h2>Произошла ошибка 😕</h2>
               <p>
                  К сожалению не удалось получить питсы. Попробуйте повторить
                  попытку позднее
               </p>
            </div>
         ) : (
            <div className="content__items">
               {status === 'loading' ? skeletons : pizzas}
            </div>
         )}
         <Pagination currnetPage={currentPage} onChangePage={onChangePage} />
      </div>
   )
}

export default Home
