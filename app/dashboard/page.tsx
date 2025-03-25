"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock, Heart, Magnet as Magic, Plus, Search, Settings, Sparkles, Star, User } from "lucide-react";
import Link from "next/link";

// ダミーデータ
const RECENT_STORIES = [
  {
    id: 1,
    title: "どうして空は青いの？",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1597571063304-81f081944ee8?w=300&h=200&fit=crop",
    likes: 24
  },
  {
    id: 2,
    title: "恐竜はなぜ絶滅したの？",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1601459427108-47e20d579a35?w=300&h=200&fit=crop",
    likes: 18
  },
  {
    id: 3,
    title: "雨はどうして降るの？",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=200&fit=crop",
    likes: 15
  }
];

const FAVORITE_STORIES = [
  {
    id: 4,
    title: "月はなぜ光るの？",
    date: "2024-02-28",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=300&h=200&fit=crop",
    likes: 32
  },
  {
    id: 5,
    title: "虹はどうしてできるの？",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1507358522600-9f71e620c44e?w=300&h=200&fit=crop",
    likes: 27
  }
];

const RECOMMENDED_TOPICS = [
  "宇宙のふしぎ",
  "動物のくらし",
  "地球のしくみ",
  "植物の成長",
  "科学実験",
  "歴史の出来事"
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5">
      {/* ヘッダー */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Star className="h-8 w-8 text-primary floating" />
              <Magic className="h-6 w-6 text-accent absolute -bottom-2 -right-2 floating" style={{ animationDelay: '1s' }} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ストーリーマジック
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* ウェルカムセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            おかえりなさい、<span className="text-primary">ゆうき</span>さん！
          </h1>
          <p className="text-lg text-muted-foreground">
            今日はどんなおはなしを作りましょうか？
          </p>
        </div>

        {/* 新しい物語を作るセクション */}
        <Card className="p-8 mb-12 bubble bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">新しい物語を作る</h2>
              <p className="text-muted-foreground mb-6">
                お子様の興味や疑問から、世界でたった一つの絵本を作りましょう
              </p>
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
                <Link href="/create">
                  <Sparkles className="mr-2 h-5 w-5" />
                  おはなしを作る
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {RECOMMENDED_TOPICS.slice(0, 6).map((topic, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-full hover:bg-primary/10"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* 最近作った物語 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              最近作った物語
            </h2>
            <Button variant="ghost" className="rounded-full">
              すべて見る
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_STORIES.map((story) => (
              <Card key={story.id} className="overflow-hidden bubble group cursor-pointer">
                <div className="relative aspect-[3/2]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">{story.date}</span>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{story.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* お気に入りの物語 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              お気に入りの物語
            </h2>
            <Button variant="ghost" className="rounded-full">
              すべて見る
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAVORITE_STORIES.map((story) => (
              <Card key={story.id} className="overflow-hidden bubble group cursor-pointer">
                <div className="relative aspect-[3/2]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">{story.date}</span>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 fill-current" />
                          <span>{story.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}