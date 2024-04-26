const environment = {
  CLIENT_ID: process.env.NEXT_PUBLIC_CODEF_CLIENT_ID || "",
  CLIENT_SECRET: process.env.NEXT_PUBLIC_CODEF_CLIENT_SECRET || "",
  CLIENT_OAUTH_URL: process.env.NEXT_PUBLIC_CODEF_REQUEST_OAUTH_TOKEN_URI || "",
  REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
  PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
  CODEF_ADMIN_URL: process.env.NEXT_PUBLIC_CODEF_ADMIN_URL || "",
  CERT_SOCKET_URL: process.env.NEXT_PUBLIC_CERT_SOCKET_URL || "",
};

export default environment;
