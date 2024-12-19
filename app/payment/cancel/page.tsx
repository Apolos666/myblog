import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="max-w-[420px] w-full mx-4">
        <CardHeader className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl">Đã hủy thanh toán</CardTitle>
            <p className="text-muted-foreground">
              Thanh toán đã bị hủy. Tài khoản của bạn chưa bị trừ tiền.
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/">
            <Button size="lg">
              Trở về trang chủ
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
} 