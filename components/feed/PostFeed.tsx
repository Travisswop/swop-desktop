"use client";
import React, { useEffect, useState } from "react";
import UserImageAvatar from "../Avatar";
import { MdOutlineDateRange, MdOutlineLocationOn } from "react-icons/md";
import DynamicPrimaryBtn from "../Button/DynamicPrimaryBtn";
import Emoji from "./Emoji";
import GifPickerContent from "./GifPicker";
import Image from "next/image";
import "react-photo-album/styles.css";
import ImageContent from "./ImageSelect";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai"; // Icon for close button
import { Spinner } from "@nextui-org/react";
import { sendCloudinaryVideo } from "@/util/sendCloudineryVideo";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";
import { postFeed } from "@/actions/postFeed";

const PostFeed = ({ userId, token }: { userId: string; token: string }) => {
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [primaryMicrosite, setPrimaryMicrosite] = useState<string>("");

  const [postContent, setPostContent] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<
    { type: "image" | "video" | "gif"; src: string }[]
  >([]);

  console.log("mediaFiles", mediaFiles);
  // console.log("gifContent", gifContent);

  // Callback function to handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setPostContent((prevContent) => prevContent + emoji);
  };

  useEffect(() => {
    if (fileError) {
      toast.error(fileError);
    }
  }, [fileError]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const micrositeId = localStorage.getItem("userPrimaryMicrosite");
      if (micrositeId) {
        setPrimaryMicrosite(micrositeId);
      }
    }
  }, []);

  // Function to remove media item
  const handleRemoveMedia = (index: number) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFeedPosting = async () => {
    try {
      setPostLoading(true);
      const updatedMediaFiles = await Promise.all(
        mediaFiles.map(async (file) => {
          if (file.type === "image") {
            const imageUrl = await sendCloudinaryImage(file.src);
            return { type: "image", src: imageUrl };
          } else if (file.type === "video") {
            const videoUrl = await sendCloudinaryVideo(file.src);
            return { type: "video", src: videoUrl };
          } else {
            // If it's a GIF or another type, keep the original URL
            return file;
          }
        })
      );
      // console.log("updatedMediaFiles", updatedMediaFiles);

      const payload = {
        smartsiteId: primaryMicrosite,
        userId: userId,
        postType: "post",
        content: {
          title: postContent,
          post_content: updatedMediaFiles,
        },
      };
      const data = await postFeed(payload, token);
      if (data?.state === "success") {
        toast.success("You posted successfully!");
      }
      // console.log("payload", payload);
      // console.log("data", data);
    } catch (error) {
      console.error(error);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-start gap-6">
        <UserImageAvatar src="/images/user_avator/1.png" />
        <div className="flex-1 w-full">
          <textarea
            name="user-feed"
            id="user-feed"
            rows={2}
            className="bg-gray-100 rounded-lg p-3 focus:outline-gray-200 w-full"
            placeholder="What’s happening?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>

          {/* Render media files */}
          {mediaFiles.length > 0 && (
            <div className="mt-4">
              {mediaFiles.length === 1 && (
                <div className="relative w-1/2 min-h-96 max-h-[30rem] border border-black bg-black rounded-2xl overflow-hidden">
                  <button
                    onClick={() => handleRemoveMedia(0)}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-gray-300 z-50"
                  >
                    <AiOutlineClose size={20} className="text-gray-600" />
                  </button>
                  {mediaFiles[0].type === "image" ||
                  mediaFiles[0].type === "gif" ? (
                    <Image
                      src={mediaFiles[0].src}
                      alt="media"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-contain"
                    />
                  ) : (
                    <video
                      src={mediaFiles[0].src}
                      controls
                      className="w-full h-auto rounded-2xl"
                      style={{
                        maxHeight: "30rem",
                        borderRadius: "0.75rem",
                      }}
                    />
                  )}
                </div>
              )}

              {/* Display for 2 media items */}
              {mediaFiles.length === 2 && (
                <div className="w-full 2xl:w-[70%] grid grid-cols-2 gap-2 border border-black bg-black rounded-2xl overflow-hidden relative h-auto sm:h-72 md:h-96 xl:h-[28rem]">
                  {mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full aspect-[4/3] overflow-hidden"
                    >
                      <button
                        onClick={() => handleRemoveMedia(index)}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-gray-300 z-50"
                      >
                        <AiOutlineClose size={20} className="text-gray-600" />
                      </button>
                      {file.type === "image" || file.type === "gif" ? (
                        <Image
                          src={file.src}
                          alt="media"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={file.src}
                          controls
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Display for 3 media items */}
              {mediaFiles.length === 3 && (
                <div className="w-full bg-black grid grid-cols-3 gap-2 border border-black rounded-2xl overflow-hidden relative h-auto sm:h-72 md:h-96">
                  {mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full aspect-[4/3] overflow-hidden"
                    >
                      <button
                        onClick={() => handleRemoveMedia(index)}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-gray-300 z-50"
                      >
                        <AiOutlineClose size={20} className="text-gray-600" />
                      </button>
                      {file.type === "image" || file.type === "gif" ? (
                        <Image
                          src={file.src}
                          alt="media"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={file.src}
                          controls
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Display for 4 media items */}
              {mediaFiles.length === 4 && (
                <div className="w-full 2xl:w-2/3 grid grid-cols-2 gap-1 border-2 border-black bg-black rounded-2xl overflow-hidden relative h-auto sm:h-72 md:h-96 xl:h-[30rem]">
                  {mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full aspect-[4/3] overflow-hidden"
                    >
                      <button
                        onClick={() => handleRemoveMedia(index)}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-gray-300 z-50"
                      >
                        <AiOutlineClose size={20} className="text-gray-600" />
                      </button>
                      {file.type === "image" || file.type === "gif" ? (
                        <Image
                          src={file.src}
                          alt="media"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={file.src}
                          controls
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-10 justify-between mt-2">
            <div className="flex items-center gap-3">
              <ImageContent
                setFileError={setFileError}
                setMediaFiles={setMediaFiles}
                mediaFilesLength={mediaFiles.length}
              />
              <GifPickerContent
                mediaFilesLength={mediaFiles.length}
                setMediaFiles={setMediaFiles}
                setFileError={setFileError}
              />
              <Emoji onEmojiSelect={handleEmojiSelect} />
              <button className="cursor-not-allowed">
                <MdOutlineDateRange size={22} className="text-gray-400" />
              </button>
              <button className="cursor-not-allowed">
                <MdOutlineLocationOn size={24} className="text-gray-400" />
              </button>
            </div>
            <DynamicPrimaryBtn
              enableGradient={false}
              disabled={postLoading}
              className={`!rounded w-28 !py-1.5 ${
                postLoading ? "bg-gray-500" : "hover:!bg-black"
              }`}
              onClick={handleFeedPosting}
            >
              <div>
                {postLoading ? (
                  <span className="flex items-center gap-1">
                    Posting <Spinner size="sm" color="default" />
                  </span>
                ) : (
                  "Post"
                )}
              </div>
            </DynamicPrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
