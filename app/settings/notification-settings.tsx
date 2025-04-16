"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false);
    setIsLoading(true);

    try {
      // 通知設定の保存処理をここに実装
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError("設定の保存に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>メール通知</Label>
            <p className="text-sm text-muted-foreground">
              新機能や重要なお知らせをメールでお届けします
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>アプリ内通知</Label>
            <p className="text-sm text-muted-foreground">
              アプリ内でお知らせを表示します
            </p>
          </div>
          <Switch
            checked={appNotifications}
            onCheckedChange={setAppNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>週間レポート</Label>
            <p className="text-sm text-muted-foreground">
              お子様の興味・関心の変化をレポートします
            </p>
          </div>
          <Switch
            checked={weeklyReport}
            onCheckedChange={setWeeklyReport}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {isSuccess && (
        <p className="text-sm text-green-600">
          通知設定を更新しました
        </p>
      )}

      <Button
        type="submit"
        className="w-full rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            保存中...
          </>
        ) : (
          "設定を保存"
        )}
      </Button>
    </form>
  );
}