import React, { useEffect } from 'react';

// Twinkle effect CSS
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
  // Generate 30 random stars
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

const PrivacyPolicy = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-800 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 py-12 px-2 relative overflow-hidden">
      <style>{twinkleStyle}</style>
      <TwinkleBG />
      <div className="relative w-full max-w-2xl bg-white/95 dark:bg-zinc-900/95 rounded-3xl shadow-2xl p-8 md:p-14 border border-zinc-700/40 backdrop-blur-xl z-10">
        <h1 className="text-4xl font-extrabold mb-7 text-primary dark:text-white">Privacy Policy</h1>
        <p className="mb-5 text-lg text-muted-foreground dark:text-zinc-300">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Information We Collect</h2>
        <ul className="list-disc ml-8 mb-5 text-base dark:text-zinc-200">
          <li>Personal information you provide (such as email, name, etc.)</li>
          <li>Usage data and cookies</li>
        </ul>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">How We Use Information</h2>
        <ul className="list-disc ml-8 mb-5 text-base dark:text-zinc-200">
          <li>To provide and improve our services</li>
          <li>To communicate with you</li>
          <li>To comply with legal obligations</li>
        </ul>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Third-Party Services</h2>
        <p className="mb-5 text-base dark:text-zinc-300">We may use third-party services (such as analytics and advertising) that collect, monitor, and analyze usage.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Your Rights</h2>
        <p className="mb-5 text-base dark:text-zinc-300">You may request access to or deletion of your personal data by contacting us.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-accent dark:text-white">Contact</h2>
        <p className="text-base dark:text-zinc-300">If you have any questions about this Privacy Policy, please contact us via the website contact form.</p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
