
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@thirdweb-dev/react";

export default function LancaDappDemo() {
  const { connect, address, disconnect } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100 p-4 grid gap-4">
      <Card className="max-w-md mx-auto shadow-2xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Lanca Bridge Demo (Testnet)</h1>

          {!address ? (
            <Button onClick={() => connect()}>Connect Wallet</Button>
          ) : (
            <div>
              <p className="mb-2">Connected: {address}</p>
              <Button variant="destructive" onClick={disconnect}>Disconnect</Button>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Pool Overview</h2>
              <p className="text-sm">(Parent & Child Pool placeholder)</p>
              <div className="bg-white p-3 rounded shadow mt-2">
                <p>USDC Parent Pool: 12,300</p>
                <p>USDC Child Pool (Chain B): 7,800</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Simulated Swap</h2>
              <div className="bg-white p-3 rounded shadow mt-2">
                <p>You send: <input className="border rounded p-1 ml-2" type="number" placeholder="Amount" /></p>
                <p className="mt-2">You receive: <span className="text-green-600">(Estimate)</span></p>
                <Button className="mt-2">Swap</Button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Liquidity Health Score</h2>
              <div className="bg-white p-3 rounded shadow mt-2">
                <p>Status: <span className="text-yellow-600">Moderate</span></p>
                <p>Rebalancer Incentive: 0.25%</p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
