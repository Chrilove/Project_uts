import { db } from "../../lib/firebase"; // pastikan path ini sesuai
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../contactForm/contactform.css";

export const submitContactForm = async ({ name, email, message }) => {
  try {
    await addDoc(collection(db, "contactMessages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
};
