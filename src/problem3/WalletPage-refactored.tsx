interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const PRIORITY_MAP: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20
};

const getPriority = (chain: string): number => PRIORITY_MAP[chain] ?? -99;

// Assume React and Props is imported from react types, 
// useWalletBalances and usePrices imported from hooks
const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances() || [];
  const prices = usePrices() || [];

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((b: WalletBalance) => getPriority(b.blockchain) >= 0 && b.amount > 0)
      .sort((a: WalletBalance, b: WalletBalance) => getPriority(b.blockchain) - getPriority(a.blockchain))
      .map((b: WalletBalance) => ({
        ...b,
        formatted: b.amount.toFixed()
      }));
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances && sortedBalances.map((balance) => {
        const usdValue = prices?.[balance.currency] 
          ? prices[balance.currency] * balance.amount 
          : 0;

        return (
          // Assume that there is component WalletRow and classes imported
          <WalletRow
            className={classes.row}
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};

export default WalletPage;