import { connection } from "next/server";
import { isLinkId, linkIds, toCounts } from "@/lib/links";
import { clicksCollection } from "@/lib/mongodb";

export async function GET() {
  await connection(); // 클릭 수는 요청 시점 값 — 빌드 시 프리렌더 제외
  const docs = await clicksCollection()
    .find({ _id: { $in: linkIds } })
    .toArray();
  return Response.json(toCounts(docs));
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const id = (body as { id?: unknown } | null)?.id;
  if (!isLinkId(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }
  await clicksCollection().updateOne(
    { _id: id },
    { $inc: { count: 1 } },
    { upsert: true },
  );
  return new Response(null, { status: 204 });
}
