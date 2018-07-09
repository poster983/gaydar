/*DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2018 Joseph Hassell <hi@josephhassell.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
*/
/**Work-around for lastpass issue on firefox**/
document.createElement = Document.prototype.createElement;


/** REQUIRE WEDCOMPONENTS **/
import "./components/gaydar-button/gaydar-button.js";
import "@polymer/paper-toast/paper-toast.js";
import "@polymer/paper-button/paper-button.js";
import '@polymer/paper-styles/typography.js';
import "../styles/default-theme.js";

/** REQUIRE MODULES */
import GaydarSound from "./GaydarSound.js";

/** GLOBALS */
let gaydarSound = new GaydarSound();
let gaydar = document.getElementById("mainGaydar");

/*document.addEventListener("DOMContentLoaded", function(event) { 
    //load up the 
});  */


/** GAYDAR Button Click stuff */

//listen for click on 
gaydar.addEventListener("mousedown", eventPlaySound);
gaydar.addEventListener("touchstart", eventPlaySound);
function eventPlaySound(e) {
    e.preventDefault();
    gaydarSound.play(true);
}
//listen for click off
gaydar.addEventListener("mouseup", eventStopSound);
gaydar.addEventListener("touchend", eventStopSound);
function eventStopSound(e) {
    e.preventDefault();
    if(gaydarSound.loopCount === 0) {
        gaydarSound.stop(true);
    } else {
        gaydarSound.stop();
    }
    
    
}
//SERVICE WORKER

//Ask user to refresh page if there is a new version avalable
function showRefreshUI(registration) {
    let paperTooltip = document.createElement("paper-toast");
    paperTooltip.opened = true;
    paperTooltip.duration = 0;
    paperTooltip.text = "There is a new version of the Gaydar avalable";
    let updateButton = document.createElement("paper-button");
    //updateButton.style.color = "var("
    updateButton.innerHTML = "Update";
    updateButton.addEventListener("click", (e) => {
        if (!registration.waiting) {
            // Just to ensure registration.waiting is available before
            // calling postMessage()
            return;
        }
        e.target.disabled = true;

        registration.waiting.postMessage("skipWaiting"); 
    });
    paperTooltip.appendChild(updateButton); 
    document.body.appendChild(paperTooltip); 
}

function onNewServiceWorker(registration, callback) {
    if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
        return callback();
    }

    function listenInstalledStateChange() {
        //console.log("Update Found!");
        registration.installing.addEventListener("statechange", function(event) {
            if (event.target.state === "installed") {
                // A new service worker is available, inform the user
                callback();
            }
        });
    }

    if (registration.installing) {
        return listenInstalledStateChange();
    }

    // We are currently controlled so a new SW may be found...
    // Add a listener in case a new SW is found,
    registration.addEventListener("updatefound", listenInstalledStateChange);
}

window.addEventListener("load", function() {
    navigator.serviceWorker.register("./sw.js", {scope: (process.env.NODE_ENV === "production")?"/gaydar/":"/"})
        .then(function (registration) {
            // Track updates to the Service Worker.
            if (!navigator.serviceWorker.controller) {
                // The window client isn't currently controlled so it's a new service
                // worker that will activate immediately
                return;
            }
            console.log("ServiceWorker registration successful with scope: ", registration.scope);

            // When the user asks to refresh the UI, we'll need to reload the window
            var preventDevToolsReloadLoop;
            navigator.serviceWorker.addEventListener("controllerchange", function(event) {
                //console.log("Service worker changed ")
                // Ensure refresh is only called once.
                // This works around a bug in "force update on reload".
                if (preventDevToolsReloadLoop) return;
                preventDevToolsReloadLoop = true;
                console.log("Controller loaded");
                window.location.reload();
            });

            onNewServiceWorker(registration, function() {
                showRefreshUI(registration);
            });
        }).catch(function(err) {
            // registration failed :(
            console.log("ServiceWorker registration failed: ", err);
        });
});