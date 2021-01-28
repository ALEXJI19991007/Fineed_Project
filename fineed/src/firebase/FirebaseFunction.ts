import { Functions } from './Firebase';

export const FirebaseFunction = (name: string) => {
  return Functions().httpsCallable(name);
};

export const getRole = FirebaseFunction('getRole');

export const getStripeBillingPortalUrl = FirebaseFunction(
  'getStripeBillingPortalUrl',
);

export const getStripeCheckoutSession = FirebaseFunction(
  'getStripeCheckoutSession',
);

export const getStripePrice = FirebaseFunction('getStripePrice');

export const isCurUserAdmin = FirebaseFunction('isAdmin');

export const setRole = FirebaseFunction('setRole');

export const setUserAdmin = FirebaseFunction('setAdmin');
