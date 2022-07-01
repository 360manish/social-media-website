import React, { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./style.css";
import { storage , db } from '../firebase'
import { Button } from "bootstrap";
import makeid from "../helper/function";
import firebase from "../firebase";
import {getStorage , ref , uploadBytes , getDownloadURL} from "firebase/storage"
import { useAuth } from "../context/AuthContex";

export default function Createpost() {
  const [caption, setCaption] = useState("");
  const [image,setImage]=useState(null)
  const [progress,setProgress]=useState(0)
  const {currentUser}=useAuth()
  const storage=getStorage()

  const handleChange = (e) => {
    if(e.target.files[0]){
        setImage(e.target.files[0])
        var selectedImageSrc=URL.createObjectURL(e.target.files[0])
        var imagePreview=document.getElementById('image-preview')
        imagePreview.src=selectedImageSrc
        imagePreview.style.display="block"
    }
  };

  const handleUpload=(e)=>{
    e.preventDefault()
    var imageName=makeid(10)
    console.log(imageName)
    if(image){
      const imageRef=ref(storage,`images/${imageName}.jpg`)
      uploadBytes(imageRef,image).then(()=>{
        alert("Image Uploaded")
      }).then(()=>{
        const newRef=ref(storage,`images/${imageName}.jpg`)
        getDownloadURL(newRef).then((url)=>{
          console.log(url)
          db.collection("posts").add({
            timestamp:new Date(),
            imageName:imageName,
            caption:caption,
            photoUrl:url,
            username:currentUser.email.replace("@gmail.com","") 
          })
        }).catch((error)=>{
          console.log(error)
        })
      })
      setImage(null)
      setCaption('')
      document.getElementById('image-preview').style.display="none"
    }
  }

  return (
    <div className="createPost">
      <p>Create Post</p>
      <div className="createPost_loggedInCenter">
        <textarea
          className="createPost_textarea"
          value={caption}
          rows="3"
          placeholder="enter caption here"
          onChange={(e) => {
            setCaption(e.target.value);
            console.log(caption);
          }}
        ></textarea>
        <div className="createPost_imagePreview">
            <img id="image-preview" alt=""></img>
        </div>
      </div>
      <div className="createPost_Bottom">
        <div className="createPost_imageUpload">
          <label htmlFor="fileInput">
            <CameraAltIcon style={{ cursor: "pointer" }} />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleChange}
          ></input>
        </div>
        <button
          className="createPost_uploadBtn"
          style={{ color: caption ? "black" : "lightgrey" }}
          onClick={handleUpload}
        >
          {`Upload ${progress!==0?progress:""}`}
        </button>
      </div>
    </div>
  );
}
