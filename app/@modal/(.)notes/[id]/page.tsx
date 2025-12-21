import NotePreview from "@/components/NotePreview/NotePreview";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params;
  return <NotePreview id={id} />;
}