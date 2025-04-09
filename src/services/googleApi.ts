
import { getGoogleApiKey } from './apiKeys';

// Base endpoint for Google APIs
const GOOGLE_API_BASE_URL = 'https://www.googleapis.com';

/**
 * Base class for Google API services
 */
export class GoogleApiService {
  protected apiKey: string;

  constructor() {
    this.apiKey = getGoogleApiKey();
  }

  /**
   * Make a GET request to a Google API endpoint
   * @param endpoint The API endpoint
   * @param params Additional query parameters
   */
  protected async get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Google API key not configured');
    }

    const url = new URL(`${GOOGLE_API_BASE_URL}${endpoint}`);
    
    // Add API key and other parameters
    url.searchParams.append('key', this.apiKey);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Make a POST request to a Google API endpoint
   * @param endpoint The API endpoint
   * @param data The data to send
   * @param params Additional query parameters
   */
  protected async post<T>(endpoint: string, data: any, params: Record<string, string> = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Google API key not configured');
    }

    const url = new URL(`${GOOGLE_API_BASE_URL}${endpoint}`);
    
    // Add API key and other parameters
    url.searchParams.append('key', this.apiKey);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
}
