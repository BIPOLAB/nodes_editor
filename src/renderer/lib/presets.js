// lib/presets.js
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "./firebase.js";

export async function obtenerPresetsPrueba() {
  const snapshot = await getDocs(collection(db, "presets"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function buscarPresets({
  filtro = "",
  paginaAnterior = null,
  pageSize = 4,
}) {
  const presetsRef = collection(db, "presets");
  let q;

  if (filtro) {
    //const filtroLower = filtro.toLowerCase();
    //const filtroUpper = filtroLower + '\uf8ff';

    q = query(
      presetsRef,
      //orderBy('nombreLower'),
      //startAt(filtroLower),
      //endAt(filtroUpper),
      limit(pageSize),
    );
  } else {
    q = query(presetsRef, orderBy("nombre"), limit(pageSize));
  }

  if (paginaAnterior) {
    q = query(q, startAfter(paginaAnterior));
  }

  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    docs,
    lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
  };
}
