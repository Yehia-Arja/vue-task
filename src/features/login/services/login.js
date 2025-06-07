import { request } from "../../../utils/remote/axios";
import { requestMethods } from "../../../utils/enums/requestMethods";

export const login = async (email) => {
  try {
    const res = await request({
      method: requestMethods.GET,
      route: `/api/v1/authentication/via_otp?email=${email}`,
    });
    if (!res.error) {
      return res;
    }
    throw new Error(res.message);
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

export const verifyCode = async (email, code) => {
  try {
    const res = await request({
      method: requestMethods.POST,
      route: "/api/v1/authentication/via_otp",
      body: {
        email,
        otp_code: code,
      },
    });
    if (!res.error) {
      return res;
    }
    throw new Error(res.message);
  } catch (error) {
    throw new Error(error.message || "Verification failed");
  }
};
