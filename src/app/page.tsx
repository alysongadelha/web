import EmptyMemories from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

interface Memory {
  coverUrl: string;
  excerpt: string;
  id: string;
  createdAt: string;
}

dayjs.locale(ptBR);

export default async function Home() {
  const isAuthenticated = cookies().has("token");
  if (!isAuthenticated) return <EmptyMemories />;

  const token = cookies().get("token")?.value;
  const response = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories: Memory[] = response.data;

  console.log("memoriesCLG", memories);

  if (memories.length === 0) return <EmptyMemories />;

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map(({ coverUrl, excerpt, id, createdAt }) => (
        <div key={id} className="space-y-4">
          <time className="-m-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(createdAt).format("D[ de ]MMMM[, ]YYYY")}
          </time>
          <Image
            src={coverUrl}
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
            alt=""
          />
          <p className="text-lg leading-relaxed text-gray-100">{excerpt}</p>
          <Link
            href={`/memories/${id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
