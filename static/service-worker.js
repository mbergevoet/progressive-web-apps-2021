const CORE_CACHE_VERSION = 'v3'
const URLS_TO_CACHE = [
    '/offline',
    '/styles/styles.css',
    '/main.js'
];

self.addEventListener('install', () => {
    console.log('installing')
    self.skipWaiting()
})

self.addEventListener('activate', () => {
    console.log('activated')
})

self.addEventListener('fetch', (event) => {
    console.log('fetch event for: ', event.request.url)

    event.respondWith(
        fetch(event.request)
            .catch(error => {
                return caches.open('my-cache')
                    .then(cache => cache.match('/offline'))
            })
    )
})