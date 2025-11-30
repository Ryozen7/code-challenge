import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CurrencySwapForm() {
  const [tokenList, setTokenList] = useState([]);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueData = Array.from(
          new Map(data.map(item => [item.currency, item])).values()
        );
        setTokenList(uniqueData);
      });
  }, []);

  const swap = () => {
    setError("");
    setResult(null);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!fromToken || !toToken) {
      setError("Please select both currencies.");
      return;
    }
    if (fromToken.currency === toToken.currency) {
      setError("Cannot swap the same currency.");
      return;
    }

    const fromPrice = fromToken?.price;
    const toPrice = toToken?.price;

    if (!fromPrice || !toPrice) {
      setError("Price unavailable for selected token.");
      return;
    }

    const usdValue = amount * fromPrice;
    const converted = usdValue / toPrice;

    setResult(converted);
  };

  console.log("t", fromToken, toToken)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="max-w-md w-full shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Currency Swap</h1>

          <div className="space-y-2">
            <label className="font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">From</label>
            <Select onValueChange={setFromToken}>
              <SelectTrigger><SelectValue placeholder="Select token" /></SelectTrigger>
              <SelectContent>
                {tokenList.map((t) => {
                  const baseImageUrl = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens'
                  const tokenUrl = `${baseImageUrl}/${t.currency}.svg`;
                  const fallbackUrl = `${baseImageUrl}/${t.currency}.png`;

                  return (
                  <SelectItem key={t.currency} value={t}>
                    <><img src={tokenUrl} alt="Token Icon" className="w-8 h-8" onError={(e) => { e.currentTarget.src = fallbackUrl; }}/></>
                    {t.currency}</SelectItem>
                )})}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-medium">To</label>
            <Select onValueChange={setToToken}>
              <SelectTrigger><SelectValue placeholder="Select token" /></SelectTrigger>
              <SelectContent>
                {tokenList.map((t) => {
                  const baseImageUrl = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens'
                  const tokenUrl = `${baseImageUrl}/${t.currency}.svg`;
                  const fallbackUrl = `${baseImageUrl}/${t.currency}.png`;

                  return (
                  <SelectItem key={t.currency} value={t}>
                    <><img src={tokenUrl} alt="Token Icon" className="w-8 h-8" onError={(e) => { e.currentTarget.src = fallbackUrl; }}/></>
                    {t.currency}</SelectItem>
                )})}
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button className="w-full mt-2" onClick={swap}>Swap</Button>

          {result !== null && (
            <div className="mt-4 p-3 bg-green-100 rounded-xl text-center">
              <p className="font-semibold">Converted Amount:</p>
              <p className="text-xl">{result.toFixed(6)} {toToken.currency}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
