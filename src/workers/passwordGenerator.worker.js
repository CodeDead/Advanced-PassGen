import { PasswordGenerator } from '../utils/PasswordGenerator/index';

self.addEventListener('message', (event) => {
  const { id, args } = event.data;

  try {
    const result = PasswordGenerator(...args);
    self.postMessage({ id, result });
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
