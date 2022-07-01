import React, { useEffect, useState } from "react";
import useAuth from "../context/AuthContex";
import Post from "../post/Post";
import { collection, getDocs } from "firebase/firestore";
import { storage , db } from '../firebase'
import "./style.css";
export default function Feed() {
  // const {currentUser}=useAuth()
  const [posts,setPosts]=useState([])
  useEffect(()=>{
    db.collection("posts").onSnapshot((snapshot)=>{
      setPosts(snapshot.docs.map((doc)=>({id:doc.id,post:doc.data()})))
    })
  },[])

   
  return (
    
    <div className="feed">
      {posts.map(({id,post})=>{
        return <Post
        key={id}
        id={id}
        photoName={post.imageName}
        photoUrl={post.photoUrl}
        username={post.username}
        caption={post.caption}
        comment={post.comments}
        />
      })}
    </div>
  );
}
