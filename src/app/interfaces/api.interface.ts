export interface IApi {
  id: string;
  name: string;
  markets: Array<IApiMarkets>;
}

export interface IApiMarkets {
  id: string;
  name: string;
  selections?: Array<IApiSelections>
}

export interface IApiSelections {
  id: string;
  name: string;
  price: number;
  color?: string;
}

export interface IBetslip {
  event: IApi;
  market: IApiMarkets;
  selection: IApiSelections;
}

export interface IBetslipList {
  id: string;
  team: string;
  marketName: string;
  price: number;
}
