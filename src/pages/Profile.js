import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { getDocs, collection, query, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import Post from "../components/Post";
import { useParams } from "react-router-dom";

function Profile() {
    
  const dispatch = useDispatch();
  const params = useParams();
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState("");
  const getPosts = async () => {
    dispatch({ type: "showloading" });
    const q = query(collection(db, "posts"));

    const temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    const filteredposts = temp.filter((post) => post.user.id === params.id);
    setposts(filteredposts);
    dispatch({ type: "hideloading" });
  };
  const getUserName = (text) => {
    const email = text;
    const username = email.substring(0, email.length - 10);
    return username;
  };
  const getUser =  () => {
    const result = getDoc(doc(db, "users", params.id));
    setuser(result.data);
    console.log(user.email);
    
  };
  useEffect(() => {
    getPosts();
    getUser();
  }, []);
  return (
    <DefaultLayout>
   {user&&(
    <>
    <div>
        <span className="h-8 w-8 text-center rounded-full text-secondary bg-gray mr-3 text-xl ">
          {getUserName(user.email)[0]}
        </span>
        <span className="text-gray">{getUserName(user.email)}</span>
      </div>
      <div>

      </div>
    </>
   )}
    </DefaultLayout>
  );
}

export default Profile;
