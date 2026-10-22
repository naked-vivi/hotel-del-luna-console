import { litMoonPath, moonLight } from "@/lib/lunar";

function MoonLight({ cx, cy, r, fraction, fill, className }: MoonLightProps) {
  const light = moonLight(fraction);

  if (light === "full") return <circle cx={cx} cy={cy} r={r} fill={fill} className={className} />;
  if (light === "partial") return <path d={litMoonPath(cx, cy, r, fraction)} fill={fill} className={className} />;
  return null;
}

export default MoonLight;
