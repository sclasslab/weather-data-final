
import express from "express";
import fetch from "node-fetch"; // node-fetch를 import

const app = express();

app.get("/weather", async function (req: any, res: any) {
  const { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny } =
    req.query;

  const api_url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
  const queryParams = new URLSearchParams({
    serviceKey,
    numOfRows,
    pageNo,
    base_date,
    base_time,
    nx,
    ny,
  } as any).toString();

  try {
    const response = await fetch(`${api_url}?${queryParams}`);
    const body = await response.text();

    if (response.ok) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.status).end();
      console.log("error = " + response.status);
    }
  } catch (error) {
    console.error("Request failed:", error);
    res.status(500).end("Internal Server Error");
  }
});

app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/weather?serviceKey=OvvWBt5A7qDnUfb7RyIxKs9NxaXxTDh9C2qHnxjhYzPenZRng4TZzToPRNxVY7n0GFKOFe6q11hok9EMK9gX0g%3D%3D&numOfRows=10&pageNo=1&base_date=20241112&base_time=0600&nx=61&ny=125 app listening on port 3000!"
  );
});