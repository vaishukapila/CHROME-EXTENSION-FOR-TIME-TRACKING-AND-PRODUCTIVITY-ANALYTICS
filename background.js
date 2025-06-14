let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  trackTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    activeTab = tab;
    startTime = new Date();
  });
});

function trackTime() {
  if (!activeTab || !startTime) return;
  const timeSpent = Math.floor((new Date() - startTime) / 1000); // in seconds
  const url = new URL(activeTab.url);
  const hostname = url.hostname;
  const category = classifySite(hostname);

  fetch('https://your-backend-url.replit.app/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: hostname, timeSpent, category })
  });

  startTime = null;
  activeTab = null;
}

function classifySite(url) {
  const productiveSites = ['github.com', 'stackoverflow.com'];
  return productiveSites.includes(url) ? 'productive' : 'unproductive';
}
