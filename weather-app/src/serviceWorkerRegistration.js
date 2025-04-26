// estratto ufficiale CRA
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/
    )
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      if (isLocalhost) {
        // localhost -> controlla l’esistenza dello SW
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log('Service worker pronto (localhost)');
        });
      } else {
        registerValidSW(swUrl, config);
      }
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) return;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // nuovo contenuto disponibile
                config && config.onUpdate && config.onUpdate(registration);
              } else {
                // contenuto cache-ato
                config && config.onSuccess && config.onSuccess(registration);
              }
            }
          };
        };
      })
      .catch(err => console.error('SW registration failed:', err));
  }
  
  function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType && contentType.indexOf('javascript') === -1)
        ) {
          navigator.serviceWorker.ready.then(reg => reg.unregister())
            .then(() => window.location.reload());
        } else {
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => console.log('Offline – no service worker.'));
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(reg => reg.unregister())
        .catch(err => console.error(err));
    }
  }
  