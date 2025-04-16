"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen gradient-bg">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary flex items-center gap-2">
          <Star className="w-8 h-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Wonderpedia
          </span>
        </div>
        <div className="space-x-4">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              className="rounded-full text-lg hover:bg-white/20"
            >
              ログイン
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="rounded-full text-lg bg-primary hover:bg-primary/90">
              新規登録
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            お子様だけの
            <br />
            <span className="text-primary">特別なおはなし</span>を作ろう
          </motion.h1>
          <motion.p
            className="text-xl mb-12 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            AIがお子様の興味や年齢に合わせて、世界でたった一つの絵本を作ります
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/auth/register">
              <Button
                size="lg"
                className="rounded-full text-lg px-8 bg-primary hover:bg-primary/90 shadow-lg"
              >
                さっそく絵本をつくってみる
              </Button>
            </Link>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">特徴</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-xl"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">パーソナライズ絵本</h3>
              <p className="text-lg text-muted-foreground">
                お子様の名前や好きなものが物語に登場します
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-xl"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">かんたん作成</h3>
              <p className="text-lg text-muted-foreground">
                質問に答えるだけで素敵な絵本が完成します
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-xl"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">読み上げ機能</h3>
              <p className="text-lg text-muted-foreground">
                優しい声で絵本を読み聞かせてくれます
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">サンプル絵本</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                title: "どうして空は青いの？",
                description: "空の色の不思議を楽しく学べる絵本です",
                image:
                  "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
              },
              {
                id: "2",
                title: "お月様はどこへ行くの？",
                description: "月の満ち欠けのふしぎなお話",
                image:
                  "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
              },
              {
                id: "3",
                title: "虹はどうして出るの？",
                description: "雨上がりの空に浮かぶ虹の秘密",
                image:
                  "https://images.unsplash.com/photo-1507919909716-c8262e491cde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
              },
            ].map((book) => (
              <motion.div
                key={book.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => {
                  localStorage.setItem("userEmail", "test@test.com");
                  localStorage.setItem(
                    "childInfo",
                    JSON.stringify({
                      name: "テスト",
                      birthDate: "2020-01-01",
                      gender: "not_specified",
                      interests: ["nature"],
                      favoriteColor: "blue",
                      region: "東京都",
                    })
                  );
                  router.push(`/books/${book.id}`);
                }}
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(${book.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                  <p className="text-muted-foreground">{book.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white/50 backdrop-blur-sm mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="space-x-8 mb-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              利用規約
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              プライバシーポリシー
            </a>
          </div>
          <p className="text-muted-foreground">
            &copy; 2024 Wonderpedia All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
