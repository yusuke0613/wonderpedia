"use client";

import { useEffect, useState } from "react";
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
  Palette,
  ArrowLeft,
  BookOpen,
  Star,
  Share2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  coverImage: string;
  createdAt: string;
  description: string;
  isFavorite: boolean;
}

export default function MyBooksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // サンプルデータ
  const [books] = useState<Book[]>([
    {
      id: "1",
      title: "どうして空は青いの？",
      coverImage:
        "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      createdAt: "2024-03-15",
      description: "空の色の不思議を楽しく学べる絵本です",
      isFavorite: true,
    },
    {
      id: "2",
      title: "お月様はどこへ行くの？",
      coverImage:
        "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      createdAt: "2024-03-14",
      description: "月の満ち欠けのふしぎなお話",
      isFavorite: false,
    },
    {
      id: "3",
      title: "虹はどうして出るの？",
      coverImage:
        "https://images.unsplash.com/photo-1507919909716-c8262e491cde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      createdAt: "2024-03-13",
      description: "雨上がりの空に浮かぶ虹の秘密",
      isFavorite: false,
    },
  ]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const email = localStorage.getItem("userEmail");
        const childInfo = localStorage.getItem("childInfo");

        if (!email || email !== "test@test.com") {
          router.push("/auth/login");
          return;
        }

        if (!childInfo) {
          router.push("/auth/child-info");
          return;
        }

        setIsLoading(false);
      } catch (err) {
        setError("ページの読み込みに失敗しました");
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
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

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h2 className="text-xl font-bold mb-2">エラーが発生しました</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => window.location.reload()}
            >
              再読み込み
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ダッシュボードへ戻る
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
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">作った絵本</h1>
            <p className="text-muted-foreground">
              これまでに作成した絵本の一覧です
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => router.push(`/books/${book.id}`)}
              >
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl overflow-hidden h-full">
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${book.coverImage})` }}
                  >
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 ${
                          book.isFavorite
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // お気に入り切り替え処理
                        }}
                      >
                        <Star
                          className="w-4 h-4"
                          fill={book.isFavorite ? "currentColor" : "none"}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          // シェア処理
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BookOpen className="w-5 h-5" />
                      {book.title}
                    </CardTitle>
                    <CardDescription>
                      作成日:{" "}
                      {new Date(book.createdAt).toLocaleDateString("ja-JP")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{book.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
