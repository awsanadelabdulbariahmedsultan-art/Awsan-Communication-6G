/* =========================================================================
   INTELLECTUAL PROPERTY & COPYRIGHT NOTICE
   =========================================================================
   Project Name: Awsan Communication Global Hub (6G NTN Edition)
   Module      : AI-Driven Predictive Handover & Steering Orchestrator
   Edition     : Complete Experimental Edition (إصدار تجريبي مكتمل)
   Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
   Location    : Yemen
   National ID : 01010305468
   Contact Tel : +967 777852433
   
   Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
   ========================================================================= */

class HandoffOrchestrator {
  constructor(thresholds = {}) {
    this.terrestrialRsrpThreshold = thresholds.terrestrialRsrpThreshold || -110; // dBm
    this.minSatelliteElevation = thresholds.minSatelliteElevation || 15;        // Degrees
    this.emergencyPriority = thresholds.emergencyPriority !== undefined ? thresholds.emergencyPriority : true;
  }

  /**
   * Decides optimal routing path based on link conditions and service tier
   * @param {Object} telemetry - Device signal telemetry
   * @returns {Object} Routing decision
   */
  evaluateRouting(telemetry) {
    const {
      terrestrialRsrpDbm = -120,
      satelliteElevationDeg = 20,
      satelliteSnrDb = 2.0,
      isEmergency = false,
      requestedService = "DATA_STREAM" // "EMERGENCY_SOS", "MESSAGING", "DATA_STREAM"
    } = telemetry;

    // 1. If terrestrial network signal is robust, prioritize terrestrial infrastructure
    if (terrestrialRsrpDbm >= this.terrestrialRsrpThreshold) {
      return {
        selectedNetwork: "TERRESTRIAL_CELLULAR",
        reason: "Terrestrial signal is above operational threshold.",
        status: "OPTIMAL",
        fallbackAvailable: satelliteElevationDeg >= this.minSatelliteElevation
      };
    }

    // 2. Terrestrial signal is degraded or unavailable -> Evaluate Space Layer (LEO)
    const isSatelliteEligible = satelliteElevationDeg >= this.minSatelliteElevation && satelliteSnrDb > -3.0;

    if (!isSatelliteEligible) {
      return {
        selectedNetwork: "DISCONNECTED",
        reason: "No viable terrestrial coverage and satellite link conditions insufficient.",
        status: "OUT_OF_SERVICE",
        fallbackAvailable: false
      };
    }

    // 3. Bandwidth and capacity policy enforcement
    if (isEmergency || requestedService === "EMERGENCY_SOS" || requestedService === "MESSAGING") {
      return {
        selectedNetwork: "NON_TERRESTRIAL_LEO",
        reason: "Switched to LEO Direct-to-Device for priority mission-critical payload.",
        status: "ACTIVE_NTN",
        qosProfile: "LOW_LATENCY_RESTRICTED_BANDWIDTH"
      };
    }

    // 4. Heavy broadband requests over satellite during peak loads
    return {
      selectedNetwork: "NON_TERRESTRIAL_LEO",
      reason: "Terrestrial dead zone. Operating in constrained satellite bandwidth mode.",
      status: "ACTIVE_NTN_THROTTLED",
      qosProfile: "BEST_EFFORT_DATA"
    };
  }
}

module.exports = HandoffOrchestrator;
