import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { fetchPlotById } from "../services/plotsService";
import { fetchLifecyclesByPlot } from "../services/lifecycleService";

const CropTimelinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [plot, setPlot] = useState(null);
  const [lifecycles, setLifecycles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEventIcon = (eventType) => {
    const icons = {
      sowing: "🌱",
      germination: "🌿",
      flowering: "🌸",
      harvest: "🌾",
      fertilization: "🧪",
      irrigation: "💧",
      pest_control: "🛡️",
      pruning: "✂️",
      other: "📝"
    };
    return icons[eventType] || "📝";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plotRes, lifecycleRes] = await Promise.all([
          fetchPlotById(id),
          fetchLifecyclesByPlot(id)
        ]);

        if (plotRes?.success && plotRes?.data) {
          setPlot(plotRes.data);
        }

        if (lifecycleRes?.success) {
          setLifecycles(lifecycleRes.data || []);
        }
      } catch (err) {
        console.error("Error loading timeline data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Lifecycle Timeline</h1>
              <p className="text-sm text-gray-500">
                {plot?.name} • Crop lifecycle history
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/plots/${id}/timeline/add-event`)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="p-4">
        <div className="space-y-4">
          {lifecycles.length > 0 ? (
            lifecycles.map((event, index) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 border flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getEventIcon(event.event_type)}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-gray-800">
                      {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge('completed')}`}>
                      Completed
                    </span>
                  </div>
                </div>
                
                {event.yield_amount && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Yield: </span>
                    {event.yield_amount} {event.yield_unit}
                  </div>
                )}
                
                {event.notes && (
                  <p className="text-xs text-gray-500 mt-2">{event.notes}</p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Timeline Events</h3>
              <p className="text-gray-500 mb-6">Start tracking your crop's lifecycle by adding events</p>
              <button
                onClick={() => navigate(`/plots/${id}/timeline/add-event`)}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mx-auto"
              >
                <Plus size={16} />
                Add First Event
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacer for mobile navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default CropTimelinePage;
