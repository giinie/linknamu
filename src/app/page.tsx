import Image from "next/image";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";

// 더미 데이터 — 실 데이터는 추후 적용 예정
const profile = {
  name: "홍길동",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "https://placehold.co/128x128/orange/white",
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-7 py-20 sm:py-24">
      <Image
        className="size-32 rounded-full object-cover shadow-[0_12px_32px_-8px_rgba(120,70,40,0.35)] ring-4 ring-white/70 dark:ring-white/10"
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={128}
        height={128}
        loading="eager"
        unoptimized // placehold.co는 SVG를 반환 — Next 이미지 최적화 대상 아님
      />
      <h1 className="mt-7 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 text-center text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
        {profile.bio}
      </p>
      <LinkList />
      <ThemeToggle />
    </main>
  );
}
