"use client";
import React, { useEffect, useState } from "react";
import UserImageAvatar from "../Avatar";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineDateRange, MdOutlineLocationOn } from "react-icons/md";
import DynamicPrimaryBtn from "../Button/DynamicPrimaryBtn";
import Emoji from "./Emoji";
import GifPickerContent from "./GifPicker";
import Image from "next/image";
import PhotoAlbum, { RenderPhotoProps } from "react-photo-album";
import "react-photo-album/styles.css";
import ImageContent from "./ImageSelect";
import { toast } from "react-toastify";

// Render Image Component for Photo Album
function renderNextImage({ photo, layout, wrapperStyle }: any) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={photo.src}
        alt={photo.alt || ""}
        placeholder={photo.blurDataURL ? "blur" : undefined}
        sizes={layout.width}
        style={{ objectFit: "cover", borderRadius: "0.5rem" }}
      />
    </div>
  );
}

const PostFeed = () => {
  const [postContent, setPostContent] = useState<string>("");
  const [gifContent, setGifContent] = useState<string[]>([]);
  // const [imageFile, setImageFile] = useState<string[]>([]);
  const [fileError, setFileError] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<
    { type: "image" | "video"; src: string }[]
  >([]);

  console.log("mediaFiles", mediaFiles);
  console.log("fileError", fileError);

  const Album: any = PhotoAlbum;

  // Callback function to handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setPostContent((prevContent) => prevContent + emoji);
  };

  // Callback function to handle GIF selection
  const handleGifSelect = (gif: string) => {
    setGifContent((prevContent) => [...prevContent, gif]);
  };

  const photoAlbumData = gifContent.map((gif) => ({
    src: gif,
    width: 1200,
    height: 600,
  }));

  useEffect(() => {
    if (fileError) {
      toast.error(fileError);
    }
  }, [fileError]);

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

          {gifContent.length > 0 && (
            <Album
              layout="rows"
              photos={photoAlbumData}
              renderPhoto={renderNextImage}
              // render={{ image: renderNextImage } as any}
              targetRowHeight={200}
            />
          )}

          {/* {imageFile.length === 1 && (
            <div className="w-1/2">
              <Image
                src={imageFile[0]}
                alt="image"
                width={1200}
                height={900}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          )} */}
          {/* {imageFile.length === 2 && (
            <div className="w-full grid grid-cols-2 items-center gap-5 relative h-auto sm:h-72 md:h-96">
              {imageFile.map((file, index) => (
                <div
                  key={index}
                  className="relative w-full h-full aspect-[4/3] rounded-2xl overflow-hidden"
                >
                  <Image
                    src={file}
                    alt="image"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )} */}

          {/* Display media files */}
          {/* <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaFiles.map((file, index) => (
              <div
                key={index}
                className="relative w-full h-auto rounded-lg overflow-hidden"
              >
                {file.type === "image" ? (
                  <Image
                    src={file.src}
                    alt="image"
                    width={1200}
                    height={900}
                    className="w-full h-auto rounded-2xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <video
                    src={file.src}
                    controls
                    className="w-full h-auto rounded-2xl"
                  />
                )}
              </div>
            ))}
          </div> */}
          {/* Render based on the number of media files */}
          <div className="mt-4">
            {mediaFiles.length === 1 && (
              <div className="relative w-1/2 border border-black min-h-96 max-h-[30rem] bg-black rounded-2xl overflow-hidden">
                {mediaFiles[0].type === "image" ? (
                  <Image
                    src={mediaFiles[0].src}
                    alt="media"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-contain"
                    // style={{
                    //   objectFit: "cover",
                    //   borderRadius: "0.75rem", // Smooth rounding for better visual
                    //   aspectRatio: "4/3", // Maintains a consistent layout across images
                    // }}
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

            {mediaFiles.length === 2 && (
              <div className="w-full border border-black 2xl:w-[70%] grid grid-cols-2 bg-black items-center rounded-2xl overflow-hidden gap-2 relative h-auto sm:h-72 md:h-96 xl:h-[28rem]">
                {mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-full h-full aspect-[4/3] overflow-hidden"
                  >
                    {file.type === "image" ? (
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
            {mediaFiles.length === 3 && (
              <div className="w-full border border-black bg-black grid grid-cols-3 items-center rounded-2xl overflow-hidden gap-2 relative h-auto sm:h-72 md:h-96">
                {mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-full h-full aspect-[4/3] overflow-hidden"
                  >
                    {file.type === "image" ? (
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
            {mediaFiles.length === 4 && (
              <div className="w-full border-2 border-black 2xl:w-2/3 grid grid-cols-2 gap-1 bg-black items-center rounded-2xl overflow-hidden relative h-auto sm:h-72 md:h-96 xl:h-[30rem]">
                {mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-full h-full aspect-[4/3] overflow-hidden"
                  >
                    {file.type === "image" ? (
                      <Image
                        src={file.src}
                        alt="media"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover "
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

          <div className="flex items-center gap-10 justify-between mt-4">
            <div className="flex items-center gap-3">
              <ImageContent
                setFileError={setFileError}
                setMediaFiles={setMediaFiles}
              />
              <GifPickerContent onGifSelect={handleGifSelect} />
              <Emoji onEmojiSelect={handleEmojiSelect} />
              <button>
                <MdOutlineDateRange size={22} className="text-gray-600" />
              </button>
              <button>
                <MdOutlineLocationOn size={24} className="text-gray-600" />
              </button>
            </div>
            <DynamicPrimaryBtn
              enableGradient={false}
              className="!rounded w-20 hover:!bg-black !py-1.5"
            >
              Post
            </DynamicPrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
