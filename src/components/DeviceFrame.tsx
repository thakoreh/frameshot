"use client";

import React from "react";
import { DeviceConfig } from "@/lib/devices";

interface DeviceFrameProps {
  device: DeviceConfig;
  screenshot: string | null;
}

function IPhoneFrame({ device, screenshot }: DeviceFrameProps) {
  const scaleX = device.frameWidth / 430;
  const scaleY = device.frameHeight / 920;
  return (
    <svg
      width={device.frameWidth}
      height={device.frameHeight}
      viewBox="0 0 430 920"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Phone body */}
      <rect x="0" y="0" width="430" height="920" rx="55" ry="55" fill={device.color} />
      {/* Screen area */}
      <defs>
        <clipPath id="screen-clip">
          <rect x="18.5" y="34" width="393" height="852" rx="47" ry="47" />
        </clipPath>
      </defs>
      <rect
        x="18.5"
        y="34"
        width="393"
        height="852"
        rx="47"
        ry="47"
        fill="#000"
      />
      {screenshot && (
        <image
          href={screenshot}
          x="18.5"
          y="34"
          width="393"
          height="852"
          clipPath="url(#screen-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      {/* Dynamic Island */}
      <rect x="147" y="12" width="136" height="35" rx="17" ry="17" fill={device.color} />
      {/* Side button */}
      <rect x="-2" y="190" width="4" height="40" rx="2" fill="#333" />
      <rect x="-2" y="250" width="4" height="70" rx="2" fill="#333" />
      <rect x="-2" y="340" width="4" height="70" rx="2" fill="#333" />
      <rect x="428" y="250" width="4" height="90" rx="2" fill="#333" />
    </svg>
  );
}

function MacBookFrame({ device, screenshot }: DeviceFrameProps) {
  return (
    <svg
      width={device.frameWidth}
      height={device.frameHeight + 50}
      viewBox="0 0 940 650"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lid */}
      <rect x="0" y="0" width="940" height="600" rx="14" ry="14" fill="#1d1d1f" />
      <rect x="50" y="18" width="840" height="525" rx="4" ry="4" fill="#000" />
      {screenshot && (
        <image
          href={screenshot}
          x="50"
          y="18"
          width="840"
          height="525"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      {/* Camera notch */}
      <circle cx="470" cy="9" r="3" fill="#333" />
      {/* Base */}
      <path d="M 0 598 L 0 610 Q 0 620 10 620 L 930 620 Q 940 620 940 610 L 940 598 Q 940 600 930 600 L 10 600 Q 0 600 0 598 Z" fill="#2d2d2f" />
      {/* Trackpad indent */}
      <rect x="390" y="605" width="160" height="4" rx="2" fill="#3a3a3c" />
      {/* Keyboard base shadow */}
      <ellipse cx="470" cy="640" rx="440" ry="8" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

function IPadFrame({ device, screenshot }: DeviceFrameProps) {
  return (
    <svg
      width={device.frameWidth}
      height={device.frameHeight}
      viewBox="0 0 840 1120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="840" height="1120" rx="30" ry="30" fill={device.color} />
      <rect x="30" y="40" width="780" height="1040" rx="8" ry="8" fill="#000" />
      {screenshot && (
        <image
          href={screenshot}
          x="30"
          y="40"
          width="780"
          height="1040"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      {/* Home indicator */}
      <rect x="360" y="1090" width="120" height="5" rx="2.5" fill="#333" />
    </svg>
  );
}

function IMacFrame({ device, screenshot }: DeviceFrameProps) {
  return (
    <svg
      width={device.frameWidth}
      height={device.frameHeight + 100}
      viewBox="0 0 1060 760"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Monitor */}
      <rect x="0" y="0" width="1060" height="660" rx="14" ry="14" fill="#e3e3e3" />
      <rect x="50" y="20" width="960" height="540" rx="4" ry="4" fill="#000" />
      {screenshot && (
        <image
          href={screenshot}
          x="50"
          y="20"
          width="960"
          height="540"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      {/* Camera */}
      <circle cx="530" cy="10" r="3" fill="#999" />
      {/* Chin */}
      <rect x="0" y="560" width="1060" height="100" rx="0" fill="#e3e3e3" />
      <text x="530" y="618" textAnchor="middle" fill="#999" fontSize="14" fontFamily="Inter, sans-serif">FrameShot</text>
      {/* Stand */}
      <path d="M 440 660 L 620 660 L 590 720 L 470 720 Z" fill="#d4d4d4" />
      {/* Base */}
      <rect x="380" y="720" width="300" height="12" rx="6" fill="#ccc" />
      {/* Shadow */}
      <ellipse cx="530" cy="745" rx="200" ry="8" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

function PixelFrame({ device, screenshot }: DeviceFrameProps) {
  return (
    <svg
      width={device.frameWidth}
      height={device.frameHeight}
      viewBox="0 0 416 880"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="416" height="880" rx="45" ry="45" fill={device.color} />
      <rect x="18" y="40" width="380" height="800" rx="40" ry="40" fill="#000" />
      {screenshot && (
        <image
          href={screenshot}
          x="18"
          y="40"
          width="380"
          height="800"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      {/* Camera bar */}
      <rect x="140" y="8" width="136" height="24" rx="12" fill="#111" />
      {/* Side buttons */}
      <rect x="414" y="180" width="4" height="50" rx="2" fill="#333" />
      <rect x="-2" y="160" width="4" height="40" rx="2" fill="#333" />
    </svg>
  );
}

export default function DeviceFrame({ device, screenshot }: DeviceFrameProps) {
  const commonProps = { device, screenshot };

  switch (device.id) {
    case "iphone-15":
    case "iphone-15-pro":
      return <IPhoneFrame {...commonProps} />;
    case "pixel-8":
    case "galaxy-s24":
      return <PixelFrame {...commonProps} />;
    case "macbook-pro":
      return <MacBookFrame {...commonProps} />;
    case "ipad-pro":
      return <IPadFrame {...commonProps} />;
    case "imac":
      return <IMacFrame {...commonProps} />;
    default:
      return <IPhoneFrame {...commonProps} />;
  }
}
