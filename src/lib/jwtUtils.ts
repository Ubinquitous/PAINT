import jwt from "jsonwebtoken";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET!;

export const jwtUtils = () => {
  const sign = (connectedId: string) => {
    return jwt.sign({ id: connectedId }, secret, {
      algorithm: "HS256",
      expiresIn: "24h",
    });
  };

  const verify = (token: string) => {
    try {
      const decoded = jwt.verify(token, secret);
      return {
        ok: true,
        connectedId: decoded.id,
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message,
      };
    }
  };

  const refresh = (connectedId: string) => {
    return jwt.sign({ id: connectedId }, secret, {
      algorithm: "HS256",
      expiresIn: "30d",
    });
  };

  const refreshVerify = (token: string) => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { sign, verify, refresh, refreshVerify };
};
