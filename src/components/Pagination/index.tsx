import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagintaion.module.scss'

type PaginationProps = {
   onChangePage: any
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={(event) => onChangePage(event.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         renderOnZeroPageCount={null}
      />
   )
}

export default Pagination
