"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  ArrowLeft,
  Wand2,
  AlertCircle,
  Loader2,
  Mic,
  MicOff,
  Brain,
  Heart,
  MessageCircle,
  Sparkles,
  Book,
  Users,
  Lightbulb,
  SmilePlus,
} from "lucide-react";
import Link from "next/link";
import LoadingScreen from "./loading-screen";

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: string | null;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  grammars: any;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
    | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  serviceURI: string;
  abort(): void;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface ChildInfo {
  name: string;
  birthDate: string;
  gender: string;
  interests: string[];
  favoriteColor: string;
  region: string;
}

type Mode = "child" | "adult" | "easy";
type Theme = "lifestyle" | "manners" | "emotions";
type Style = "kawaii" | "natural" | "pop" | "simple";

const questionHints = [
  {
    title: "自然現象",
    examples: [
      "どうして空は青いの？",
      "雨はどうして降るの？",
      "虹はなぜできるの？",
    ],
    image:
      "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "動物",
    examples: [
      "パンダはなぜ白黒なの？",
      "キリンの首はなぜ長いの？",
      "ペンギンはなぜ飛べないの？",
    ],
    image:
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "宇宙",
    examples: [
      "お月様はどこへ行くの？",
      "星はなぜ光るの？",
      "太陽はなぜ暑いの？",
    ],
    image:
      "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const themes = [
  {
    id: "lifestyle" as Theme,
    title: "生活習慣",
    description: "早寝早起き、食事マナー、整理整頓など",
    icon: Users,
  },
  {
    id: "manners" as Theme,
    title: "マナー・ルール",
    description: "あいさつ、順番待ち、シェアなど",
    icon: Book,
  },
  {
    id: "emotions" as Theme,
    title: "感情・心",
    description: "友達との関係、我慢、思いやりなど",
    icon: Heart,
  },
];

const styles = [
  {
    id: "kawaii" as Style,
    title: "かわいい",
    description: "やわらかい雰囲気のイラスト",
    image:
      "https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "natural" as Style,
    title: "自然",
    description: "写実的なイラスト",
    image:
      "https://images.unsplash.com/photo-1507919909716-c8262e491cde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "pop" as Style,
    title: "ポップ",
    description: "明るく元気なイラスト",
    image:
      "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "simple" as Style,
    title: "シンプル",
    description: "すっきりとしたイラスト",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const characterMessages = [
  {
    question: "どんな絵本を作りたいの？",
    options: ["動物のお話", "自然のふしぎ", "宇宙のこと"],
  },
  {
    question: "主人公はどんな子にする？",
    options: ["元気な子", "やさしい子", "好奇心旺盛な子"],
  },
  {
    question: "どんな場所でお話が進むの？",
    options: ["お家", "公園", "学校"],
  },
];

export default function CreateBookPage() {
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);
  const [mode, setMode] = useState<Mode>("child");
  const [theme, setTheme] = useState<Theme>("lifestyle");
  const [style, setStyle] = useState<Style>("kawaii");
  const [question, setQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [characterStep, setCharacterStep] = useState(0);
  const [characterAnswers, setCharacterAnswers] = useState<string[]>([]);
  const router = useRouter();
  const recognitionRef = useRef<any>(null);

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

    // クリーンアップ
    return () => {
      if (recognitionRef.current && isListening) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("音声認識の停止に失敗しました");
        }
      }
    };
  }, [router, isListening]);

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = async () => {
    try {
      if (typeof window === "undefined") return;

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        throw new Error("音声認識非対応");
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "ja-JP";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        // 型アサーションを使って安全に処理
        const results = Array.from(event.results);
        let finalTranscript = "";

        for (let i = 0; i < results.length; i++) {
          const result = results[i] as any;
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setQuestion(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } catch (err) {
      console.error("Speech recognition error:", err);
      setError("音声入力に対応していないブラウザです");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("音声認識の停止に失敗しました");
      }
      setIsListening(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "child" && !question.trim()) {
      setError("質問を入力してください");
      return;
    }

    if (mode === "adult" && !theme) {
      setError("テーマを選択してください");
      return;
    }

    if (mode === "easy" && characterAnswers.length < characterMessages.length) {
      setError("すべての質問に答えてください");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setShowLoadingScreen(true);

    try {
      // 実際のAI生成処理の代わりに、ローディング画面を表示
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.push("/create-book/complete");
    } catch (err) {
      setError("絵本の生成に失敗しました");
      setIsGenerating(false);
      setShowLoadingScreen(false);
    }
  };

  const handleCharacterAnswer = (answer: string) => {
    setCharacterAnswers([...characterAnswers, answer]);
    if (characterStep < characterMessages.length - 1) {
      setCharacterStep(characterStep + 1);
    }
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

  return (
    <div className="min-h-screen gradient-bg">
      {showLoadingScreen && (
        <LoadingScreen
          childName={childInfo.name}
          onComplete={() => router.push("/create-book/complete")}
        />
      )}

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
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {childInfo.name}くんの絵本を作ろう！
            </h1>
            <p className="text-lg text-muted-foreground">
              どんな絵本を作りたい？
            </p>
          </div>

          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as Mode)}
            className="space-y-8"
          >
            <TabsList className="grid grid-cols-3 gap-4 bg-transparent">
              <TabsTrigger
                value="child"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Brain className="w-4 h-4 mr-2" />
                知りたい！
              </TabsTrigger>
              <TabsTrigger
                value="adult"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                教えたい！
              </TabsTrigger>
              <TabsTrigger
                value="easy"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <SmilePlus className="w-4 h-4 mr-2" />
                かんたん作成
              </TabsTrigger>
            </TabsList>

            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
                <CardHeader>
                  <CardTitle>テイストを選ぼう</CardTitle>
                  <CardDescription>
                    絵本のイラストのタッチを選んでください
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {styles.map((s) => (
                      <motion.div
                        key={s.id}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setStyle(s.id)}
                      >
                        <div
                          className={`relative aspect-square rounded-xl overflow-hidden ${
                            style === s.id ? "ring-4 ring-primary" : ""
                          }`}
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${s.image})` }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="font-bold">{s.title}</div>
                              <div className="text-sm">{s.description}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <TabsContent value="child" className="space-y-8">
                <div className="grid md:grid-cols-3 gap-4">
                  {questionHints.map((hint, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => setQuestion(hint.examples[0])}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl overflow-hidden h-full">
                        <div
                          className="h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url(${hint.image})` }}
                        />
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {hint.title}
                          </CardTitle>
                          <CardDescription>
                            <ul className="list-disc list-inside">
                              {hint.examples.map((example, i) => (
                                <li key={i} className="text-sm">
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="question">どんなことが気になる？</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`rounded-full ${
                          isListening
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }`}
                        onClick={toggleListening}
                      >
                        {isListening ? (
                          <Mic className="w-4 h-4" />
                        ) : (
                          <MicOff className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <Textarea
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="例：どうして空は青いの？"
                      className="rounded-xl min-h-[100px]"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        絵本を作成中...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        絵本を作る
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="adult" className="space-y-8">
                <div className="grid md:grid-cols-3 gap-4">
                  {themes.map((t) => {
                    const Icon = t.icon;
                    return (
                      <motion.div
                        key={t.id}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setTheme(t.id)}
                      >
                        <Card
                          className={`bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl h-full ${
                            theme === t.id ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <CardHeader>
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{t.title}</CardTitle>
                            <CardDescription>{t.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        絵本を作成中...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        絵本を作る
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="easy" className="space-y-8">
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border-none shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex-shrink-0 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div className="bg-primary/10 rounded-2xl p-4">
                          <p className="font-medium">
                            {characterMessages[characterStep].question}
                          </p>
                        </div>
                        <div className="grid gap-2">
                          {characterMessages[characterStep].options.map(
                            (option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="justify-start"
                                onClick={() => handleCharacterAnswer(option)}
                              >
                                {option}
                              </Button>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {characterAnswers.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-muted-foreground">
                          選んだ内容：
                        </h3>
                        <div className="space-y-2">
                          {characterAnswers.map((answer, index) => (
                            <div
                              key={index}
                              className="bg-accent/20 rounded-xl p-3 text-sm"
                            >
                              <span className="font-medium">
                                {characterMessages[index].question}
                              </span>
                              <br />
                              {answer}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    disabled={
                      isGenerating ||
                      characterAnswers.length < characterMessages.length
                    }
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        絵本を作成中...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        絵本を作る
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
