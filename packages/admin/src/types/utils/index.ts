export interface IMockSetup {
  (): void
}

export interface IMockRequestOptions {
  method: string
  url: string
  body: any
  query: any
}

export interface IMockDefinition {
  [url: string]: (options: IMockRequestOptions) => any
}
