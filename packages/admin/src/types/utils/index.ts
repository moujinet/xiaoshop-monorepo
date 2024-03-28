export interface IMockSetup {
  (): void
}

export interface IMockRequestOptions {
  url: string
  body: any
  query: any
}

export interface IMockDefinition {
  [url: string]: (options: IMockRequestOptions) => any
}
