


'use client';

import { useState } from 'react';

// AviationStack API response interfaces
interface FlightDataAPI {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    delay: string | null;
    scheduled: string | null;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    scheduled: string | null;
    delay: string | null;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared: unknown;
  };
  aircraft: unknown;
  live: unknown;
}

// Helper functions
const formatTime = (isoString: string | null) => {
  if (!isoString) return 'TBD';
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'landed':
      return 'text-green-700 bg-green-100';
    case 'scheduled':
      return 'text-blue-700 bg-blue-100';
    case 'delayed':
      return 'text-red-700 bg-red-100';
    case 'cancelled':
      return 'text-red-800 bg-red-200';
    case 'incident':
      return 'text-orange-700 bg-orange-100';
    case 'diverted':
      return 'text-purple-700 bg-purple-100';
    default:
      return 'text-gray-700 bg-gray-100';
  }
};

const getStatusDisplay = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'In Flight';
    case 'landed':
      return 'Arrived';
    case 'scheduled':
      return 'Scheduled';
    case 'delayed':
      return 'Delayed';
    case 'cancelled':
      return 'Cancelled';
    case 'incident':
      return 'Incident';
    case 'diverted':
      return 'Diverted';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

interface StatusProps {
  flights?: FlightDataAPI[];
  isLoading?: boolean;
}

