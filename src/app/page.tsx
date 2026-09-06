"use client";

import { useTracker } from "@/lib/useTracker";
import { CATEGORY_ORDER } from "@/lib/types";
import StatStrip from "@/components/StatStrip";
import CategoryPanel from "@/components/CategoryPanel";
import TodoPanel from "@/components/TodoPanel";

function todayLong() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const { state, mounted, addLog, removeLog, addTodo, toggleTodo, removeTodo } = useTracker();

  return (
    <div className="wrap">
      <header>
        <div className="title">
          <h1>Desk Log</h1>
          <div className="sub">studies · game time · DSA · intern work — one page, kept honest</div>
        </div>
        <div className="today">
          <div>{todayLong()}</div>
          <div className="sync-pill">
            <span className="sync-dot" />
            <span>saved on this device</span>
          </div>
        </div>
      </header>

      {!mounted ? (
        <div className="loading">Loading your log…</div>
      ) : (
        <>
          <StatStrip state={state} />

          <div className="panels">
            {CATEGORY_ORDER.map((cat) => (
              <CategoryPanel
                key={cat}
                cat={cat}
                entries={state.logs[cat]}
                onAdd={addLog}
                onRemove={removeLog}
              />
            ))}
          </div>

          <TodoPanel todos={state.todos} onAdd={addTodo} onToggle={toggleTodo} onRemove={removeTodo} />
        </>
      )}

      <footer>saved in this browser — data lives in localStorage on this device</footer>
    </div>
  );
}
