import { useEffect } from 'react';

export const useFavicon = (isDark: boolean) => {
  useEffect(() => {
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    const favicon32 = document.querySelector("link[rel='icon'][sizes='32x32']") as HTMLLinkElement;
    const favicon16 = document.querySelector("link[rel='icon'][sizes='16x16']") as HTMLLinkElement;
    
    const basePath = isDark ? '/favicon-dark' : '/favicon-light';
    
    if (favicon) favicon.href = `${basePath}/favicon.ico`;
    if (favicon32) favicon32.href = `${basePath}/favicon-32x32.png`;
    if (favicon16) favicon16.href = `${basePath}/favicon-16x16.png`;
  }, [isDark]);
};