export default function Status({ flights = [], isLoading = false }: StatusProps) {
  // State for modals and features
  const [selectedFlight, setSelectedFlight] = useState<FlightDataAPI | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertPhone, setAlertPhone] = useState('');
  const [alertTypes, setAlertTypes] = useState({
    statusChange: true,
    delays: true,
    gateChange: false,
    departure: false,
    arrival: false
  });

  // Sample data for demonstration - remove when integrating with real API
  const sampleFlights: FlightDataAPI[] = [
    {
      flight_date: "2025-10-16",
      flight_status: "scheduled",
      departure: {
        airport: "Queen Alia International",
        timezone: "Asia/Amman",
        iata: "AMM",
        icao: "OJAI",
        terminal: null,
        gate: "220",
        delay: null,
        scheduled: "2025-10-16T01:15:00+00:00",
        estimated: "2025-10-16T01:15:00+00:00",
        actual: null,
        estimated_runway: null,
        actual_runway: null
      },
      arrival: {
        airport: "King Khaled International",
        timezone: "Asia/Riyadh",
        iata: "RUH",
        icao: "OERK",
        terminal: "1",
        gate: null,
        baggage: null,
        scheduled: "2025-10-16T03:40:00+00:00",
        delay: null,
        estimated: null,
        actual: null,
        estimated_runway: null,
        actual_runway: null
      },
      airline: {
        name: "Royal Jordanian",
        iata: "RJ",
        icao: "RJA"
      },
      flight: {
        number: "734",
        iata: "RJ734",
        icao: "RJA734",
        codeshared: null
      },
      aircraft: null,
      live: null
    }
  ];

  const displayFlights = flights.length > 0 ? flights : sampleFlights;

  // Handler functions
  const handleTrackFlight = (flight: FlightDataAPI) => {
    setSelectedFlight(flight);
    setShowTrackingModal(true);
  };

  const handleSetAlert = (flight: FlightDataAPI) => {
    setSelectedFlight(flight);
    setShowAlertModal(true);
  };

  const handleViewDetails = (flight: FlightDataAPI) => {
    setSelectedFlight(flight);
    setShowDetailsModal(true);
  };

  const handleSaveAlert = () => {
    // Here you would save the alert to your backend/database
    console.log('Saving alert for flight:', selectedFlight?.flight.iata);
    console.log('Email:', alertEmail);
    console.log('Phone:', alertPhone);
    console.log('Alert types:', alertTypes);
    
    // Show success message (you can add toast notifications here)
    alert('Alert saved successfully!');
    setShowAlertModal(false);
    setAlertEmail('');
    setAlertPhone('');
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setShowAlertModal(false);
    setShowTrackingModal(false);
    setSelectedFlight(null);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg border border-gray-200 animate-pulse">
              <div className="bg-gray-300 h-20 rounded-t-lg"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Flight Status Results</h2>
        <p className="text-gray-600">Found {displayFlights.length} flights matching your search</p>
      </div>

      <div className="space-y-4">
        {displayFlights.map((flight, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Flight Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{flight.flight.iata}</h3>
                  <p className="text-blue-100">{flight.airline.name}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(flight.flight_status)}`}>
                    {getStatusDisplay(flight.flight_status)}
                  </span>
                  {flight.departure.delay && (
                    <p className="text-red-200 text-sm mt-1">Delayed: {flight.departure.delay}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-grey-800">
                {/* Departure */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Departure
                  </h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatTime(flight.departure.scheduled)}
                  </div>
                  <div className="text-lg font-medium text-gray-700">{flight.departure.iata}</div>
                  <div className="text-sm text-gray-600">{flight.departure.airport}</div>
                  {flight.departure.gate && (
                    <div className="text-sm text-gray-600">Gate: {flight.departure.gate}</div>
                  )}
                  {flight.departure.terminal && (
                    <div className="text-sm text-gray-600">Terminal: {flight.departure.terminal}</div>
                  )}
                  {flight.departure.estimated && flight.departure.estimated !== flight.departure.scheduled && (
                    <div className="text-sm text-orange-600">
                      Est: {formatTime(flight.departure.estimated)}
                    </div>
                  )}
                </div>

                {/* Flight Path */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center space-x-2 w-full">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-green-600"></div>
                    <svg className="w-6 h-6 text-blue-600 transform rotate-90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-green-600"></div>
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    {flight.aircraft ? 'Aircraft Info Available' : 'Aircraft: TBD'}
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Flight Date: {new Date(flight.flight_date).toLocaleDateString()}
                  </div>
                </div>

                {/* Arrival */}
                <div className="space-y-2 text-right md:text-left">
                  <h4 className="font-semibold text-gray-700 flex items-center md:justify-start justify-end">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Arrival
                  </h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatTime(flight.arrival.scheduled)}
                  </div>
                  <div className="text-lg font-medium text-gray-700">{flight.arrival.iata}</div>
                  <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
                  {flight.arrival.gate && (
                    <div className="text-sm text-gray-600">Gate: {flight.arrival.gate}</div>
                  )}
                  {flight.arrival.terminal && (
                    <div className="text-sm text-gray-600">Terminal: {flight.arrival.terminal}</div>
                  )}
                  {flight.arrival.baggage && (
                    <div className="text-sm text-gray-600">Baggage: {flight.arrival.baggage}</div>
                  )}
                  {flight.arrival.estimated && flight.arrival.estimated !== flight.arrival.scheduled && (
                    <div className="text-sm text-orange-600">
                      Est: {formatTime(flight.arrival.estimated)}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                <button 
                  onClick={() => handleTrackFlight(flight)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Track Flight</span>
                </button>
                <button 
                  onClick={() => handleSetAlert(flight)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l6.364 6.364a1 1 0 001.414 0L21 5" />
                  </svg>
                  <span>Set Alert</span>
                </button>
                <button 
                  onClick={() => handleViewDetails(flight)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flight Details Modal */}
      {showDetailsModal && selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 text-gray-800">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Flight Details - {selectedFlight.flight.iata}
                </h2>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Flight Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Flight Information</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Flight Number:</span> {selectedFlight.flight.iata}</div>
                    <div><span className="font-medium">Airline:</span> {selectedFlight.airline.name}</div>
                    <div><span className="font-medium">Aircraft:</span> {selectedFlight.aircraft ? JSON.stringify(selectedFlight.aircraft) : 'Not Available'}</div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedFlight.flight_status)}`}>
                        {getStatusDisplay(selectedFlight.flight_status)}
                      </span>
                    </div>
                    <div><span className="font-medium">Flight Date:</span> {new Date(selectedFlight.flight_date).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Route Details</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">From:</span> {selectedFlight.departure.airport} ({selectedFlight.departure.iata})</div>
                    <div><span className="font-medium">To:</span> {selectedFlight.arrival.airport} ({selectedFlight.arrival.iata})</div>
                    <div><span className="font-medium">Departure Time:</span> {formatTime(selectedFlight.departure.scheduled)}</div>
                    <div><span className="font-medium">Arrival Time:</span> {formatTime(selectedFlight.arrival.scheduled)}</div>
                  </div>
                </div>
              </div>

              {/* Detailed Times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Departure Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Scheduled:</span> {formatTime(selectedFlight.departure.scheduled)}</div>
                    {selectedFlight.departure.estimated && (
                      <div><span className="font-medium">Estimated:</span> {formatTime(selectedFlight.departure.estimated)}</div>
                    )}
                    {selectedFlight.departure.actual && (
                      <div><span className="font-medium">Actual:</span> {formatTime(selectedFlight.departure.actual)}</div>
                    )}
                    {selectedFlight.departure.gate && (
                      <div><span className="font-medium">Gate:</span> {selectedFlight.departure.gate}</div>
                    )}
                    {selectedFlight.departure.terminal && (
                      <div><span className="font-medium">Terminal:</span> {selectedFlight.departure.terminal}</div>
                    )}
                    {selectedFlight.departure.delay && (
                      <div className="text-red-600"><span className="font-medium">Delay:</span> {selectedFlight.departure.delay}</div>
                    )}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Arrival Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Scheduled:</span> {formatTime(selectedFlight.arrival.scheduled)}</div>
                    {selectedFlight.arrival.estimated && (
                      <div><span className="font-medium">Estimated:</span> {formatTime(selectedFlight.arrival.estimated)}</div>
                    )}
                    {selectedFlight.arrival.actual && (
                      <div><span className="font-medium">Actual:</span> {formatTime(selectedFlight.arrival.actual)}</div>
                    )}
                    {selectedFlight.arrival.gate && (
                      <div><span className="font-medium">Gate:</span> {selectedFlight.arrival.gate}</div>
                    )}
                    {selectedFlight.arrival.terminal && (
                      <div><span className="font-medium">Terminal:</span> {selectedFlight.arrival.terminal}</div>
                    )}
                    {selectedFlight.arrival.baggage && (
                      <div><span className="font-medium">Baggage:</span> {selectedFlight.arrival.baggage}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Alert Modal */}
      {showAlertModal && selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 text-gray-800">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Set Flight Alert</h2>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified about changes for flight {selectedFlight.flight.iata}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  value={alertPhone}
                  onChange={(e) => setAlertPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alert Types</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertTypes.statusChange}
                      onChange={(e) => setAlertTypes(prev => ({ ...prev, statusChange: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Status changes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertTypes.delays}
                      onChange={(e) => setAlertTypes(prev => ({ ...prev, delays: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Delays</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertTypes.gateChange}
                      onChange={(e) => setAlertTypes(prev => ({ ...prev, gateChange: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Gate changes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertTypes.departure}
                      onChange={(e) => setAlertTypes(prev => ({ ...prev, departure: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Departure notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertTypes.arrival}
                      onChange={(e) => setAlertTypes(prev => ({ ...prev, arrival: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Arrival notifications</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAlert}
                  disabled={!alertEmail.trim()}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flight Tracking Modal */}
      {showTrackingModal && selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 text-gray-800">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Track Flight {selectedFlight.flight.iata}</h2>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Flight Progress */}
                <div className="text-center">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <div className="font-semibold">{selectedFlight.departure.iata}</div>
                        <div className="text-gray-500">{formatTime(selectedFlight.departure.scheduled)}</div>
                      </div>
                      <div className="flex-1 px-4">
                        <div className="relative">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-4 h-4 bg-blue-600 rounded-full"></div>
                          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1 w-4 h-4 bg-gray-300 rounded-full"></div>
                          
                          {/* Airplane icon */}
                          <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: '45%' }}>
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">{selectedFlight.arrival.iata}</div>
                        <div className="text-gray-500">{formatTime(selectedFlight.arrival.scheduled)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedFlight.flight_status)}`}>
                      {getStatusDisplay(selectedFlight.flight_status)}
                    </div>
                  </div>
                </div>

                {/* Live Tracking Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Altitude</div>
                    <div className="text-lg font-semibold">35,000 ft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Speed</div>
                    <div className="text-lg font-semibold">450 mph</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="text-lg font-semibold">1,250 km</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">ETA</div>
                    <div className="text-lg font-semibold">{formatTime(selectedFlight.arrival.estimated || selectedFlight.arrival.scheduled)}</div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                    </svg>
                    <p>Live flight map would appear here</p>
                    <p className="text-sm">(Integration with flight tracking service required)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}