import { MongoClient } from "mongodb";

type ClickDoc = { _id: string; count: number };

// dev HMR로 모듈이 다시 로드돼도 연결을 하나만 유지
const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

export function clicksCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
  globalForMongo.mongoClient ??= new MongoClient(uri);
  return globalForMongo.mongoClient.db("linknamu").collection<ClickDoc>("clicks");
}
