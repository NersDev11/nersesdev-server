import NodeCache from "node-cache";
import axios from "axios";

const token = process.env.IPINFO_TOKEN;

const geoCache = new NodeCache({ stdTTL: 3600 * 24 });

export async function getCountry(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  let data = geoCache.get(ip);
  if (!data) {
    try {
      // const response = await fetch(`https://ipinfo.io/${ip}?token=${token}`);
      const response = await axios.get(`https://api.ipinfo.io/lite//${ip}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data = response.data;

      geoCache.set(ip, data);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Error detecting country");
    }
  }

  res.send(data.country);
}
