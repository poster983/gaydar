import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-styles/color.js';
const $_documentContainer = document.createElement("div");
$_documentContainer.setAttribute("style", "display: none;");

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--dark-theme-text-color) !important;
      --primary-background-color: var(--dark-theme-background-color) !important;
      --secondary-background-color: var(--dark-theme-secondary-background-color) !important;
      --secondary-text-color: var(--dark-theme-secondary-color) !important;
      --disabled-text-color: var(--dark-theme-disabled-color) !important;
      --divider-color: var(--dark-theme-divider-color) !important;
      --error-color: var(--paper-deep-orange-a700) !important;
      /*
       * Primary and accent colors. Also see color.html for more colors.
       */
      --primary-color: var(--paper-purple-500) !important;
      --light-primary-color: var(--paper-purple-100) !important;
      --dark-primary-color: var(--paper-purple-700) !important;
      --accent-color: var(--paper-pink-a400) !important;
      --light-accent-color: var(--paper-pink-a200) !important;
      --dark-accent-color: var(--paper-pink-a700) !important;
      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff !important;
      --light-theme-secondary-background-color: var(--paper-gray-300) !important;
      --light-theme-base-color: #000000 !important;
      --light-theme-text-color: var(--paper-grey-900) !important;
      --light-theme-secondary-color: #737373 !important;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b !important;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb !important;
      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900) !important;
      --dark-theme-secondary-background-color: var(--paper-gray-700) !important;
      --dark-theme-base-color: #ffffff !important;
      --dark-theme-text-color: #ffffff !important;
      --dark-theme-secondary-color: #bcbcbc !important;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464 !important;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c !important;
      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color) !important;
      --default-primary-color: var(--primary-color) !important;
    }
  </style>
</custom-style>`;
document.head.appendChild($_documentContainer);

/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* Taken from https://www.google.com/design/spec/style/color.html#color-ui-color-application */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;