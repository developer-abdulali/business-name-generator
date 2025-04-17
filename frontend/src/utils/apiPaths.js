export const BACKEND_URL = "http://localhost:8080";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/get-user",
    UPDATE_PROFILE: "/api/v1/auth/update",
  },
  POLLS: {
    CREATE: "/api/v1/poll/create",
    GET_ALL: "/api/v1/poll/get-all-polls",
    GET_BY_ID: (pollId) => `/api/v1/poll/${pollId}`,
    GET_BOOKMARKED: "/api/v1/poll/user/bookmarked",
    VOTE: (pollId) => `/api/v1/poll/${pollId}/vote`,
    VOTED_POLLS: "/api/v1/polls/voted-poll",
    CLOSE: (pollId) => `/api/v1/poll/${pollId}/close`,
    DELETE: (pollId) => `/api/v1/poll/${pollId}/delete`,
  },
  IMAGE: {
    UPLOAD_IMG: "/api/v1/auth/upload-img",
  },
};
