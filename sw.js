var C='zahltag-v4';
var F=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}));});
self.addEventListener('fetch',function(e){
  var r0=e.request;if(r0.method!=='GET')return;
  var req=r0;
  if(r0.url.indexOf('https://fonts.googleapis.com/')===0)req=new Request(r0.url,{mode:'cors',credentials:'omit'});
  e.respondWith(fetch(req).then(function(r){var c2=r.clone();if(r.ok)caches.open(C).then(function(c){c.put(r0,c2)});return r;}).catch(function(){return caches.match(r0)}));
});
