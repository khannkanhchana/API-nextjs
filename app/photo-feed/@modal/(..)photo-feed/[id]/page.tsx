import Image from "next/image";
import wondersImages, { WonderImage } from "../../../wonders";
import Modal from "@/components/modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const photo:WonderImage = wondersImages.find((p) => p.id === id)!;

  if (!photo) {
    notFound();
    
  }

  return (
    <Modal>
      <Image
        alt={photo.name ?? "Wonderful place"}
        src={photo.src}
        className="w-full object-cover aspect-square"
        width={800}
        height={800}
        priority
      />

      <div className="bg-white p-5 rounded-b-lg">
        <h2 className="text-2xl font-bold">{photo.name}</h2>
        <p className="mt-2 text-gray-700">{photo.photographer}</p>
      </div>
    </Modal>
  );
}

function notFound() {
  throw new Error("Function not implemented.");
}
