(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ContentScript,
    IasTags = window.IasTags = {};

// chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
//   console.log('Tab Change??');
//   console.log(changeInfo.status === "loading"); && changeInfo.url === undefined
//   if(changeInfo.status === "loading") {
//     console.log('Update??');
//     window.IasTags = {};
//   }
// });

chrome.runtime.onConnect.addListener(function(port) {
 /**
  * Check that a connection with the content script has been made
  */
  if (port.name === 'ContentScript') {
    ContentScript = port;
  }
 /**
  * If a connection with the Content Script has been made,
  * listen to incoming messages, set tag data on background 
  * page window..
  */
  ContentScript.onMessage.addListener(function(msg) {
    var channel = msg.iasTagCall.channel,
        asid = msg.iasTagCall.asid;
    
    if(!IasTags[asid]) { IasTags[asid] = {}; }
    if(!IasTags[asid][channel]) { IasTags[asid][channel] = []; }      
    
    IasTags[asid][channel].push(msg.iasTagCall);
  });
  console.log(window);
});


},{}]},{},[1]);
