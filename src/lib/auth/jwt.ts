import { config } from "@/config/config";
import { SESSION_TIME } from "@/features/auth/auth.constants";
import { SessionTokenPayload } from "@/features/auth/types/auth.types";
import jwt from "jsonwebtoken";

function isSessionTokenPayload(
  decoded: string | jwt.JwtPayload,
): decoded is jwt.JwtPayload & SessionTokenPayload {
  return (
    typeof decoded !== "string" &&
    typeof decoded.sid === "string" &&
    typeof decoded.sub === "number"
  );
}

export const genToken = (payload: SessionTokenPayload) => {
  return jwt.sign(payload, config.jwtSecretKey, {
    expiresIn: `${SESSION_TIME}s`,
  });
};

export const getTokenPayload = (token: string): SessionTokenPayload => {
  const decoded = jwt.verify(token, config.jwtSecretKey);

  if (!isSessionTokenPayload(decoded)) {
    throw new Error("Invalid session token");
  }

  return { sid: decoded.sid, sub: decoded.sub };
};
