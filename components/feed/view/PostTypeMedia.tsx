import Image from "next/image";
import React from "react";
// import Reaction from "./Reaction";

const PostTypeMedia = ({ mediaFiles }: any) => {
  // console.log("hit");

  // console.log(mediaFiles);

  return (
    <div className="">
      {mediaFiles.length > 0 && (
        <div className="mt-2">
          {mediaFiles.length === 1 && (
            <div className={``}>
              {mediaFiles[0].type === "image" ||
              mediaFiles[0].type === "gif" ? (
                <div className="relative min-h-96 max-h-[30rem] border border-black bg-black rounded-2xl overflow-hidden">
                  <Image
                    src={mediaFiles[0].src}
                    alt="media"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center h-full">
                  <video
                    src={mediaFiles[0].src}
                    controls
                    className="w-full h-full rounded-2xl object-cover"
                    style={{
                      maxHeight: "30rem",
                      borderRadius: "0.75rem",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Display for 2 media items */}
          {mediaFiles.length === 2 && (
            <div className="grid grid-cols-2 gap-2 border border-black bg-black rounded-2xl overflow-hidden relative h-auto sm:h-72 md:h-96 xl:h-[28rem]">
              {mediaFiles.map((file: any, index: number) => (
                <div
                  key={index}
                  className="relative w-full h-full aspect-[4/3] overflow-hidden"
                >
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
              {mediaFiles.map((file: any, index: number) => (
                <div
                  key={index}
                  className="relative w-full h-full aspect-[4/3] overflow-hidden"
                >
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
            <div className="grid grid-cols-2 gap-1 border-2 border-black bg-black rounded-2xl overflow-hidden relative h-auto sm:h-72 md:h-96 xl:h-[30rem]">
              {mediaFiles.map((file: any, index: number) => (
                <div
                  key={index}
                  className="relative w-full h-full aspect-[4/3] overflow-hidden"
                >
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
          {/* <Reaction /> */}
        </div>
      )}
    </div>
  );
};

export default PostTypeMedia;
