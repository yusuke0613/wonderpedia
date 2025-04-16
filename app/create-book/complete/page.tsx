"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, BookOpen, Share2, Star } from "lucide-react";
import Link from "next/link";

interface ChildInfo {
  name: string;
}

export default function CreateBookCompletePage() {
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const email = localStorage.getItem("userEmail");
        const storedInfo = localStorage.getItem("childInfo");

        if (!email || email !== "test@test.com") {
          router.push("/auth/login");
          return;
        }

        if (!storedInfo) {
          router.push("/auth/child-info");
          return;
        }

        setChildInfo(JSON.parse(storedInfo));
      } catch (err) {
        setError("ページの読み込みに失敗しました");
      }
    };

    checkAuth();
  }, [router]);

  if (!childInfo) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-primary/20 rounded mb-4"></div>
            <div className="text-muted-foreground">読み込み中...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <header className="container mx-auto px-4 py-6">
        <div className="text-2xl font-bold text-primary flex items-center gap-2 justify-center">
          <Palette className="w-8 h-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Wonderpedia
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
            >
              <BookOpen className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-bold">
              {childInfo.name}くんの絵本ができました！
            </h1>
            <p className="text-lg text-muted-foreground">
              素敵な絵本が完成しました。一緒に読んでみましょう！
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl overflow-hidden">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)`,
              }}
            >
              <div className="h-full bg-black/40 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white">
                  どうして空は青いの？
                </h2>
              </div>
            </div>
          </Card>

          <div className="flex flex-col items-center gap-4">
            <Link href="/books/1" className="w-full">
              <Button className="w-full rounded-xl" size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                絵本を読む
              </Button>
            </Link>

            <div className="flex gap-4">
              <Button variant="outline" className="rounded-xl" size="lg">
                <Star className="w-5 h-5 mr-2" />
                お気に入りに追加
              </Button>
              <Button variant="outline" className="rounded-xl" size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                シェアする
              </Button>
            </div>

            <Link href="/create-book">
              <Button variant="ghost" className="rounded-xl">
                別の絵本を作る
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
