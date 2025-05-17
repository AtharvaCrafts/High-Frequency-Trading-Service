export type StrategyConfig = {
  symbol: string;
  gapPercent: number;   // X
  targetPercent: number; // Y
  stopLossPercent: number; // Z
};

export type historicalData = {
  instrument_token: number | string,
  interval:
    | 'minute'
    | 'day'
    | '3minute'
    | '5minute'
    | '10minute'
    | '15minute'
    | '30minute'
    | '60minute',
  from_date: string | Date,
  to_date: string | Date,
  continuous?: boolean,
  oi?: boolean
}