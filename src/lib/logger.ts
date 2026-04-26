export function log(level: string, message: string, meta?: object) { if (process.env.NODE_ENV !== "production") console.log(JSON.stringify({ level, message, ...meta })); }
