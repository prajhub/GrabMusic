"use client";

import { useSetToken } from "@/lib/set-token";

const SuccessLogin = () => {
  useSetToken();
  return (
    <div>
      <h1>You are logged in!</h1>
    </div>
  );
};

export default SuccessLogin;
