import { useState } from "react";
import axios from "axios";
import { usePhotos } from "../context/PhotoContext";
import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
} from "../cloudinary.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UploadForm() {
  const { addPhoto } = usePhotos();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please choose a file.");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(CLOUDINARY_UPLOAD_URL, form);
      const imageUrl = res.data.secure_url;

      await addPhoto({
        title,
        description: desc,
        imageUrl,
        createdAt: Date.now(),
      });

      setTitle("");
      setDesc("");
      setFile(null);
      setImage(null);

      toast.success("Uploaded successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white mt-2 sm:mt-8 p-6 rounded shadow-md max-w-lg sm:mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Photo</h2>

      <div className="flex items-center justify-center mt-5">
        <label
          htmlFor="fileInput"
          className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden border border-gray-300 hover:scale-105 transition-transform"
        >
          {image ? (
            <img src={image} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-600 text-5xl font-extrabold mb-2">+</span>
          )}
        </label>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border-gray-500 w-full mt-6 p-2 rounded"
        maxLength={50}
      />

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="border-gray-500 w-full mt-3 p-2 rounded"
        maxLength={200}
      />

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}