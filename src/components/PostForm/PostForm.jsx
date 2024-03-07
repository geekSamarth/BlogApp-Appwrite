import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Input, RTE, Select } from "../index";
import toast from "react-hot-toast";
// import { data } from "autoprefixer";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");
  // console.log(userData.$id)
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      // default values are the values which we use to complete the post form or which are necessary to complete the process
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
        toast.success("Post updated successfully");
      } else {
        toast.error("Failed to update post. Try Again!!");
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      const maxImageSize = 300 * 1024;
      if (file && file.sizeOriginal > maxImageSize) {
        {
          setError("Image size should be less than 300kb");
        }
      } else {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        // console.log(dbPost)
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          toast.success("Post created successfully");
        } else {
          toast.error("Failed to create post. Try Again!!");
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap text-white/80 mx-2 md:mx-0"
      >
        <div className="w-full lg:w-2/3 pt-10 md:pt-16 lg:pt-0">
          <Input
            label="Title : *"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug : *"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content : (Max 5000 Characters allowed) *"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-full lg:w-1/3 py-6 md:py-0 lg:px-5">
          <Input
            label="Featured Image : (max size: 300 Kb)*"
            type="file"
            className=""
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {error && <p className="text-red-500 text-[16px]">{error}</p>}
          {post && (
            <div className="w-full mb-4 mt-10">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status : *"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full mt-2"
          >
            {post ? "Update" : "Create Post"}
          </Button>
        </div>
      </form>
    </>
  );
}
