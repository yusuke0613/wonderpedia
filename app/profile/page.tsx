"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Edit, Heart, Magnet as Magic, Pencil, Plus, Star, User } from "lucide-react";
import { useState } from "react";

// ダミーデータ
const DEMO_PROFILES = [
  {
    id: 1,
    name: "さくら",
    age: 7,
    interests: ["科学", "動物", "宇宙"],
    avatar: "https://images.unsplash.com/photo-1595702419689-b64c73d36481?w=150&h=150&fit=crop",
    readBooks: [
      {
        title: "どうして空は青いの？",
        date: "2024-03-15",
        image: "https://images.unsplash.com/photo-1597571063304-81f081944ee8?w=200&h=150&fit=crop"
      },
      {
        title: "恐竜はなぜ絶滅したの？",
        date: "2024-03-10",
        image: "https://images.unsplash.com/photo-1601459427108-47e20d579a35?w=200&h=150&fit=crop"
      }
    ]
  },
  {
    id: 2,
    name: "はると",
    age: 5,
    interests: ["恐竜", "乗り物", "虫"],
    avatar: "https://images.unsplash.com/photo-1595702419667-cf31db106e2a?w=150&h=150&fit=crop",
    readBooks: [
      {
        title: "恐竜はなぜ絶滅したの？",
        date: "2024-03-12",
        image: "https://images.unsplash.com/photo-1601459427108-47e20d579a35?w=200&h=150&fit=crop"
      }
    ]
  }
];

export default function ProfilePage() {
  const [selectedProfile, setSelectedProfile] = useState(DEMO_PROFILES[0]);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 py-24">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <User className="h-12 w-12 text-primary floating" />
            <Star className="h-8 w-8 text-accent absolute -top-2 -right-2 floating" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            お子様のプロフィール
          </h1>
          <p className="text-lg text-muted-foreground">
            お子様の興味や学習の記録を管理します
          </p>
        </div>

        {/* プロフィール選択 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {DEMO_PROFILES.map((profile) => (
              <Card
                key={profile.id}
                className={`p-4 flex items-center gap-4 cursor-pointer bubble min-w-[200px] ${
                  selectedProfile.id === profile.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedProfile(profile)}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.age}歳</p>
                </div>
              </Card>
            ))}
            <Card className="p-4 flex items-center justify-center gap-2 cursor-pointer bubble min-w-[200px] hover:bg-muted/50">
              <Plus className="h-5 w-5" />
              <span>追加</span>
            </Card>
          </div>
        </div>

        {/* プロフィール詳細 */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bubble">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-6">
                <img
                  src={selectedProfile.avatar}
                  alt={selectedProfile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProfile.name}</h2>
                  <p className="text-muted-foreground">{selectedProfile.age}歳</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4 mr-2" />
                編集
              </Button>
            </div>

            <Tabs defaultValue="interests" className="space-y-4">
              <TabsList>
                <TabsTrigger value="interests">
                  <Heart className="h-4 w-4 mr-2" />
                  興味・関心
                </TabsTrigger>
                <TabsTrigger value="history">
                  <BookOpen className="h-4 w-4 mr-2" />
                  読んだ絵本
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Magic className="h-4 w-4 mr-2" />
                  設定
                </TabsTrigger>
              </TabsList>

              <TabsContent value="interests" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProfile.interests.map((interest, index) => (
                    <Card key={index} className="p-4 text-center">
                      <p>{interest}</p>
                    </Card>
                  ))}
                  <Card className="p-4 text-center cursor-pointer hover:bg-muted/50">
                    <Plus className="h-5 w-5 mx-auto mb-2" />
                    <p>追加</p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="space-y-4">
                  {selectedProfile.readBooks.map((book, index) => (
                    <Card key={index} className="p-4 flex gap-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold mb-2">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.date}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>文字の大きさ</Label>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>読み上げ速度</Label>
                    <Slider
                      defaultValue={[70]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>イラストのスタイル</Label>
                    <RadioGroup defaultValue="kawaii" className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="kawaii" id="kawaii" />
                        <Label htmlFor="kawaii">かわいいスタイル</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fantasy" id="fantasy" />
                        <Label htmlFor="fantasy">ファンタジースタイル</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}