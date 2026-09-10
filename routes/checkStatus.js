export function checkStatus(_req, res) {
  return res.status(200).json({
    status: "ok",
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: "Server is running",
  });
}
