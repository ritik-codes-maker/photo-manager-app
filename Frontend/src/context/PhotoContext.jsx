import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

const PhotoContext = createContext();
export const usePhotos = () => useContext(PhotoContext);

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const photosCollection = collection(db, "photos");

  const loadPhotos = async () => {
    try {
      const snap = await getDocs(photosCollection);
      const arr = [];
      snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setPhotos(arr);
    } catch (err) {
      console.error("loadPhotos", err);
    }
  };

    const addPhoto = async (data) => {
        try {
            await addDoc(collection(db, "photos"), data);
            loadPhotos();
        } catch (err) {
            console.error("Firestore Add Error:", err);
        }
    };

  const getPhoto = async (id) => {
    try {
      const d = await getDoc(doc(db, "photos", id));
      if (!d.exists()) return null;
      return { id: d.id, ...d.data() };
    } catch (err) {
      console.error("getPhoto", err);
      return null;
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, getPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};
