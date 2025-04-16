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
  Palette,
  ArrowLeft,
  User,
  Baby,
  Bell,
  LogOut,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import ProfileSettings from "./profile-settings";
import ChildSettings from "./child-settings";
import NotificationSettings from "./notification-settings";

interface ChildInfo {
  name: string;
  birthDate: string;
  gender: string;
  interests: string[];
  favoriteColor: string;
  region: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "child" | "notifications"
  >("profile");
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

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("childInfo");
    router.push("/");
  };

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
          className="max-w-3xl mx-auto space-y-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">設定</CardTitle>
              <CardDescription>
                アカウントやお子様の情報を管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start rounded-xl"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    プロフィール
                  </Button>
                  <Button
                    variant={activeTab === "child" ? "default" : "ghost"}
                    className="w-full justify-start rounded-xl"
                    onClick={() => setActiveTab("child")}
                  >
                    <Baby className="w-4 h-4 mr-2" />
                    お子様情報
                  </Button>
                  <Button
                    variant={
                      activeTab === "notifications" ? "default" : "ghost"
                    }
                    className="w-full justify-start rounded-xl"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    通知設定
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    ログアウト
                  </Button>
                </div>
                <div className="md:w-2/3">
                  {activeTab === "profile" && <ProfileSettings />}
                  {activeTab === "child" && (
                    <ChildSettings childInfo={childInfo} />
                  )}
                  {activeTab === "notifications" && <NotificationSettings />}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
