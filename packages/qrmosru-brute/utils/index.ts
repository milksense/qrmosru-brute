import debug from "debug";
import fetch from "node-fetch";
export const log = debug("module: qrmosru-brute");
log.enabled = true;
import { Certificate } from "../types";

export const getCertInfo = async (
  idCertificate: string
): Promise<Certificate | undefined> => {
  log("> Fetching gosuslugi.ru API");
  const response = await fetch(
    `https://www.gosuslugi.ru/api/vaccine/v2/cert/verify/${idCertificate}`
  );

  if (!response.ok || response.status === 204) return;

  return response.json() as Promise<Certificate>;
};