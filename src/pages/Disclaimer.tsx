import React, { useEffect } from 'react';

const twinkleStyle = `
  .twinkle-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .twinkle-star {
    position: absolute;
    border-radius: 50%;
    background: white;
    opacity: 0.8;
    animation: twinkle 2s infinite alternate;
  }
  @keyframes twinkle {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

function TwinkleBG() {
  const stars = Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 1.5 + Math.random();
    return (
      <div
        key={i}
        className="twinkle-star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });
  return <div className="twinkle-bg">{stars}</div>;
}

const Disclaimer = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-800 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 py-12 px-2 relative overflow-hidden">
      <style>{twinkleStyle}</style>
      <TwinkleBG />
      <div className="relative w-full max-w-2xl bg-white/95 dark:bg-zinc-900/95 rounded-3xl shadow-2xl p-8 md:p-14 border border-zinc-700/40 backdrop-blur-xl z-10">
        <h1 className="text-4xl font-extrabold mb-7 text-primary dark:text-white">Disclaimer</h1>
        <p className="mb-5 text-lg text-muted-foreground dark:text-zinc-300">The information provided on this website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">External Links Disclaimer</h2>
        <p className="mb-5 text-base dark:text-zinc-300">This website may contain links to other websites or content belonging to or originating from third parties. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Professional Disclaimer</h2>
        <p className="mb-5 text-base dark:text-zinc-300">The site cannot and does not contain financial or legal advice. Any information is provided for general informational and educational purposes only and is not a substitute for professional advice.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Contact</h2>
        <p className="text-base dark:text-zinc-300">If you have any questions about this Disclaimer, please contact us via the website contact form.</p>
      </div>
    </section>
  );
};

export default Disclaimer;
