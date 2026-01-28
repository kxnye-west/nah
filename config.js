const config = {
  challenge: process.env.AUTH_ENABLED === "true" || false,
  users: process.env.AUTH_USERS
    ? JSON.parse(process.env.AUTH_USERS)
    : {}, // Format: {"username": "password"} in AUTH_USERS env var
};

export default config;
