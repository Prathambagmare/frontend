import React from 'react';
import './customTable.css'
import axios from 'axios'
import { useEffect, useState } from 'react'




export const Report = () => {

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/auth-api/owner/viewReports",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
      }, []);

    const [products, setProducts] = useState([]);








  

// const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow } = tableInstance

let index = 1;



  return (
    <>


    <table className='main-table'>
        <thead>
        <th>
Index
        </th>
        <th>
Date
        </th>
        <th>
Work
        </th>

        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr >
            <td>{index++}</td>
            <td>{item.date}</td>
          <td>{ item.work }</td>
       
          
        </tr>
      );
    })}
  </tbody>

    </table>
   
       </>
  )
}