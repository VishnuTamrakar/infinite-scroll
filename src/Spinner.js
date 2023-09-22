import React from 'react'
import loading from './image/loading.gif'

const  Spinner=()=> {
 
    return (
      <div className="text-center">
        <img src={loading} alt="loading" />
      </div>
    )
  }


export default Spinner