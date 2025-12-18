// Temporarily disabled - AI package conflicts with React 19
// TODO: Fix AI SDK integration when packages are compatible

export async function POST() {
  return new Response('AI Assistant temporarily unavailable', { status: 503 });
}
