import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Fungsi untuk sanitasi input
const sanitizeInput = (input) => input.replace(/<[^>]*>/g, ''); // Menghapus tag HTML

export async function POST(req) {
  const body = await req.json();
  let { name, email, message } = body;

  // Sanitasi input
  name = sanitizeInput(name);
  email = sanitizeInput(email);
  message = sanitizeInput(message);

  // Validasi sederhana
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), {
      status: 400,
    });
  }

  try {
    // Menyimpan data ke Firestore
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      name,
      email,
      message,
      timestamp: serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ message: 'Pesan berhasil diterima!', id: docRef.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding document: ', error);
    return new Response(
      JSON.stringify({ error: 'Gagal menyimpan pesan, silakan coba lagi.' }),
      { status: 500 }
    );
  }
}
