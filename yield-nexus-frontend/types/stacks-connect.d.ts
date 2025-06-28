import '@stacks/connect';

declare module '@stacks/connect' {
  interface AddressEntry {
    address: string;
    publicKey?: string;
  }

  interface WalletResponse {
    addresses: {
      stx: AddressEntry[];
      btc: AddressEntry[];
    };
  }

  interface GetAccountsResult {
    addresses: Array<{
      address: string;
      publicKey: string;
      balance?: string;
      gaiaHubUrl?: string;
      gaiaAppKey?: string;
    }>;
  }
}