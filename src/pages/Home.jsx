import React, { useState, useEffect, useCallback } from "react";
import { Container, PostCard } from "../components/index.js";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader.jsx";
function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          toast.success("Feed Posts loaded successfully");
          setIsLoading(false);
        } else {
          toast.error("Failed to load feed posts. Try Again!!");
          setIsLoading(false);
        }
      });
    }
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center text-white/80 flex justify-center items-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold ">No post to show</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (status === false) {
    setPosts([]);
    // setIsLoading(false);
  }

  return (
    <div className="w-full pt-24 pb-10 ">
      <Container>
        <h1 className="text-2xl font-bold text-white/80 mb-10 text-center md:text-left md:pl-5 md:text-3xl">
          Your Feed
        </h1>
        <div className="w-full flex flex-wrap gap-9 justify-center md:justify-normal md:mx-auto">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
