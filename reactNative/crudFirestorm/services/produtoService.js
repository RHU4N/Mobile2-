import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseconfig";

const livrosRef = collection(db, "livros");

export function listarLivros(onChange, onError) {
  const q = query(livrosRef, orderBy("criadoEm", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const itens = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onChange(itens);
    },
    (err) => {
      if (onError) {
        onError(err);
      }
    }
  );
}

export async function cadastrarLivro(titulo, autor, ano) {

  const anoNumerico = Number(String(ano).replace(/\D/g, ""));

  return addDoc(livrosRef, {
    titulo: titulo.trim(),
    autor: autor.trim(),
    ano: anoNumerico,
    criadoEm: serverTimestamp(),
  });
}

export async function alterarLivro(id, titulo, autor, ano) {
  
  const anoNumerico = Number(String(ano).replace(/\D/g, ""));

  return updateDoc(doc(db, "livros", id), {
    titulo: titulo.trim(),
    autor: autor.trim(),
    ano: anoNumerico,
  });
}

export async function excluirLivro(id) {
  return deleteDoc(doc(db, "livros", id));
}
