import NotePreviewClient from "./NotePreview.client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params;
  return <NotePreviewClient id={id} />;
}