import React from 'react'
import { Link } from 'react-router-dom'

const CardFollowers = ({follow}) => {
  return (
    <div >
        <Link to={``} className="">
            <img src={`${import.meta.env.VITE_API_URL}/profiles/${follow.image}`} alt="Imagen User" className="rounded-lg transition  hover:-translate-y-6 shadow-lg" />
        </Link>
        <p className="text-gray-500 font-bold mt-2 text-center">{follow.username}</p>
        <p className="text-gray-500 font-bold m-0 text-center">{follow.name}</p>
    </div>
  )
}

export default CardFollowers