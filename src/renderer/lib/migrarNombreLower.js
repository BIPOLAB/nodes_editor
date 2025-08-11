// lib/migrarNombreLower.js
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function migrarNombreLower() {
  try {
    const snapshot = await getDocs(collection(db, "presets"));
    if (snapshot.empty) {
      console.warn("❌ No se encontraron documentos en presets.");
      return;
    }

    let total = 0;
    for (const documento of snapshot.docs) {
      const data = documento.data();
      const id = documento.id;

      if (!data.nombre) {
        console.warn(`❌ Documento sin campo 'nombre': ${id}`);
        continue;
      }

      if (data.nombreLower) {
        console.log(`✔ Ya tiene nombreLower: ${data.nombre}`);
        continue;
      }

      const nombreLower = data.nombre.toLowerCase();
      await updateDoc(doc(db, "presets", id), { nombreLower });
      console.log(`✅ Actualizado: ${data.nombre} -> ${nombreLower}`);
      total++;
    }

    console.log(`🎉 Migración terminada. Total actualizados: ${total}`);
  } catch (e) {
    console.error("🔥 Error durante migración:", e);
  }
}
