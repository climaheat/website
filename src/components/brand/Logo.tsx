/**
 * Clima Heat Solutions — origineel logo.
 *
 * Het officiële logo (huis met vlam en sneeuwvlok, "ClimaHeat SOLUTIONS")
 * wordt als beeld getoond. De donkere achtergrond van het bestand leest
 * als een badge en werkt zowel op lichte als donkere ondergronden.
 */

import logoAsset from "../../assets/clima-heat-logo.jpg.asset.json";

export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Clima Heat Solutions logo"
      className={`rounded-xl object-cover ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center ${className}`}>
      <LogoMark className="h-11 w-auto shrink-0 !rounded-md" />
    </span>
  );
}

export function LogoLight({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center ${className}`}>
      <LogoMark className="h-14 w-auto shrink-0 !rounded-md" />
    </span>
  );
}
