"use client";

import { useSetToken } from "@/lib/set-token";
import { Button } from "@/components/ui/button";

const SuccessLogin = () => {
  useSetToken();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ed4a60] dark:bg-[#ed4a60]">
      <section className="w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl tracking-wider font-extrabold leading-wider text-gray-900 dark:text-white">
              You have successfully logged in!
            </h2>
            <p className="mb-6 font-light text-gray-900 dark:text-white md:text-lg">
              I hope you find this app useful.
            </p>

            {/* Flex container to align the buttons horizontally */}
            <div className="flex justify-center items-center space-x-4">
              {/* Go to Dashboard button */}
              <Button className="bg-[#eecc75] tracking-normal text-md">
                Go to Dashboard
              </Button>

              {/* Home button with arrow */}
              <div className="inline-flex items-center space-x-2 tracking-wide text-white font-normal px-4 py-2 rounded-lg focus:outline-none">
                <a href="#" className="flex items-center">
                  Home
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessLogin;
