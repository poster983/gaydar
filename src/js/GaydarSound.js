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

/*export function listSounds() {
 //MULTI SOUND SUPPORT LATER
}*/

export default class GaydarSound {
    constructor(defaultURL) {
        this.sound = defaultURL?defaultURL:window.location.origin+"/src/sounds/grindr.mp3";
    }
    set sound(soundURL) {
        this._sound = new Audio(soundURL);
        this._loopCount = 0;
    }
    get sound() {
        return this._sound;
    }
    get loopCount() {
        return this._loopCount;
    }
    play(loop) {
        if(loop) {
            this._dontLoopWorkArround = false;
            this._sound.addEventListener('ended', (e) => {
                if(!this._dontLoopWorkArround) {
                    //console.log(e)
                    this._sound.play();
                    this._loopCount++;
                }
            });
        }
        //initial play
        this._sound.play();
        this._loopCount = 0;
    }
    stop(playThrough) {
        this._dontLoopWorkArround = true;
        if(!playThrough) {
            this._sound.pause();
            this._sound.currentTime = 0;
        }
        this._sound = this._sound.cloneNode(true);
    }
}