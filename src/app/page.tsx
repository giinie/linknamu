import Image from "next/image";

// 더미 데이터 — 실 데이터는 추후 적용 예정
const profile = {
  name: "홍길동",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "https://placehold.co/128x128/orange/white",
};

const links = [
  { label: "🐙 GitHub", href: "https://github.com/giinie" },
  { label: "💼 LinkedIn", href: "https://www.linkedin.com" },
  { label: "📧 이메일", href: "mailto:giinie@bizmeka.com" },
];

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
      <ul className="mt-12 flex w-full flex-col gap-5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="block w-full rounded-3xl border border-white/60 bg-white/45 px-6 py-4 text-center font-medium shadow-[0_4px_20px_-6px_rgba(120,70,40,0.15)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
