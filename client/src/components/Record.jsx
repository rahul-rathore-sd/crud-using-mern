/**
 * ============================================
 * RECORD COMPONENT - CREATE/EDIT EMPLOYEE FORM
 * ============================================
 * This component handles both creating NEW employees and EDITING existing ones.
 * 
 * HOW IT WORKS:
 * - If URL has no ID (/create) → Create new employee (form is empty)
 * - If URL has ID (/edit/:id)   → Edit existing employee (form loads their data)
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ===== CONSTANTS =====
// List of valid employee levels
const LEVELS = ["Intern", "Junior", "Senior"];

/**
 * LEVEL_COLORS Object
 * Stores Tailwind CSS color classes for styling each level differently
 * When a level is selected, it gets a colored background, border, text, and dot
 */
const LEVEL_COLORS = {
  Intern: {
    bg: "bg-sky-50",
    border: "border-sky-400",
    text: "text-sky-700",
    dot: "bg-sky-400",
  },
  Junior: {
    bg: "bg-violet-50",
    border: "border-violet-400",
    text: "text-violet-700",
    dot: "bg-violet-400",
  },
  Senior: {
    bg: "bg-emerald-50",
    border: "border-emerald-400",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
};

/**
 * normalizeLevel Function
 * Converts user input to match one of the valid LEVELS
 * Examples: "JUNIOR" → "Junior", "intern " → "Intern"
 */
function normalizeLevel(level) {
  if (!level) return "";
  const l = level.toString().trim().toLowerCase();
  return LEVELS.find((v) => v.toLowerCase() === l) ?? level;
}

export default function Record() {
  // ===== STATE SETUP =====
  // form: Object with name, position, level (the employee data being entered)
  const [form, setForm] = useState({ name: "", position: "", level: "" });
  // isNew: Boolean - true if creating new, false if editing
  const [isNew, setIsNew] = useState(true);
  // loading: Boolean - true while fetching existing employee data
  const [loading, setLoading] = useState(false);
  // submitting: Boolean - true while sending form to server
  const [submitting, setSubmitting] = useState(false);
  // error: String - any error message to display
  const [error, setError] = useState(null);

  // ===== ROUTER SETUP =====
  // id: Employee ID from URL (e.g., /edit/507f1f77bcf86cd799439011)
  const { id } = useParams();
  // navigate: Function to redirect after save
  const navigate = useNavigate();

  /**
   * ===== EFFECT: FETCH EXISTING EMPLOYEE DATA =====
   * Runs when the component loads or when 'id' changes
   * 
   * FLOW:
   * 1. Check if we're editing (id exists) or creating (no id)
   * 2. If editing: fetch employee data from /record/:id
   * 3. Fill the form with that data
   * 4. Handle errors gracefully
   */
  useEffect(() => {
    if (!id) return;  // If no ID, we're creating new → nothing to fetch

    let cancelled = false;  // Flag to prevent state updates after unmount
    setIsNew(false);
    setLoading(true);
    setError(null);

    (async () => {
      try {
        // Fetch the employee record from server
        const res = await fetch(`/record/${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const record = await res.json();
        if (!record) { navigate("/"); return; }  // If not found, go back home
        // Only update state if component is still mounted
        if (!cancelled) setForm({ ...record, level: normalizeLevel(record.level) });
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    // Cleanup: Set cancelled to true when component unmounts
    return () => { cancelled = true; };
  }, [id, navigate]);

  /**
   * updateForm Function
   * Merges new values into the form state without overwriting the whole object
   * Example: updateForm({ name: "John" })
   */
  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  /**
   * onSubmit Function
   * Handles form submission (both creating and updating)
   * - Determines if creating (POST) or updating (PATCH)
   * - Sends data to server
   * - Redirects on success or shows error
   */
  async function onSubmit(e) {
    e.preventDefault();  // Prevent page reload
    setSubmitting(true);
    setError(null);

    try {
      // Determine endpoint and HTTP method based on whether we're creating or editing
      const url = isNew ? "/record" : `/record/${id}`;
      const method = isNew ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading record…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Add Employee" : "Edit Employee"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isNew
            ? "Fill in the details below to create a new employee record."
            : "Update the employee's information below."}
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Form card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. Jane Smith"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Position */}
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              required
              placeholder="e.g. Frontend Engineer"
              value={form.position}
              onChange={(e) => updateForm({ position: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Level — styled radio buttons */}
          <div>
            <p className="block text-sm font-medium text-slate-700 mb-3">
              Level
            </p>
            <div className="flex flex-wrap gap-3">
              {LEVELS.map((lvl) => {
                const selected = form.level === lvl;
                const colors = LEVEL_COLORS[lvl];
                return (
                  <label
                    key={lvl}
                    htmlFor={`level-${lvl}`}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border-2 px-5 py-2.5 text-sm font-medium transition-all select-none ${
                      selected
                        ? `${colors.bg} ${colors.border} ${colors.text} shadow-sm`
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      id={`level-${lvl}`}
                      name="level"
                      value={lvl}
                      checked={selected}
                      onChange={(e) => updateForm({ level: e.target.value })}
                      className="sr-only"
                    />
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${selected ? colors.dot : "bg-slate-300"}`}
                    />
                    {lvl}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={submitting}
              id="submit-record"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {submitting
                ? "Saving…"
                : isNew
                  ? "Create Employee"
                  : "Save Changes"}
            </button>
            <button
              type="button"
              id="cancel-record"
              onClick={() => navigate("/")}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
