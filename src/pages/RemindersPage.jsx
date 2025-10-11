import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  MapPin,
  CheckCircle2,
  Droplets,
  FlaskConical,
  SprayCan,
  Scissors,
} from "lucide-react";
import {
  fetchUpcomingReminders,
  fetchAllReminders,
  markReminderDone,
} from "../services/reminderService";

const TYPE_META = {
  watering: {
    title: "Watering",
    icon: <Droplets size={18} className="text-blue-500" />,
    color: "blue",
  },
  fertilizer: {
    title: "Fertilizer",
    icon: <FlaskConical size={18} className="text-amber-600" />,
    color: "amber",
  },
  spray: {
    title: "Spray",
    icon: <SprayCan size={18} className="text-emerald-600" />,
    color: "emerald",
  },
  harvest: {
    title: "Harvest",
    icon: <Scissors size={18} className="text-green-600" />,
    color: "green",
  },
};

function formatDate(d) {
  const date = new Date(d);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const ToggleTabs = ({ active, onChange }) => {
  const tabs = [
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ];
  return (
    <div className="flex justify-center mt-3">
      <div className="inline-flex bg-gray-100 rounded-full p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
              active === t.id
                ? "bg-white shadow text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const ReminderCard = ({ reminder, onDone }) => {
  const meta = TYPE_META[reminder.type] || {};
  const locationText = `Plot #${reminder.plot_id}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
      {/* Left icon */}
      <div className="shrink-0 w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
        {meta.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <button className="text-gray-900 font-semibold">
              {meta.title || reminder.type}
            </button>
            <p className="text-sm text-gray-600 mt-0.5">
              {`Task for Crop #${reminder.crop_id}`}
            </p>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            reminder.sent ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {reminder.sent ? 'Completed' : 'Pending'}
          </span>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarIcon size={16} />
            <span>{formatDate(reminder.due_date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{locationText}</span>
          </div>
        </div>
      </div>

      {/* Action - only show for pending reminders */}
      {!reminder.sent && (
        <button
          onClick={onDone}
          className="ml-2 inline-flex items-center gap-1 text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-full text-sm font-medium"
        >
          <CheckCircle2 size={18} />
          Done
        </button>
      )}
    </div>
  );
};

const RemindersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([]);
  const [filterType, setFilterType] = useState(null); // null = all

  async function load() {
    setLoading(true);
    try {
      const res = await fetchAllReminders(filterType || undefined);
      setReminders(res?.data || []);
    } catch (e) {
      console.error("Failed to load reminders", e);
      setReminders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  const sorted = useMemo(() => {
    return [...reminders].sort(
      (a, b) => new Date(a.due_date) - new Date(b.due_date)
    );
  }, [reminders]);

  const handleDone = async (id) => {
    try {
      await markReminderDone(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error("Failed to mark done", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">Reminders</h1>
        <p className="text-sm text-gray-500">Stay on top of your farm tasks</p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Type Filter Chips */}
        <div className="flex gap-2 mb-2 overflow-x-auto">
          {[
            { id: null, label: 'All' },
            { id: 'watering', label: TYPE_META.watering.title },
            { id: 'fertilizer', label: TYPE_META.fertilizer.title },
            { id: 'spray', label: TYPE_META.spray.title },
            { id: 'harvest', label: TYPE_META.harvest.title },
          ].map((t) => (
            <button
              key={String(t.id)}
              onClick={() => setFilterType(t.id)}
              className={`px-3 py-1 text-sm rounded-full border transition whitespace-nowrap ${
                filterType === t.id
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No reminders</div>
        ) : (
          sorted.map((r) => (
            <ReminderCard key={r.id} reminder={r} onDone={() => handleDone(r.id)} />
          ))
        )}
      </div>

      {/* Bottom spacer for mobile navigation */}
      <div className="h-20" />
    </div>
  );
};

export default RemindersPage;
