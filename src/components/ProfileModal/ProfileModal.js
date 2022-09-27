import React, { useEffect, useRef, useState } from "react";
import "./ProfileModal.css";
import { UilPen } from "@iconscout/react-unicons";
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../../redux/userSlice";

const ProfileModal = ({ setOpen }) => {
   const baseUrl = "http://localhost:5000";

   const { currentUser } = useSelector((state) => state.user);
   const [cover, setCover] = useState(null);
   const [profile, setProfile] = useState(null);
   const [coverPerc, setCoverPerc] = useState(0);
   const [profilePerc, setProfilePerc] = useState(0);

   const profileRef = useRef();
   const coverRef = useRef();
   const dispatch = useDispatch();

   const [inputs, setInputs] = useState({});
   const handleChange = (e) => {
      setInputs((prev) => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const authAxios = axios.create({
      baseURL: baseUrl,
      headers: {
         Authorization: `Bearer ${currentUser ? currentUser.token : null}`,
      },
   });

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
            urlType === "profilePicture"
               ? setProfilePerc(Math.round(progress))
               : setCoverPerc(Math.round(progress));
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
                  return { ...prev, [urlType]: downloadURL };
               });
            });
         }
      );
   };

   useEffect(() => {
      cover && uploadFile(cover, "coverPicture");
   }, [cover]);
   useEffect(() => {
      profile && uploadFile(profile, "profilePicture");
   }, [profile]);

   const handleSubmet = async () => {
      const res = await authAxios.put(`/user/${currentUser._id}`, {
         ...inputs,
         token: currentUser.token,
      });
      dispatch(updateSuccess(res.data));
      setOpen(false);
   };

   return (
      <div className="uploadModal">
         <div className="wrapper">
            <span className="cros" onClick={() => setOpen(false)}>
               X
            </span>
            <div className="previewCover mt-3">
               <UilPen
                  width="2rem"
                  height="1.2rem"
                  onClick={() => coverRef.current.click()}
               />
               ;
               <img src={cover ? URL.createObjectURL(cover) : null} alt="" />
            </div>
            <div className="previewImg">
               <UilPen
                  width="2rem"
                  height="1.2rem"
                  onClick={() => profileRef.current.click()}
               />
               <img
                  src={profile ? URL.createObjectURL(profile) : null}
                  alt=""
               />
            </div>
            {coverPerc > 0 && (
               <span>
                  Cover Done: <b style={{ color: "green" }}>{coverPerc}%</b>
               </span>
            )}
            <br />
            {profilePerc > 0 && (
               <span>
                  Profile Done: <b style={{ color: "green" }}>{profilePerc}%</b>
               </span>
            )}
            <br />
            <form className="infoForm form2">
               <h4>Your Info</h4>
               <div>
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="Bio"
                     name="bio"
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="First Name"
                     name="firstname"
                     onChange={handleChange}
                  />
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="Last Name"
                     name="lastname"
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="Works at"
                     name="worksat"
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="Lives In"
                     name="livesin"
                     onChange={handleChange}
                  />
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="Country"
                     name="country"
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <input
                     type="text"
                     className="infoInput"
                     placeholder="RelationShip Status"
                     name="relationship"
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <input
                     style={{ display: "none" }}
                     ref={profileRef}
                     type="file"
                     className=""
                     name="profileImage"
                     accept="image/*"
                     onChange={(e) => setProfile(e.target.files[0])}
                  />
                  <input
                     style={{ display: "none" }}
                     ref={coverRef}
                     type="file"
                     className=""
                     name="coverImage"
                     accept="image/*"
                     onChange={(e) => setCover(e.target.files[0])}
                  />
               </div>
            </form>
            <button className="button infoButton" onClick={handleSubmet}>
               Update
            </button>
         </div>
      </div>
   );
};

export default ProfileModal;
