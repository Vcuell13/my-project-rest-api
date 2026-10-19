export function getTraceId(c) {
  return c.get('traceId') || crypto.randomUUID()
}

export function sendResource(c, data, status = 200) {
  return c.json({ data }, status)
}

export function sendCollection(c, data, status = 200) {
  return c.json({ data, meta: { count: data.length } }, status)
}

export function buildErrorPayload(c, code, message, details = []) {
  return {
    error: {
      code,
      message,
      details,
      trace_id: getTraceId(c),
    },
  }
}

