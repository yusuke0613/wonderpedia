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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Palette,
  ArrowLeft,
  Brain,
  Heart,
  Map,
  LineChart,
  Sparkles,
  AlertCircle,
  BookOpen,
  Users,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChildInfo {
  name: string;
  birthDate: string;
  gender: string;
  interests: string[];
  favoriteColor: string;
  region: string;
}

const interestData = [
  { month: "4月", 自然: 4, 動物: 3, 宇宙: 2 },
  { month: "5月", 自然: 3, 動物: 4, 宇宙: 3 },
  { month: "6月", 自然: 5, 動物: 3, 宇宙: 4 },
  { month: "7月", 自然: 4, 動物: 5, 宇宙: 3 },
];

const recommendedSpots = [
  {
    name: "科学技術館",
    description: "実験や体験を通じて科学の面白さを学べます",
    category: "科学",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "動物園",
    description: "様々な動物の生態や習性を観察できます",
    category: "自然",
    image:
      "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "プラネタリウム",
    description: "星や宇宙について楽しく学べます",
    category: "宇宙",
    image:
      "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const insights = [
  {
    title: "興味の傾向",
    description: "自然現象への関心が高まっています",
    icon: Sparkles,
    color: "bg-blue-100 text-blue-500",
  },
  {
    title: "学習スタイル",
    description: "体験を通じた学習が効果的です",
    icon: Brain,
    color: "bg-purple-100 text-purple-500",
  },
  {
    title: "コミュニケーション",
    description: "「なぜ？」という質問が増えています",
    icon: Heart,
    color: "bg-pink-100 text-pink-500",
  },
];

export default function AnalyticsPage() {
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);
  const [activeTab, setActiveTab] = useState("report");
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
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {childInfo.name}くんの分析レポート
              {age !== null && (
                <span className="text-xl text-muted-foreground ml-2">
                  ({age}歳)
                </span>
              )}
            </h1>
            <p className="text-lg text-muted-foreground">
              お子様の興味・関心の変化を分析しています
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid grid-cols-3 gap-4 bg-transparent">
              <TabsTrigger
                value="report"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <LineChart className="w-4 h-4 mr-2" />
                レポート
              </TabsTrigger>
              <TabsTrigger
                value="spots"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Map className="w-4 h-4 mr-2" />
                おすすめスポット
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                分析・洞察
              </TabsTrigger>
            </TabsList>

            <TabsContent value="report">
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
                <CardHeader>
                  <CardTitle>興味・関心の推移</CardTitle>
                  <CardDescription>
                    過去4ヶ月間の興味の変化を表しています
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: "100%", height: "400px" }}>
                    <ResponsiveContainer>
                      <RechartsLineChart
                        data={interestData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="自然"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="動物"
                          stroke="#ef4444"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="宇宙"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      作成した絵本
                    </CardTitle>
                    <div className="text-4xl font-bold">12</div>
                    <CardDescription>先月比 +3</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      学んだテーマ
                    </CardTitle>
                    <div className="text-4xl font-bold">8</div>
                    <CardDescription>自然、動物、宇宙など</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      コミュニケーション
                    </CardTitle>
                    <div className="text-4xl font-bold">良好</div>
                    <CardDescription>質問が活発になっています</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="spots">
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedSpots.map((spot, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl overflow-hidden h-full">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${spot.image})` }}
                      />
                      <CardHeader>
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          {spot.category}
                        </div>
                        <CardTitle className="text-xl">{spot.name}</CardTitle>
                        <CardDescription>{spot.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid md:grid-cols-3 gap-6">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <Card
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl"
                    >
                      <CardHeader>
                        <div
                          className={`w-12 h-12 ${insight.color} rounded-full flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">
                          {insight.title}
                        </CardTitle>
                        <CardDescription>{insight.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>

              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl mt-6">
                <CardHeader>
                  <CardTitle>おすすめのアプローチ</CardTitle>
                  <CardDescription>
                    お子様の興味を伸ばすためのアドバイス
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">1. 体験型学習の促進</h3>
                    <p className="text-muted-foreground">
                      実験や観察を通じて、自然現象への理解を深めましょう
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">2. 質問への対応</h3>
                    <p className="text-muted-foreground">
                      「なぜ？」という質問に丁寧に答え、考える力を育てましょう
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">3. 興味の広がりをサポート</h3>
                    <p className="text-muted-foreground">
                      関連する話題を提供し、知的好奇心を刺激しましょう
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
