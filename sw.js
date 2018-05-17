importScripts("./dist/precache-manifest.dbdab97b98a7e619f9050b412786f175.js", "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

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
