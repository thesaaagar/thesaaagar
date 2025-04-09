var staticCacheName="pwa";self.addEventListener("install",function(e){e.waitUntil(caches.open(staticCacheName).then(function(cache){return cache.addAll(["/"]);}));});self.addEventListener("fetch",function(event){console.log(event.request.url);event.respondWith(caches.match(event.request).then(function(response){return response||fetch(event.request);}));});
 

<link rel="manifest" href="manifest.json">
<script>
        window.addEventListener('load', () => {
          registerSW();
        });
     
        // Register the Service Worker
        async function registerSW() {
          if ('serviceWorker' in navigator) {
            try {
              await navigator
                    .serviceWorker
                    .register('serviceworker.js');
            }
            catch (e) {
              console.log('SW registration failed');
            }
          }
        }
</script> 