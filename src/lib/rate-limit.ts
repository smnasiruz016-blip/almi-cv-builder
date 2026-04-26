export async function checkRateLimit(key: string, limit = 10) { return { success: true, remaining: limit }; }
