import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Cloud,
  Heart,
  Magnet as Magic,
  Moon,
  Palette,
  Sparkles,
  Star,
  Sun,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Star className="h-8 w-8 text-primary floating" />
              <Magic
                className="h-6 w-6 text-accent absolute -bottom-2 -right-2 floating"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Wonderpedia
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="lg" className="rounded-full" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              asChild
            >
              <Link href="/register">はじめる</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="relative inline-block mb-8">
            <Cloud className="h-16 w-16 text-secondary floating" />
            <Star
              className="h-8 w-8 text-accent absolute top-0 right-0 floating"
              style={{ animationDelay: "0.5s" }}
            />
            <Moon
              className="h-8 w-8 text-primary absolute bottom-0 left-0 floating"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            お子様だけの
            <br />
            特別なおはなしを作ろう
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AIがお子様の興味や年齢に合わせて、世界でたった一つの絵本を作ります
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="rounded-full text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-16"
              asChild
            >
              <Link href="/create">
                <Sparkles className="mr-2 h-6 w-6" />
                おはなしを作る
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-lg h-16"
              asChild
            >
              <Link href="/examples">
                <Palette className="mr-2 h-6 w-6" />
                デモを見る
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Wonderpediaの特徴
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bubble p-8 text-center group">
                <div className="mb-6 relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <feature.icon className="h-16 w-16 relative text-primary transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <Heart className="h-16 w-16 text-primary mx-auto mb-8 floating" />
          <h2 className="text-3xl font-bold mb-6">魔法の物語を始めましょう</h2>
          <p className="text-xl mb-8 opacity-90">
            たくさんの家族が素敵な思い出を作っています
          </p>
          <Button
            size="lg"
            className="rounded-full text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-16"
            asChild
          >
            <Link href="/register">
              <Star className="mr-2 h-6 w-6" />
              無料で試してみる
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Wonderpedia</span>
              </div>
              <p className="text-muted-foreground">
                次世代のための魔法のような物語を
              </p>
            </div>
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>© 2024 Wonderpedia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Magic,
    title: "AIがつくる世界に一つの物語",
    description:
      "お子様の興味や年齢に合わせて、オリジナルのストーリーを生成します",
  },
  {
    icon: Users,
    title: "お子様ごとのプロフィール",
    description: "複数のお子様の好みや進捗を個別に管理できます",
  },
  {
    icon: Sparkles,
    title: "インタラクティブな読書体験",
    description: "音声や効果音、タッチ反応で物語をより楽しく体験できます",
  },
];

const footerLinks = [
  {
    title: "サービス",
    links: [
      { label: "機能紹介", href: "/features" },
      { label: "料金プラン", href: "/pricing" },
      { label: "テンプレート", href: "/templates" },
      { label: "作品例", href: "/examples" },
    ],
  },
  {
    title: "サポート",
    links: [
      { label: "ヘルプセンター", href: "/help" },
      { label: "ブログ", href: "/blog" },
      { label: "チュートリアル", href: "/tutorials" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
  {
    title: "規約",
    links: [
      { label: "プライバシー", href: "/privacy" },
      { label: "利用規約", href: "/terms" },
      { label: "セキュリティ", href: "/security" },
      { label: "特定商取引法", href: "/legal" },
    ],
  },
];
