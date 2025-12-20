import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { NoteTag } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const NOTES_PER_PAGE = 12;

type PageProps = {
  params: Promise<{ tag: string[] }>;
};

export default async function FilteredNotesPage({ params }: PageProps) {
  const { tag } = await params;
  const selected = tag?.[0] ?? "all";

  const tagParam = selected === "all" ? undefined : (selected as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tagParam ?? "all"],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: NOTES_PER_PAGE,
        tag: tagParam,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tagParam} />
    </HydrationBoundary>
  );
}
