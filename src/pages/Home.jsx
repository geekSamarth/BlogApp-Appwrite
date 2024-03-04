import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center text-white/80">
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
    return (
      <div className="w-full py-8 mt-4 text-center text-white/80">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold ">
                Please Login first to read blogs!!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
