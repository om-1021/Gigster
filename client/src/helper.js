export const getApiBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      debugger;
      return import.meta.env.VITE_PROD_API;

    default:
      return import.meta.env.VITE_DEV_API;
  }
};
