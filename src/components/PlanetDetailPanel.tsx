"use client";

import { useSolarStore } from "@/store/useSolarStore";
import { planetDetails } from "@/data/planetDetails";

export function PlanetDetailPanel() {
  const selectedPlanet = useSolarStore((s) => s.selectedPlanet);
  const clearSelection = useSolarStore((s) => s.clearSelection);

  if (!selectedPlanet) return null;

  const detail = planetDetails[selectedPlanet];
  if (!detail) return null;

  return (
    <div className="fixed top-0 right-0 w-1/2 h-full z-10 pointer-events-auto">
      {/* Gradient overlay for blending with 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black/90" />

      {/* Content */}
      <div className="relative h-full flex flex-col p-8 pt-6 overflow-y-auto">
        {/* Close button */}
        <button
          onClick={clearSelection}
          className="self-end mb-4 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all text-xl"
        >
          ✕
        </button>

        {/* Planet image */}
        <div className="w-full max-w-md mx-auto mb-6 aspect-square rounded-2xl overflow-hidden border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={detail.imageUrl}
            alt={detail.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-1">{detail.name}</h1>
        <p className="text-lg text-white/50 mb-6">{detail.subtitle}</p>

        {/* Description */}
        <p className="text-base text-white/80 leading-relaxed mb-8">
          {detail.description}
        </p>

        {/* Facts grid */}
        <div className="grid grid-cols-2 gap-3">
          {detail.facts.map((fact) => (
            <div
              key={fact.label}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                {fact.label}
              </p>
              <p className="text-sm text-white font-medium">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
