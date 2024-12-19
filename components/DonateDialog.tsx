"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonateDialogProps {
  postId: string;
  authorId: string;
  authorName: string;
}

export function DonateDialog({ postId, authorId, authorName }: DonateDialogProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(amount.replace(/\D/g, "")),
          postId,
          authorId,
        }),
      });

      const { clientSecret } = await response.json();

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      
      if (!stripe) throw new Error("Stripe failed to initialize.");

      const result = await stripe.redirectToCheckout({
        sessionId: clientSecret,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setAmount("");
      return;
    }
    const numberValue = parseInt(value);
    setAmount(numberValue.toLocaleString("vi-VN"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Ủng hộ tác giả</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ủng hộ {authorName}</DialogTitle>
          <DialogDescription>
            Gửi lời cảm ơn tới tác giả. Nhập số tiền mà bạn muốn ủng hộ.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Số tiền
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="pr-12"
                placeholder="100,000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                VNĐ
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleDonate} 
            disabled={!amount || isLoading}
            className="w-full"
          >
            {isLoading ? "Đang xử lý..." : "Ủng hộ ngay"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 