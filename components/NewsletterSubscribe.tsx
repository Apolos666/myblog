"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export function NewsletterSubscribe() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscribe to Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Input type="email" placeholder="your@email.com" />
          <Button onClick={() => setIsSubscribed(!isSubscribed)}>
            <Mail className="mr-2 h-4 w-4" />
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
