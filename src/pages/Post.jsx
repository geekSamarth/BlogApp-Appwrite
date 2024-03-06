import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { DateTime } from "luxon";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
        toast.success("Post deleted successfully");
      }else{
        toast.error("Failed to delete post. Try Again!!");
      }
    });
  };

  return post ? (
    <div className="py-8 pt-24">
      <Container>
        <h1 className="text-3xl font-semibold text-white/80 tracking-wider mb-10 ml-2.5 text-center md:text-left">Post</h1>
        <div className="w-full flex justify-center mb-4  border-white/30 border-[1px] rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full md:w-[600px] lg:w-[800px] xl:w-[1000px] h-[500px] rounded-xl object-cover"
          />

          
        </div>
        <div className="w-full mb-6 mt-7">
          <h1 className="text-2xl font-bold text-white/80 ml-2">{post.title}</h1>
        </div>
        <div className="browser-css text-white ml-2">{parse(post.content)}</div>
            
        <span className="text-white/60 text-lg font-medium mt-5 block ml-2">Created At : {DateTime.fromISO(post.$createdAt).toLocaleString(DateTime.DATETIME_MED)}</span>
        {isAuthor && (
            <div className="flex justify-end mt-9">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-700" className="mr-5 px-6 block">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-600" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
      </Container>
    </div>
  ) : null;
}
