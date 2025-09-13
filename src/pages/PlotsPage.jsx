// src/pages/PlotsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlots } from "../services/plotsService";

// ✅ Importing lucide-react icons
import {
  Search,
  PlusCircle,
  Leaf,
  User,
  Calendar,
  ChevronRight,
} from "lucide-react";

const PlotsPage = () => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlots = async () => {
      try {
        const res = await fetchPlots();
        console.log("Fetched Plots:", res);

        if (res?.success && res?.data) {
          setPlots(res.data);
        } else {
          setPlots([]); // ✅ fallback
        }
      } catch (err) {
        console.error("Error loading plots:", err);
        setPlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlots();
  }, []);

  // ✅ Filter plots by search
  const filteredPlots = plots.filter((plot) =>
    plot.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Plots</h1>
        <button
          onClick={() => navigate("/add-plot")}
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700"
        >
          <PlusCircle size={18} />
          <span>Add Plot</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4 bg-gray-100 px-3 py-2 rounded-lg">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search plots..."
          className="bg-transparent outline-none flex-1 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading plots...</p>}

      {/* Empty State */}
      {!loading && filteredPlots.length === 0 && (
        <p className="text-gray-500">No plots found.</p>
      )}

      {/* Plots List */}
      <div className="space-y-3">
        {filteredPlots.map((plot) => (
          <div
            key={plot.id}
            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
            onClick={() => navigate(`/plots/${plot.id}`)}
          >
            {/* Plot Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">{plot.name}</h2>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  plot.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {plot.status || "Pending"}
              </span>
            </div>

            {/* Crop Info */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <Leaf size={14} className="text-green-600" />
              <span>{plot.current_crop?.name || "No crop"}</span>

            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <Calendar size={14} className="text-blue-600" />
              <span>
                Planted:{" "}
                {plot.sowing_date
                  ? new Date(plot.sowing_date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <User size={14} className="text-purple-600" />
                <span>{plot.caretaker?.name || "No caretaker"}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t pt-2 text-xs text-gray-500">
              <span>Next task: Watering</span>
              <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlotsPage;
