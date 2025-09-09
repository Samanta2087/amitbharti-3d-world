import { useEffect } from 'react';

interface IntergradAdProps {
  type?: 'banner-728x90' | 'banner-468x60' | 'popunder' | 'social-bar' | 'native';
  width?: number;
  height?: number;
  className?: string;
}

export const IntergradAd = ({ 
  type = 'banner-728x90', 
  width = 728, 
  height = 90, 
  className = ''
}: IntergradAdProps) => {
  useEffect(() => {
    const loadAd = () => {
      switch (type) {
        case 'banner-728x90':
          // Banner 728x90
          const script1 = document.createElement('script');
          script1.type = 'text/javascript';
          script1.innerHTML = `
            atOptions = {
              'key': '565710656c75f6dcace9eb21130676f4',
              'format': 'iframe',
              'height': 90,
              'width': 728,
              'params': {}
            };
          `;
          document.head.appendChild(script1);

          const adScript1 = document.createElement('script');
          adScript1.type = 'text/javascript';
          adScript1.src = '//www.highperformanceformat.com/565710656c75f6dcace9eb21130676f4/invoke.js';
          document.head.appendChild(adScript1);
          break;

        case 'banner-468x60':
          // Banner 468x60
          const script2 = document.createElement('script');
          script2.type = 'text/javascript';
          script2.innerHTML = `
            atOptions = {
              'key': '4b96a2e03a2919b60c04fd026a5581b9',
              'format': 'iframe',
              'height': 60,
              'width': 468,
              'params': {}
            };
          `;
          document.head.appendChild(script2);

          const adScript2 = document.createElement('script');
          adScript2.type = 'text/javascript';
          adScript2.src = '//www.highperformanceformat.com/4b96a2e03a2919b60c04fd026a5581b9/invoke.js';
          document.head.appendChild(adScript2);
          break;

        case 'popunder':
          // Popunder
          const popScript = document.createElement('script');
          popScript.type = 'text/javascript';
          popScript.src = '//pl27605783.revenuecpmgate.com/d2/eb/c3/d2ebc37e656b58eb86be8cee2ce15314.js';
          document.head.appendChild(popScript);
          break;

        case 'social-bar':
          // Social Bar
          const socialScript = document.createElement('script');
          socialScript.type = 'text/javascript';
          socialScript.src = '//pl27605817.revenuecpmgate.com/e6/71/68/e671681352ab0198be3372b62cf46d59.js';
          document.head.appendChild(socialScript);
          break;

        case 'native':
          // Native Banner
          const nativeScript = document.createElement('script');
          nativeScript.async = true;
          nativeScript.setAttribute('data-cfasync', 'false');
          nativeScript.src = '//pl27605806.revenuecpmgate.com/531a0622e56d982d6e7dbf0d3df59b62/invoke.js';
          document.head.appendChild(nativeScript);
          break;
      }
    };

    loadAd();

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[src*="highperformanceformat.com"], script[src*="revenuecpmgate.com"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [type]);

  const getAdDimensions = () => {
    switch (type) {
      case 'banner-728x90':
        return { width: 728, height: 90 };
      case 'banner-468x60':
        return { width: 468, height: 60 };
      case 'native':
        return { width: width || 300, height: height || 250 };
      default:
        return { width: width || 300, height: height || 250 };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <div className={`intergrad-ad ${className}`}>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
        {type === 'native' ? (
          <div id="container-531a0622e56d982d6e7dbf0d3df59b62" className="mx-auto" />
        ) : (
          <div 
            className="bg-gradient-to-br from-primary/5 to-accent/5 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center mx-auto"
            style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, maxWidth: '100%' }}
          >
            <span className="text-muted-foreground text-sm">Intergrad Ad</span>
          </div>
        )}
      </div>
    </div>
  );
};