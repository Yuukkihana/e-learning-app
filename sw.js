var preLoad = function(){
  console.log("Installing web app");
  return caches.open("offline").then(function(cache) {
    console.log("caching index and important routes");
    return cache.addAll([
    '/',
    '/index.html',
    '/CSS/style.css',
    '/function.js',
    '/sw.js',
    '/HTML/lernmodule.html',
    '/HTML/lernmodule/lernmodule.html',
    '/HTML/lernmodule/magen/zwischenscreen_magen.html',
    '/HTML/lernmodule/magen/magen-text-illustrationen.html',
    '/HTML/lernmodule/magen/magen-spiel.html',
    '/HTML/lernmodule/magen/magen-quizz.html',
    '/HTML/lernmodule/magen/magen-endscreen.html',
    '/HTML/lernmodule/kater/zwischenscreen_kater.html',
    '/HTML/lernmodule/kater/kater-text-illustrationen.html',
    '/HTML/lernmodule/kater/kater-prevention-video.html',
    '/HTML/lernmodule/kater/kater-quizz.html',
    '/HTML/lernmodule/kater/kater-endscreen.html',
    '/HTML/lernmodule/erkaltung/zwischenscreen_erkaltung.html',
    '/HTML/lernmodule/erkaltung/erkaltung-text-illustrationen.html',
    '/HTML/lernmodule/erkaltung/erkaltung-spiel.html',
    '/HTML/lernmodule/erkaltung/erkaltung-quizz.html',
    '/HTML/lernmodule/erkaltung/erkaltung.html',
    '/HTML/lernmodule/erkaltung/erkaltung-husten-saft.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-magen.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-kater.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-erkaltung.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-ubelkeit.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-durchfall.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-blaehungen.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-ubelkeit.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-schwindel.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-schupfen.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-kopfschmerz.html',
    '/HTML/lernmodule/sofort-hilfe/sofort-hilfe-husten.html',
    '/JS/manifest.json',
    '/JS/quizz-erkaltung',
    '/JS/quizz-kater',
    '/JS/quizz-magen',
    '/fonts/Luckiest_Guy/LuckiestGuy-Regular.ttf',
    '/fonts/Titillium_Web/TitilliumWeb-Bold.ttf',
    '/fonts/Titillium_Web/TitilliumWeb-Regular.ttf',
    '/fonts/Titillium_Web/TitilliumWeb-SemiBold.ttf',
    '/CSS/bootstrap.min.css',
    '/CSS/home-screen.css', 
    '/CSS/lernmodule.css',
    '/CSS/modal.css',
    '/CSS/sofort-hilfe-lernkarten.css',
    '/CSS/sofort-hilfe.css',
    '/CSS/zwischenscreen.css',
    '/CSS/modul-1/magen-quizz.css',
    '/CSS/modul-1/magen-text-illustrationen.css',
    '/CSS/modul-2/kater-quizz.css',
    '/CSS/modul-2/kater-text-illustrationen.css',
    '/CSS/modul-3/erkaltung-quizz.css',
    '/CSS/modul-3/erkaltung-text-illustrationen.css',
    '/bilder/logo.png',
    '/bilder/navigation-left.png',
    '/bilder/navigation-right.png',
    '/bilder/Oma_happy.png',
    '/bilder/Oma_neutral.png',
    '/bilder/kater_prevention.mp4',
    '/bilder/zwischenscreen/muster.png',
    '/bilder/produkten/banana-apfel.png',
    '/bilder/produkten/fenchel.png',
    '/bilder/produkten/honig.png',
    '/bilder/produkten/ingwertee.png',
    '/bilder/produkten/inhalieren.png',
    '/bilder/produkten/kamille.png',
    '/bilder/produkten/karotten.png',
    '/bilder/produkten/ole.png',
    '/bilder/produkten/wasser-glas.png',
    '/bilder/produkten/zwiebel.png',
    '/bilder/husten-saft/fertig.jpg',
    '/bilder/husten-saft/preview-bild.jpg',
    '/bilder/husten-saft/zwiebel_geschnitten.jpg',
    '/bilder/husten-saft/zwiebel.jpg',
    '/bilder/husten-saft/zwiebel_honig.jpg',
    '/bilder/preview-bilder/erkaeltung.png',
    '/bilder/preview-bilder/kater.png',
    '/bilder/preview-bilder/lernmodule.png',
    '/bilder/preview-bilder/magen.png',
    '/bilder/preview-bilder/sofort-hilfe.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/erkaltung-husten.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/erkaltung-kopfschmerz.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/erkaltung-scnupfen.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/kater-kopfschmerz.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/kater-schwindel.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/kater-ubelkeit.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/magen-blahungen.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/magen-durchfall.png',
    '/bilder/preview-bilder/sofort-hilfe-symptome/magen-ubelkeit.png',
    ])
  });
};

self.addEventListener("fetch", function(event) {
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request);
  }));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function(request){
  return caches.open("offline").then(function (cache) {
    return fetch(request).then(function (response) {
      console.log(response.url + " was cached");
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request){
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match("offline.html");
     } else {
       return matching;
     }
    });
  });
};
