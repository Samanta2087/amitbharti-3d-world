import { useEffect } from 'react';

interface AdsterraAdProps {
  format?: 'banner' | 'popup' | 'push' | 'native';
  width?: number;
  height?: number;
  key?: string;
  className?: string;
}

export const AdsterraAd = ({ 
  format = 'banner', 
  width = 728, 
  height = 90, 
  key = '565710656c75f6dcace9eb21130676f4',
  className = ''
}: AdsterraAdProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      atOptions = {
        'key': '${key}',
        'format': 'iframe',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `;
    document.head.appendChild(script);

    const adScript = document.createElement('script');
    adScript.type = 'text/javascript';
    adScript.src = `//www.highperformanceformat.com/${key}/invoke.js`;
    document.head.appendChild(adScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(adScript);
    };
  }, [key, width, height]);

  return (
    <div className={`adsterra-ad ${className}`}>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
        <div 
          className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
        >
          <span className="text-muted-foreground text-sm">Adsterra Ad</span>
        </div>
      </div>
    </div>
  );
};