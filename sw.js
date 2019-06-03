importScripts("./dist/precache-manifest.a3040e7ea3abad27f404a37efa574756.js", "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);


self.addEventListener("message", (event) => {
    if (!event.data){
        return;
    }
  
    switch (event.data) {
    case "skipWaiting": //new version ui will call this
        self.skipWaiting();
        break;
    default:
        // NOOP
        break;
    }
});
