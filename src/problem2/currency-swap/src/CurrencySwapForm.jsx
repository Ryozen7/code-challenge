import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Utility: Build token icon URL
const getTokenIcon = (symbol) => {
  const base = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";
  return {
    svg: `${base}/${symbol}.svg`,
    png: `${base}/${symbol}.png`
  };
};

// Reusable token select component
function TokenSelect({ label, tokens, value, onChange }) {
  return (
    <div className="inputWrap">
      <label className="font-medium">{label}:</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select token" />
        </SelectTrigger>
        <SelectContent className="selectWrap">
          {tokens.map((t) => {
            const { svg, png } = getTokenIcon(t.currency);
            return (
              <SelectItem key={t.currency} value={t.currency}>
                <div className="itemWrap">
                  <img
                    src={svg}
                    alt={t.currency}
                    className="w-6 h-6"
                    onError={(e) => (e.currentTarget.src = png)}
                  />
                  {t.currency}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function CurrencySwapForm() {
  const [tokenList, setTokenList] = useState([]);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch tokens
  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data) => {
        const unique = Array.from(new Map(data.map((t) => [t.currency, t])).values());
        setTokenList(unique);
      })
      .catch(() => setError("Failed to fetch token list."));
  }, []);

  // Memoize map for quicker lookup
  const tokenMap = useMemo(
    () => Object.fromEntries(tokenList.map((t) => [t.currency, t])),
    [tokenList]
  );

  const swap = () => {
    setError("");
    setResult(null);

    const amt = Number(amount);

    if (!amt || amt <= 0) return setError("Please enter a valid amount.");
    if (!fromToken || !toToken) return setError("Please select both currencies.");
    if (fromToken === toToken) return setError("Cannot swap the same currency.");

    const from = tokenMap[fromToken];
    const to = tokenMap[toToken];

    if (!from?.price || !to?.price)
      return setError("Price unavailable for selected token.");

    const usdValue = amt * from.price;
    const converted = usdValue / to.price;

    setResult(converted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="cardWrap">
        <CardContent className="cardContent">
          <h1 className="text-2xl font-bold text-center">Currency Swap</h1>

          {/* Amount Input */}
          <div className="inputWrap">
            <label className="font-medium p-2">Amount:</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Token Selects */}
          <TokenSelect
            label="From"
            tokens={tokenList}
            value={fromToken}
            onChange={setFromToken}
          />

          <TokenSelect
            label="To"
            tokens={tokenList}
            value={toToken}
            onChange={setToToken}
          />

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Swap Button */}
          <Button className="w-full mt-2" onClick={swap}>
            Swap
          </Button>

          {/* Result */}
          {result !== null && toToken && (
            <div className="mt-4 p-3 bg-green-100 rounded-xl text-center">
              <p className="font-semibold">Converted Amount:</p>
              <p className="text-xl">
                {result.toFixed(6)} {toToken}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
