import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}
const userLastSeenMap = {}; // {userId: timestamp}

// Global interval for checking stale connections
let staleConnectionCheckInterval;

// Function to check and remove stale connections
const checkStaleConnections = () => {
  const now = Date.now();
  const staleThreshold = 60000; // 1 minute

  Object.entries(userLastSeenMap).forEach(([userId, lastSeen]) => {
    if (now - lastSeen > staleThreshold) {
      // Remove stale connection
      delete userSocketMap[userId];
      delete userLastSeenMap[userId];
    }
  });

  // Update online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
};

// Start the global interval for checking stale connections
staleConnectionCheckInterval = setInterval(checkStaleConnections, 60000);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    userLastSeenMap[userId] = Date.now();
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle heartbeat
  socket.on("heartbeat", () => {
    if (userId) {
      userLastSeenMap[userId] = Date.now();
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      delete userLastSeenMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Clean up interval when server shuts down
process.on('SIGTERM', () => {
  clearInterval(staleConnectionCheckInterval);
  server.close(() => {
    process.exit(0);
  });
});

export { io, app, server };