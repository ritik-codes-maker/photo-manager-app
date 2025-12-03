import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import PhotoDetailsPage from "./pages/PhotoDetails.jsx";
import { PhotoProvider } from "./context/PhotoContext.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <PhotoProvider>
      <BrowserRouter>
         <Toaster position="top-center" reverseOrder={false} />
        <div className="min-h-screen">
          <nav className="bg-white shadow py-4">
            <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
              <Link to="/" className="font-bold text-xl">
                PhotoApp
              </Link>
              <div className="space-x-4 ">
                <Link to="/" className="p-2 bg-white text-black hover:bg-black hover:text-white rounded-sm">
                  Gallery
                </Link>
                <Link to="/upload" className="p-2 bg-white text-black hover:bg-black hover:text-white rounded-sm">
                  Upload
                </Link>
              </div>
            </div>
          </nav>

          <main className="py-8 max-w-5xl mx-auto px-4">
            <Routes>
              <Route path="/" element={<GalleryPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/photo/:id" element={<PhotoDetailsPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PhotoProvider>
  );
}
