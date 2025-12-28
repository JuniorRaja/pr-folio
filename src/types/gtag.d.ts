// Google Analytics gtag type declarations
interface Window {
  gtag: {
    (
      command: 'config' | 'event' | 'consent' | 'js',
      targetId: string | Date,
      config?: {
        page_path?: string;
        page_title?: string;
        send_page_view?: boolean;
        analytics_storage?: 'granted' | 'denied';
        ad_storage?: 'granted' | 'denied';
        [key: string]: any;
      }
    ): void;
    q?: any[];
  };
  dataLayer: any[];
}
