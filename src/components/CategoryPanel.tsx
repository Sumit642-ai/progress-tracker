"use client";

import { useState } from "react";
import { CATEGORIES, CategoryKey, LogEntry } from "@/lib/types";

export default function CategoryPanel({
  cat,
  entries,
  onAdd,
  onRemove,
}: {
  cat: CategoryKey;
  entries: LogEntry[];
  onAdd: (cat: CategoryKey, note: string, amt: number) => void;
  onRemove: (cat: CategoryKey, id: string) => void;
}) {
  const meta = CATEGORIES[cat];
  const [note, setNote] = useState("");
  const [amt, setAmt] = useState("");

  const sorted = [...entries].sort((a, b) => b.ts - a.ts);
  const total = entries.reduce((sum, e) => sum + e.amt, 0);

  function submit() {
    const n = parseFloat(amt);
    if (!n || n <= 0) return;
    onAdd(cat, note, n);
    setNote("");
    setAmt("");
  }

  return (
    <div className="panel" style={{ ["--tint" as string]: meta.cssVar }}>
      <div className="panel-head">
        <h2>{meta.label}</h2>
        <span className="total">
          total <b className="num">{meta.isCount ? total : total.toFixed(1)}</b> {meta.unit}
        </span>
      </div>
      <div className="panel-body">
        <div className="log-list">
          {sorted.length === 0 ? (
            <div className="empty">No {meta.noun}s logged yet.</div>
          ) : (
            sorted.slice(0, 20).map((e) => (
              <div className="log-row" key={e.id}>
                <span className="note">{e.note || "—"}</span>
                <span className="meta">
                  <span className="date">{e.date.slice(5)}</span>
                  <span className="amt">
                    {e.amt}
                    {meta.isCount ? "" : "h"}
                  </span>
                  <button onClick={() => onRemove(cat, e.id)} title="Remove">
                    ×
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
        <div className="add-row">
          <input
            className="note-input"
            type="text"
            placeholder={cat === "dsa" ? "Problem name" : "What did you work on?"}
            maxLength={80}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <input
            className="amt-input"
            type="number"
            min={0}
            step={meta.isCount ? 1 : 0.25}
            placeholder={meta.isCount ? "1" : "hrs"}
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button className="add-btn" onClick={submit}>
            Log
          </button>
        </div>
      </div>
    </div>
  );
}
