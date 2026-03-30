const CACHE_NAME = 'miro-k1-github-v1';

// 156 個單字圖檔 + 核心檔案清單
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  // --- 單字圖片清單 ---
  'alligator.jpg', 'ambulance.jpg', 'anchor.jpg', 'ant.jpg', 'apple.jpg', 'arrow.jpg',
  'banana.jpg', 'bear.jpg', 'bed.jpg', 'bicycle.jpg', 'boat.jpg', 'book.jpg', 'butterfly.jpg',
  'cake.jpg', 'camel.jpg', 'can.jpg', 'car.jpg', 'carrot.jpg', 'cat.jpg', 'coat.jpg', 'cup.jpg',
  'deer.jpg', 'dice.jpg', 'dog.jpg', 'doll.jpg', 'dolphin.jpg', 'doughnut.jpg', 'drum.jpg',
  'egg.jpg', 'eggplant.jpg', 'elbow.jpg', 'elephant.jpg', 'envelope.jpg',
  'fan.jpg', 'feather.jpg', 'fish.jpg', 'flower.jpg', 'fork.jpg', 'frog.jpg',
  'ghost.jpg', 'glass.jpg', 'glue.jpg', 'goat.jpg', 'gorilla.jpg', 'grapes.jpg',
  'harp.jpg', 'hat.jpg', 'heart.jpg', 'hippo.jpg', 'holly.jpg', 'horse.jpg',
  'igloo.jpg', 'iguana.jpg', 'in.jpg', 'ink.jpg', 'insects.jpg',
  'jacket.jpg', 'jacks.jpg', 'jellyfish.jpg', 'jigsaw puzzle.jpg', 'juggle.jpg', 'jump rope.jpg',
  'kangaroo.jpg', 'keys.jpg', 'king.jpg', 'kite.jpg', 'kitten.jpg',
  'ladder.jpg', 'leaf.jpg', 'light.jpg', 'lightning.jpg', 'lion.jpg',
  'match.jpg', 'monkey.jpg', 'moon.jpg', 'mop.jpg', 'moose.jpg', 'mouse.jpg',
  'nails.jpg', 'needle.jpg', 'nest.jpg', 'net.jpg', 'nine.jpg', 'notebook.jpg',
  'oar.jpg', 'octopus.jpg', 'orange.jpg', 'ornament.jpg', 'ostrich.jpg', 'ox.jpg',
  'paintbrush.jpg', 'peas.jpg', 'pencil.jpg', 'piano.jpg', 'pig.jpg', 'pizza.jpg', 'pumpkin.jpg',
  'quail.jpg', 'queen.jpg', 'question.jpg', 'quilt.jpg', 'quiver.jpg',
  'rabbit.jpg', 'rake.jpg', 'rhino.jpg', 'ring.jpg', 'rooster.jpg', 'rope.jpg', 'rose.jpg',
  'scooter.jpg', 'sloth.jpg', 'snake.jpg', 'snowman.jpg', 'spade.jpg',
  'table.jpg', 'tiger.jpg', 'tree.jpg', 'truck.jpg', 'turtle.jpg', 'two.jpg',
  'umbrella.jpg', 'umpire.jpg', 'under.jpg', 'underwear.jpg',
  'vacuum.jpg', 'vase.jpg', 'vest.jpg', 'vine.jpg', 'violin.jpg', 'volcano.jpg',
  'wagon.jpg', 'warm.jpg', 'watch.jpg', 'watermelon.jpg', 'whistle.jpg', 'window.jpg', 'wolf.jpg',
  'x-ray.jpg', 'yak.jpg', 'yam.jpg', 'yarn.jpg', 'yoga.jpg', 'yo-yo.jpg',
  'zebra.jpg', 'zeppelin.jpg', 'zipper.jpg', 'zither.jpg', 'zucchini.jpg',
  // --- 特殊修正檔名 ---
  'lallipop.jpg', 'mosse.jpg', 'snall.jpg', 'vlolin.jpg'
];

// 安裝時強制下載所有圖片
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Miro App: 正在下載圖片到手機...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 啟動時清除舊版快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
  self.clients.claim();
});

// 攔截請求：先看手機有沒有存過圖片，沒有再去網路抓
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});