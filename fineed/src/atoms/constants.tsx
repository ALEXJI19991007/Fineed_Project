export type Response = {
  resp: object | null;
  error: ERROR | object;
};

export enum ERROR {
  NO_ERROR = "No error",
  UNAUTHENTICATED = "User not signed in",
  NOT_FOUND = "Requested document not found",
  FIRESTORE_ERROR = "Firestore error",
}

export const COMPANY_LIST: string[] = ["amazon", "apple", "facebook", "google", "microsoft"];

export const COMPANY_NUMBER_MAP: Map<string, number> = new Map([
  ["news_amazon", 0],
  ["news_apple", 1],
  ["news_facebook", 2],
  ["news_google", 3],
  ["news_microsoft", 4],
]);

export const COMPANY_COMPANY_SHOWN_NAME_MAP: Map<string, string> = new Map([
  ["news_amazon", "Amazon"],
  ["news_apple", "Apple"],
  ["news_facebook", "Facebook"],
  ["news_google", "Google"],
  ["news_microsoft", "Microsoft"],
]);