import React from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

// Define the Order type
interface Order {
  orderNo: string;
  customer: string;
  order: string;
  price: number;
  orderDate: string;
  deliveryStatus: string;
}

// Define the props for the OrdersCollections component
interface OrdersCollectionsProps {
  orders: Order[];
  filterDate: string;
  filterName: string;
}

const OrdersCollections: React.FC<OrdersCollectionsProps> = ({ orders, filterDate, filterName }) => {
  // Optionally filter orders based on filterDate and filterName here

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order No
            </th>
            <th scope="col" className="px-6 py-3">
              Customer
            </th>
            <th scope="col" className="px-6 py-3">
              Order
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Order Date
            </th>
            <th scope="col" className="px-6 py-3">
              Delivery Status
            </th>
            <th scope="col" className="px-6 py-3">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((data, index) => (
            <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {data.orderNo}
              </th>
              <td className="px-6 py-4">{data.customer}</td>
              <td className="px-6 py-4">{data.order}</td>
              <td className="px-6 py-4">{`$${data.price}`}</td>
              <td className="px-6 py-4">{data.orderDate}</td>
              {data.deliveryStatus === "Processing" && (
                <td className="px-6 py-4">
                  <span className="bg-yellow-400 text-white px-4 py-1 flex justify-center w-[6.2rem] font-medium rounded-lg">
                    {data.deliveryStatus}
                  </span>
                </td>
              )}
              {data.deliveryStatus === "Cancel" && (
                <td className="px-6 py-4">
                  <div className="bg-red-400 text-white px-4 py-1 flex justify-center w-[6.2rem] font-medium rounded-lg">
                    {data.deliveryStatus}
                  </div>
                </td>
              )}
              {data.deliveryStatus === "Complete" && (
                <td className="px-6 py-4">
                  <span className="bg-green-400 text-white px-4 py-1 flex justify-center w-[6.2rem] font-medium rounded-lg">
                    {data.deliveryStatus}
                  </span>
                </td>
              )}
              <td className="px-6 py-4">
                <Link href={`/orders/${data.orderNo}`}>
                  <FaEye size={20} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersCollections;