import React from "react";
import { DateTime } from "luxon";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import contentShortner from "../utils/contentShortner";
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, $createdAt, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-[320px] bg-[hsl(240,9%,17%)] border-[1px] border-white/30 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </div>
        <h2 className="text-lg font-bold text-white/90">{title}</h2>
        <div className="text-white/80 tracking-wide text-[15px] my-3">
          {parse(contentShortner(content))}
        </div>
        <span className="flex items-center gap-2 text-white/50 mt-5">
          Created at:{" "}
          <p className="">
            {DateTime.fromISO($createdAt).toLocaleString(DateTime.DATETIME_MED)}
          </p>
        </span>
      </div>
    </Link>
  );
}

export default PostCard;
