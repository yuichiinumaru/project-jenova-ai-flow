
import { getSerpApiKey } from './apiKeys';

// Base endpoint for SerpAPI
const SERP_API_BASE_URL = 'https://serpapi.com';

/**
 * Base class for SerpAPI services
 */
export class SerpApiService {
  protected apiKey: string;

  constructor() {
    this.apiKey = getSerpApiKey();
  }

  /**
   * Make a GET request to a SerpAPI endpoint
   * @param endpoint The API endpoint
   * @param params Additional query parameters
   */
  protected async get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('SerpAPI key not configured');
    }

    const url = new URL(`${SERP_API_BASE_URL}${endpoint}`);
    
    // Add API key and other parameters
    url.searchParams.append('api_key', this.apiKey);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
}

/**
 * Service for SerpAPI Google Search
 */
export class SerpApiSearchService extends SerpApiService {
  /**
   * Perform a Google search
   * @param query The search query
   * @param params Additional parameters
   */
  async search(query: string, params: Record<string, string> = {}): Promise<any> {
    try {
      return this.get('/search', { q: query, ...params });
    } catch (error) {
      console.error('Error performing Google search:', error);
      throw error;
    }
  }
}

/**
 * Service for SerpAPI Google News
 */
export class SerpApiNewsService extends SerpApiService {
  /**
   * Get Google News results
   * @param query The search query
   * @param params Additional parameters
   */
  async getNews(query: string, params: Record<string, string> = {}): Promise<any> {
    try {
      return this.get('/news', { q: query, ...params });
    } catch (error) {
      console.error('Error fetching Google News:', error);
      throw error;
    }
  }
}

/**
 * Service for SerpAPI Google Maps
 */
export class SerpApiMapsService extends SerpApiService {
  /**
   * Search for locations on Google Maps
   * @param query The search query
   * @param params Additional parameters
   */
  async searchMaps(query: string, params: Record<string, string> = {}): Promise<any> {
    try {
      return this.get('/maps', { q: query, ...params });
    } catch (error) {
      console.error('Error searching Google Maps:', error);
      throw error;
    }
  }
}

/**
 * Service for SerpAPI Google Finance
 */
export class SerpApiFinanceService extends SerpApiService {
  /**
   * Get financial data
   * @param query The search query
   * @param params Additional parameters
   */
  async getFinanceData(query: string, params: Record<string, string> = {}): Promise<any> {
    try {
      return this.get('/finance', { q: query, ...params });
    } catch (error) {
      console.error('Error fetching Google Finance data:', error);
      throw error;
    }
  }
}

/**
 * Service for SerpAPI Google Events
 */
export class SerpApiEventsService extends SerpApiService {
  /**
   * Search for events
   * @param query The search query
   * @param params Additional parameters
   */
  async searchEvents(query: string, params: Record<string, string> = {}): Promise<any> {
    try {
      return this.get('/events', { q: query, ...params });
    } catch (error) {
      console.error('Error searching Google Events:', error);
      throw error;
    }
  }
}

/**
 * Service for SerpAPI Google Local
 */
export class SerpApiLocalService extends SerpApiService {
  /**
   * Search for local businesses
   * @param query The search query
   * @param params Additional parameters
   */
  async searchLocal(query: string, params: Record<string, string> = {}): Promise<any> {
    try {
      return this.get('/local', { q: query, ...params });
    } catch (error) {
      console.error('Error searching Google Local:', error);
      throw error;
    }
  }
}

/**
 * Service for SerpAPI Google Trends
 */
export class SerpApiTrendsService extends SerpApiService {
  /**
   * Get Google Trends data
   * @param query The search query
   * @param params Additional parameters
   */
  async getTrends(query: string, params: Record<string, string> = {}): Promise<any> {
    try {
      return this.get('/trends', { q: query, ...params });
    } catch (error) {
      console.error('Error fetching Google Trends data:', error);
      throw error;
    }
  }
}

// Export singleton instances
export const serpApiSearchService = new SerpApiSearchService();
export const serpApiNewsService = new SerpApiNewsService();
export const serpApiMapsService = new SerpApiMapsService();
export const serpApiFinanceService = new SerpApiFinanceService();
export const serpApiEventsService = new SerpApiEventsService();
export const serpApiLocalService = new SerpApiLocalService();
export const serpApiTrendsService = new SerpApiTrendsService();
