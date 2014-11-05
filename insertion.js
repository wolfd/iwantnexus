// Stolen from Teresa Krause
var head = document.head || document.documentElement;

//The url where this chrome extension's files live
var ext_url = chrome.extension.getURL('');

//Allow the embedded js access to our directory
var script2 = document.createElement('script');
script2.textContent = 'var ext_url = "' + ext_url + '";';
head.appendChild(script2);

//Insert js to overwrite variables
var script1 = document.createElement('script');
script1.src = ext_url + 'iwantnexus.js';
head.appendChild(script1);
