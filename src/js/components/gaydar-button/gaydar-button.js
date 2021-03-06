'use strict';
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
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import * as htmlTemplate from "./gaydar-button.template.html";
import * as anime from "animejs";

class GaydarButton extends PolymerElement {
    constructor() {
        super();
      }
      ready() {
        super.ready();
        //check to see if color arrays are the same length 
        if(this.brightColors.length !== this.darkColors.length && this.darkColors.length !== this.centerColors.length) {
            throw new Error("centerColors, darkColors, and brightColors must be of equal length");
        }
        /** PASSIVE RADAR SPIN */
        this.radarSpinAnimation = anime.timeline({
            loop: true,
            duration: this.radarSpeed,
            update: (anim) => {
                //let diff = anim.duration/this.brightColors.length;

              /*if((Math.round(anim.currentTime)%(anim.duration/this.brightColors.length)) === 0) { //issue is here where anim.currentTime is not consistant 
               let index = Math.round(anim.currentTime)/(anim.duration/this.brightColors.length);
               this.changeColor(index===0?this.brightColors.length-1:index-1);
              }*/ 
              if(Math.round(anim.progress) == 0) {
                this._colorChangeLoop(anim.duration);
              }
            }

          }).add({
              targets: this.shadowRoot.querySelector("#stick"),
              rotate: 360,
          
              easing: "linear",
              offset: 0, // Starts at 1000ms of the timeline
              begin: (anim) => {//origin at bottom 
                for(let x = 0; x < anim.animatables.length; x++) {
                  let j = anim.animatables[x].target.getBBox();
                  anim.animatables[x].target.style.transformOrigin = ((j.x)+j.width/2) + "px " + ((j.y)+j.height)+ "px 0px";   
                }
              }
          }).add({
            targets: this.shadowRoot.querySelector("#darkShadow"),
            rotate: 360,
            easing: "linear",
            offset: 0,
            begin: this.centerAnimeSVGOrigin
          })

          /** TOUCH ANIMATIONS */
          this.touchAnimation = anime({
            targets: [this.shadowRoot.querySelector("#middleRing"), this.shadowRoot.querySelector("#innerRing")],
            duration: 1000,
            begin: this.centerAnimeSVGOrigin,
            scale: "-=0.1",
            delay: function(el, i, l) { return i * 90; },
            autoplay: false
          });

      }
    static get template() { 
        const template = document.createElement('template');
        template.innerHTML = htmlTemplate;
        //console.log(html`${template}`)
        return html`${template}`//, this.shadowRoot || this`
      }
    static get properties() {
        return { 
            radarSpeed: {
                type: Number,
                value: 6000,
                observer: "_radarSpeedChanged"
            },
            brightColors: {
                type: Array,
                value: ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6" ]
            },
            darkColors: {
                type: Array,
                value: ["#c0392b", "#d35400", "#f39c12", "#27ae60", "#2980b9", "#8e44ad" ]
            },
            centerColors: {
                type: Array,
                value: ["#ff0000", "#ffb600", "#ffff00", "#00ff6a", "#0000ff", "#f600ff" ]
            },
        }
    }
    _radarSpeedChanged() {
        if(this.radarSpinAnimation) { //make sure animation is initialized
            this.radarSpinAnimation.duration = this.radarSpeed;
        }
    }
    /**UTILS */
    centerAnimeSVGOrigin(anim) {
        for(let x = 0; x < anim.animatables.length; x++) {
             let j = anim.animatables[x].target.getBBox();
             anim.animatables[x].target.style.transformOrigin = ((j.x)+j.width/2) + "px " + ((j.y)+j.height/2)+ "px 0px";   
        }
     }

    changeColor(colorIndex, duration) {
  
        let animation = anime.timeline({
          duration: (duration||1000)
        });
        animation.add({ //Base Color
            targets: this.shadowRoot.querySelector("#outerRing"),
            fill: this.brightColors[colorIndex],
            offset: 0
        })
        animation.add({ //Shadow Color
          targets: [this.shadowRoot.querySelector("#darkColorOuter"), this.shadowRoot.querySelector("#darkColorMiddle"), this.shadowRoot.querySelector("#darkColorInner")],
          stopColor: this.darkColors[colorIndex],
          offset: 0
        })
        animation.add({ //Center Color
          targets: [this.shadowRoot.querySelector("#primaryColorInner"), this.shadowRoot.querySelector("#primaryColorOuter")],
          stopColor: this.centerColors[colorIndex],
          offset: 0
        })
        animation.play();
    }

    _touchStart(e) {
        e.preventDefault();
        this.touchAnimation.restart();
    }
    _touchEnd(e) {
        e.preventDefault();
        this.touchAnimation.reverse();
        this.touchAnimation.play();
    }

    _colorChangeLoop(druation) {
        if(this._colorChangeLoopRun) {
            return;
        }
        this._colorChangeLoopRun = true;
        
        //loop and make all the timeout callbacks 
        for(let t = 0; t < this.brightColors.length; t++) {
            //console.log((druation/this.brightColors.length)* t, t)
            setTimeout(() => {
                //console.log(t)
                this.changeColor(t);
                if(t >= this.brightColors.length-1) { //end one
                    this._colorChangeLoopRun = false
                }
            }, (druation/this.brightColors.length)* t)
        }
        
    }
}


export default GaydarButton;
customElements.define("gaydar-button", GaydarButton);