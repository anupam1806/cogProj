import React from 'react'
import "./confirm.css"

function Confirmation(){
  return (
    <>
<div class="content">
  <div class="wrapper-1">
    <div class="wrapper-2">
      <h1 className='hello'>Thank you !</h1>
      <p>Thanks for using the application.  </p>
      {/* <button class="go-home"> */}
        <a className='go-home' href="/"> Home</a>
      {/* </button> */}
    </div>
</div>
</div>
    </>
  )
}

export default Confirmation;