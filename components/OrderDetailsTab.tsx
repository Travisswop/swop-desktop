"use client";
import React, { useState } from "react";

const OrderDetailsTab = () => {
  const [activeTab, setActiveTab] = useState("orderHistory");
  return (
    <div>
      <div className="flex items-center gap-12 border-b">
        <button
          onClick={() => setActiveTab("orderHistory")}
          className={`${
            activeTab === "orderHistory" &&
            "text-gray-700 font-semibold border-b-2 border-gray-700"
          } text-gray-500 font-medium`}
        >
          Order History
        </button>
        <button
          onClick={() => setActiveTab("customerDetails")}
          className={`${
            activeTab === "customerDetails" &&
            "text-gray-700 font-semibold border-b-2 border-gray-700"
          } text-gray-500 font-medium`}
        >
          Customer Details
        </button>
        <button
          onClick={() => setActiveTab("orderDescription")}
          className={`${
            activeTab === "orderDescription" &&
            "text-gray-700 font-semibold border-b-2 border-gray-700"
          } text-gray-500 font-medium`}
        >
          Order Description
        </button>
      </div>
      {/* tab content start  */}
      {/* order history content  */}
      {activeTab === "orderHistory" && (
        <div className="flex flex-col gap-3">
          <div className="pl-4 border-l-2 mt-3">
            <p className="font-semibold">Product Shipped</p>
            <p className="text-sm text-gray-500 font-medium">Yes</p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Order Tracking Info</p>
            <p className="text-sm text-gray-500 font-medium">S49skhAGhabn</p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Order Placed</p>
            <p className="text-sm text-gray-500 font-medium">
              12/09/2024 - 5:23pm
            </p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Taxid</p>
            <p className="text-sm text-gray-500 font-medium">1x49skhAGhabn</p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Currency</p>
            <p className="text-sm text-gray-500 font-medium">USD</p>
          </div>
        </div>
      )}
      {activeTab === "customerDetails" && (
        <div className="flex flex-col gap-3">
          <div className="pl-4 border-l-2 mt-3">
            <p className="font-semibold">Swop ID</p>
            <p className="text-sm text-gray-500 font-medium">Travis.swop.id</p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Customer Name</p>
            <p className="text-sm text-gray-500 font-medium">Sadit Afnaf</p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Customer Number</p>
            <p className="text-sm text-gray-500 font-medium">+8801318470354</p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Customer Email</p>
            <p className="text-sm text-gray-500 font-medium">
              sadit908@gmail.com
            </p>
          </div>
          <div className="pl-4 border-l-2">
            <p className="font-semibold">Customer Address</p>
            <p className="text-sm text-gray-500 font-medium">
              Aftabnogor, Dhaka, Bangladesh
            </p>
          </div>
        </div>
      )}
      {activeTab === "orderDescription" && (
        <div className="flex flex-col gap-3">
          <div className="pl-4 border-l-2 mt-3">
            <p className="font-semibold mb-1">Order Description:</p>
            <p className="text-sm text-gray-500 font-medium">
              Swop’s Flat Rectangle NFC’s are designed to be durable and simple
              to use. The Flat is great to put under any phone case(non-metal)
              Users can download our app. Swop’s Flat Rectangle NFC’s are
              designed to be durable and simple to use. The Flat is great to put
              under any phone case(non-metal) Users can download our app. Swop’s
              Flat Rectangle NFC’s are designed to be durable and simple to use.
              The Flat is great to put under any phone case(non-metal) Users can
              download our app.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsTab;
