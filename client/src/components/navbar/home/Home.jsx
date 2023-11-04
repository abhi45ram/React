import React from 'react'
import './home.css';

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
    <div className='container d-flex justify-content-center align-items-center flex-column'>
        <h1 className='text-center'>Organize Your <br/>Schedule with TODO Website</h1>
        {/* <p>Be keep Yourself Update</p> */}
        <br></br>
        <button class='home-btn'>Make Your TODO List</button>
    </div>

    </div>
  )
}

export default Home