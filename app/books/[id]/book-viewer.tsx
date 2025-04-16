"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, ArrowLeft, Star, Share2, Volume2, VolumeX, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  coverImage: string;
  createdAt: string;
  description: string;
  isFavorite: boolean;
  pages: {
    id: string;
    content: string;
    image: string;
  }[];
}

export default function BookViewer({ book }: { book: Book }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
              onClick={() => router.push("/my-books")}
            >
              絵本一覧へ戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const nextPage = () => {
    if (currentPage < book.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link 
            href="/my-books" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            絵本一覧へ戻る
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 ${
                book.isFavorite ? "text-yellow-500" : "text-muted-foreground"
              }`}
              onClick={() => {
                // お気に入り切り替え処理
              }}
            >
              <Star className="w-4 h-4" fill={book.isFavorite ? "currentColor" : "none"} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={() => {
                // シェア処理
              }}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={toggleAudio}
            >
              {isPlaying ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
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
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl overflow-hidden">
            <div className="aspect-[16/9] relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${book.pages[currentPage].image})` }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-white text-2xl md:text-4xl font-bold text-center px-8">
                  {book.pages[currentPage].content}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center items-center gap-4">
            <Button
              variant="ghost"
              className="rounded-full px-8"
              disabled={currentPage === 0}
              onClick={prevPage}
            >
              前のページ
            </Button>
            <span className="text-muted-foreground">
              {currentPage + 1} / {book.pages.length}
            </span>
            <Button
              variant="ghost"
              className="rounded-full px-8"
              disabled={currentPage === book.pages.length - 1}
              onClick={nextPage}
            >
              次のページ
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}