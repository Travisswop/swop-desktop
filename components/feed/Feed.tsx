import { getUserFeed } from "@/actions/postFeed";
import isUrl from "@/util/isUrl";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import dayjs from "dayjs";
import PostTypeMedia from "./view/PostTypeMedia";
import { HiDotsHorizontal } from "react-icons/hi";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import relativeTime from "dayjs/plugin/relativeTime";
import Reaction from "./view/Reaction";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

const Feed = async ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/feed/user/connect/${userId}?page=1&limit=5`;
  const feedData = await getUserFeed(url, accessToken);

  dayjs.extend(relativeTime);

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

                // console.log("profile picss", profilePic);

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
                      {dayjs(feed.createdAt).fromNow()}
                    </p>
                  </div>
                  {/* post type title  */}
                  {feed.postType === "post" && feed.content.title && (
                    <p>{feed.content.title}</p>
                  )}
                  {/* connection type title  */}
                  {feed.postType === "connection" && (
                    <div>
                      <p className="text-gray-600 text-sm">
                        Connected with{" "}
                        <span className="text-gray-700 font-medium text-base">
                          {feed.content.connectedSmartsiteName}
                        </span>
                      </p>
                    </div>
                  )}
                  {/* connection type title  */}
                  {feed.postType === "ensClaim" && (
                    <div>
                      <p className="text-gray-600 text-sm">
                        Claim a new ENS{" "}
                        <span className="text-gray-700 font-medium text-base">
                          {feed.content.claimEnsName}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* transaction type */}
                  {feed.postType === "transaction" && (
                    <div>
                      <p className="text-gray-600 text-sm">
                        Created a new transaction{" "}
                        <span className="text-gray-700 font-medium text-base">
                          {`${feed.content.receiver_wallet_address.slice(
                            0,
                            5
                          )}....${feed.content.receiver_wallet_address.slice(
                            -5
                          )}`}
                        </span>
                      </p>
                      <p className="text-gray-700 font-medium text-base">
                        {feed.content.currency} {feed.content.amount}
                      </p>
                    </div>
                  )}
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
                {feed.postType === "minting" && (
                  <div className="w-max">
                    <p>{feed.content.title}</p>
                    <div className="shadow-medium bg-white rounded-lg mt-2 p-2 relative">
                      <Link href={feed.content.link} className="w-max">
                        <Image
                          src={feed.content.image}
                          alt="nft image"
                          width={200}
                          height={200}
                        />
                        <p className="text-center text-sm text-gray-500 font-medium">
                          {feed.content.price}
                        </p>
                        <FiPlusCircle
                          className="absolute top-2 right-2"
                          size={24}
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Reaction />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
