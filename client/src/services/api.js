const cacheName = 'movieinfo-cache';
const cacheExpiration = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

const getCacheExpiration = async () => {
    const cache = await caches.open(cacheName);
    const cacheKeys = await cache.keys();

    const now = Date.now();

    for (const request of cacheKeys) {
        const response = await cache.match(request);
        const cacheData = await response.json();

        if (now - cacheData.timestamp > cacheExpiration) {
            await cache.delete(request);
        }
    }
};

export const getDataWithCache = async (url) => {
    await getCacheExpiration(); // Clean up expired cache entries

    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
        console.log('Using cached data:', url);
        return cachedResponse.json();
    } else {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const cacheData = {
                ...data,
                timestamp: Date.now(), // Add timestamp to cache data
            };
            if (url.includes('search')) {
                console.log('Search performed, hence no caching done');
            }
            else {
                await cache.put(url, new Response(JSON.stringify(cacheData)));
            }
            console.log('Fetched data:', data);
            return data;
        } catch (err) {
            console.error('Error fetching data:', err.message);
            throw err;
        }
    }
};