import React from 'react'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'
import CloseSvg from '../../assets/img/close.svg'
import SearchSvg from '../../assets/img/searh.svg'

const Search = () => {
   const { searchValue, setSearchValue } = React.useContext(SearchContext)

   return (
      <div className={styles.root}>
         <img className={styles.icon} src={SearchSvg} alt="SearchSvg" />
         <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.input}
            placeholder="Поиск пиццы..."
         />
         {searchValue && (
            <img
               onClick={() => setSearchValue('')}
               className={styles.clearIcon}
               src={CloseSvg}
               alt="Close"
            />
         )}
      </div>
   )
}

export default Search
