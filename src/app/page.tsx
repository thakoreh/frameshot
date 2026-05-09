"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { toPng } from "html-to-image";
import {
  DEVICES,
  GRADIENT_PRESETS,
  EXPORT_SIZES,
  DeviceType,
  DeviceConfig,
} from "@/lib/devices";
import DeviceFrame from "@/components/DeviceFrame";

type Tab = "create" | "features" | "pricing" | "faq";

export default function Home() {
  const [tab, setTab] = useState<Tab>("create");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("iphone-15");
  const [bgGradient, setBgGradient] = useState(GRADIENT_PRESETS[0]);
  const [bgColor1, setBgColor1] = useState("#6366f1");
  const [bgColor2, setBgColor2] = useState("#ec4899");
  const [bgAngle, setBgAngle] = useState(135);
  const [padding, setPadding] = useState(80);
  const [shadow, setShadow] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [exportSize, setExportSize] = useState(EXPORT_SIZES[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [freeCount, setFreeCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const mockupRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const count = parseInt(localStorage.getItem("frameshot_exports") || "0");
    const pro = localStorage.getItem("frameshot_pro") === "true";
    setFreeCount(count);
    setIsPro(pro);
  }, []);

  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setScreenshot(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setScreenshot(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const exportMockup = useCallback(async () => {
    if (!mockupRef.current) return;
    if (!isPro && freeCount >= 5) {
      alert(
        "You've used 5 free exports! Upgrade to Pro for unlimited exports, all devices, and batch export."
      );
      return;
    }
    setIsExporting(true);
    try {
      const scale = exportSize.width > 0 ? 2 : 2;
      const dataUrl = await toPng(mockupRef.current, {
        quality: 1.0,
        pixelRatio: scale,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `frameshot-${selectedDevice}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      const newCount = freeCount + 1;
      setFreeCount(newCount);
      localStorage.setItem("frameshot_exports", newCount.toString());
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [freeCount, isPro, selectedDevice, exportSize]);

  const device = DEVICES.find((d) => d.id === selectedDevice)!;

  const gradientStyle = {
    background: `linear-gradient(${bgAngle}deg, ${bgColor1}, ${bgColor2})`,
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-lg border-b"
        style={{
          background: "rgba(255,255,255,0.8)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
                F
              </div>
              <span className="font-bold text-xl" style={{ color: "var(--text)" }}>
                FrameShot
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {(["create", "features", "pricing", "faq"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
                  style={{
                    background: tab === t ? "var(--accent-light)" : "transparent",
                    color: tab === t ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {tab === "create" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Free tier banner */}
          {!isPro && freeCount >= 3 && (
            <div
              className="mb-4 p-3 rounded-xl text-center text-sm font-medium"
              style={{
                background: "var(--accent-light)",
                color: "var(--accent)",
              }}
            >
              {freeCount >= 5
                ? `${5 - freeCount > 0 ? 5 - freeCount : 0} free exports remaining — Upgrade to Pro for unlimited exports!`
                : `${5 - freeCount} free exports remaining`}
              {freeCount >= 5 && (
                <a
                  href="#pricing"
                  onClick={() => setTab("pricing")}
                  className="ml-2 underline font-bold"
                >
                  Upgrade Now →
                </a>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
            {/* Sidebar Controls */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* Upload */}
              <div
                className="rounded-2xl border p-4"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  Screenshot
                </h3>
                <div
                  className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors hover:border-indigo-400"
                  style={{ borderColor: "var(--border)" }}
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {screenshot ? (
                    <div className="space-y-2">
                      <img
                        src={screenshot}
                        alt="Uploaded screenshot"
                        className="max-h-24 mx-auto rounded-lg"
                      />
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Click to replace
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl">📸</div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Drop image or click to upload
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>

              {/* Device Selection */}
              <div
                className="rounded-2xl border p-4"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  Device
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {DEVICES.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDevice(d.id)}
                      className="px-3 py-2 rounded-lg text-xs font-medium transition-all border"
                      style={{
                        background:
                          selectedDevice === d.id
                            ? "var(--accent-light)"
                            : "transparent",
                        borderColor:
                          selectedDevice === d.id
                            ? "var(--accent)"
                            : "var(--border)",
                        color:
                          selectedDevice === d.id
                            ? "var(--accent)"
                            : "var(--text-secondary)",
                      }}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div
                className="rounded-2xl border p-4"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  Background
                </h3>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {GRADIENT_PRESETS.map((g) => (
                    <button
                      key={g.name}
                      onClick={() => {
                        setBgGradient(g);
                        setBgColor1(g.colors[0]);
                        setBgColor2(g.colors[1]);
                      }}
                      className="w-full aspect-square rounded-lg border-2 transition-transform hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`,
                        borderColor:
                          bgGradient.name === g.name
                            ? "var(--accent)"
                            : "transparent",
                      }}
                      title={g.name}
                    />
                  ))}
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="flex-1">
                    <label
                      className="text-xs block mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Color 1
                    </label>
                    <input
                      type="color"
                      value={bgColor1}
                      onChange={(e) => setBgColor1(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="text-xs block mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Color 2
                    </label>
                    <input
                      type="color"
                      value={bgColor2}
                      onChange={(e) => setBgColor2(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="text-xs block mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Angle: {bgAngle}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={bgAngle}
                    onChange={(e) => setBgAngle(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Spacing & Shadow */}
              <div
                className="rounded-2xl border p-4"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  Style
                </h3>
                <div className="space-y-3">
                  <div>
                    <label
                      className="text-xs block mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Padding: {padding}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={padding}
                      onChange={(e) => setPadding(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shadow}
                      onChange={(e) => setShadow(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Device shadow
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showTitle}
                      onChange={(e) => setShowTitle(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Show title text
                    </span>
                  </label>
                  {showTitle && (
                    <>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title (e.g. My App)"
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                        style={{
                          background: "var(--bg-secondary)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                        }}
                      />
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="Subtitle"
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                        style={{
                          background: "var(--bg-secondary)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Export */}
              <div
                className="rounded-2xl border p-4"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  Export
                </h3>
                <select
                  value={exportSize.name}
                  onChange={(e) =>
                    setExportSize(
                      EXPORT_SIZES.find((s) => s.name === e.target.value) ||
                        EXPORT_SIZES[0]
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg border text-sm mb-3"
                  style={{
                    background: "var(--bg-secondary)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  {EXPORT_SIZES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={exportMockup}
                  disabled={isExporting || !screenshot}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  }}
                >
                  {isExporting
                    ? "Exporting..."
                    : !screenshot
                    ? "Upload a screenshot first"
                    : `Export as PNG ${!isPro ? `(${5 - freeCount} free left)` : "∞"}`}
                </button>
              </div>
            </div>

            {/* Preview Canvas */}
            <div className="order-1 lg:order-2">
              <div
                className="rounded-2xl border overflow-hidden flex items-center justify-center"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                  minHeight: "600px",
                }}
              >
                {screenshot ? (
                  <div
                    ref={mockupRef}
                    className="flex flex-col items-center justify-center"
                    style={{
                      ...gradientStyle,
                      padding: `${padding}px`,
                      width: "100%",
                      minHeight: "500px",
                    }}
                  >
                    {showTitle && title && (
                      <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-white mb-1">
                          {title}
                        </h2>
                        {subtitle && (
                          <p className="text-lg text-white/80">{subtitle}</p>
                        )}
                      </div>
                    )}
                    <div
                      style={{
                        filter: shadow
                          ? "drop-shadow(0 25px 50px rgba(0,0,0,0.3))"
                          : "none",
                        maxWidth: "100%",
                        maxHeight: "600px",
                      }}
                    >
                      <div
                        style={{
                          transform: `scale(${Math.min(
                            1,
                            500 / device.frameHeight
                          )})`,
                          transformOrigin: "top center",
                        }}
                      >
                        <DeviceFrame device={device} screenshot={screenshot} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 px-8">
                    <div className="text-6xl mb-4 animate-float">📱</div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      Upload your app screenshot
                    </h3>
                    <p style={{ color: "var(--text-muted)" }}>
                      Drag & drop or click the upload area to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {tab === "features" && <FeaturesTab />}
      {tab === "pricing" && <PricingTab setIsPro={setIsPro} />}
      {tab === "faq" && <FAQTab />}
    </div>
  );
}

function FeaturesTab() {
  const features = [
    {
      icon: "📱",
      title: "7 Device Frames",
      desc: "iPhone 15, iPhone 15 Pro, Pixel 8, Galaxy S24, iPad Pro, MacBook Pro 16\", and iMac 24\".",
    },
    {
      icon: "🎨",
      title: "12 Gradient Presets + Custom Colors",
      desc: "Pick from curated gradients or set your own two-color gradient with angle control.",
    },
    {
      icon: "📐",
      title: "Export-Ready Sizes",
      desc: "Pre-configured sizes for App Store, Play Store, Twitter/X, ProductHunt, and OG images.",
    },
    {
      icon: "🏷️",
      title: "Title & Subtitle Overlay",
      desc: "Add a headline and subheadline directly on your mockup — great for landing pages.",
    },
    {
      icon: "💻",
      title: "100% Client-Side",
      desc: "Your screenshots never leave your browser. No uploads to any server. Private by default.",
    },
    {
      icon: "⚡",
      title: "Instant Export",
      desc: "High-resolution PNG export in under a second. No watermarks on free exports.",
    },
    {
      icon: "🌙",
      title: "Dark & Light Mode",
      desc: "Respects your system preference. Clean UI in any mode.",
    },
    {
      icon: "🚀",
      title: "No Signup Required",
      desc: "Start creating mockups immediately. No account, no email, no friction.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Everything you need for stunning mockups
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          Professional device mockups in seconds. No design skills required.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl border p-6 transition-all hover:shadow-lg"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingTab({ setIsPro }: { setIsPro: (v: boolean) => void }) {
  const activatePro = () => {
    localStorage.setItem("frameshot_pro", "true");
    setIsPro(true);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Simple, honest pricing
        </h2>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Start free. Upgrade when you need more.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free */}
        <div
          className="rounded-2xl border p-8"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>
            Free
          </h3>
          <p className="mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
            Perfect for quick mockups
          </p>
          <div className="text-4xl font-bold mb-6" style={{ color: "var(--text)" }}>
            $0
          </div>
          <ul className="space-y-3 mb-8">
            {[
              "5 PNG exports",
              "7 device frames",
              "12 gradient presets",
              "Custom colors",
              "Title overlay",
              "No signup required",
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--success)" }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <div
            className="w-full py-3 rounded-xl text-center text-sm font-medium border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            No credit card needed
          </div>
        </div>

        {/* Pro */}
        <div
          className="rounded-2xl border-2 p-8 relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--accent)",
          }}
        >
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: "var(--accent)" }}
          >
            POPULAR
          </div>
          <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>
            Pro
          </h3>
          <p className="mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
            For makers who ship fast
          </p>
          <div className="text-4xl font-bold mb-1" style={{ color: "var(--text)" }}>
            $15
          </div>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            One-time payment. Yours forever.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Unlimited exports",
              "7 device frames",
              "12 gradient presets + custom",
              "All export sizes",
              "Title & subtitle overlay",
              "No watermarks ever",
              "Priority support",
              "Lifetime updates",
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--success)" }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <a
            href="https://buy.stripe.com/test_dRmeVd5Nj4k75QUcSD0Jq00"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-xl text-center text-white font-semibold text-sm transition-transform hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
          >
            Get Pro — $15 one-time
          </a>
          <button
            onClick={activatePro}
            className="block w-full mt-2 py-2 text-center text-xs underline"
            style={{ color: "var(--text-muted)" }}
          >
            Already paid? Activate Pro →
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQTab() {
  const faqs = [
    {
      q: "Is my screenshot data sent to any server?",
      a: "No. Everything runs in your browser. Your screenshots are never uploaded anywhere. The mockup generation and export happen 100% client-side.",
    },
    {
      q: "What image formats can I upload?",
      a: "PNG, JPG, JPEG, and WebP. Any screenshot from your phone, simulator, or browser will work.",
    },
    {
      q: "What resolution are the exports?",
      a: "Exports are rendered at 2x resolution for crisp, retina-quality PNGs. You can also choose specific export sizes like App Store (1240×2688) or ProductHunt (1278×710).",
    },
    {
      q: "How does the free tier work?",
      a: "You get 5 free PNG exports with full access to all device frames and gradient backgrounds. No signup or email required. After 5 exports, upgrade to Pro for unlimited.",
    },
    {
      q: "Is Pro really a one-time payment?",
      a: "Yes. $15 once, unlimited exports forever. No recurring billing, no surprises. You also get lifetime updates as we add new devices and features.",
    },
    {
      q: "Can I use the mockups commercially?",
      a: "Absolutely. All exported mockups are yours to use in App Store listings, landing pages, pitch decks, social media, ads — anywhere. No attribution required.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Frequently asked questions
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl border p-6"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
              {faq.q}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
