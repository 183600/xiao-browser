const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

export function error(message: string) {
  const msg = `[${projectName} error]:${message}`
  console.error(msg)
  throw new Error(msg)
}
