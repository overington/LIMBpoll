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
