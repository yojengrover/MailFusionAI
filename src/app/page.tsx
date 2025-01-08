

import { Button } from "@/components/ui/button";
import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  return<div>
  <Button>Hello</Button>
  </div>
}
