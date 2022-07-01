import React from "react";
import { useAuth } from "../context/AuthContex";
import { Button } from "react-bootstrap";
import Comment from "../comments/Comment";
import {getStorage , ref ,deleteObject} from "firebase/storage"
import { db } from "../firebase";
import "./style.css";
import CommentInput from "../commentInput/CommentInput";
export default function Post({ photoUrl,photoName, username, id, caption, comments }) {
    const { currentUser } = useAuth();
    const deletePost=()=>{
        // get reference to image file which we have to delete

        // 1 delte the file
        const storage=getStorage()
        const imageRef = ref(storage, `images/${photoName}.jpg`);
        deleteObject(imageRef).then(() => {
            console.log('file deleted successfully')
            // File deleted successfully
          }).catch((error) => {
            // Uh-oh, an error occurred!
          });

        // 2 Delete the post from firebase firestore
        db.collection('posts').doc(id).delete().then(()=>{
            console.log('delte the post successfully')
        }).catch(function(error){
            console.log(`Error ${error}`)
        })
    }
    // const deletePost=()=>{}
    return (
        <div className="post">
            <div className="container post_header">
                <div>
                    <p style={{ marginLeft: "8px" }}>{username}</p>
                </div>
                {currentUser.email.replace("@gmail.com","")===username?<Button className='post_button' onClick={deletePost}>Delete</Button>:<></>}
            </div>
            <div className="post_center">
                <img src={photoUrl} className='post_photoUrl' alt="there is some problem"></img>
            </div>
            <div>
                <p>
                    <span style={{ fontWeight: "500", margin: "6px" }}>{username}</span>
                    {caption}
                </p>
            </div>
            <CommentInput comment={comments} id={id}/>
            {/* {comments ? comments.map((comment) => <Comment username={comment.username} caption={comment.comment}/>): (<></>)} */}
           

        </div>
    );
}
