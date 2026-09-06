"use client";

import { useState } from "react";
import { CATEGORIES, TODO_CATEGORIES, Todo, TodoCategory } from "@/lib/types";

export default function TodoPanel({
  todos,
  onAdd,
  onToggle,
  onRemove,
}: {
  todos: Todo[];
  onAdd: (text: string, cat: TodoCategory) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const [text, setText] = useState("");
  const [cat, setCat] = useState<TodoCategory>("study");

  const sorted = [...todos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return b.ts - a.ts;
  });
  const open = todos.filter((t) => !t.done).length;

  function submit() {
    if (!text.trim()) return;
    onAdd(text, cat);
    setText("");
  }

  function labelFor(c: TodoCategory) {
    return c === "general" ? "General" : CATEGORIES[c].label;
  }
  function tintFor(c: TodoCategory) {
    return c === "general" ? "var(--text-faint)" : CATEGORIES[c].cssVar;
  }

  return (
    <div className="todo-panel">
      <div className="panel-head">
        <h2>To-do</h2>
        <span className="total">
          {open} open <span style={{ opacity: 0.5 }}>/</span> {todos.length} total
        </span>
      </div>
      <div className="todo-body">
        <div className="todo-add">
          <input
            type="text"
            placeholder="What needs doing?"
            maxLength={140}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <select value={cat} onChange={(e) => setCat(e.target.value as TodoCategory)}>
            {TODO_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <button onClick={submit}>Add</button>
        </div>
        <div className="todo-list">
          {sorted.length === 0 ? (
            <div className="empty">Nothing on the list — add your next task above.</div>
          ) : (
            sorted.map((t) => (
              <div
                className={"todo-item" + (t.done ? " done" : "")}
                key={t.id}
                style={{ ["--tint" as string]: tintFor(t.cat) }}
              >
                <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
                <span className="text">{t.text}</span>
                <span className="tag">{labelFor(t.cat)}</span>
                <button className="del" onClick={() => onRemove(t.id)} title="Delete">
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
