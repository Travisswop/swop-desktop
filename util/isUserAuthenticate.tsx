import { auth } from "@/auth";
import { redirect } from "next/navigation";

const isUserAuthenticate = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect(`/signin`);
  } else {
    return session.user;
  }
};

export default isUserAuthenticate;
