/** Chỉ fixture storage; không event/creature/checkpoint production. */
export function saveFixture(marker = 0) {
  return { schemaVersion: 1, contentVersion: 'fixture.content.1', contractId: 'fixture.save.v1',
    checkpoint: { sceneId: 'fixture.scene', mapId: 'fixture.map', anchorId: 'fixture.safe' },
    payload: { fixtureOnly: true, saveIdentity: 'fixture.identity', marker, equippedForms: [null, null, null], activeSlot: null,
      RewardGrantLedger: { sourceClaims: [], recipientGrants: [] }, receipts: [], worldState: [] } };
}
export function fixturePayload(payload) {
  const keys = ['fixtureOnly', 'saveIdentity', 'marker', 'equippedForms', 'activeSlot', 'RewardGrantLedger', 'receipts', 'worldState'];
  if (!payload || Object.keys(payload).length !== keys.length || !keys.every(key => Object.hasOwn(payload, key)) || payload.fixtureOnly !== true || payload.saveIdentity !== 'fixture.identity' || !Number.isSafeInteger(payload.marker) || payload.marker < 0 || !Array.isArray(payload.equippedForms) || payload.equippedForms.length !== 3 || !payload.equippedForms.every(v => v === null || v === 'fixture.form') || (payload.activeSlot !== null && (!Number.isInteger(payload.activeSlot) || payload.activeSlot < 1 || payload.activeSlot > 3 || !payload.equippedForms[payload.activeSlot - 1]))) return false;
  const ledger = payload.RewardGrantLedger;
  if (!ledger || Object.keys(ledger).length !== 2 || !Array.isArray(ledger.sourceClaims) || !Array.isArray(ledger.recipientGrants) || !Array.isArray(payload.receipts) || !Array.isArray(payload.worldState)) return false;
  const sourceKeys = new Set(), grantIds = new Set(), grants = new Set();
  for (const source of ledger.sourceClaims) {
    if (!source || Object.keys(source).length !== 3 || typeof source.canonicalSourceRewardKey !== 'string' || !source.canonicalSourceRewardKey.startsWith('fixture.') || typeof source.grantId !== 'string' || !source.grantId.startsWith('fixture.') || !Array.isArray(source.recipientIds) || source.recipientIds.some(id => id !== 'fixture.form') || new Set(source.recipientIds).size !== source.recipientIds.length || sourceKeys.has(source.canonicalSourceRewardKey) || grantIds.has(source.grantId)) return false;
    sourceKeys.add(source.canonicalSourceRewardKey); grantIds.add(source.grantId);
  }
  for (const grant of ledger.recipientGrants) {
    const source = ledger.sourceClaims.find(s => s.grantId === grant?.grantId), key = `${grant?.grantId}:${grant?.recipientId}`;
    if (!grant || Object.keys(grant).length !== 2 || !source?.recipientIds.includes(grant.recipientId) || grants.has(key)) return false; grants.add(key);
  }
  return ledger.sourceClaims.every(s => s.recipientIds.every(id => grants.has(`${s.grantId}:${id}`))) && payload.receipts.every(r => typeof r === 'string' && r.startsWith('fixture.')) && new Set(payload.receipts).size === payload.receipts.length && payload.worldState.every(r => typeof r === 'string' && r.startsWith('fixture.')) && new Set(payload.worldState).size === payload.worldState.length;
}
export function fixtureCheckpoint(c) { return c.sceneId === 'fixture.scene' && c.mapId === 'fixture.map' && c.anchorId === 'fixture.safe' && c.zoneId === undefined; }
export function saveOptions() { return { contentVersions: ['fixture.content.1', 'fixture.content.2'], contracts: { 'fixture.save.v1': { validatePayload: fixturePayload, validateCheckpoint: fixtureCheckpoint } } }; }
export function saveRequest(slotId = 'slot-1', expectedRevision = 0, marker = 0, requestId = `fixture.request.${expectedRevision}.${marker}`) {
  return { slotId, expectedRevision, requestId, trigger: 'manual', eligibility: { state: 'SAFE_TO_SAVE', checkpointApproved: true }, snapshot: saveFixture(marker) };
}
