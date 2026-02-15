export const ENV = {
  get appId() { return process.env.VITE_APP_ID ?? ""; },
  get cookieSecret() { return process.env.JWT_SECRET ?? ""; },
  get databaseUrl() { return process.env.DATABASE_URL ?? ""; },
  get oAuthServerUrl() { return process.env.OAUTH_SERVER_URL ?? ""; },
  get ownerOpenId() { return process.env.OWNER_OPEN_ID ?? ""; },
  get isProduction() { return process.env.NODE_ENV === "production"; },
  get forgeApiUrl() { return process.env.BUILT_IN_FORGE_API_URL ?? ""; },
  get forgeApiKey() { return process.env.BUILT_IN_FORGE_API_KEY ?? ""; },
  get googleApiKey() {
    return process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "AIzaSyDDm6Xv3nrxQ1gGzssc74eMmU2GpTwr-is";
  },
  get githubToken() {
    return process.env.GITHUB_TOKEN ?? "";
  },
};
