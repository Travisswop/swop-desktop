"use client";
import React, { useState } from "react";
import UserImageAvatar from "../Avatar";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineDateRange, MdOutlineLocationOn } from "react-icons/md";
import DynamicPrimaryBtn from "../Button/DynamicPrimaryBtn";
import Emoji from "./Emoji";
import GifPickerContent from "./GifPicker";
import Image from "next/image";
import PhotoAlbum, { RenderPhotoProps } from "react-photo-album";
import "react-photo-album/styles.css";

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

          <div className="flex items-center gap-10 justify-between mt-4">
            <div className="flex items-center gap-3">
              <button>
                <FaRegImage size={22} className="text-gray-600" />
              </button>
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
