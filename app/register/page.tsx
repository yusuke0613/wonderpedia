"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Check, Crown, Heart, Magnet as Magic, Shield, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 実際のユーザー登録処理を実装
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 py-24">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <Magic className="h-12 w-12 text-primary floating" />
            <Star className="h-8 w-8 text-accent absolute -top-2 -right-2 floating" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            新規登録
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ストーリーマジックで、お子様だけの特別な物語を作りましょう
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* 登録フォーム */}
          <Card className="p-8 bubble">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8文字以上の英数字"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="パスワードを再入力"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Magic className="mr-2 h-5 w-5" />
                アカウントを作成
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  すでにアカウントをお持ちの方は
                  <Link href="/login" className="text-primary hover:underline ml-1">
                    ログイン
                  </Link>
                </p>
              </div>
            </form>
          </Card>

          {/* 特徴紹介 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">
              ストーリーマジックの特徴
            </h2>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bubble">
                  <div className="flex gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50"></div>
                      <feature.icon className="h-8 w-8 relative text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bubble bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex gap-4 items-center">
                <Crown className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">今なら1ヶ月無料！</h3>
                  <p className="text-muted-foreground">
                    新規登録の方は1ヶ月間、全ての機能を無料でお試しいただけます
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Magic,
    title: "AIが作る世界に一つの物語",
    description: "お子様の興味や年齢に合わせて、オリジナルのストーリーを生成します"
  },
  {
    icon: Heart,
    title: "お子様の興味を育む",
    description: "好奇心を刺激し、楽しみながら学べる体験を提供します"
  },
  {
    icon: BookOpen,
    title: "豊富なテーマとイラスト",
    description: "科学、歴史、自然など、様々なテーマから選べます"
  },
  {
    icon: Shield,
    title: "安心・安全な環境",
    description: "お子様に適切なコンテンツのみを提供します"
  }
];