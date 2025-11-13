// frontend/public/sw.js
const CACHE_NAME = "customs-engineering-v2.0.0";
const DYNAMIC_CACHE = "customs-engineering-dynamic-v2.0.0";

const STATIC_FILES = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo.svg",
  "/Photo Marianne.jpeg",
  "/Content/PREMIERE PHOTO PAGE D'ACCUEIL.jpg",
  "/Content/aerial-view-cargo-ship-cargo-container-harbor.jpg",
  "/Content/aerial-view-container-cargo-ship-sea.jpg",
  "/Content/industrial-port-container-yard.jpg",
  "/Content/pexels-pixabay-163726.jpg",
  "/Content/pexels-samuel-wolfl-628277-1427541.jpg",
  "/Content/chuttersnap-Q4bmoSPJM18-unsplash.jpg",
];

// Install event - cache static files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install Event");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static files");
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log("Service Worker: Static files cached successfully");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Cache installation failed", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activate Event");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
              console.log("Service Worker: Clearing old cache", cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Claiming clients");
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip API calls
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      caches
        .match("/index.html")
        .then((response) => {
          return response || fetch(request);
        })
        .catch(() => {
          return caches.match("/index.html");
        })
    );
    return;
  }

  // Handle static assets
  if (
    STATIC_FILES.includes(url.pathname) ||
    url.pathname.startsWith("/Content/")
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(request)
        .then((fetchResponse) => {
          // Don't cache non-successful responses
          if (
            !fetchResponse ||
            fetchResponse.status !== 200 ||
            fetchResponse.type !== "basic"
          ) {
            return fetchResponse;
          }

          // Clone the response
          const responseToCache = fetchResponse.clone();

          // Cache the response
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return fetchResponse;
        })
        .catch((error) => {
          console.error("Service Worker: Fetch failed", error);
          // Return offline page or cached content
          if (request.destination === "document") {
            return caches.match("/index.html");
          }
          throw error;
        });
    })
  );
});

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync-contact") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Get stored form data from IndexedDB or localStorage
    const storedRequests = await getStoredRequests();

    for (const request of storedRequests) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request.data),
        });

        if (response.ok) {
          await removeStoredRequest(request.id);
          console.log("Background sync: Contact form submitted successfully");
        }
      } catch (error) {
        console.error("Background sync: Failed to submit contact form", error);
      }
    }
  } catch (error) {
    console.error("Background sync: Error processing stored requests", error);
  }
}

// Helper functions for background sync
async function getStoredRequests() {
  // Implementation would depend on your storage choice
  return [];
}

async function removeStoredRequest(id) {
  // Implementation would depend on your storage choice
  console.log("Removed stored request:", id);
}

// Push notification event
self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/logo.svg",
    badge: "/favicon.ico",
    image: data.image,
    tag: data.tag || "default",
    requireInteraction: false,
    actions: [
      {
        action: "view",
        title: "Voir",
        icon: "/logo.svg",
      },
      {
        action: "dismiss",
        title: "Ignorer",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "Customs Engineering Solutions",
      options
    )
  );
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
  }
});

// Message event for communication with main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("Service Worker: Loaded successfully");
