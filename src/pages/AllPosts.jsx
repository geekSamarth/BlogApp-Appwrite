import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader.jsx";

function AllPosts() {
  const [post, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) =>
    state.auth.userData ? state.auth.userData.$id : null
  );

  useEffect(() => {
    service.getUserPosts(userId).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        toast.success("Posts loaded successfully");
      } else {
        toast.error("Failed to load posts. Try Again!!");
      }
    });
  }, []);
  if (post.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <h1 className="text-2xl text-white">No Posts Found</h1>
      </div>
    );
  }
  return (
    <div className="w-full pt-24 pb-10">
      <Container>
        <h1 className="text-2xl font-bold text-white/80 mb-10 text-center md:text-left md:pl-5 md:text-3xl">
          Your Posts
        </h1>
        <div className="flex flex-wrap gap-7 justify-center md:justify-normal md:mx-3.5">
          {post.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
              $createdAt={post.$createdAt}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
