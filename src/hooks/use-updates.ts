"use client"

import { useState, useEffect } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function useUpdates() {
  const [updates, setUpdates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "updates"), where("isActive", "==", true), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUpdates(updatesData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { updates, loading }
}
