export type DeviceType = "iphone-15" | "iphone-15-pro" | "macbook-pro" | "imac" | "ipad-pro" | "pixel-8" | "galaxy-s24";

export interface DeviceConfig {
  id: DeviceType;
  name: string;
  category: "phone" | "tablet" | "laptop" | "desktop";
  screenWidth: number;
  screenHeight: number;
  frameWidth: number;
  frameHeight: number;
  screenX: number;
  screenY: number;
  cornerRadius: number;
  color: string;
}

export const DEVICES: DeviceConfig[] = [
  {
    id: "iphone-15",
    name: "iPhone 15",
    category: "phone",
    screenWidth: 393,
    screenHeight: 852,
    frameWidth: 430,
    frameHeight: 920,
    screenX: 18.5,
    screenY: 34,
    cornerRadius: 47,
    color: "#1a1a1a",
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "phone",
    screenWidth: 393,
    screenHeight: 852,
    frameWidth: 430,
    frameHeight: 920,
    screenX: 18.5,
    screenY: 34,
    cornerRadius: 47,
    color: "#2c2c2e",
  },
  {
    id: "pixel-8",
    name: "Pixel 8",
    category: "phone",
    screenWidth: 380,
    screenHeight: 800,
    frameWidth: 416,
    frameHeight: 880,
    screenX: 18,
    screenY: 40,
    cornerRadius: 40,
    color: "#1a1a1a",
  },
  {
    id: "galaxy-s24",
    name: "Galaxy S24",
    category: "phone",
    screenWidth: 384,
    screenHeight: 810,
    frameWidth: 420,
    frameHeight: 890,
    screenX: 18,
    screenY: 40,
    cornerRadius: 38,
    color: "#1a1a1a",
  },
  {
    id: "ipad-pro",
    name: "iPad Pro 13\"",
    category: "tablet",
    screenWidth: 780,
    screenHeight: 1040,
    frameWidth: 840,
    frameHeight: 1120,
    screenX: 30,
    screenY: 40,
    cornerRadius: 20,
    color: "#1a1a1a",
  },
  {
    id: "macbook-pro",
    name: "MacBook Pro 16\"",
    category: "laptop",
    screenWidth: 840,
    screenHeight: 525,
    frameWidth: 940,
    frameHeight: 600,
    screenX: 50,
    screenY: 18,
    cornerRadius: 8,
    color: "#1d1d1f",
  },
  {
    id: "imac",
    name: "iMac 24\"",
    category: "desktop",
    screenWidth: 960,
    screenHeight: 540,
    frameWidth: 1060,
    frameHeight: 660,
    screenX: 50,
    screenY: 20,
    cornerRadius: 8,
    color: "#1d1d1f",
  },
];

export const GRADIENT_PRESETS = [
  { name: "Sunset", colors: ["#f97316", "#ec4899"] },
  { name: "Ocean", colors: ["#0ea5e9", "#6366f1"] },
  { name: "Forest", colors: ["#10b981", "#059669"] },
  { name: "Purple Haze", colors: ["#8b5cf6", "#ec4899"] },
  { name: "Midnight", colors: ["#1e1b4b", "#312e81"] },
  { name: "Peach", colors: ["#fb923c", "#f472b6"] },
  { name: "Aurora", colors: ["#06b6d4", "#8b5cf6"] },
  { name: "Ember", colors: ["#ef4444", "#f97316"] },
  { name: "Mint", colors: ["#34d399", "#06b6d4"] },
  { name: "Lavender", colors: ["#a78bfa", "#c4b5fd"] },
  { name: "Slate", colors: ["#475569", "#1e293b"] },
  { name: "Rose Gold", colors: ["#f43f5e", "#fbbf24"] },
];

export const EXPORT_SIZES = [
  { name: "Original", width: 0, height: 0 },
  { name: "App Store (1240 × 2688)", width: 1240, height: 2688 },
  { name: "App Store (1284 × 2778)", width: 1284, height: 2778 },
  { name: "Play Store (1024 × 500)", width: 1024, height: 500 },
  { name: "Twitter/X (1600 × 900)", width: 1600, height: 900 },
  { name: "OG Image (1200 × 630)", width: 1200, height: 630 },
  { name: "ProductHunt (1278 × 710)", width: 1278, height: 710 },
];
