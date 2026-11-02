/** Observer cho QA mới; không áp console warnings thành fatal toàn bộ. */
function observeBrowser(page) {
  const events = [], expected = [], listeners = [];
  const record = (kind, text) => {
    const match = expected.find(rule => rule.kind === kind && rule.remaining > 0 && text.includes(rule.text));
    if (match) match.remaining--;
    events.push({ kind, text: text.slice(0, 500), expected: !!match });
  };
  const on = (type, callback) => { page.on(type, callback); listeners.push(() => page.off(type, callback)); };
  const route = url => { try { return new URL(url).pathname; } catch { return '[invalid URL]'; } };
  on('pageerror', error => record('pageerror', error.message));
  on('requestfailed', request => record('requestfailed', `${route(request.url())} ${request.failure?.()?.errorText || ''}`.trim()));
  on('response', response => { if (response.status() >= 400) record('http', `${response.status()} ${route(response.url())}`); });
  on('console', message => { if (message.type() === 'error') record('console', message.text()); });
  return { expect(kind, text, count = 1) { expected.push({ kind, text, remaining: count, optional: false }); },
    allow(kind, text, count = 1) { expected.push({ kind, text, remaining: count, optional: true }); },
    snapshot() { return { events: [...events], unexpected: events.filter(event => !event.expected), missingExpected: expected.filter(rule => !rule.optional && rule.remaining > 0) }; },
    dispose() { listeners.forEach(remove => remove()); } };
}
module.exports = { observeBrowser };
