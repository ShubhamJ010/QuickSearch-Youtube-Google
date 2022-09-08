// ==UserScript==
// @name         Quick Search
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  highlight text on any page, and press y to search on youtube or w to search on Google
// @author       Shubham Jha
// @grant        GM_openInTab
// ==/UserScript==

// Instructions:
//   highlight text on any page, and press y to search on youtube or w to search on Google

(function() {
    'use strict';
  
    function searchGoogleForSelectedText() {
      let selectedText = getSelection()
        .toString()
        .trim()
        .replace(/ /g, '_');
      if (selectedText) {
        GM_openInTab("https://www.google.com/search?q=" + selectedText);
      }
    }
  
    function searchYouTubeForSelectedText() {
      let selectedText = getSelection()
        .toString()
        .trim()
        .replace(/ /g, '+');
      if (selectedText) {
        GM_openInTab("https://www.youtube.com/results?search_query=" + selectedText);
      }
    }
  
    window.addEventListener("keydown",
      function(event) {
        if (event.defaultPrevented ||
          /(input|textarea)/i.test(document.activeElement.nodeName)) {
          return;
        }
        switch (event.key) {
          case "y":
          /* fall through */
          case "Y":
            searchYouTubeForSelectedText();
            break;
          case "g":
          /* fall through */
          case "G":
            searchGoogleForSelectedText();
            break;
          default:
            return;
        }
        event.preventDefault();
      },
      true
    );
  
  })();
  
