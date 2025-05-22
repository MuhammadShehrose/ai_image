import { useState } from "react";
import { auth, db } from "@/firebase";
import { deleteUser } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmed = window.confirm(
      "Are you sure? This will permanently delete your account and all related images."
    );
    if (!confirmed) return;

    setLoading(true);

    try {
      // 1. Delete all user's images
      const imagesQuery = query(
        collection(db, "images"),
        where("user_id", "==", user.uid)
      );
      const imagesSnapshot = await getDocs(imagesQuery);
      const imageDeletions = imagesSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(imageDeletions);

      // 2. Delete user document from 'users' collection by uid field
      const usersQuery = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const userDeletions = usersSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(userDeletions);

      // 3. Delete Auth user
      await deleteUser(user);

      alert("Account and data deleted successfully.");
      navigate("/sign-in");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Delete Account</h1>
      <p className="mt-2 text-red-600">
        Warning: This action is irreversible. Please proceed with caution.
      </p>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        {loading ? "Deleting..." : "Delete Anyway"}
      </button>
    </div>
  );
}
