/* =========================================================================
   INTELLECTUAL PROPERTY & COPYRIGHT NOTICE
   =========================================================================
   Project Name: Awsan Communication Global Hub (6G NTN Edition)
   Module      : Automated Verification & Unit Test Suite
   Edition     : Complete Experimental Edition (إصدار تجريبي مكتمل)
   Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
   Location    : Yemen
   National ID : 01010305468
   Contact Tel : +967 777852433
   
   Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
   ========================================================================= */

const assert = require("assert");
const LinkBudgetCalculator = require("../core-ntn/link_budget");
const DopplerEngine = require("../core-ntn/doppler_engine");
const HandoffOrchestrator = require("../core-ntn/handoff_orchestrator");

console.log("=== Running 6G NTN Test Suite (Eng. Awsan Adel Sultan) ===");

// 1. Test Link Budget Calculations
{
  const result = LinkBudgetCalculator.evaluateLink({
    frequencyHz: 2.0e9,
    altitudeKm: 600,
    elevationAngleDeg: 90,
    txPowerDbm: 23
  });

  assert(result.fsplDb > 150 && result.fsplDb < 165, "FSPL should be within standard theoretical bounds (~154 dB)");
  assert(typeof result.isLinkViable === "boolean", "isLinkViable must return boolean");
  console.log("✔ Link Budget Engine verified.");
}

// 2. Test Doppler Engine
{
  const doppler = DopplerEngine.computeDoppler(2.0e9, 600, 30);
  assert(doppler.orbitalVelocityKmS > 7.0 && doppler.orbitalVelocityKmS < 8.0, "LEO velocity must be ~7.5 km/s");
  assert(doppler.maxDopplerShiftHz > 0, "Doppler shift must be positive for incoming vector");
  console.log("✔ Doppler Engine verified.");
}

// 3. Test Handover Orchestrator
{
  const orchestrator = new HandoffOrchestrator();

  // Test Case A: Good terrestrial connection
  const decisionA = orchestrator.evaluateRouting({
    terrestrialRsrpDbm: -85,
    satelliteElevationDeg: 45
  });
  assert.strictEqual(decisionA.selectedNetwork, "TERRESTRIAL_CELLULAR");

  // Test Case B: Terrestrial dead zone + Emergency SOS
  const decisionB = orchestrator.evaluateRouting({
    terrestrialRsrpDbm: -130,
    satelliteElevationDeg: 35,
    isEmergency: true
  });
  assert.strictEqual(decisionB.selectedNetwork, "NON_TERRESTRIAL_LEO");

  console.log("✔ Handover Orchestrator verified.");
}

console.log("=== All NTN Tests Passed Successfully ===");
