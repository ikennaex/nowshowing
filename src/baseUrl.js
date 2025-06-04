const isDev = false; // set to true for local development

export const baseUrl = isDev
  ? "http://localhost:4000/"
  : "https://nowshowing-api.onrender.com/";
