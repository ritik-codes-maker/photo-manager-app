import React from "react";
import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
  return (
    <Link to={`/photo/${photo.id}`} className="block">
      <div className="bg-white rounded overflow-hidden shadow hover:shadow-md transition">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h3 className="font-semibold">{photo.title}</h3>
          <p className="text-sm text-gray-600 truncate">{photo.description}</p>
        </div>
      </div>
    </Link>
  );
}
