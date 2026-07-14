export interface AIProvider {
  initialize(): Promise<void>;
  loadModel(modelId: string): Promise<void>;
  generate(prompt: string, onToken?: (token: string) => void): Promise<string>;
  embed(text: string): Promise<number[]>;
  dispose(): Promise<void>;
}

export interface ModelMetadata {
  id: string;
  name: string;
  ramRequired: string;
  downloaded: boolean;
}
