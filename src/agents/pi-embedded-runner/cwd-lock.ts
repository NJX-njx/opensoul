let cwdLockTail: Promise<void> = Promise.resolve();

export async function acquireProcessCwdLock(): Promise<() => void> {
  let releaseCurrent!: () => void;
  const current = new Promise<void>((resolve) => {
    releaseCurrent = resolve;
  });

  const previous = cwdLockTail;
  cwdLockTail = previous.then(() => current);
  await previous;

  return () => {
    releaseCurrent();
  };
}
