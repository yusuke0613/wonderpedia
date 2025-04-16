"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";

export default function ProfileSettings() {
  const [email, setEmail] = useState("test@test.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("新しいパスワードが一致しません");
      return;
    }

    setIsLoading(true);

    try {
      // パスワード変更のAPI呼び出しをここに実装
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError("パスワードの変更に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
          className="rounded-xl bg-muted"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentPassword">現在のパスワード</Label>
        <Input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">新しいパスワード</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">新しいパスワード（確認用）</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-xl"
          required
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {isSuccess && (
        <p className="text-sm text-green-600">
          パスワードを変更しました
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
            変更中...
          </>
        ) : (
          "パスワードを変更"
        )}
      </Button>
    </form>
  );
}