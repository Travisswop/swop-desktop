import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

const OrdersCollections = () => {
  const rows = [
    {
      key: "1",
      orderNo: "1009701",
      customer: "Hamid Hasan",
      order: "Black NFC Card",
      price: "24.99",
      orderDate: "7/11/2022",
      deliveryStatus: "Processing",
    },
    {
      key: "2",
      orderNo: "1009701",
      customer: "Nahid khan",
      order: "Black NFC Card",
      price: "24.99",
      orderDate: "7/11/2022",
      deliveryStatus: "Processing",
    },
    {
      key: "3",
      orderNo: "1009701",
      customer: "Urmila Hasan",
      order: "Black NFC Card",
      price: "24.99",
      orderDate: "7/11/2022",
      deliveryStatus: "Complete",
    },
    {
      key: "4",
      orderNo: "1009701",
      customer: "Husain Rahman",
      order: "Black NFC Card",
      price: "24.99",
      orderDate: "7/11/2022",
      deliveryStatus: "Processing",
    },
    {
      key: "5",
      orderNo: "1009701",
      customer: "Nabila Khan",
      order: "Black NFC Card",
      price: `24.99`,
      orderDate: "7/11/2022",
      deliveryStatus: "Cancel",
    },
    {
      key: "6",
      orderNo: "1009701",
      customer: "Alex Biny",
      order: "Black NFC Card",
      price: "24.99",
      orderDate: "7/11/2022",
      deliveryStatus: "Processing",
    },
  ];

  const columns = [
    {
      key: "orderNo",
      label: "Order No",
    },
    {
      key: "customer",
      label: "Customer",
    },
    {
      key: "order",
      label: "Order",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "orderDate",
      label: "Order Date",
    },
    {
      key: "deliveryStatus",
      label: "Delivery Status",
    },
  ];
  return (
    // <Table removeWrapper aria-label="Example table with dynamic content">
    //   <TableHeader columns={columns}>
    //     {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    //   </TableHeader>
    //   <TableBody items={rows}>
    //     {(item) => (
    //       <TableRow key={item.key}>
    //         {(columnKey) => (
    //           <TableCell>{getKeyValue(item, columnKey)}</TableCell>
    //         )}
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>

    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {rows.map((data, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                <Link href={`/orders/fffff`}>
                  <FaEye size={20} />
                </Link>
              </td>
            </tr>
          ))}

          {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersCollections;
