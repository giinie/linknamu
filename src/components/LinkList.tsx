"use client";

import { useEffect, useState } from "react";
import { links, type LinkId } from "@/lib/links";

export default function LinkList() {
  const [counts, setCounts] = useState<Partial<Record<LinkId, number>>>({});

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : {}))
      .then(setCounts)
      .catch(() => {}); // 실패 시 0회 표시 유지
  }, []);

  function handleClick(id: LinkId) {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // keepalive: 새 탭/메일 앱으로 넘어가도 요청이 끝까지 전송되게
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <ul className="mt-12 flex w-full flex-col gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <a
            className="relative block w-full rounded-3xl border border-white/60 bg-white/45 px-16 py-4 text-center font-medium shadow-[0_4px_20px_-6px_rgba(120,70,40,0.15)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(link.id)}
          >
            {link.label}
            <span className="absolute top-1/2 right-6 -translate-y-1/2 text-xs font-normal text-stone-500 tabular-nums dark:text-stone-400">
              {counts[link.id] ?? 0}회
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
