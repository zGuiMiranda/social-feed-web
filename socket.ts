import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_ADDRESS;

export const socket = io(URL, {});
