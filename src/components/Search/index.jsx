import React from 'react'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import CloseSvg from '../../assets/img/close.svg'
import SearchSvg from '../../assets/img/searh.svg'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {
   const dispatch = useDispatch()
   const [value, setValue] = React.useState('')
   const inputRef = React.useRef()

   const onClickClear = () => {
      dispatch(setSearchValue(''))
      setValue('')
      inputRef.current.focus()
   }

   const updateSearchValue = React.useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str))
      }, 250),
      []
   )

   const onChangeInput = (e) => {
      setValue(e.target.value)
      updateSearchValue(e.target.value)
   }

   return (
      <div className={styles.root}>
         <img className={styles.icon} src={SearchSvg} alt="SearchSvg" />
         <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={styles.input}
            placeholder="Поиск пиццы..."
         />
         {value && (
            <img
               onClick={onClickClear}
               className={styles.clearIcon}
               src={CloseSvg}
               alt="Close"
            />
         )}
      </div>
   )
}

export default Search
