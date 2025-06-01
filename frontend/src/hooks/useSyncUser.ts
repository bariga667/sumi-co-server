import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { userRecoilState } from "../recoils/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { firestoreToUser } from "../types/user";

export function useSyncUser() {
  const setUser = useSetRecoilState(userRecoilState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  console.log("Firebase user:", firebaseUser);
  if (firebaseUser) {
    const userRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = firestoreToUser(userSnap.data());
      console.log("Loaded user from Firestore:", userData);
      setUser(userData);
    } else {
      console.log("No Firestore user document found");
      setUser(null);
    }
  } else {
    console.log("User not logged in");
    setUser(null);
  }
  setLoading(false);
});


    return () => unsubscribe();
  }, [setUser]);

  return loading;
}
