import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function rememberVisitor(req, _res, next) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;
  const date = new Date().toISOString();

  try {
    await redis.lpush("visits", JSON.stringify({ date, ip }));
    await redis.ltrim("visits", 0, 999);
  } catch (err) {
    console.log("Redis error:", err);
  }

  req.visitorIp = ip;

  next();
}
