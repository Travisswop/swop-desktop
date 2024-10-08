"use client";
import LoginPasswordInput from "@/components/LoginPasswordInput";
import Image from "next/image";
import { useEffect, useState } from "react";
import swopLogo from "../../../public/images/logo/swop-logo.svg";
// import walletIcon from "../../../public/wallet_login_icon.svg";
import { doSignInWithGoogle, signInWithCredentials } from "@/actions/auth";
import SignInButton from "@/components/Button/SignInButton";
import { MotionSection } from "@/util/Motion";
import { signInSchema } from "@/util/zodSchema/signInZodSchema";
// import { useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { z } from "zod";
import appleIcon from "../../../public/images/login-form/apple-icon.svg";
import googleIcon from "../../../public/images/login-form/google-icon.svg";
import login_astronot from "../../../public/images/login_astronot.svg";

// Type definitions for form errors
interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const router = useRouter();
  // const controls = useAnimation();
  // const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // Using random x and y position astronaut float around background
  // useEffect(() => {
  //   if (!mounted || !controls) return; // Ensure the component is mounted and controls are defined

  //   // Variables to store the previous x and y positions
  //   let previousX = 0;
  //   let previousY = 0;
  //   let isCancelled = false; // Track if the animation should be cancelled

  //   // Generate random x position with a difference of 50-100 pixels
  //   const getRandomXPosition = () => {
  //     const screenWidth = window.innerWidth;
  //     const maxX = screenWidth - 300; // Adjust based on the image width

  //     let newX = Math.floor(Math.random() * maxX);

  //     // Ensure the newX is at least 50-100 pixels away from the previousX
  //     while (
  //       Math.abs(newX - previousX) < 300 ||
  //       Math.abs(newX - previousX) > 500
  //     ) {
  //       newX = Math.floor(Math.random() * maxX);
  //     }

  //     previousX = newX; // Update the previousX for the next calculation
  //     return { x: newX };
  //   };

  //   // Generate random y position with a difference of 50-100 pixels
  //   const getRandomYPosition = () => {
  //     const screenHeight = window.innerHeight;
  //     const maxY = screenHeight - 300; // Adjust based on the image height

  //     let newY = Math.floor(Math.random() * maxY);

  //     // Ensure the newY is at least 50-100 pixels away from the previousY
  //     while (
  //       Math.abs(newY - previousY) < 300 ||
  //       Math.abs(newY - previousY) > 500
  //     ) {
  //       newY = Math.floor(Math.random() * maxY);
  //     }

  //     previousY = newY; // Update the previousY for the next calculation
  //     return { y: newY };
  //   };

  //   const sequence = async () => {
  //     for (let i = 0; i < 5; i++) {
  //       if (isCancelled) return; // Stop the animation if cancelled
  //       const { x } = getRandomXPosition();
  //       const { y } = getRandomYPosition();
  //       await controls.start({
  //         x,
  //         y,
  //         rotate: [10, -10, 10],
  //         transition: { duration: 4, ease: "easeInOut" },
  //       });
  //     }
  //     sequence(); // Call the sequence function again to create a loop
  //   };

  //   sequence(); // Start the sequence when mounted and controls are ready

  //   // Cleanup the animation on unmount or when route changes
  //   return () => {
  //     isCancelled = true; // Set the flag to cancel ongoing animations
  //     controls.stop(); // Stop any ongoing animations
  //   };
  // }, [mounted, controls]); // Depend on mounted and controls

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      setError("");
      setFormErrors({});
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const plainData = Object.fromEntries(formData.entries());
      signInSchema.parse(plainData); // Validate the plain object

      const response = await signInWithCredentials(formData);

      if (response.error) {
        setError("Incorrect email or password");
        setLoading(false);
      } else {
        router.push("/");
        // setMounted(false);
      }
    } catch (err) {
      console.error("err", err);
      setLoading(false);
      if (err instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        err.errors.forEach((e) => {
          fieldErrors[e.path[0] as keyof FormErrors] = e.message;
        });
        setFormErrors(fieldErrors);
      } else {
        setError("Authentication Failed! Please Check Your Credentials!");
      }
    }
  }

  return (
    <main className="overflow-y-auto overflow-x-hidden relative py-10 2xl:py-16 h-screen">
      {/* <MotionSection className="absolute" animate={controls}> */}
      {/* <Image alt="login_astronot" src={login_astronot} /> */}
      {/* </MotionSection> */}

      <div className="">
        <section className="flex justify-center relative -z-10">
          <Image
            src={swopLogo}
            alt="swop-logo"
            width={200}
            priority
            className="w-44 2xl:w-52"
          />
        </section>
        <section className="h-full pb-10 2xl:pb-16">
          <div className="flex justify-center">
            <div className="relative lg:w-auto w-[90%] sm:w-[70%] md:w/[60%]">
              <div className="flex flex-col gap-4 justify-center mt-10 2xl:mt-16 w-full lg:w-[32rem] h-full px-4 lg:px-10 pt-4 lg:pt-12 pb-4 backdrop-blur-[50px] bg-white bg-opacity-25 border shadow-md rounded-xl">
                <div className="flex gap-2 justify-center">
                  {/* action for google sign in */}
                  <form action={doSignInWithGoogle}>
                    <button type="submit">
                      <Image
                        src={googleIcon}
                        alt="swop-logo"
                        width={44}
                        className="mt-1.5"
                      />
                    </button>
                  </form>

                  <Image src={appleIcon} alt="swop-logo" width={44} />
                </div>
                {error && Object.keys(formErrors).length === 0 && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email address"
                      className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl bg-white focus:outline-none px-4 py-2 text-gray-700"
                    />
                    {formErrors.email && (
                      <p className="text-red-600 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  <LoginPasswordInput formErrors={formErrors} />
                  <SignInButton loading={loading} />
                </form>
                <div className="flex flex-col gap-3 font-medium">
                  <div className="flex items-center gap-2">
                    <hr className="w-full h-[1.5px] bg-gray-300" />
                    <p>Or</p>
                    <hr className="w-full h-[1.5px] bg-gray-300" />
                  </div>
                  {/* <button className="flex items-center gap-2 justify-center w-full border border-gray-300 py-2 rounded-xl bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="13"
                      viewBox="0 0 14 13"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1329_10912)">
                        <path
                          d="M13.6791 0L7.67188 4.40261L8.78898 1.80803L13.6791 0Z"
                          fill="#E17726"
                        />
                        <path
                          d="M0.340008 0.00537109L5.21709 1.80853L6.27781 4.43713L0.340008 0.00537109ZM11.2594 9.36331L13.9145 9.41336L12.9866 12.5356L9.74675 11.6521L11.2594 9.36331ZM2.74341 9.36331L4.25044 11.6521L1.01605 12.5357L0.09375 9.41336L2.74341 9.36331Z"
                          fill="#E27625"
                        />
                        <path
                          d="M6.13054 3.76725L6.23904 7.23841L2.99219 7.0921L3.91575 5.71204L3.92745 5.69877L6.13054 3.76725ZM7.83258 3.72852L10.0693 5.69888L10.0809 5.7121L11.0045 7.09216L7.75831 7.23841L7.83258 3.72852ZM4.34248 9.37306L6.11534 10.7413L4.05591 11.7261L4.34248 9.37306ZM9.6546 9.37284L9.9352 11.7261L7.88152 10.7411L9.6546 9.37284Z"
                          fill="#E27625"
                        />
                        <path
                          d="M7.93101 10.6123L10.015 11.6118L8.07648 12.5243L8.0966 11.9212L7.93101 10.6123ZM6.07344 10.6127L5.91435 11.9113L5.92742 12.5236L3.98438 11.6118L6.07344 10.6127Z"
                          fill="#D5BFB2"
                        />
                        <path
                          d="M5.46574 7.69141L6.01032 8.82501L4.15625 8.28702L5.46574 7.69141ZM8.52742 7.69152L9.84309 8.28702L7.98295 8.82484L8.52742 7.69152Z"
                          fill="#233447"
                        />
                        <path
                          d="M4.48415 9.36143L4.18446 11.8011L2.57812 9.41479L4.48415 9.36143ZM9.51266 9.36148L11.4187 9.41479L9.80639 11.8012L9.51266 9.36148ZM11.0514 6.9541L9.6642 8.35436L8.59468 7.87028L8.08264 8.93649L7.74697 7.10301L11.0514 6.9541ZM2.94464 6.9541L6.24968 7.10301L5.91395 8.93649L5.4018 7.87044L4.33797 8.35442L2.94464 6.9541Z"
                          fill="#CC6228"
                        />
                        <path
                          d="M2.85156 6.66688L4.42098 8.24427L4.47534 9.8015L2.85156 6.66688ZM11.1475 6.66406L9.52076 9.80427L9.58201 8.24427L11.1475 6.66406ZM6.17334 6.76297L6.2365 7.15676L6.39258 8.13778L6.29223 11.1508L5.81781 8.73036L5.81765 8.70533L6.17334 6.76297ZM7.82331 6.7575L8.17993 8.70533L8.17977 8.73036L7.70415 11.1569L7.68534 10.5499L7.61112 8.1199L7.82331 6.7575Z"
                          fill="#E27525"
                        />
                        <path
                          d="M9.72107 8.18164L9.66797 9.53462L8.01236 10.8122L7.67767 10.578L8.05283 8.66405L9.72107 8.18164ZM4.28125 8.18164L5.9437 8.66405L6.31885 10.578L5.98416 10.8122L4.3285 9.53451L4.28125 8.18164Z"
                          fill="#F5841F"
                        />
                        <path
                          d="M3.66406 11.313L5.78222 12.3071L5.77325 11.8826L5.95049 11.7284H8.04688L8.23052 11.882L8.21696 12.3062L10.3217 11.3155L9.29753 12.1538L8.05913 12.9962H5.93348L4.69591 12.1503L3.66406 11.313Z"
                          fill="#C0AC9D"
                        />
                        <path
                          d="M7.77294 10.48L8.07241 10.6896L8.24791 12.0764L7.99394 11.864H5.99916L5.75 12.0807L5.91975 10.6897L6.21933 10.48H7.77294Z"
                          fill="#161616"
                        />
                        <path
                          d="M13.2789 0.12207L14 2.26474L13.5496 4.43125L13.8703 4.67624L13.4364 5.00417L13.7625 5.25366L13.3307 5.64317L13.5958 5.83335L12.8922 6.64726L10.0063 5.81499L9.98134 5.80172L7.90174 4.06416L13.2789 0.12207ZM0.721109 0.12207L6.09831 4.06416L4.01866 5.80172L3.99366 5.81499L1.1078 6.64726L0.404195 5.83335L0.669102 5.64333L0.237508 5.25366L0.563008 5.00444L0.122555 4.67559L0.455328 4.43043L0 2.26485L0.721109 0.12207Z"
                          fill="#763E1A"
                        />
                        <path
                          d="M9.86193 5.63268L12.9197 6.51446L13.9131 9.54704H11.2922L9.48645 9.56957L10.7997 7.03414L9.86193 5.63268ZM4.13156 5.63268L3.19361 7.03414L4.50704 9.56957L2.70208 9.54704H0.0859375L1.07376 6.51452L4.13156 5.63268ZM8.9318 1.79346L8.07655 4.0814L7.89504 7.17215L7.82559 8.14092L7.82006 10.6157H6.17337L6.16801 8.14558L6.09834 7.17134L5.91677 4.0814L5.06163 1.79346H8.9318Z"
                          fill="#F5841F"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1329_10912">
                          <rect width="14" height="13" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <Image src={walletIcon} alt="wallet icon" />
                    Connect a Wallet
                  </button> */}
                  <a
                    href={"/signup"}
                    className="flex items-center gap-2 justify-center w-full border border-gray-300 py-2 rounded-xl bg-transparent"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
