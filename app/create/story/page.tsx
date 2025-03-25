"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ChevronLeft, ChevronRight, Download, Magnet as Magic, Share2, Sparkles, Star, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const GENERATION_STEPS = [
  "お話の構成を考えています...",
  "キャラクターを作っています...",
  "イラストを描いています...",
  "物語を紡いでいます...",
];

export default function StoryPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    speechSynthRef.current = window.speechSynthesis;
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            return 100;
          }
          const newProgress = prev + 1;
          setCurrentStep(Math.floor((newProgress / 100) * GENERATION_STEPS.length));
          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handlePlayText = () => {
    if (!speechSynthRef.current) return;

    if (isPlaying) {
      speechSynthRef.current.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(storyPages[currentPage].text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9; // 少しゆっくりめに読む
    utterance.pitch = 1.1; // 少し高めの声
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;

    speechSynthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  useEffect(() => {
    // ページが変わったら再生を停止
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsPlaying(false);
    }
  }, [currentPage]);

  // ダミーのストーリーデータ
  const storyPages = [
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
  ];

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center max-w-md w-full mx-auto px-4">
          <div className="relative inline-block mb-8">
            <Magic className="h-16 w-16 text-primary animate-spin" />
            <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 floating" />
          </div>
          <h2 className="text-2xl font-bold mb-4">お話を作っています...</h2>
          <p className="text-lg text-primary mb-8">{GENERATION_STEPS[currentStep]}</p>
          <Progress value={progress} className="h-2 mb-4" />
          <p className="text-sm text-muted-foreground">
            {progress}% 完了
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <BookOpen className="h-12 w-12 text-primary floating" />
            <Star className="h-8 w-8 text-accent absolute -top-2 -right-2 floating" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            どうして空は青いの？
          </h1>
          <p className="text-muted-foreground">
            あなただけの特別なおはなし
          </p>
        </div>

        {/* 絵本表示エリア */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bubble overflow-hidden">
            {/* ページ画像 */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
              <img
                src={storyPages[currentPage].image}
                alt={`ページ ${currentPage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* テキストエリアと音声再生ボタン */}
            <div className="relative">
              <div className="min-h-[100px] text-lg text-center mb-8 leading-relaxed">
                {storyPages[currentPage].text}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute -top-2 -right-2 rounded-full h-12 w-12 bg-white shadow-lg hover:bg-white/90"
                onClick={handlePlayText}
              >
                {isPlaying ? (
                  <VolumeX className="h-6 w-6 text-primary animate-pulse" />
                ) : (
                  <Volume2 className="h-6 w-6 text-primary" />
                )}
              </Button>
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
                {currentPage + 1} / {storyPages.length}
              </span>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentPage(prev => Math.min(storyPages.length - 1, prev + 1))}
                disabled={currentPage === storyPages.length - 1}
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
              <Download className="h-5 w-5 mr-2" />
              保存する
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Share2 className="h-5 w-5 mr-2" />
              共有する
            </Button>
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Magic className="h-5 w-5 mr-2" />
              もう一度作る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}