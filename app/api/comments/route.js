import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';


// Menambahkan komentar
export async function POST(request) {
  const { comment, rating, name } = await request.json();
  const commentData = {
    comment,
    rating,
    name,
    timestamp: serverTimestamp(), // ✅ Ini waktu server Firestore
  };
  
  
  try {
    const commentsCollection = collection(db, 'comments');
    await addDoc(commentsCollection, commentData);
    return new Response('Comment added successfully', { status: 200 });
  } catch (error) {
    return new Response('Error adding comment', { status: 500 });
  }
}

// Mengambil komentar
export async function GET() {
  if (!comment || typeof rating !== 'number') {
    return new Response('Invalid comment data', { status: 400 });
  }
  
  try {
    const commentsCollection = collection(db, 'comments');
    const snapshot = await getDocs(commentsCollection);
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new Response(JSON.stringify(comments), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), { status: 500 });
  }
}
