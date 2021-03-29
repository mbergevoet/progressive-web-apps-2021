const CACHE_NAME = 'v1'
const CORE_ASSATES = [
    '/main.js',
    '/styles/style.css',
    '/images/starwarslogo.png',
    '/images/stars.webp',
    '/offline'
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
                cache.addAll(CORE_ASSATES)
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

    // Verschillende event.requests uitlezen en 
    // if (event.request.method === 'GET') {
    // event.waitUntil(caches.open('offline-cache-name').then(function (cache) {
    //     return cache.addAll(CORE_ASSATES);
    // }
    // event.respondWith(
    //     fetch(event.request)
    //         .catch(() => {
    //             return caches.open(CACHE_NAME)
    //                 .then(cache => cache.match(CORE_ASSATES[4]))
    //         })
    // )

    // }

    // --------------------------------------------------------------------
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.match(event.request)
                        .then(response => {
                            if (response) {
                                return response
                            }
                            return fetch(event.request)
                                .then(response => {
                                    cache.put(event.request, response.clone())
                                    return response
                                })
                        })
                        .catch((error) => {
                            return caches.open(CACHE_NAME)
                                .then(cache => cache.match('/offline'))
                        })
                })
        )
    }
    // --------------------------------------------------------------------
})