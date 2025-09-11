import React, { useEffect, useRef } from "react";

type AdSlotType =
  | "banner-728x90"
  | "banner-468x60"
  | "popunder"
  | "social-bar"
  | "nativebanner"
  | "smartlink";

interface AdSlotProps {
  type: AdSlotType;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Clean up previous scripts
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    let script1: HTMLScriptElement | null = null;
    let script2: HTMLScriptElement | null = null;
    let div: HTMLDivElement | null = null;

    // Debug: log which ad type is being injected
    if (containerRef.current) {
      containerRef.current.innerHTML = `<div style='color:gray;font-size:12px;'>[AdSlot: Injecting <b>${type}</b>]</div>`;
    }

    switch (type) {
      case "banner-728x90": {
        script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.innerHTML = `atOptions = { 'key' : '565710656c75f6dcace9eb21130676f4', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };`;
        script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = "//www.highperformanceformat.com/565710656c75f6dcace9eb21130676f4/invoke.js";
        containerRef.current?.appendChild(script1);
        containerRef.current?.appendChild(script2);
        break;
      }
      case "banner-468x60": {
        script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.innerHTML = `atOptions = { 'key' : '4b96a2e03a2919b60c04fd026a5581b9', 'format' : 'iframe', 'height' : 60, 'width' : 468, 'params' : {} };`;
        script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = "//www.highperformanceformat.com/4b96a2e03a2919b60c04fd026a5581b9/invoke.js";
        containerRef.current?.appendChild(script1);
        containerRef.current?.appendChild(script2);
        break;
      }
      case "popunder": {
        script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.src = "//pl27605783.revenuecpmgate.com/d2/eb/c3/d2ebc37e656b58eb86be8cee2ce15314.js";
        containerRef.current?.appendChild(script1);
        break;
      }
      case "social-bar": {
        script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.src = "//pl27605817.revenuecpmgate.com/e6/71/68/e671681352ab0198be3372b62cf46d59.js";
        containerRef.current?.appendChild(script1);
        break;
      }
      case "nativebanner": {
        script1 = document.createElement("script");
        script1.async = true;
        script1.setAttribute("data-cfasync", "false");
        script1.src = "//pl27605806.revenuecpmgate.com/531a0622e56d982d6e7dbf0d3df59b62/invoke.js";
        div = document.createElement("div");
        div.id = "container-531a0622e56d982d6e7dbf0d3df59b62";
        containerRef.current?.appendChild(script1);
        containerRef.current?.appendChild(div);
        break;
      }
      case "smartlink": {
        // Smartlink is just a URL, so show as a clickable link
        if (containerRef.current) {
          containerRef.current.innerHTML += `<a href='https://www.revenuecpmgate.com/smi015v8?key=26a6f8c22178e59ed5a3984ce60d2520' target='_blank' rel='noopener noreferrer'>Click here for Smart Link Ad</a>`;
        }
        break;
      }
      default:
        break;
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [type]);

  // Responsive/scrollable wrapper for banners on mobile
  let wrapperClass = "ad-slot w-full";
  let wrapperStyle: React.CSSProperties = { width: "100%" };
  if (type === "banner-728x90" || type === "banner-468x60") {
    wrapperClass += " overflow-x-auto flex justify-center";
    wrapperStyle = {
      ...wrapperStyle,
      WebkitOverflowScrolling: "touch",
      maxWidth: "100vw",
    };
  }
  return (
    <div
      ref={containerRef}
      className={wrapperClass}
      data-type={type}
      style={wrapperStyle}
    />
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center gap-6 my-8">
      <AdSlot type="banner-728x90" />
      <AdSlot type="banner-468x60" />
      <AdSlot type="nativebanner" />
      <AdSlot type="social-bar" />
      <AdSlot type="popunder" />
    </div>
  );
};

export default App;
