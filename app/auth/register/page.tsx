"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Palette, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    if (!agreed) {
      setError("利用規約への同意が必要です");
      return;
    }

    setLoading(true);

    try {
      if (email === "test@test.com" && password === "test") {
        localStorage.setItem("userEmail", email);
        router.push("/auth/child-info");
      } else {
        throw new Error("このメールアドレスは使用できません");
      }
    } catch (err: any) {
      setError(err.message || "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5 mr-2" />
          トップページへ戻る
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-2">
                <Palette className="w-8 h-8" />
                なぜなぜ絵本メーカー
              </div>
              <h1 className="text-2xl font-bold">新規ユーザー登録</h1>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">パスワード（確認用）</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-none"
                >
                  <span>
                    <Link href="/terms" className="text-primary hover:underline">
                      利用規約
                    </Link>
                    に同意します
                  </span>
                </Label>
              </div>

              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={loading}
              >
                {loading ? "登録中..." : "登録して次へ"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                すでにアカウントをお持ちの方は
                <Link href="/auth/login" className="text-primary hover:underline ml-1">
                  ログイン
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}