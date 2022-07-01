import React, { useState } from "react";
import "./style.css";
import { useAuth } from "../context/AuthContex";
import { Button } from "react-bootstrap";
import { db } from "../firebase";
export default function CommentInput({ comments, id }) {
  const [comment, setComment] = useState("");
  const { currentUser } = useAuth();
  const [commentArray, setCommentArray] = useState({username:"",comment:""});
  const onChangeHandler=(e)=>{
    setComment(e.target.value)
    console.log(comment)
  }
  const addComment = () => {
    // Add comment to post info
    if (comment !== "") {
        setCommentArray({...comments,username:currentUser.email.replace("@gmail.com",""),comment:comment})
        console.log(commentArray)
      db.collection('posts').doc(id).update({
        comments:commentArray
      }).then(()=>{
        setComment=""
        console.log("comment added")
        console.log(commentArray)
      }).catch((error)=>{
        console.log(error)
      })
    }

  };
  return (
    <div className="commentInput">
      <textarea
        className="commentInput_textare"
        placeholder="write a comment..."
        row="1"
        onChange={onChangeHandler}
      ></textarea>
      <Button
        className="commentInput_button"
        onClick={addComment}
      >
        Post
      </Button>
    </div>
  );
}
