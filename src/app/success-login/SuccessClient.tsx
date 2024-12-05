"use client";

import { useSetToken } from "@/lib/set-token";
import { Button } from "@/components/ui/button";

const SuccessLoginClient = () => {
  useSetToken();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] dark:bg-[#ed4a60]">
      <section className="w-full px-6 sm:px-8 lg:px-16">
        <div className="py-8 sm:py-16 mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen-md text-center">
            {/* Increased the font size for larger screens and made it responsive */}
            <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              You have successfully logged in!
            </h2>

            {/* Flex container for buttons with better spacing */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center items-center space-y-4 sm:space-y-0">
              {/* Go to Dashboard button */}
              <Button className="w-full sm:w-auto bg-[#9a58df] hover:bg-[#8544c5] text-md py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                Go to Dashboard
              </Button>

              {/* Home button with arrow */}
              <div className="inline-flex items-center space-x-2 tracking-wide text-black font-normal px-6 py-3 rounded-lg focus:outline-none">
                <a href="/" className="flex items-center">
                  Home
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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

export default SuccessLoginClient;
