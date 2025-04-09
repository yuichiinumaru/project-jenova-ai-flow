
import { googleDocsService } from './googleDocs';
import { googleSheetsService } from './googleSheets';
import { 
  serpApiSearchService, 
  serpApiNewsService,
  serpApiMapsService,
  serpApiFinanceService,
  serpApiEventsService,
  serpApiLocalService,
  serpApiTrendsService
} from './serpApi';
import { isGoogleApiConfigured, isSerpApiConfigured } from './apiKeys';

/**
 * Agent tool interface
 */
export interface AgentTool {
  name: string;
  description: string;
  execute: (params: any) => Promise<any>;
  isAvailable: () => boolean;
}

/**
 * Google Docs agent tools
 */
export const googleDocsTools: AgentTool[] = [
  {
    name: 'listDocuments',
    description: 'List Google Docs documents',
    execute: async () => {
      return await googleDocsService.listDocuments();
    },
    isAvailable: isGoogleApiConfigured
  }
];

/**
 * Google Sheets agent tools
 */
export const googleSheetsTools: AgentTool[] = [
  {
    name: 'getSheetValues',
    description: 'Get values from a Google Sheet',
    execute: async (params: { spreadsheetId: string, range: string }) => {
      return await googleSheetsService.getValues(params.spreadsheetId, params.range);
    },
    isAvailable: isGoogleApiConfigured
  }
];

/**
 * SerpAPI search tools
 */
export const serpApiSearchTools: AgentTool[] = [
  {
    name: 'googleSearch',
    description: 'Search Google via SerpAPI',
    execute: async (params: { query: string, [key: string]: string }) => {
      const { query, ...rest } = params;
      return await serpApiSearchService.search(query, rest);
    },
    isAvailable: isSerpApiConfigured
  }
];

/**
 * SerpAPI news tools
 */
export const serpApiNewsTools: AgentTool[] = [
  {
    name: 'googleNewsSearch',
    description: 'Search Google News via SerpAPI',
    execute: async (params: { query: string, [key: string]: string }) => {
      const { query, ...rest } = params;
      return await serpApiNewsService.getNews(query, rest);
    },
    isAvailable: isSerpApiConfigured
  }
];

/**
 * SerpAPI maps tools
 */
export const serpApiMapsTools: AgentTool[] = [
  {
    name: 'googleMapsSearch',
    description: 'Search Google Maps via SerpAPI',
    execute: async (params: { query: string, [key: string]: string }) => {
      const { query, ...rest } = params;
      return await serpApiMapsService.searchMaps(query, rest);
    },
    isAvailable: isSerpApiConfigured
  }
];

/**
 * SerpAPI finance tools
 */
export const serpApiFinanceTools: AgentTool[] = [
  {
    name: 'googleFinanceSearch',
    description: 'Get financial data via SerpAPI',
    execute: async (params: { query: string, [key: string]: string }) => {
      const { query, ...rest } = params;
      return await serpApiFinanceService.getFinanceData(query, rest);
    },
    isAvailable: isSerpApiConfigured
  }
];

/**
 * SerpAPI events tools
 */
export const serpApiEventsTools: AgentTool[] = [
  {
    name: 'googleEventsSearch',
    description: 'Search for events via SerpAPI',
    execute: async (params: { query: string, [key: string]: string }) => {
      const { query, ...rest } = params;
      return await serpApiEventsService.searchEvents(query, rest);
    },
    isAvailable: isSerpApiConfigured
  }
];

/**
 * SerpAPI local tools
 */
export const serpApiLocalTools: AgentTool[] = [
  {
    name: 'googleLocalSearch',
    description: 'Search for local businesses via SerpAPI',
    execute: async (params: { query: string, [key: string]: string }) => {
      const { query, ...rest } = params;
      return await serpApiLocalService.searchLocal(query, rest);
    },
    isAvailable: isSerpApiConfigured
  }
];

/**
 * SerpAPI trends tools
 */
export const serpApiTrendsTools: AgentTool[] = [
  {
    name: 'googleTrendsSearch',
    description: 'Get Google Trends data via SerpAPI',
    execute: async (params: { query: string, [key: string]: string }) => {
      const { query, ...rest } = params;
      return await serpApiTrendsService.getTrends(query, rest);
    },
    isAvailable: isSerpApiConfigured
  }
];

/**
 * Get all available agent tools
 */
export const getAllTools = (): AgentTool[] => {
  return [
    ...googleDocsTools,
    ...googleSheetsTools,
    ...serpApiSearchTools,
    ...serpApiNewsTools,
    ...serpApiMapsTools,
    ...serpApiFinanceTools,
    ...serpApiEventsTools,
    ...serpApiLocalTools,
    ...serpApiTrendsTools
  ].filter(tool => tool.isAvailable());
};
