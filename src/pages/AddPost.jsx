import React from "react";
import { PostForm, Container } from "../components";
function AddPost() {
  return (
    <div className="w-full pt-24 pb-10">
      <Container>
        <h1 className="text-2xl font-bold text-white/80 mb-5 md:mb-10 text-center md:text-left md:pl-5 md:text-3xl">
          Add Post
        </h1>
        <h2 className="text-red-400 font-semibold text-xl  md:mb-10 text-center md:text-left ">
          Note: '*' means that field are required
        </h2>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
