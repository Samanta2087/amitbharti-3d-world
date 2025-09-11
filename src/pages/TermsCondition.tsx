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

const TermsCondition = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-800 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 py-12 px-2 relative overflow-hidden">
      <style>{twinkleStyle}</style>
      <TwinkleBG />
      <div className="relative w-full max-w-2xl bg-white/95 dark:bg-zinc-900/95 rounded-3xl shadow-2xl p-8 md:p-14 border border-zinc-700/40 backdrop-blur-xl z-10">
        <h1 className="text-4xl font-extrabold mb-7 text-primary dark:text-white">Terms & Conditions</h1>
        <p className="mb-5 text-lg text-muted-foreground dark:text-zinc-300">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this site.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Use of the Site</h2>
        <ul className="list-disc ml-8 mb-5 text-base dark:text-zinc-200">
          <li>You must be at least 13 years old to use this site.</li>
          <li>You agree not to misuse the site or its content.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Intellectual Property</h2>
        <p className="mb-5 text-base dark:text-zinc-300">All content on this site is the property of the website owner unless otherwise stated.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Limitation of Liability</h2>
        <p className="mb-5 text-base dark:text-zinc-300">We are not liable for any damages arising from the use of this site.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Changes to Terms</h2>
        <p className="mb-5 text-base dark:text-zinc-300">We reserve the right to modify these terms at any time. Changes will be posted on this page.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Contact</h2>
        <p className="text-base dark:text-zinc-300">If you have any questions about these Terms & Conditions, please contact us via the website contact form.</p>
      </div>
    </section>
  );
};

export default TermsCondition;
