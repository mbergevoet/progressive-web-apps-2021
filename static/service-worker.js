const CORE_CACHE_VERSION = 'v3'

self.addEventListener('install', () => {
    console.log('installing')
    self.skipWaiting()
})

self.addEventListener('activate', () => {
    console.log('activated')
})