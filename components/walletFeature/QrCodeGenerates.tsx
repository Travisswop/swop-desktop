import React from "react";
// import { QRCodeCanvas } from 'qrcode.react';
import { FaEthereum } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { TbCurrencySolana } from "react-icons/tb";

const QrCodeGenerates = ({ walletAddress, slug }: any) => {
  const qrCodeSize = 180;
  const iconSize = 40;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* <QRCodeCanvas value={walletAddress} size={qrCodeSize} /> */}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "5px",
        }}
      >
        {slug === "ethAddress" ? (
          <FaEthereum size={iconSize} color="#3C3C3D" />
        ) : (
          <TbCurrencySolana size={iconSize} color="#3C3C3D" />
        )}
      </div>
    </div>
  );
};

export default QrCodeGenerates;
