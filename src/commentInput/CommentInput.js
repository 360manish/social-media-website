import React, { useEffect, useState } from "react";
import "./style.css";
import { useAuth } from "../context/AuthContex";
import { Button } from "react-bootstrap";
import { db } from "../firebase";
import Comment from "../comments/Comment";
export default function CommentInput({ comments, id }) {
  const [comment, setComment] = useState("");
  const { currentUser } = useAuth();
  const [commentArray, setCommentArray] = useState([]);
  
  const onChangeHandler=(e)=>{
    setComment(e.target.value)
    console.log(comment)
  }
    const addComment = () => {
      // Add comment to post info
      if (comment !== "") {
        if(!comments){
          commentArray.push({username:currentUser.email.replace("@gmail.com",""),comment:comment})
          setCommentArray(commentArray)
        }
        else{
          setCommentArray(...comments,{username:currentUser.email.replace("@gmail.com",""),comment:comment})
          console.log(commentArray)
        } 
        db.collection('posts').doc(id).update({
          comments:commentArray
        }).then(()=>{
          setComment("")
          console.log("comment added")
          console.log(commentArray)
        }).catch((error)=>{
          console.log(error)
        })
      }
    };
    // useEffect(()=>{
    //   if(!comment){
    //     if(comments){
    //       setCommentArray(...comments)
    //       console.log(commentArray)
    //     }
    //     db.collection('posts').doc(id).update({
    //       comments:commentArray
    //     }).then(()=>{
    //       setComment("")
    //       console.log("comment added")
    //       console.log(commentArray)
    //     }).catch((error)=>{
    //       console.log(error)
    //     })
    //   }
    // },[])
  // useEffect(()=>{
   
  // },[])
  
  return (
    <>
    <div className="commentInput">
      <textarea
        className="commentInput_textarea"
        placeholder="write a comment..."
        row="1"
        value={comment}
        onChange={onChangeHandler}
      ></textarea>
      <Button
        className="commentInput_button"
        onClick={addComment}
      >
        Post
      </Button>
    </div>
    {commentArray ? commentArray.map((comment) => <Comment username={comment.username} comment={comment.comment}/>):<></>}
    </>
  );
}
