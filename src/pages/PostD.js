import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { TfiCommentsSmiley } from "react-icons/tfi";
import {
  AiFillHeart,
  AiFillDelete,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { json, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "antd";
import moment from "moment/moment";
function PostD() {
  const currentUser = JSON.parse(localStorage.getItem("SocialXpress"));
  const [showlikes, setshowlikes] = useState(false);
  const [alreadyliked, setalreadyliked] = useState(false);
  const [showcomments, setshowcomments] = useState(false);
  const [commentstext, setcommentstext] = useState("");
  const navigate = useNavigate();
  const getUserName = (text) => {
    const email = text;
    const username = email.substring(0, email.length - 10);
    return username;
  };
  const [post, setPost] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const getData = () => {
    dispatch({ type: "showloading" });
    getDoc(doc(db, "posts", params.id))
      .then((res) => {
        setPost({ ...res.data(), id: res.id });
        if (res.data().likes.find((user) => user.id === currentUser.id)) {
          setalreadyliked(true);
        } else {
          setalreadyliked(false);
        }
        dispatch({ type: "hideloading" });
      })
      .catch(() => {
        dispatch({ type: "hideloading" });
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const likeOrunlikePost = () => {
    let updatedlikes = post.likes;
    if (alreadyliked) {
      updatedlikes = post.likes.filter((user) => user.id !== currentUser.id);
    } else {
      updatedlikes.push({
        id: currentUser.id,
        email: currentUser.email,
      });
    }

    setDoc(doc(db, "posts", post.id), { ...post, likes: updatedlikes })
      .then(() => {
        getData();
        toast.success("Post liked!!");
      })
      .catch(() => {
        toast.error("Error occured");
      });
  };
  const addComment = ()=>{
   let updatedComments = post.comments;
   updatedComments.push({
    id: currentUser.id,
    email: currentUser.email,
    commentstext,
    createdOn: moment().format("DD-MM-YYYY")
    
  });
  setDoc(doc(db, "posts", post.id), { ...post, comments: updatedComments })
  .then(() => {
    getData();
    setcommentstext('')
  })
  .catch(() => {
    toast.error("Error occured");
  });
  }
  
  return (
    <DefaultLayout>
      <div className="flex justify-center md:flex-col gap-3">
        {post && (
          <>
            {/* likes display purpose */}
            <div>
              {showlikes && (
                <div>
                  <div className="flex justify-center gap-3 items-center mb-3">
                    <h1 className="text-secondary font-serif">Liked BY</h1>
                    <AiOutlineCloseCircle
                      className="text-secondary text-3xl cursor-pointer"
                      onClick={() => {
                        setshowlikes(false);
                      }}
                    />
                  </div>
                  

                  <hr />
                  {post.likes.map((like) => {
                    return (
                      <div className="flex items-center border-2 p-1 border-secondary">
                        <span className="h-8 w-8 text-center rounded-full bg-gray mr-3 text-xl ">
                          {getUserName(like.email)[0]}
                        </span>
                        <span className="text-gray ">
                          {getUserName(like.email)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* post info purpose */}
            <div className="flex justify-center w-full">
              <div className="cursor-pointer">
                <div className="flex flex-col gap-4 max-w-sm rounded-3xl overflow-hidden shadow-2xl border-y-light-gray border-y-8 p-4">
                  <div className="flex items-center">
                    <span className="h-8 w-8 text-center rounded-full bg-gray mr-3 text-xl ">
                      {getUserName(post.user.email)[0]}
                    </span>
                    <span className="text-gray">
                      {getUserName(post.user.email)}
                    </span>
                  </div>
                  <div className="w-full text-center flex flex-col gap-4 max-w-sm overflow-hidden shadow-2xl ">
                    <img
                      src={post.imageURL}
                      alt=""
                      className=" w-[500px] max-h-[500px]"
                    />
                  </div>
                  <div className="p-2 flex text-light-gray text-xl justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AiFillHeart
                        onClick={likeOrunlikePost}
                        color={alreadyliked ? "red" : "gray"}
                      />
                      <h1
                        className="underline font-semibold cursor-pointer"
                        onClick={() => {
                          setshowlikes(true);
                        }}
                      >
                        {post.likes.length}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <TfiCommentsSmiley />
                      <h1
                        className="underline font-semibold cursor-pointer"
                        onClick={() => {
                          setshowcomments(true);
                        }}
                      >
                        {post.comments.length}
                      </h1>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            {/* comments info purpose */}
            {showcomments && (
              <div className='mt-2 p-3'>
              <div className="flex justify-center gap-3 items-center mb-3">
                    <h1 className="text-secondary font-serif">Comments</h1>
                    <AiOutlineCloseCircle
                      className="text-secondary text-3xl cursor-pointer"
                      onClick={() => {
                        setshowcomments(false);
                      }}
                    />
                  </div>
              {post.comments.map((comment)=>{
                return <div className='border-2 border-secondary p-2 rounded-xl'>
                
             <h1 className="text-md text-secondary">{comment.commentstext}</h1>
             <hr />
             <h1 className="text-left text-sm text-secondary">By {getUserName(comment.email)} </h1>
                </div>
              })}
              <div className=" w-96 md:w-auto flex flex-col gap-3 justify-center items-center">
              
                <textarea
                  value={commentstext}
                  rows="2"
                  onChange={(e) => {
                    setcommentstext(e.target.value);
                  }}
                  className="mt-3 border-2 bg-light-gray border-primary w-full rounded-3xl p-3 md:w-full overflow-y-scroll  no-scrollbar"
                ></textarea>
                <Button
              className=" bg-bg text-secondary w-28 h-10"
              onClick={addComment}
            >
              Add comment
            </Button>
              </div>
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}

export default PostD;
