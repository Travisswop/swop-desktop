import React from "react";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import OrdersCollections from "@/components/OrdersCollections";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const OrderPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect(`/signin`);
  }
  return (
    <main className="main-container">
      <div className="bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <DynamicPrimaryBtn>Download Spreadheet</DynamicPrimaryBtn>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-medium">Filter</p>
              <input
                type="date"
                name=""
                id=""
                className="border border-gray-300 focus:outline-none focus:border-gray-400 px-4 py-1 rounded-md text-gray-500"
              />
              <input
                type="text"
                className="border border-gray-300 focus:outline-none focus:border-gray-400 px-4 py-1 rounded-md text-gray-500"
                placeholder="Name"
              />
            </div>
          </div>
          <OrdersCollections />
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
