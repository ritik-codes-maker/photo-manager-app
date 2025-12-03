import { useState } from "react";
import axios from "axios";
import { usePhotos } from "../context/PhotoContext";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../cloudinary.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UploadForm() {
  const { addPhoto } = usePhotos();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please choose a file.");
      console.warn("No file selected!");
      return;
    }

    console.log("File selected:", file);
    console.log("Cloudinary Upload URL:", CLOUDINARY_UPLOAD_URL);
    console.log("Cloudinary Upload Preset:", CLOUDINARY_UPLOAD_PRESET);

    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const res = await axios.post(CLOUDINARY_UPLOAD_URL, form);
     console.log("Cloudinary Response:", res.data);
      const imageUrl = res.data.secure_url;

      if (!imageUrl) {
        console.error("secure_url NOT FOUND in Cloudinary response");
        alert("Upload failed: Cloudinary did not return image URL");
        return;
      }

      console.log(" Cloudinary Image URL:", imageUrl);
      console.log("Saving data to Firestore...");

     await addPhoto({
        title,
        description: desc,
        imageUrl,
        createdAt: Date.now(),
      });

      console.log("Firestore: Photo saved successfully!");
      setTitle("");
      setDesc("");
      setFile(null);

      toast.success("Uploaded successfully!");
      navigate("/");

    } catch (err) {
      console.error("Upload failed:", err);

      if (err.response) {
        console.error("Cloudinary Error Response:", err.response.data);
      }

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

      <label className="block mb-2 text-sm ">Select Image</label>
      <input
        className="p-1 bg-gray-100 rounded-md"
        type="file"
        accept="image/*"
        onChange={(e) => {
          console.log("File chosen:", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border-gray-500 w-full mt-4 p-2 rounded"
        mixLength={10}
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
