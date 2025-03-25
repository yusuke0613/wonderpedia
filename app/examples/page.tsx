"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, ChevronLeft, ChevronRight, Download, Magnet as Magic, Share2, Sparkles, Star, Volume2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const DEMO_STORIES = [
  {
    title: "どうして空は青いの？",
    description: "光の不思議な旅を通じて、空が青く見える理由を学ぼう",
    pages: [
      {
        text: "むかしむかし、とても不思議な青い空がありました。その空には、たくさんの小さな光の粒が浮かんでいたのです。",
        image: "https://images.unsplash.com/photo-1597571063304-81f081944ee8?w=800&h=600&fit=crop"
      },
      {
        text: "その光の粒は、実は空気の分子たちでした。分子たちは太陽の光と仲良く遊ぶのが大好きでした。",
        image: "https://images.unsplash.com/photo-1513628253939-010e64ac66cd?w=800&h=600&fit=crop"
      },
      {
        text: "太陽の光が空気の分子たちと出会うと、青い光だけが特別な踊りを踊りながら、私たちの目に届くのです。",
        image: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?w=800&h=600&fit=crop"
      }
    ]
  },
  {
    title: "恐竜はなぜ絶滅したの？",
    description: "大昔の地球で起きた大きな出来事を探検しよう",
    pages: [
      {
        text: "6500万年前、地球には大きな恐竜たちが住んでいました。彼らは地球の王様として、平和に暮らしていました。",
        image: "https://images.unsplash.com/photo-1601459427108-47e20d579a35?w=800&h=600&fit=crop"
      },
      {
        text: "ある日、大きな隕石が地球に落ちてきました。その衝撃で、空は暗くなり、気温は下がっていきました。",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop"
      },
      {
        text: "多くの恐竜たちは寒さと食べ物不足に耐えられませんでした。でも、小さな生き物たちは生き残り、今の動物たちの先祖になったのです。",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop"
      }
    ]
  }
];

export default function ExamplesPage() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 py-24">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <BookOpen className="h-12 w-12 text-primary floating" />
            <Star className="h-8 w-8 text-accent absolute -top-2 -right-2 floating" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            デモストーリー
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ストーリーマジックで作られた絵本の例をご覧ください
          </p>
        </div>

        {selectedStory === null ? (
          // ストーリー一覧
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {DEMO_STORIES.map((story, index) => (
              <Card key={index} className="overflow-hidden bubble group cursor-pointer" onClick={() => setSelectedStory(index)}>
                <div className="relative aspect-[4/3]">
                  <img
                    src={story.pages[0].image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h2 className="text-2xl font-bold mb-2">{story.title}</h2>
                      <p className="text-white/80">{story.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // ストーリープレビュー
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => {
                setSelectedStory(null);
                setCurrentPage(0);
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>

            <Card className="p-8 bubble">
              <h2 className="text-2xl font-bold text-center mb-6">
                {DEMO_STORIES[selectedStory].title}
              </h2>

              {/* ページ画像 */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
                <img
                  src={DEMO_STORIES[selectedStory].pages[currentPage].image}
                  alt={`ページ ${currentPage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* テキストエリア */}
              <div className="min-h-[100px] text-lg text-center mb-8 leading-relaxed">
                {DEMO_STORIES[selectedStory].pages[currentPage].text}
              </div>

              {/* ページ操作 */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  前のページ
                </Button>
                <span className="text-muted-foreground">
                  {currentPage + 1} / {DEMO_STORIES[selectedStory].pages.length}
                </span>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage(prev => Math.min(DEMO_STORIES[selectedStory].pages.length - 1, prev + 1))}
                  disabled={currentPage === DEMO_STORIES[selectedStory].pages.length - 1}
                  className="rounded-full"
                >
                  次のページ
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* アクションボタン */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                音声で聞く
              </Button>
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                asChild
              >
                <Link href="/create">
                  <Magic className="h-5 w-5 mr-2" />
                  自分の物語を作る
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* CTA */}
        {selectedStory === null && (
          <div className="text-center mt-24">
            <Button
              size="lg"
              className="rounded-full text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-16 px-12"
              asChild
            >
              <Link href="/create">
                <Sparkles className="mr-2 h-6 w-6" />
                自分の物語を作る
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}