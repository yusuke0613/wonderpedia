"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export default function ChildInfoPage() {
  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [favoriteColor, setFavoriteColor] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email || email !== "test@test.com") {
      router.push("/auth/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const childInfo = {
        name: childName,
        birthDate,
        gender,
        interests: selectedInterests,
        favoriteColor,
        region,
      };
      localStorage.setItem("childInfo", JSON.stringify(childInfo));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "保存に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const interests = [
    { id: "animals", label: "動物", examples: "うさぎ、ねこ、いぬ" },
    { id: "vehicles", label: "のりもの", examples: "電車、車、飛行機" },
    { id: "nature", label: "自然", examples: "花、虫、星" },
    { id: "sports", label: "スポーツ", examples: "サッカー、野球" },
    { id: "art", label: "創作", examples: "お絵かき、工作" },
    { id: "music", label: "音楽", examples: "歌、ダンス" },
    { id: "food", label: "食べ物", examples: "おかし、くだもの" },
    { id: "heroes", label: "ヒーロー", examples: "戦隊もの、プリキュア" },
    { id: "dinosaurs", label: "恐竜", examples: "ティラノサウルス" },
    { id: "fairytales", label: "おとぎ話", examples: "プリンセス" },
  ];

  const colors = [
    { value: "red", label: "赤", class: "bg-red-200 hover:bg-red-300" },
    { value: "blue", label: "青", class: "bg-blue-200 hover:bg-blue-300" },
    { value: "yellow", label: "黄色", class: "bg-yellow-200 hover:bg-yellow-300" },
    { value: "green", label: "緑", class: "bg-green-200 hover:bg-green-300" },
    { value: "pink", label: "ピンク", class: "bg-pink-200 hover:bg-pink-300" },
    { value: "orange", label: "オレンジ", class: "bg-orange-200 hover:bg-orange-300" },
    { value: "purple", label: "紫", class: "bg-purple-200 hover:bg-purple-300" },
  ];

  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5 mr-2" />
          トップページへ戻る
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-2">
                <Palette className="w-8 h-8" />
                なぜなぜ絵本メーカー
              </div>
              <h1 className="text-2xl font-bold">お子様のことを教えてね！</h1>
              <p className="text-muted-foreground mt-2">
                パーソナライズされた絵本作りのために使用します
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="childName">お子様のお名前</Label>
                <Input
                  id="childName"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="絵本に登場します"
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">生年月日</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">性別</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">男の子</SelectItem>
                    <SelectItem value="female">女の子</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                    <SelectItem value="not_specified">回答しない</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>好きなものや興味があるもの（複数選択可）</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      className={`p-3 rounded-xl text-left transition-colors ${
                        selectedInterests.includes(interest.id)
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-white/50 hover:bg-white/80 border-2 border-transparent"
                      }`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <div className="font-medium">{interest.label}</div>
                      <div className="text-sm text-muted-foreground">{interest.examples}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>好きな色</Label>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`p-4 rounded-xl flex flex-col items-center justify-center transition-transform ${
                        color.class
                      } ${
                        favoriteColor === color.value
                          ? "scale-110 ring-2 ring-primary"
                          : "hover:scale-105"
                      }`}
                      onClick={() => setFavoriteColor(color.value)}
                    >
                      {favoriteColor === color.value && (
                        <Heart className="w-4 h-4 text-primary mb-1" fill="currentColor" />
                      )}
                      <span className="text-sm font-medium">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">お住まいの地域（任意）</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {prefectures.map((prefecture) => (
                      <SelectItem key={prefecture} value={prefecture}>
                        {prefecture}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={loading}
              >
                {loading ? "保存中..." : "保存する"}
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}