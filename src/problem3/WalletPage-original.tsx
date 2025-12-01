// 8. Missing type properties
// Filtering and sorting access: balance.blockchain
// But WalletBalance interface does not define blockchain.
// This will fail TypeScript.
// The interfaces are incorrect.
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}


const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // 1. getPriority(blockchain: any) uses any and is recomputed repeatedly
  // Using any disables TypeScript’s safety.
  // The function is recreated on every render.
  // Called multiple times unnecessarily during sorting.
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

// 2. Incorrect filter logic and unnecessary work inside useMemo.
// Filter logic is reversed and confusing:
  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      // 10. Repeated getPriority calls
      // Each item is passed through getPriority multiple times (filter + sort).
		  const balancePriority = getPriority(balance.blockchain);
      // Variable lhsPriority is referenced but never defined → runtime error.
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
      // 3. Sorting logic is missing a return value for equal priorities.
    });
    // 4. Incorrect hook dependency list
    // useMemo depends on: [balances, prices], 
    // But prices is never used inside the memoized callback
    //  causes unnecessary recomputation.
  }, [balances, prices]);

  // 5. formattedBalances is defined but never used.
  // 6. Double mapping of balances (N + N iterations) formattedBalances map and rows map
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
// 9. No null/undefined checks for prices
// This line may throw error: prices[balance.currency] * balance.amount
// if price is missing.
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow 
        className={classes.row}
        // 7. JSX key is index-based
        // Using array index as key causes:
        // Unstable list rendering
        // Wasted re-renders
        // Should use a stable unique property like currency or blockchain.
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}