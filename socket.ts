import { io } from "socket.io-client";

const URL = "http://localhost:8081";

export const socket = io(URL, {
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
