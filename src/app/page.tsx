'use client';

import { useState } from "react";
import Header from "@/components/common/Header/page";
import Search from "@/components/Search/page";
import Status from "@/components/Status/page";

// AviationStack API types
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

interface AviationStackResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: FlightDataAPI[];
}

export default function Home() {
  const [flights, setFlights] = useState<FlightDataAPI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // You'll need to replace 'YOUR_API_KEY' with your actual AviationStack API key
      const API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY || 'YOUR_API_KEY';
      
      // Build API URL based on search query
      let apiUrl = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&limit=10`;
      
      // Determine search type and add appropriate parameters
      if (query.match(/^[A-Z]{2,3}\d+$/i)) {
        apiUrl += `&flight_iata=${query.toUpperCase()}`;
      } else if (query.match(/^[A-Z]{3}\s+to\s+[A-Z]{3}$/i)) {
        const [dep, arr] = query.split(' to ').map(code => code.trim().toUpperCase());
        apiUrl += `&dep_iata=${dep}&arr_iata=${arr}`;
      } else if (query.match(/^[A-Z]{3}$/i)) {
        apiUrl += `&dep_iata=${query.toUpperCase()}`;
      } else {
        apiUrl += `&airline_name=${encodeURIComponent(query)}`;
      }

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: AviationStackResponse = await response.json();
      
      if (data.data && data.data.length > 0) {
        setFlights(data.data);
      } else {
        setFlights([]);
        setError('No flights found matching your search criteria.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to search flights. Please try again.');
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans min-h-screen relative overflow-hidden">
      {/* Hero background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/hero-background.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        <Header />
        
        <main className="flex flex-col gap-[32px] items-center w-full p-8 pb-20 sm:p-20">
          <h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
            Check Your Flight Status!
          </h1>
          
          <div className="w-full max-w-8xl">
            <Search onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Error message */}
          {error && (
            <div className="w-full max-w-6xl mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="text-center">{error}</p>
            </div>
          )}

          {/* Results section */}
          {(hasSearched || flights.length > 0) && (
            <div className="w-full max-w-8xl">
              <Status flights={flights} isLoading={isLoading} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
