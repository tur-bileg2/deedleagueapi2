type ApiConfig = {
  baseUrl: string;
  headers?: Record<string, string>;
  auth?: {
    type: 'bearer' | 'api-key';
    key: string;
    headerName?: string;
  };
  rateLimit?: number; // requests per minute
};

const API_CONFIGS: Record<string, ApiConfig> = {
  'basketball-api': {
    baseUrl: 'https://api.example-basketball-api.com/v1',
    auth: {
      type: 'api-key',
      key: process.env.BASKETBALL_API_KEY || '',
      headerName: 'X-API-Key',
    },
    rateLimit: 60,
  },
  'stats-api': {
    baseUrl: 'https://stats-api.example.com/api',
    auth: {
      type: 'bearer',
      key: process.env.STATS_API_KEY || '',
    },
    rateLimit: 100,
  },
};

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function fetchExternalApi(
  apiName: string,
  endpoint: string,
  options?: {
    method?: string;
    params?: Record<string, string>;
    body?: any;
    skipCache?: boolean;
  }
) {
  const config = API_CONFIGS[apiName];
  if (!config) {
    throw new Error(`API configuration not found for "${apiName}"`);
  }

  const method = options?.method || 'GET';
  const url = new URL(`${config.baseUrl}${endpoint}`);
  
  // Add query parameters
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  // Check cache for GET requests
  const cacheKey = `${apiName}:${method}:${url.toString()}`;
  if (method === 'GET' && !options?.skipCache) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Cache hit for external API: ${cacheKey}`);
      return { data: cached.data, source: 'cache' };
    }
  }
  
  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(config.headers || {}),
  };
  
  // Add authentication
  if (config.auth) {
    if (config.auth.type === 'bearer') {
      headers['Authorization'] = `Bearer ${config.auth.key}`;
    } else if (config.auth.type === 'api-key') {
      headers[config.auth.headerName || 'X-API-Key'] = config.auth.key;
    }
  }
  
  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
    }
    
    const data = await response.json();
    
    // Cache successful GET responses
    if (method === 'GET') {
      cache.set(cacheKey, { data, timestamp: Date.now() });
    }
    
    return { data, source: 'api' };
  } catch (error) {
    console.error(`Error fetching from ${apiName}:`, error);
    throw error;
  }
}
