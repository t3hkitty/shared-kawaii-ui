export interface N8nConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

export class N8nIntegrationEngine {
  private config: N8nConfig;

  constructor(config: N8nConfig = { baseUrl: 'http://localhost:5678/webhook' }) {
    this.config = config;
  }

  /**
   * Fires a webhook to n8n and optionally waits for a JSON response.
   * Useful for two-way workflows (e.g., asking n8n to fetch Spotify data and return it).
   */
  async triggerWorkflow<T>(webhookId: string, payload: any, isSync: boolean = false): Promise<T | null> {
    // If it's a synchronous webhook (waiting for response), n8n URLs usually end with /webhook-test or /webhook
    // and we append the ID.
    const url = `${this.config.baseUrl}/${webhookId}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.config.defaultHeaders,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`[n8n Engine] Webhook ${webhookId} failed: ${response.statusText}`);
        return null;
      }

      if (isSync) {
        return (await response.json()) as T;
      }
      return null;
    } catch (error) {
      console.error(`[n8n Engine] Network error firing webhook ${webhookId}:`, error);
      return null;
    }
  }

  /**
   * Quick-fire method for fire-and-forget logging (e.g., saving a markdown Zettel to Dropbox).
   */
  fireAndForget(webhookId: string, payload: any): void {
    this.triggerWorkflow(webhookId, payload, false);
  }
}

// Export a singleton for easy drop-in use across React apps
export const n8nEngine = new N8nIntegrationEngine();
