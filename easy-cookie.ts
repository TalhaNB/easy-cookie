export function useCookies() {
  const setCookie = (cookieName: string, value: string, expiryInMinutes: number, path?: string, domain?: string) => {

    let expires = "";

    if (expiryInMinutes) {
      const date = new Date();
      date.setTime(date.getTime() + expiryInMinutes * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    const pathStr = `; path=${path ? path : '/'}`;
    // Optional: add a specific domain to the cookie, useful for when sub-domains exit
    const domainStr = domain ? `; domain=${domain}` : "";

    // Optional: Secure cookie (only sent over HTTPS)
    const secureStr = location.protocol === "https:" ? "; secure" : "";

    document.cookie = `${cookieName}=${value}${expires}${pathStr}${domainStr}${secureStr}`;
  }

  const getCookie = (cookieName: string) => {
    const _cookieName = cookieName + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca?.length || 0; i++) {
      let c = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      } if (c.indexOf(_cookieName) === 0) return c.substring(_cookieName.length, c.length);
    }

    return;
  }

  const removeCookie = (cookieName: string) => {
    // This probably won't work if a cookie was set with a defined path or domain
    // needs to be further fleshed out
    setCookie(cookieName, "", -100);
  }

  return { setCookie, getCookie, removeCookie }
}