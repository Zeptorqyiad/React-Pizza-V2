import React from 'react'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'
import CloseSvg from '../../assets/img/close.svg'
import SearchSvg from '../../assets/img/searh.svg'

const Search = () => {
   const [value, setValue] = React.useState('')
   const { setSearchValue } = React.useContext(SearchContext)

   const inputRef = React.useRef()

   const onClickClear = () => {
      setSearchValue('')
      setValue('')
      inputRef.current.focus()
   }

   const updateSearchValue = React.useCallback(
      debounce((str) => {
         setSearchValue(str)
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
