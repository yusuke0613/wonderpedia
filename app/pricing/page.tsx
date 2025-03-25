"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Magnet as Magic, Star } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 py-24">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-4">
            <Crown className="h-12 w-12 text-primary floating" />
            <Star className="h-8 w-8 text-accent absolute -top-2 -right-2 floating" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            料金プラン
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            お子様の学びと成長に合わせて、最適なプランをお選びください
          </p>
        </div>

        {/* 料金プラン */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 無料プラン */}
          <Card className="p-8 bubble">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">無料プラン</h3>
              <div className="text-3xl font-bold mb-4">¥0</div>
              <p className="text-muted-foreground">お試しに最適</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>月3冊まで絵本作成可能</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>基本的なテーマ</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>標準画質イラスト</span>
              </li>
            </ul>
            <Button className="w-full rounded-full" variant="outline">
              無料ではじめる
            </Button>
          </Card>

          {/* スタンダードプラン */}
          <Card className="p-8 bubble relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                人気
              </span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">スタンダード</h3>
              <div className="text-3xl font-bold mb-4">¥980<span className="text-lg text-muted-foreground">/月</span></div>
              <p className="text-muted-foreground">日常的な利用に</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>無制限の絵本作成</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>全テーマ利用可能</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>高画質イラスト</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>音声読み上げ機能</span>
              </li>
            </ul>
            <Button className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              スタンダードを選ぶ
            </Button>
          </Card>

          {/* プレミアムプラン */}
          <Card className="p-8 bubble">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">プレミアム</h3>
              <div className="text-3xl font-bold mb-4">¥1,980<span className="text-lg text-muted-foreground">/月</span></div>
              <p className="text-muted-foreground">プロフェッショナル向け</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>スタンダードの全機能</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>AI教育アドバイザー</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>学習進捗分析</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>優先サポート</span>
              </li>
            </ul>
            <Button className="w-full rounded-full" variant="outline">
              プレミアムを選ぶ
            </Button>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">支払い方法は何がありますか？</h3>
              <p className="text-muted-foreground">クレジットカード（Visa, Mastercard, American Express）、PayPal、銀行振込に対応しています。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">プランはいつでも変更できますか？</h3>
              <p className="text-muted-foreground">はい、いつでもプランの変更が可能です。アップグレードは即時反映され、ダウングレードは次の請求サイクルから適用されます。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">解約はいつでもできますか？</h3>
              <p className="text-muted-foreground">はい、いつでも解約可能です。解約後も現在の請求期間の終わりまではサービスをご利用いただけます。</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <Button size="lg" className="rounded-full text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-16 px-12">
            <Magic className="mr-2 h-6 w-6" />
            無料ではじめる
          </Button>
        </div>
      </div>
    </div>
  );
}