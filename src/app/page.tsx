

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  return<div><h1 className="text-red-500">Hello </h1>
  </div>
}
