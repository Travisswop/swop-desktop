import React from "react";
import couponMint1 from "@/public/images/mint/couponMint1.png";
import couponMint2 from "@/public/images/mint/couponMint2.png";
import couponMint3 from "@/public/images/mint/couponMint3.png";
import couponMint4 from "@/public/images/mint/couponMint4.png";
import productMint1 from "@/public/images/mint/productMint1.png";
import productMint2 from "@/public/images/mint/productMint2.png";
import productMint3 from "@/public/images/mint/productMint3.png";
import productMint4 from "@/public/images/mint/productMint4.png";
import MintCart from "@/components/MintCart";
import Link from "next/link";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import isUserAuthenticate from "@/util/isUserAuthenticate";

const MintDashboard = async () => {
  await isUserAuthenticate(); // check is user exist

  const couponsArray = [
    {
      _id: 12354,
      img: couponMint1,
      title: "Half Off Drinks",
      text: "Expires 2/10",
    },
    {
      _id: 13354,
      img: couponMint2,
      title: "20% OFF Coupon",
      text: "Expires 2/11",
    },
    {
      _id: 11354,
      img: couponMint3,
      title: "Buy 1 Get 1 BLT",
      text: "Only Wednesdays",
    },
    {
      _id: 12354,
      img: couponMint4,
      title: "Subscription Pass",
      text: "January Pass",
    },
  ];
  const prouductsArray = [
    {
      _id: 12354,
      img: productMint1,
      title: "Interactable Hat",
      subtitle: "$39.99 USD",
      text: "100 Remaining",
    },
    {
      _id: 13354,
      img: productMint2,
      title: "Collectible Mouse",
      subtitle: "$59.99 USD",
      text: "1 Remaining",
    },
    {
      _id: 11354,
      img: productMint3,
      title: "Swop Card",
      subtitle: "$19.99 USD",
      text: "247 Remaining",
    },
    {
      _id: 12354,
      img: productMint4,
      title: "Interactive Topper",
      subtitle: "$19.99 USD",
      text: "300 Remaining",
    },
  ];
  return (
    <main className="main-container">
      <div className="bg-white p-4">
        {/* coupons */}
        <div>
          <h6 className="heading-4 mb-4">Coupons/Collectibles</h6>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-10 2xl:gap-16">
            {couponsArray.map((data) => (
              <MintCart
                key={data._id}
                img={data.img}
                title={data.title}
                text={data.text}
              />
            ))}
          </div>
          <Link href={""} className="flex justify-center my-6">
            <button className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg">
              Add To Collection
            </button>
          </Link>
          <div>
            <h6 className="heading-4 mb-4">Products</h6>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-10 2xl:gap-16">
              {prouductsArray.map((data) => (
                <MintCart
                  key={data._id}
                  img={data.img}
                  title={data.title}
                  subtitle={data.subtitle}
                  text={data.text}
                />
              ))}
            </div>
          </div>
          <Link href={""} className="flex justify-center my-6">
            <button className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg">
              Add To Collection
            </button>
          </Link>
          <div className="flex justify-center">
            <DynamicPrimaryBtn className="!py-2">
              Create Collection
            </DynamicPrimaryBtn>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MintDashboard;
