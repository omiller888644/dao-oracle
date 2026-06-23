import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync(
  new URL("../64卦网站项目资料包/iching-pages/dao-oracle-mvp.html", import.meta.url),
  "utf8",
);

function count(pattern) {
  return (html.match(pattern) || []).length;
}

assert.equal(
  count(/<model-viewer\b/g),
  0,
  "prototype should not depend on a 3D turtle shell model",
);

assert.equal(
  count(/\bauto-rotate\b/g),
  0,
  "turtle shell should not auto-rotate while we are calibrating its position",
);

assert.match(
  html,
  /\.phone-shell\b/,
  "prototype should include a mobile-first phone shell container",
);

assert.match(
  html,
  /\.oracle-gate\b/,
  "prototype should include the cosmic oracle gate visual",
);

assert.match(
  html,
  /\.bagua-ring\b/,
  "prototype should preserve Eastern ritual language through a bagua-style ring",
);

assert.match(
  html,
  /data-demo-ritual/,
  "prototype should include a one-tap demo entry for viewing the ritual animation",
);

assert.equal(
  count(/class="progress-step/g),
  4,
  "prototype should show the four-step reading journey progress",
);

assert.match(
  html,
  /data-step="result"/,
  "progress should include a result step",
);

assert.match(
  html,
  /data-intent="Wellbeing"/,
  "question direction choices should include Wellbeing",
);

assert.match(
  html,
  /Cosmic Timing[\s\S]*Human Field[\s\S]*Earthly Leverage/,
  "result page should expose the three-layer reading structure",
);

assert.match(
  html,
  /id="fullReading"[\s\S]*data-complete-payment/,
  "prototype should include a simulated unlocked full-reading state",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*430px\)/,
  "prototype should include a mainstream-phone breakpoint at 430px",
);

assert.match(
  html,
  /pulseInterval\s*=\s*1580/,
  "six-pulse ritual should use a softer breathing cadence",
);

assert.match(
  html,
  /gatePulse/,
  "ritual should pulse the oracle gate during the six-line sequence",
);

assert.match(
  html,
  /cosmic-pulse/,
  "ritual should use a cosmic heartbeat layer instead of line strikes",
);

assert.doesNotMatch(
  html,
  /brightness\(1\.95\)/,
  "cosmic pulse should avoid overly bright heartbeat flashes",
);

assert.match(
  html,
  /brightness\(1\.28\)/,
  "cosmic pulse should peak as a soft breathing glow",
);

assert.equal(
  count(/id="formation"/g),
  0,
  "ritual screen should not show a separate six-line progress display above the oracle gate",
);

assert.doesNotMatch(
  html,
  /singleLineStrike|ritual-line-burst|breaks through the gate/,
  "ritual should no longer present爻 lines as impact strikes",
);

assert.match(
  html,
  /ritualOrbit\.classList\.add\("revealing"\)/,
  "ritual should fade the oracle gate before revealing the hexagram",
);

assert.match(
  html,
  /hexReveal\.classList\.add\("visible"\)/,
  "hexagram should appear after the turtle shell fades",
);

console.log("dao-oracle prototype checks passed");
