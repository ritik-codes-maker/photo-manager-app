import { usePhotos } from "../context/PhotoContext";
import PhotoCard from "../components/PhotoCard";
import { MdImageNotSupported } from "react-icons/md";

export default function GalleryPage() {
  const { photos } = usePhotos();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      {photos.length === 0 ? (
          <div className="w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <MdImageNotSupported className="text-gray-400 text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-3 sm:mb-4" />
            <p className="text-gray-500  text-base sm:text-lg md:text-xl lg:text-2xl text-center">
               Image Not Available
            </p>
          </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((p) => (
            <PhotoCard key={p.id} photo={p} />
          ))}
        </div>
      )}
    </div>
  );
}
