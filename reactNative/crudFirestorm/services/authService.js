import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseconfig";

export function observarAutenticacao(onChange) {
  return onAuthStateChanged(auth, onChange);
}

export async function entrar(email, senha) {
  return signInWithEmailAndPassword(auth, email.trim(), senha);
}

export async function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(auth, email.trim(), senha);
}

export async function sair() {
  return signOut(auth);
}
