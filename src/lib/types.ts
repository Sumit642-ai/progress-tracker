export type CategoryKey = "study" | "dsa" | "intern" | "game";
export type TodoCategory = CategoryKey | "general";

export interface LogEntry {
  id: string;
  note: string;
  amt: number;
  date: string; // YYYY-MM-DD
  ts: number;
}

export interface Todo {
  id: string;
  text: string;
  cat: TodoCategory;
  done: boolean;
  ts: number;
}

export interface TrackerState {
  logs: Record<CategoryKey, LogEntry[]>;
  todos: Todo[];
}

export interface CategoryMeta {
  label: string;
  cssVar: string;
  unit: string;
  noun: string;
  isCount: boolean;
}

export const CATEGORY_ORDER: CategoryKey[] = ["study", "dsa", "intern", "game"];

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  study: { label: "Studies", cssVar: "var(--study)", unit: "hrs", noun: "topic", isCount: false },
  dsa: { label: "DSA", cssVar: "var(--dsa)", unit: "solved", noun: "problem", isCount: true },
  intern: { label: "Intern Work", cssVar: "var(--intern)", unit: "hrs", noun: "task", isCount: false },
  game: { label: "Game Time", cssVar: "var(--game)", unit: "hrs", noun: "session", isCount: false },
};

export const TODO_CATEGORIES: { value: TodoCategory; label: string }[] = [
  { value: "study", label: "Study" },
  { value: "dsa", label: "DSA" },
  { value: "intern", label: "Intern" },
  { value: "game", label: "Game" },
  { value: "general", label: "General" },
];

export function emptyState(): TrackerState {
  return { logs: { study: [], dsa: [], intern: [], game: [] }, todos: [] };
}
