import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function PhotoDetailsPage() {
  const { id } = useParams();
  const { getPhoto } = usePhotos();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getPhoto(id).then(setPhoto);
  }, [id]);

  if (!photo)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <AiOutlineLoading3Quarters className="text-6xl sm:text-7xl md:text-8xl text-blue-600 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-5xl w-full mx-auto bg-white shadow p-4 sm:p-6 md:p-8 rounded-lg">
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className="w-full max-h-[70vh] object-cover rounded-lg shadow mb-4"
      />

      <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
        {photo.title}
      </h1>

      <p className="text-gray-700 mb-4 text-base sm:text-lg break-words">
        {photo.description}
      </p>

      <div className="text-xs sm:text-sm text-gray-500 mb-6">
        Uploaded on:{" "}
        <strong>{new Date(photo.createdAt).toLocaleString()}</strong>
      </div>

      <Link
        to="/"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
      >
        Back to Gallery
      </Link>
    </div>
  );
}
