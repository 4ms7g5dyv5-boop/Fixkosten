var C='fixkosten-v2';
var F=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(function(r){var c2=r.clone();if(r.ok)caches.open(C).then(function(c){c.put(e.request,c2)});return r;}).catch(function(){return caches.match(e.request)}));
});
