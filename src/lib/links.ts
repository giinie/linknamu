// 더미 데이터 — 실 데이터는 추후 적용 예정
// id는 클릭 수 저장 키(MongoDB _id) — 바꾸면 기존 클릭 수와의 연결이 끊김
export const links = [
  { id: "github", label: "🐙 GitHub", href: "https://github.com/giinie" },
  { id: "linkedin", label: "💼 LinkedIn", href: "https://www.linkedin.com" },
  { id: "email", label: "📧 이메일", href: "mailto:giinie@bizmeka.com" },
] as const;

export type LinkId = (typeof links)[number]["id"];

export const linkIds: LinkId[] = links.map((link) => link.id);

export function isLinkId(value: unknown): value is LinkId {
  return typeof value === "string" && (linkIds as string[]).includes(value);
}

export function toCounts(
  docs: { _id: string; count: number }[],
): Record<LinkId, number> {
  const counts = Object.fromEntries(linkIds.map((id) => [id, 0])) as Record<
    LinkId,
    number
  >;
  for (const doc of docs) {
    if (isLinkId(doc._id)) counts[doc._id] = doc.count;
  }
  return counts;
}
