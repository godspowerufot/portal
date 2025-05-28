"use client"

import { useEffect, useState } from "react"
import { CreditCard, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

declare global {
  interface Window {
    PaystackPop?: any
  }
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then(setPayments)
  }, [])

 const handlePay = () => {
  const amount = 3290 * 100 // Convert to Kobo for Paystack
  const email = "user@example.com"
  const description = "School-fee"

  const handler = window.PaystackPop?.setup({
    key: "pk_test_67b30593c8f7f50f4dd367f564310a1f23eb37a1",
    email,
    amount,
    ref: `${Date.now()}`,
    callback: function (response: any) {
      fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txRef: response.reference,
          amount: 3290, // Number, not string
          description,
        }),
      }).then(() => window.location.reload())
    },
    onClose: function () {
      alert("Transaction cancelled")
    },
  })

  handler.openIframe()
}

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-gray-500">Manage your payments and view transaction history</p>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="pay">Make Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View all your past transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>TX Ref</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p: any) => (
                      <TableRow key={p.txRef}>
                        <TableCell>{p.invoiceId}</TableCell>
                        <TableCell>
{new Date(p.paymentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}                          </TableCell>
                        <TableCell>{p.description}</TableCell>
                        <TableCell>{p.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pay">
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Make a   School fee Payment</CardTitle>
                <CardDescription>Click below to pay with Paystack</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handlePay} className="bg-darkGreen text-white">
                  Pay ₦3290 with Paystack
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Paystack Script */}
      <script src="https://js.paystack.co/v1/inline.js" async></script>
    </DashboardLayout>
  )
}
