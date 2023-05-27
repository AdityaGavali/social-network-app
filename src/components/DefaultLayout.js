
import React from "react";
import Header from "./Header";

function DefaultLayout(props) {
  return (
    <div className="mx-10 my-5 md:mx-5">
      <Header/>
      <div className="content mt-5 border p-5 min-h-[100vh] bg-default-layout-bg">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
