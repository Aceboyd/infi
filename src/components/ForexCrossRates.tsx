"use client";

import { useEffect, useRef } from "react";

export default function ForexCrossRates() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    container.appendChild(widget);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 430,
      currencies: ["EUR", "USD", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"],
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      backgroundColor: "#faf7f2",
    });
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="tradingview-widget-container min-h-[430px] w-full overflow-hidden" />;
}
