import { v4 as uuidv4 } from "uuid";
import puppeteer from "puppeteer";
import fetch from "node-fetch";

import { log } from "./utils";

import { Count, Certificate } from "./types";

/**
 * Count of screenshots
 *
 * @var {Number}
 */
const count: Count = 10;

export const getCertInfo = async (
  idCertificate: string
): Promise<Certificate | undefined> => {
  const response = await fetch(
    `https://www.gosuslugi.ru/api/vaccine/v2/cert/verify/${idCertificate}`
  );

  if (!response.ok || response.status === 204) {
    return;
  }

  return response.json() as Promise<Certificate>;
};

getCertInfo("117d099c-fe34-42f8-8ddd-bf47f79590c5")
  .then((response) => {
    return response;
  })
  .catch((err) => err);

// (async () => {
//   const browser = await puppeteer.launch({
//     defaultViewport: { width: 300, height: 300 },
//   });
//   const page = await browser.newPage();

//   for (let i = 0; i < count; i++) {
//     const value = uuidv4();

//     try {
//       const response = await fetch(
//         `https://www.gosuslugi.ru/api/vaccine/v2/cert/verify/${value}`
//       );

//       if (response.ok) {
//         log(response.status, response.statusText /*, data*/);
//         if (response.status !== 204) {
//           await page.goto(
//             `https://www.gosuslugi.ru/vaccine/cert/verify/${value}`,
//             {
//               waitUntil: "networkidle2",
//             }
//           );
//           await page.screenshot({
//             path: `${__dirname}/${value}.jpeg`,
//           });
//         }
//       }
//     } catch (error) {
//       if (error) log("pizdec");
//     }
//   }
//   await browser.close();
// })();
