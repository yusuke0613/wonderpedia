import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">ページが見つかりません</h1>
          <p className="text-muted-foreground mb-6">
            お探しの絵本は見つかりませんでした。削除されたか、URLが間違っている可能性があります。
          </p>
          <Link href="/my-books">
            <Button className="rounded-full">
              絵本一覧へ戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}