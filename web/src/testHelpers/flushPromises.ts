export async function flushPromises() {
    await setImmediate(() => Promise.resolve())
}