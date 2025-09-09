import { useEffect } from 'react';

interface IntergradAdProps {
  siteId?: string;
  slotId?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const IntergradAd = ({ 
  siteId = 'your-site-id',
  slotId = 'your-slot-id',
  width = 728,
  height = 90,
  className = ''
}: IntergradAdProps) => {
  useEffect(() => {
    // Intergrad ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function() {
        var ad = document.createElement('script');
        ad.type = 'text/javascript';
        ad.async = true;
        ad.src = 'https://ads.intergi.com/ads.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ad, s);
      })();
    `;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src*="intergi.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [siteId, slotId]);

  return (
    <div className={`intergrad-ad ${className}`}>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
        <div 
          className="bg-gradient-to-r from-accent/5 to-primary/5 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
          data-site-id={siteId}
          data-slot-id={slotId}
        >
          <span className="text-muted-foreground text-sm">Intergrad Ad</span>
        </div>
      </div>
    </div>
  );
};