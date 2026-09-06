"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { emptyState, TrackerState, CategoryKey, LogEntry, Todo, TodoCategory } from "./types";

const STORAGE_KEY = "desk-log-state-v1";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function useTracker() {
  const [state, setState] = useState<TrackerState>(emptyState);
  const [mounted, setMounted] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.logs && parsed.todos) setState(parsed);
      }
    } catch {
      // private browsing or blocked storage — start fresh
    }
    hydrated.current = true;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — nothing to fall back to on this browser
    }
  }, [state]);

  const addLog = useCallback((cat: CategoryKey, note: string, amt: number) => {
    if (!amt || amt <= 0) return;
    const entry: LogEntry = { id: uid(), note: note.trim(), amt, date: todayStr(), ts: Date.now() };
    setState((s) => ({ ...s, logs: { ...s.logs, [cat]: [...s.logs[cat], entry] } }));
  }, []);

  const removeLog = useCallback((cat: CategoryKey, id: string) => {
    setState((s) => ({
      ...s,
      logs: { ...s.logs, [cat]: s.logs[cat].filter((e) => e.id !== id) },
    }));
  }, []);

  const addTodo = useCallback((text: string, cat: TodoCategory) => {
    if (!text.trim()) return;
    const todo: Todo = { id: uid(), text: text.trim(), cat, done: false, ts: Date.now() };
    setState((s) => ({ ...s, todos: [...s.todos, todo] }));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  }, []);

  const removeTodo = useCallback((id: string) => {
    setState((s) => ({ ...s, todos: s.todos.filter((t) => t.id !== id) }));
  }, []);

  return { state, mounted, addLog, removeLog, addTodo, toggleTodo, removeTodo };
}
