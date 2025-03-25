"use client";

import "regenerator-runtime/runtime";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Magnet as Magic,
  Mic,
  Palette,
  Sparkles,
  Star,
  StopCircle,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Web Speech API用の参照
  const recognitionRef = useRef<any>(null);

  // Web Speech APIのサポート確認とセットアップ
  useEffect(() => {
    // ブラウザがSpeech Recognition APIをサポートしているか確認
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);

        // SpeechRecognitionインスタンスを作成
        const recognition = new SpeechRecognition();
        recognition.lang = "ja-JP";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        // 結果イベントハンドラ
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log("認識結果:", transcript);
          setQuestion(transcript);
        };

        // エラーイベントハンドラ
        recognition.onerror = (event) => {
          console.error("音声認識エラー:", event.error);
          setIsListening(false);

          if (event.error === "not-allowed") {
            alert(
              "マイクへのアクセスが許可されていません。ブラウザの設定を確認してください。"
            );
          }
        };

        // 終了イベントハンドラ
        recognition.onend = () => {
          console.log("音声認識が終了しました");
          setIsListening(false);
        };

        // 参照に保存
        recognitionRef.current = recognition;
      } else {
        console.warn("このブラウザはWeb Speech APIをサポートしていません");
      }
    }

    // クリーンアップ
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // マイクボタンクリック時の処理
  const handleVoiceInput = useCallback(() => {
    if (!speechSupported || !recognitionRef.current) {
      alert(
        "お使いのブラウザは音声認識に対応していません。Chrome、Edgeなどの最新ブラウザをお試しください。"
      );
      return;
    }

    if (!isListening) {
      try {
        // 音声認識開始
        recognitionRef.current.start();
        setIsListening(true);
        console.log("音声認識を開始しました");
      } catch (error) {
        console.error("音声認識の開始に失敗しました:", error);
        setIsListening(false);
        alert(
          "音声認識の開始に失敗しました。マイクへのアクセス許可を確認してください。"
        );
      }
    } else {
      // 音声認識停止
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("音声認識を停止しました");
    }
  }, [isListening, speechSupported]);

  const handleCreateStory = async () => {
    if (!question.trim()) {
      alert("お子様の疑問を入力してください。");
      return;
    }

    setIsSubmitting(true);
    try {
      // ここでAPIリクエストなどの処理を行う
      await new Promise((resolve) => setTimeout(resolve, 1000)); // ダミーの遅延
      router.push("/create/story");
    } catch (error) {
      alert("エラーが発生しました。もう一度お試しください。");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 py-24">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <Magic className="h-12 w-12 text-primary floating" />
            <Star
              className="h-8 w-8 text-accent absolute -top-2 -right-2 floating"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            おはなしを作ろう
          </h1>
          <p className="text-lg text-muted-foreground">
            お子様の疑問や興味から、世界でたった一つの絵本を作ります
          </p>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* 音声入力カード */}
            <Card className="p-6 bubble">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Mic className="h-6 w-6 mr-2 text-primary" />
                お子様の疑問を教えてください
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  {speechSupported && (
                    <Button
                      size="lg"
                      onClick={handleVoiceInput}
                      className={`rounded-full p-8 transition-all ${
                        isListening
                          ? "bg-destructive hover:bg-destructive/90"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {isListening ? (
                        <StopCircle className="h-8 w-8 animate-pulse" />
                      ) : (
                        <Mic className="h-8 w-8" />
                      )}
                    </Button>
                  )}
                </div>
                <div className="text-center text-sm text-muted-foreground mb-4">
                  {isListening ? (
                    <span className="text-primary animate-pulse">
                      お子様の声を聞いています...
                    </span>
                  ) : speechSupported ? (
                    "マイクボタンを押して、お子様の疑問を録音してください"
                  ) : (
                    "お使いのブラウザは音声入力に対応していません。下のテキストエリアに直接入力してください"
                  )}
                </div>
                <div>
                  <Label htmlFor="question-input" className="mb-2 block">
                    お子様の質問：
                  </Label>
                  <Textarea
                    id="question-input"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="例：どうして空は青いの？ 恐竜はなぜ絶滅したの？"
                    className="min-h-[120px]"
                  />
                  {!speechSupported && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ※音声入力を使用するには、Chrome, Edge,
                      Safariなどの最新ブラウザを使用してください。
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* スタイル設定 */}
            <Card className="p-6 bubble">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Palette className="h-6 w-6 mr-2 text-primary" />
                イラストのスタイル
              </h2>
              <RadioGroup
                defaultValue="kawaii"
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative group">
                  <Label
                    htmlFor="kawaii"
                    className="block group-has-[:checked]:ring-4 group-has-[:checked]:ring-primary group-has-[:checked]:ring-offset-2 transition-all"
                  >
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-primary/20 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary/5 rounded-xl cursor-pointer hover:border-primary transition-colors">
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-primary/30 group-has-[:checked]:bg-primary group-has-[:checked]:border-primary">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-has-[:checked]:opacity-100"></div>
                      </div>
                      <RadioGroupItem
                        value="kawaii"
                        id="kawaii"
                        className="sr-only"
                      />
                      <img
                        src="/01.jpeg"
                        alt="かわいいスタイル"
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <span className="font-medium">かわいいスタイル</span>
                    </div>
                  </Label>
                </div>
                <div className="relative group">
                  <Label
                    htmlFor="fantasy"
                    className="block group-has-[:checked]:ring-4 group-has-[:checked]:ring-primary group-has-[:checked]:ring-offset-2 transition-all"
                  >
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-primary/20 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary/5 rounded-xl cursor-pointer hover:border-primary transition-colors">
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-primary/30 group-has-[:checked]:bg-primary group-has-[:checked]:border-primary">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-has-[:checked]:opacity-100"></div>
                      </div>
                      <RadioGroupItem
                        value="fantasy"
                        id="fantasy"
                        className="sr-only"
                      />
                      <img
                        src="/02.jpeg"
                        alt="ファンタジースタイル"
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <span className="font-medium">ファンタジースタイル</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </Card>

            {/* 詳細設定 */}
            <Card className="p-6 bubble">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-primary" />
                詳細設定
              </h2>
              <div className="space-y-6">
                <div>
                  <Label>おはなしの長さ</Label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">短い</span>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">長い</span>
                  </div>
                </div>
                <div>
                  <Label>文字の大きさ</Label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      小さい
                    </span>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">
                      大きい
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 生成ボタン */}
            <div className="text-center pt-8">
              <Button
                size="lg"
                className="rounded-full text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-16 px-12"
                onClick={handleCreateStory}
                disabled={isSubmitting || !question.trim()}
              >
                {isSubmitting ? (
                  <Magic className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                  <Magic className="mr-2 h-6 w-6" />
                )}
                {isSubmitting ? "作成中..." : "おはなしを作る"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
