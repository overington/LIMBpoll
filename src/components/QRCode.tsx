import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

const LIMBQRCode = ({
  qrData,
}: {
  qrData: string;
}) => {
  const qrCanvasRef = useRef(null);

  useEffect(() => {
    QRCode.toCanvas(
      qrCanvasRef.current,
      qrData,
      {
        errorCorrectionLevel: "H",
        width: 300,
      },
      (error) => {
        if (error) console.error(error);
        console.log("QR code generated!");
      }
    );
  }, [qrData]);

  return (
    <div className="flex flex-col justify-center">
        <canvas className="mx-auto" ref={qrCanvasRef}></canvas>
        <p className="font-mono">{qrData}</p>
    </div>
  );
}
export default LIMBQRCode;

const LIMBWiFiQRCode = ({
  ssid,
  password,
  encryptionType,
  urlQRData,
}: {
  ssid: string;
  password: string;
  encryptionType: string;
  urlQRData: string;
}) => {
  const wifiCanvasRef = useRef(null);
  const urlCanvasRef = useRef(null);

  useEffect(() => {
    const wifiQRData = `WIFI:T:${encryptionType};S:${ssid};P:${password};;`;
    QRCode.toCanvas(
      wifiCanvasRef.current,
      wifiQRData,
      { errorCorrectionLevel: "H" },
      (error) => {
        if (error) console.error(error);
        console.log("WiFi QR code generated!");
      }
    );

    QRCode.toCanvas(
      urlCanvasRef.current,
      urlQRData,
      { errorCorrectionLevel: "H" },
      (error) => {
        if (error) console.error(error);
        console.log("URL QR code generated!");
      }
    );
  }, [ssid, password, encryptionType]);

  return (
    <div>
      <h2>WiFi QR Code</h2>
      <canvas ref={wifiCanvasRef}></canvas>
      <h2>URL QR Code</h2>
      <canvas ref={urlCanvasRef}></canvas>
    </div>
  );
};

