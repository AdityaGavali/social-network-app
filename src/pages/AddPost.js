import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { MdCreateNewFolder } from "react-icons/md";
import { Button } from "antd";
import { type } from "@testing-library/user-event/dist/type";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addDoc  ,collection,doc} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [Image, setImage] = useState("");
  const [Description, setDescription] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const addPost = () => {
    dispatch({ type: "showloading" });
    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${Image.name}`);
    uploadBytes(storageRef, Image)
      .then((snapshot) => {
        getDownloadURL(ref(storage, `/posts/${Image.name}`)).then((url)=>{
          addDoc(collection(db,'posts'),{
            Description : Description,
             imageURL : url ,
             likes : [],
             comments : [],
             user : JSON.parse(localStorage.getItem('SocialXpress'))
          }).then(()=>{
            toast.success("Post uploaded");
            dispatch({ type: "hideloading" });
            navigate('/')
          }).catch(()=>{
            dispatch({ type: "hideloading" });
            toast.error("Something went wrong")
          })
          
         
         
        })
    
      })
      .catch(() => {
        toast.error("Image Upload failed");
      });
  };
  return (
    <DefaultLayout>
      <div>
        <h1 className="text-2xl text-center font-bold text-secondary flex items-center justify-center gap-2 font-serif">
          Create Post
          <MdCreateNewFolder className="text-3xl" />
        </h1>
        <div className="flex flex-col gap-8 justify-center items-center">
          <textarea
            value={Description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="mt-3 border-2 bg-light-gray border-primary w-1/2 rounded-3xl p-3 md:w-full overflow-y-scroll  no-scrollbar"
            rows="3"
            placeholder="Describe your post"
          ></textarea>
          <input
            type="file"
            className="text-secondary"
            onChange={(e) => {
              onImageChange(e);
            }}
          />
          {Image && (
            <img
              src={URL.createObjectURL(Image)}
              className="mt-5 h-52 w-52 flex justify-center"
            />
          )}
        </div>
        {Description && Image && (
          <div className="flex justify-center mt-6">
            <Button
              className=" bg-bg text-secondary w-28 h-10"
              onClick={addPost}
            >
              Create
            </Button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default AddPost;
