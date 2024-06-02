import { auth } from "@/auth";
import OrderDetailsTab from "@/components/OrderDetailsTab";
import { Switch } from "@nextui-org/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const OrderDetails = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect(`/signin`);
  }
  return (
    <div className="main-container">
      <div className="bg-white p-4 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Image
            alt="product image"
            src={"/images/order-details-image.png"}
            width={200}
            height={200}
          />
          <div className="flex items-center gap-8 border border-gray-300 rounded-xl pl-4 pr-3 py-2 text-lg font-medium text-gray-600 w-max">
            <p>Shipped:</p>
            <Switch
              color="default"
              size="sm"
              defaultSelected
              aria-label="Shipped"
            />
          </div>
        </div>
        <p className="text-lg font-semibold">Order #123456</p>
        <div className="flex gap-28">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-semibold">Product Name: </p>
              <p className="text-gray-500 text-sm font-medium">
                Swop Table Stand
              </p>
            </div>
            <div>
              <p className="font-semibold">Price: </p>
              <p className="text-gray-500 text-sm font-medium">$89.65</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-semibold">Quantity: </p>
              <p className="text-gray-500 text-sm font-medium">3</p>
            </div>
            <div>
              <p className="font-semibold">Shipping Address: </p>
              <p className="text-gray-500 text-sm font-medium">
                Aftabnogor, Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
        <OrderDetailsTab />
      </div>
    </div>
  );
};

export default OrderDetails;
