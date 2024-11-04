import { getUserFeed } from "@/actions/postFeed";
import isUrl from "@/util/isUrl";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import dayjs from "dayjs";
import PostTypeMedia from "./view/PostTypeMedia";
import { HiDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const Feed = async ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/feed/user/connect/${userId}?page=1&limit=5`;
  const feedData = await getUserFeed(url, accessToken);
  console.log("feedData", feedData);

  const dayJS: any = dayjs;

  return (
    <div>
      <div className="flex flex-col gap-4 w-4/5 xl:w-2/3 2xl:w-1/2">
        {feedData.data.map((feed: any) => (
          <div
            key={feed._id}
            className="flex gap-2 border-b border-gray-200 pb-4"
          >
            <div className="w-12 h-12 bg-gray-400 border border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              {(() => {
                const profilePic =
                  feed?.smartsiteId?.profilePic || feed?.smartsiteProfilePic;

                console.log("profile picss", profilePic);

                if (profilePic) {
                  return isUrl(profilePic) ? (
                    <Image
                      alt="user image"
                      src={profilePic}
                      width={90}
                      height={90}
                      className="rounded-full w-full h-full"
                    />
                  ) : (
                    <Image
                      alt="user image"
                      src={`/images/user_avator/${profilePic}.png`}
                      width={90}
                      height={90}
                      className="rounded-full w-full h-full"
                    />
                  );
                } else {
                  return <FaUser size={28} color="white" />;
                }
              })()}
            </div>
            <div className="w-full">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-gray-700 font-semibold">
                      {feed?.smartsiteId?.name ||
                        feed?.smartsiteUserName ||
                        "Annonymous"}
                    </p>
                    <GoDotFill size={10} />
                    <p className="text-gray-500 font-normal">
                      {feed?.smartsiteId?.ens ||
                        feed?.smartsiteEnsName ||
                        "n/a"}
                    </p>
                    <GoDotFill size={10} />
                    <p className="text-gray-500 font-normal">
                      {dayJS(feed.createdAt).fromNow()}
                    </p>
                  </div>
                  {/* post type title  */}
                  {feed.postType === "post" && feed.content.title && (
                    <p>{feed.content.title}</p>
                  )}
                  {/* connection type title  */}
                </div>
                <div>
                  <Popover
                    backdrop="transparent"
                    placement="bottom-end"
                    showArrow={true}
                  >
                    <PopoverTrigger>
                      <button type="button">
                        <HiDotsHorizontal
                          size={20}
                          className="border-transparent"
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">
                          Popover Content
                        </div>
                        <div className="text-tiny">
                          This is the popover content
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                {feed.postType === "post" &&
                  feed.content.post_content.length > 0 && (
                    <PostTypeMedia mediaFiles={feed.content.post_content} />
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
