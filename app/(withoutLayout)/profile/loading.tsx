import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner color="secondary" />
    </div>
  );
}
