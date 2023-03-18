import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

export const Pagination = ({pageNumber , pageSize, changePageNumber , users}) => {
    const pageCount = Math.ceil(users.length / pageSize)
   
    if(pageCount === 1)
    return <></>;
    const pages = _.range(0, pageCount)
     
      return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li> */}
         {
            pages.map( (page,index) =>
            <li className={page === pageNumber ? "page-item active" : "page-item"} key={index} onClick={ ()=> changePageNumber(page)}>
            <Link className="page-link" to="/">
              {page+1}
            </Link>
          </li>
            )
         }
         
          {/* <li className="page-item"><a className="page-link" href="#">Next</a></li> */}
        </ul>
      </nav>
      )
};
