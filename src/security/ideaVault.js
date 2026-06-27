// ── Idea Vault — Founder's Seal ─────────────────────────────────
// SHA-256 hashes the founder's idea + timestamp so they have proof
// their idea existed at this exact moment. Browser-native crypto.

export const sealIdea = async (ideaText) => {
  const timestamp = new Date().toISOString()
  const content   = ideaText + timestamp

  const encoded    = new TextEncoder().encode(content)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded)
  const hashArray  = Array.from(new Uint8Array(hashBuffer))
  const hashHex    = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  const seal = {
    hash:        hashHex.substring(0, 16) + '...',
    fullHash:    hashHex,
    timestamp,
    ideaPreview: ideaText.slice(0, 50) + (ideaText.length > 50 ? '...' : ''),
  }

  try { localStorage.setItem('bedaya_idea_seal', JSON.stringify(seal)) } catch {}
  return seal
}

export const getSeal = () => {
  try { return JSON.parse(localStorage.getItem('bedaya_idea_seal') || 'null') }
  catch { return null }
}
