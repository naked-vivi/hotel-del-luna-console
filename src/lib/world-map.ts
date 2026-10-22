import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { ANTARCTICA_ID, WORLD_MAP_SIZE } from "@/lib/constants";

const topology = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const countries = feature(topology, topology.objects.countries);
const land = { ...countries, features: countries.features.filter((country) => country.id !== ANTARCTICA_ID) };
const path = geoPath(geoEqualEarth().fitSize([WORLD_MAP_SIZE.width, WORLD_MAP_SIZE.height], land));

export const WORLD_SHAPES: WorldShape[] = land.features.map((country) => ({
  id: country.id === undefined ? `region-${country.properties.name}` : String(country.id),
  name: country.properties.name,
  d: path(country) ?? "",
}));
