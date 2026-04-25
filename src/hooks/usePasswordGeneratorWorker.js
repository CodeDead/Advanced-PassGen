import { useEffect, useMemo, useRef } from 'react';
import { PasswordGenerator } from '../utils/PasswordGenerator/index';

const usePasswordGeneratorWorker = () => {
  const workerRef = useRef(null);
  const pendingRequestsRef = useRef(new Map());
  const nextRequestIdRef = useRef(0);

  useEffect(() => {
    if (typeof Worker === 'undefined') {
      return undefined;
    }

    const pendingRequests = pendingRequestsRef.current;
    const worker = new Worker(
      new URL('../workers/passwordGenerator.worker.js', import.meta.url),
      { type: 'module' },
    );

    workerRef.current = worker;

    worker.addEventListener('message', (event) => {
      const { id, result, error } = event.data;
      const request = pendingRequests.get(id);

      if (!request) {
        return;
      }

      pendingRequests.delete(id);

      if (error) {
        request.reject(new Error(error));
        return;
      }

      request.resolve(result);
    });

    worker.addEventListener('error', (event) => {
      const workerError = event.error ?? new Error(event.message);

      pendingRequests.forEach(({ reject }) => {
        reject(workerError);
      });
      pendingRequests.clear();
    });

    return () => {
      worker.terminate();
      workerRef.current = null;

      const terminationError = new Error(
        'Password generator worker was terminated',
      );

      pendingRequests.forEach(({ reject }) => {
        reject(terminationError);
      });
      pendingRequests.clear();
    };
  }, []);

  return useMemo(
    () => ({
      PasswordGenerator: (...args) => {
        const worker = workerRef.current;

        if (!worker) {
          return Promise.resolve(PasswordGenerator(...args));
        }

        const requestId = nextRequestIdRef.current;
        nextRequestIdRef.current += 1;

        return new Promise((resolve, reject) => {
          pendingRequestsRef.current.set(requestId, { resolve, reject });
          worker.postMessage({ id: requestId, args });
        });
      },
    }),
    [],
  );
};

export default usePasswordGeneratorWorker;
