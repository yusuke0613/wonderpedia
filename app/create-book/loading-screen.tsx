"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, BookOpen, Palette, Wand2 } from "lucide-react";

const loadingSteps = [
  {
    title: "お話を考えています",
    description: "あなたの質問から素敵なストーリーを作っています",
    icon: Wand2,
    duration: 3000,
  },
  {
    title: "イラストを描いています",
    description: "物語に合わせて、かわいいイラストを描いています",
    icon: Palette,
    duration: 4000,
  },
  {
    title: "絵本を組み立てています",
    description: "文章とイラストを組み合わせて、絵本を作っています",
    icon: BookOpen,
    duration: 3000,
  },
];

const funFacts = [
  "空が青く見えるのは、太陽の光が空気にぶつかって青い光が散らばるからだよ",
  "雨は雲の中の小さな水滴が大きくなって重くなると降ってくるんだ",
  "虹は太陽の光が雨粒に当たって、光が分かれて見えるんだよ",
  "雪の結晶は、一つ一つ違う形をしているんだ",
  "月は地球のまわりを約29日かけて回っているよ",
];

interface LoadingScreenProps {
  childName: string;
  onComplete: () => void;
}

export default function LoadingScreen({ childName, onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;
    let factTimer: NodeJS.Timeout;

    const startStep = (step: number) => {
      const duration = loadingSteps[step].duration;
      const increment = 100 / (duration / 100); // 100msごとの進捗増加量

      progressTimer = setInterval(() => {
        setProgress(prev => {
          const next = prev + increment;
          return next > 100 ? 100 : next;
        });
      }, 100);

      timer = setTimeout(() => {
        if (step < loadingSteps.length - 1) {
          setCurrentStep(step + 1);
          setProgress(0);
          startStep(step + 1);
        } else {
          onComplete();
        }
      }, duration);
    };

    // 豆知識を定期的に切り替え
    factTimer = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 5000);

    startStep(0);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      clearInterval(factTimer);
    };
  }, [onComplete]);

  const StepIcon = loadingSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="bg-white/90 backdrop-blur-sm rounded-3xl border-none shadow-xl p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <motion.div
                key={currentStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center"
              >
                <StepIcon className="w-10 h-10 text-primary" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  {loadingSteps[currentStep].title}
                </h2>
                <p className="text-muted-foreground">
                  {loadingSteps[currentStep].description}
                </p>
              </div>

              <div className="w-full space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {childName}くんの絵本を作成中...
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-accent/20 rounded-2xl p-4 max-w-md"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent-foreground" />
                    <span className="font-medium">豆知識</span>
                  </div>
                  <p className="text-sm text-accent-foreground">
                    {funFacts[currentFact]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}