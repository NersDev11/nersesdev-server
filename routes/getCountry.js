import NodeCache from "node-cache";
import axios from "axios";

const ipinfoUrl = "https://api.ipinfo.io/lite/";

const token = process.env.IPINFO_TOKEN;

const geoCache = new NodeCache({ stdTTL: 3600 * 24 });

export async function getCountry(req, res) {
  // const token = process.env.IPINFO_TOKEN;

  // const geoCache = new NodeCache({ stdTTL: 3600 * 24 });

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;

  console.log(ip);

  let data = geoCache.get(ip);
  console.log(token);

  console.log(data);

  if (!data) {
    try {
      const response = await axios.get(
        `${ipinfoUrl}34.106.208.213?token=${token}`,
      );

      data = response.data;
      geoCache.set(ip, data);
    } catch (error) {
      console.error("IPInfo error:", error.response?.data || error.message);
      return res.status(500).send("Error detecting country");
    }
  }

  console.log(data);

  res.status(200).json({ country: data.country });
}
