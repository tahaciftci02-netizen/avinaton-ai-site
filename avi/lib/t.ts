type Dict = Record<string, any>;

import tr from "@/messages/tr.json";

function get(obj: Dict, path: string): any {
  return path.split(".").reduce((acc: any, key: string) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

/**
 * TR-only translator.
 * Usage:
 *   const t = getT("nav");
 *   t("clubs") -> string
 * Supports dot-keys: t("cta.title")
 */
export function getT(namespace: string) {
  const base = (tr as any)[namespace] ?? {};
  return (key: string) => {
    const v = get(base, key);
    return typeof v === "string" ? v : key;
  };
}
