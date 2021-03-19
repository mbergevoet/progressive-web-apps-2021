const CACHE_NAME = 'v1'
const URLS_TO_CACHE = [
    'main.js',
    '/styles/style.css',
    // '../views/pages/offline.ejs'
];

// source: https://www.youtube.com/watch?v=ksXwaWHCW6k
// Caching all wanted pages
self.addEventListener('install', event => {
    console.log('service worker installed')

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.log('service worker caching files')
                cache.addAll(URLS_TO_CACHE)
            })
            .then(() => self.skipWaiting())
    )
})

// Clear old caches
self.addEventListener('activate', event => {
    console.log('service worker activated')
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('service worker clearing old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

// Showing offline page if offline
self.addEventListener('fetch', event => {
    console.log('service worker fetching')
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
})