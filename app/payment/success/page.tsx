import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="max-w-[420px] w-full mx-4">
        <CardHeader className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl">Thanh toán thành công!</CardTitle>
            <p className="text-muted-foreground">
              Cảm ơn bạn đã ủng hộ tác giả. Sự đóng góp của bạn sẽ giúp tác giả tạo ra nhiều nội dung chất lượng hơn.
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