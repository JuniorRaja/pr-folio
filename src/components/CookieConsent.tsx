import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const COOKIE_NAME = 'user_consent';
const COOKIE_EXPIRY_DAYS = 365;
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Don't show cookie banner in development
    if (isDevelopment) {
      console.log('🍪 Cookie consent banner disabled in development mode');
      return;
    }

    const hasConsent = Cookies.get(COOKIE_NAME);
    if (!hasConsent) {
      // Delay showing banner slightly for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else if (hasConsent === 'granted') {
      enableAnalytics();
    }
  }, []);

  const enableAnalytics = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
      });
      window.gtag('config', 'G-VPPFFE0HFZ', { send_page_view: false });
    }
  };

  const handleAccept = () => {
    Cookies.set(COOKIE_NAME, 'granted', { expires: COOKIE_EXPIRY_DAYS });
    enableAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set(COOKIE_NAME, 'denied', { expires: COOKIE_EXPIRY_DAYS });
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-4 md:left-4 md:right-auto md:max-w-md"
        >
          <Card className="relative overflow-hidden border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            
            <div className="relative p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Cookie Preferences
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I use cookies to analyze site traffic and improve the experience. 
                      Your data helps me make this site better. Thanks in advance. {' '}
                      <a 
                        href="/privacy" 
                        className="text-primary hover:underline font-medium"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={handleAccept}
                      className="flex-1 shadow-sm"
                      size="sm"
                    >
                      Accept All
                    </Button>
                    <Button 
                      onClick={handleDecline}
                      variant="outline"
                      className="flex-1"
                      size="sm"
                    >
                      Decline
                    </Button>
                  </div>
                </div>

                <button
                  onClick={handleDecline}
                  className="flex-shrink-0 rounded-full p-1 hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}