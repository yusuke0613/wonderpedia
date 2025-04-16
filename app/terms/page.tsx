"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            トップページへ戻る
          </Link>
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <Palette className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Wonderpedia
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-8">利用規約</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. はじめに</h2>
                <p className="text-muted-foreground">
                  この利用規約（以下、「本規約」といいます。）は、なぜなぜ絵本メーカー（以下、「本サービス」といいます。）の利用条件を定めるものです。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. 利用登録</h2>
                <p className="text-muted-foreground">
                  本サービスの利用を希望する方は、本規約に同意の上、所定の方法により利用登録を行うものとします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. 禁止事項</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>他のユーザーに迷惑をかける行為</li>
                  <li>他者の著作権、商標権等の知的財産権を侵害する行為</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  4. サービスの提供の停止等
                </h2>
                <p className="text-muted-foreground">
                  当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  5. 保証の否認および免責事項
                </h2>
                <p className="text-muted-foreground">
                  当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
