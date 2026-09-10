import NodeCache from "node-cache";
import axios from "axios";

const ipinfoUrl = "https://api.ipinfo.io/lite/";
const token = process.env.IPINFO_TOKEN;
const geoCache = new NodeCache({ stdTTL: 3600 * 24 });

export async function getCountry(req, res) {
  const ip = req.visitorIp;

  let data = geoCache.get(ip);

  if (!data) {
    try {
      const response = await axios.get(`${ipinfoUrl}${ip}?token=${token}`);
      data = response.data;

      if (data.country) {
        geoCache.set(ip, data);
      }
    } catch (error) {
      console.error("IPInfo error:", error.response?.data || error.message);
      return res.status(500).send("Error detecting country");
    }
  }

  const country = data.country ?? null;

  res.status(200).json({ country });
}
