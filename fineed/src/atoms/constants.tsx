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
