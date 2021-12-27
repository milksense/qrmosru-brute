import { v4 as uuidv4 } from "uuid";
import puppeteer from "puppeteer";
import { log, getCertInfo } from "./utils";

const count: number = 50;

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 300, height: 400 },
    headless: false
  });
  const page = await browser.newPage();

  for (let i = 0; i < count; i++) {
    const value = uuidv4();

    try {
      log("> Preparing");
      const fetchResult = getCertInfo(value);
      fetchResult.then(async certInfo => {
        if (certInfo?.qr) {
          log(`> Found valid certificate \n ${certInfo?.fio} valid until ${certInfo?.expiredAt}`);
        }
      })
      log("> Fetching preview");
      await page.goto(
        `https://www.gosuslugi.ru/vaccine/cert/verify/${value}`
        ,
        {
          waitUntil: "networkidle2",
        }
      );
      log("> Generating screenshot");
      await page.screenshot({
        path: `${__dirname}/${value}.jpeg`,
      });
    } catch {
      log("> Big trouble");
      return;
    }
  }
  log(`> Results available here ${__dirname}`);
  await browser.close();
})();
