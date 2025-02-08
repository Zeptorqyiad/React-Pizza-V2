import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza = () => {
   const [pizza, setPizza] = React.useState()
   const { id } = useParams()
   const navigate = useNavigate()

   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get(
               `https://6764787b52b2a7619f5cae9d.mockapi.io/items/${id}`
            )
            setPizza(data)
         } catch (error) {
            alert('Ошибка при получении пиццы')
            navigate('/')
         }
      }

      fetchPizza()
   }, [])

   if (!pizza) {
      return (
         <div className="container pizza-block__title">Идёт загрузка...</div>
      )
   } else
      return (
         <div className="container">
            <img src={pizza.imageUrl} alt="imageUrl" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
         </div>
      )
}

export default FullPizza
