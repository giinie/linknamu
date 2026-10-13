import Image from "next/image";

// 더미 데이터 — 실 데이터는 추후 적용 예정
const profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  image: "/profile-placeholder.svg",
};

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Blog", href: "https://example.com" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 py-16">
      <Image
        className="size-32 rounded-full object-cover"
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={128}
        height={128}
        loading="eager"
      />
      <h1 className="mt-6 text-2xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{profile.bio}</p>
      <ul className="mt-10 flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="block w-full rounded-2xl border border-zinc-300 px-5 py-4 text-center font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
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
