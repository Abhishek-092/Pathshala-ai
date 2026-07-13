const CACHE_NAME = "pathshala-ai-cache-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./offline.html",
  "./manifest.webmanifest",
  "./src/main.js",
  "./src/core/app.js",
  "./src/core/router.js",
  "./src/core/eventBus.js",
  "./src/storage/indexeddb/database.js",
  "./src/ai/orchestrator.js",
  "./src/ai/capabilities.js",
  "./src/ai/sessionManager.js",
  "./src/ai/modelManager.js",
  "./src/ai/providers/mockProvider.js",
  "./src/ai/providers/webllm.js",
  "./src/ai/providers/transformers.js",
  "./src/learning/curriculum/curriculumEngine.js",
  "./src/learning/assessment/generator.js",
  "./src/learning/assessment/evaluator.js",
  "./src/learning/assessment/feedback.js",
  "./src/learning/analytics/tracker.js",
  "./src/learning/planner/scheduler.js",
  "./src/knowledge/retriever/chunker.js",
  "./src/knowledge/retriever/retriever.js",
  "./src/knowledge/router/router.js",
  "./src/knowledge/packs/installer.js",
  "./src/ui/components/debugger.js",
  "./src/ui/components/accessibility.js",
  "./src/ui/pages/splash.js",
  "./src/ui/pages/onboarding.js",
  "./src/ui/pages/packSelection.js",
  "./src/ui/pages/dashboard.js",
  "./src/ui/pages/subjects.js",
  "./src/ui/pages/chapters.js",
  "./src/ui/pages/aiTutor.js",
  "./src/ui/pages/lesson.js",
  "./src/ui/pages/quiz.js",
  "./src/ui/pages/mastery.js",
  "./src/ui/pages/learningPath.js",
  "./src/ui/pages/downloads.js",
  "./src/ui/pages/parent.js",
  "./src/ui/pages/teacher.js",
  "./src/ui/pages/profile.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        if (e.request.mode === "navigate") {
          return caches.match("./offline.html");
        }
      });
    })
  );
});
