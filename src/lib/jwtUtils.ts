import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

const sign = (userId: string) => {
  return jwt.sign({ id: userId }, secret, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
};

const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      ok: true,
      userId: decoded.id,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

const refresh = (userId: string) => {
  return jwt.sign({ id: userId }, secret, {
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

export { sign, verify, refresh, refreshVerify };
