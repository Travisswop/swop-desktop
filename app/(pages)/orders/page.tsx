"use client";

import React, { useEffect, useState } from "react";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import OrdersCollections from "@/components/Orders/OrdersCollections";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import axios from "axios";

// Define the Order type
interface Order {
  orderNo: string;
  customer: string;
  order: string;
  price: number;
  orderDate: string;
  deliveryStatus: string;
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token on component mount
    const fetchToken = async () => {
      try {
        const session: any = await isUserAuthenticate(); // Check if the user exists
        setToken(session?.accessToken);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    // Fetch orders from backend using the accessToken
    async function fetchOrders() {
      try {
        if (token) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/nft/getOrders`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the token in Authorization header
              },
            }
          );
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [token]);

  return (
    <main className="main-container">
      <div className="bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <DynamicPrimaryBtn>Download Spreadsheet</DynamicPrimaryBtn>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-medium">Filter</p>
              <input
                type="date"
                className="border border-gray-300 focus:outline-none focus:border-gray-400 px-4 py-1 rounded-md text-gray-500"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 focus:outline-none focus:border-gray-400 px-4 py-1 rounded-md text-gray-500"
                placeholder="Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
          </div>

          {/* Pass orders and filter inputs to OrdersCollections */}
          <OrdersCollections
            orders={orders}
            filterDate={filterDate}
            filterName={filterName}
          />
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
