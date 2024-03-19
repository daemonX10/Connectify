import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Post from '../components/Post/Post'
import { useDispatch} from 'react-redux'
import { getPosts } from '../redux/postSlice'

 function Feed () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [posts,setPosts] = useState(null)
  useEffect(()=>{
    ;(async()=>{
      let data = await (dispatch(getPosts()))
      setPosts(data.payload.data)
   })()
  },[])
  return (
    <div>
      <div>
        {posts?.map((post)=>(
              <Post key={post._id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Feed