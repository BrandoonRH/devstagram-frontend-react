import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { PostProvider } from './context/PostProvider'
import { FollowerUserProvider } from './context/FollowerUserProvider'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <PostProvider>
      <FollowerUserProvider>
          <RouterProvider router={router}/>
      </FollowerUserProvider>
    </PostProvider>
  </React.StrictMode>,
)
