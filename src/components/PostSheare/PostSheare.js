import React, { useEffect, useRef, useState } from "react";
import "./PostSheare.css";
import profileImg from "../../img/profileImg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faImage,
   faVideo,
   faCalendar,
   faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostSheare = () => {
   const { currentUser } = useSelector((state) => state.user);
   const baseUrl = "http://localhost:5000";
   const navigate = useNavigate();

   const [img, setImg] = useState(null);
   const [imgPerc, setImgPerc] = useState(0);
   const [inputs, setInputs] = useState({});
   const imageRef = useRef();

   const authAxios = axios.create({
      baseURL: baseUrl,
      headers: {
         Authorization: `Bearer ${currentUser ? currentUser.token : null}`,
      },
   });

   const handleChange = (e) => {
      setInputs((prev) => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const uploadFile = (file, urlType) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
         "state_changed",
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            urlType === "image" && setImgPerc(Math.round(progress));

            switch (snapshot.state) {
               case "paused":
                  console.log("Upload is paused");
                  break;
               case "running":
                  console.log("Upload is running");
                  break;
               default:
                  break;
            }
         },
         (error) => {
            console.log(error);
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               // console.log("File available at", downloadURL);
               setInputs((prev) => {
                  return {
                     ...prev,
                     [urlType]: downloadURL,
                  };
               });
            });
         }
      );
   };
   useEffect(() => {
      img && uploadFile(img, "image");
   }, [img]);

   const handlePost = async () => {
      const res = await authAxios.post(`${baseUrl}/post`, { ...inputs });
      setImg(null);
      navigate(`/profile/${currentUser._id}`);
   };

   return (
      <div className="postSheare">
         <img src={currentUser.profilePicture} alt="" />
         <div>
            <input
               required
               type="text"
               placeholder="What s Happends"
               name="desc"
               onChange={handleChange}
            />
            <div className="postOption">
               <div
                  onChange={(e) => setImg(e.target.files[0])}
                  onClick={() => imageRef.current.click()}
                  className="option"
                  style={{ color: "var(--photo)" }}
               >
                  <FontAwesomeIcon icon={faImage} />
                  <span>Photo</span>
               </div>

               <div className="option" style={{ color: "var(--video)" }}>
                  <FontAwesomeIcon icon={faVideo} />
                  <span>Video</span>
               </div>
               <div className="option" style={{ color: "var(--location)" }}>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>Location</span>
               </div>
               <div className="option" style={{ color: "var(--shedule)" }}>
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>Shedule</span>
               </div>
               <button className="button ps-button" onClick={handlePost}>
                  Share
               </button>
               <div style={{ display: "none" }}>
                  <input
                     onChange={(e) => setImg(e.target.files[0])}
                     ref={imageRef}
                     type="file"
                     style={{ display: "none" }}
                  />
               </div>
            </div>
            <div className="previewImage">
               {img && <span onClick={() => setImg(null)}>X</span>}
               <img src={img ? URL.createObjectURL(img) : ""} alt="" />
               {imgPerc > 0 && img && <div className="process">{imgPerc}%</div>}
            </div>
         </div>
      </div>
   );
};

export default PostSheare;
