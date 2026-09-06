import { CATEGORIES, CATEGORY_ORDER, TrackerState } from "@/lib/types";
import { todayStr } from "@/lib/useTracker";

export default function StatStrip({ state }: { state: TrackerState }) {
  const today = todayStr();

  return (
    <div className="stats">
      {CATEGORY_ORDER.map((cat) => {
        const meta = CATEGORIES[cat];
        const value = state.logs[cat]
          .filter((e) => e.date === today)
          .reduce((sum, e) => sum + e.amt, 0);
        return (
          <div className="stat" key={cat} style={{ ["--tint" as string]: meta.cssVar }}>
            <div className="label">{meta.label} · today</div>
            <div className="value num">
              {meta.isCount ? value : value.toFixed(1)}
              <small>{meta.unit}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}
