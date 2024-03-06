import React, { useState, useEffect } from "react";
import { PostForm, Container } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
          if (post) {
            setPost(post);
          }
        });
      } else {
        navigate("/");
      }
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 pt-24">
      <Container>
        <h1 className="text-2xl font-bold text-white/80 mb-10 text-center md:text-left md:pl-5 md:text-3xl">
          Edit Post
        </h1>
        <div className="mx-2 md:mx-2.5">
        <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
