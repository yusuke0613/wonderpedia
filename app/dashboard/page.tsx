"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Star,
  BookOpen,
  Plus,
  Settings,
  LogOut,
  Sparkles,
  LineChart,
} from "lucide-react";
import Link from "next/link";

interface ChildInfo {
  name: string;
  birthDate: string;
  gender: string;
  interests: string[];
  favoriteColor: string;
  region: string;
}

const interestLabels: { [key: string]: string } = {
  animals: "動物",
  vehicles: "のりもの",
  nature: "自然",
  sports: "スポーツ",
  art: "創作",
  music: "音楽",
  food: "食べ物",
  heroes: "ヒーロー",
  dinosaurs: "恐竜",
  fairytales: "おとぎ話",
};

export default function DashboardPage() {
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
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
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("childInfo");
    router.push("/");
  };

  if (isLoading || !childInfo) return null;

  const age = childInfo.birthDate
    ? Math.floor(
        (new Date().getTime() - new Date(childInfo.birthDate).getTime()) /
          (1000 * 60 * 60 * 24 * 365.25)
      )
    : null;

  return (
    <div className="min-h-screen gradient-bg">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <Star className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Wonderpedia
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.push("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">
                {childInfo.name}のページ
                {age !== null && (
                  <span className="text-lg text-muted-foreground ml-2">
                    ({age}歳)
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                好きなもの：
                {childInfo.interests
                  .map((interest) => interestLabels[interest])
                  .join("、")}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => router.push("/create-book")}
            >
              <Card className="bg-primary/10 backdrop-blur-sm rounded-3xl border-none shadow-xl h-full transition-colors group-hover:bg-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-6 h-6" />
                    新しい絵本を作る
                  </CardTitle>
                  <CardDescription>
                    お子様の「なぜ？」から素敵な絵本を作りましょう
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Sparkles className="w-20 h-20 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => router.push("/my-books")}
            >
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    作った絵本を見る
                  </CardTitle>
                  <CardDescription>
                    これまでに作成した絵本の一覧
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">
                    まだ絵本がありません
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => router.push("/analytics")}
          >
            <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-6 h-6" />
                  分析レポート
                </CardTitle>
                <CardDescription>
                  お子様の興味・関心の分析と成長記録
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div className="bg-accent/20 rounded-xl p-4">
                  <div className="font-medium mb-1">今月の傾向</div>
                  <div className="text-sm text-muted-foreground">
                    自然現象への興味が高まっています
                  </div>
                </div>
                <div className="bg-secondary/20 rounded-xl p-4">
                  <div className="font-medium mb-1">おすすめスポット</div>
                  <div className="text-sm text-muted-foreground">
                    科学館や動物園がおすすめです
                  </div>
                </div>
                <div className="bg-primary/20 rounded-xl p-4">
                  <div className="font-medium mb-1">成長の記録</div>
                  <div className="text-sm text-muted-foreground">
                    質問が具体的になってきました
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "今日のおすすめ",
                description: "「なぜ空は青いの？」について考えてみよう！",
                image:
                  "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
              },
              {
                title: "人気のテーマ",
                description: "みんなが気になっている「なぜ？」を見てみよう",
                image:
                  "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
              },
              {
                title: "新機能",
                description: "音声読み上げ機能が追加されました！",
                image:
                  "https://images.unsplash.com/photo-1507919909716-c8262e491cde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl overflow-hidden">
                  <div
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <CardHeader>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
