
import React from "react";
import Header from "./Header";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function DefaultLayout(props) {
  const {loading} = useSelector(store=>store)
  return (
    <div className="mx-10 my-5 md:mx-5">
    
      <Header/>
      {loading && <Loader/>}
      <div className="content mt-5 border p-5 min-h-[100vh] bg-default-layout-bg">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
