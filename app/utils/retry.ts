/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param retriesLeft Number of retries left
 * @param delay Initial delay in ms
 * @param context Optional context to pass to error handler
 */
export async function retry<T>(
  fn: () => Promise<T>, 
  retriesLeft = 3, 
  delay = 1000, 
  context = ''
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retriesLeft <= 0) {
      console.error(`All retries failed for ${context}:`, error);
      throw error;
    }
    
    console.warn(`Retry attempt for ${context}, ${retriesLeft} retries left. Error:`, error);
    
    // Wait with exponential backoff
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry with one less retry and doubled delay
    return retry(fn, retriesLeft - 1, delay * 2, context);
  }
}
