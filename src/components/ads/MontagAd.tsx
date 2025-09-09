import { useEffect } from 'react';

interface MontagAdProps {
  zoneId?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const MontagAd = ({ 
  zoneId = '261af662641f3e5f02e3d02a5a7b5f8f',
  width = 300,
  height = 250,
  className = ''
}: MontagAdProps) => {
  useEffect(() => {
    // Monetag script loading
    const script = document.createElement('script');
    script.async = true;
    script.src = `//thubanoa.com/${zoneId}/waWQiOiIxNjI4ODYiLCJjcCI6ZmFsc2V9/tag.min.js`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="${zoneId}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [zoneId]);

  return (
    <div className={`monetag-ad ${className}`}>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
        <div 
          className="bg-gradient-to-br from-primary/5 to-accent/5 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center mx-auto"
          style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
        >
          <span className="text-muted-foreground text-sm">Monetag Ad</span>
        </div>
      </div>
    </div>
  );
};