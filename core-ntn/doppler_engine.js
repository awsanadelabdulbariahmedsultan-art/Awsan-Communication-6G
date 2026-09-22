/* =========================================================================
   INTELLECTUAL PROPERTY & COPYRIGHT NOTICE
   =========================================================================
   Project Name: Awsan Communication Global Hub (6G NTN Edition)
   Module      : Doppler Shift & Velocity Compensation Engine
   Edition     : Complete Experimental Edition (إصدار تجريبي مكتمل)
   Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
   Location    : Yemen
   National ID : 01010305468
   Contact Tel : +967 777852433
   
   Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
   ========================================================================= */

const SPEED_OF_LIGHT = 299792458; // m/s
const EARTH_GRAVITATIONAL_CONSTANT = 3.986004418e14; // m^3/s^2 (GM)
const EARTH_RADIUS_METERS = 6371000; // Earth mean radius

class DopplerEngine {
  /**
   * Calculates circular orbital velocity for a given orbit height
   * @param {number} altitudeKm - Altitude above Earth surface
   * @returns {number} Orbital velocity in m/s
   */
  static getOrbitalVelocity(altitudeKm) {
    const orbitRadiusMeters = EARTH_RADIUS_METERS + (altitudeKm * 1000);
    return Math.sqrt(EARTH_GRAVITATIONAL_CONSTANT / orbitRadiusMeters);
  }

  /**
   * Computes Doppler shift based on relative velocity vector
   * @param {number} carrierFrequencyHz - Transmitted frequency
   * @param {number} altitudeKm - Orbit altitude in km
   * @param {number} elevationAngleDeg - Current angle from observer to satellite
   * @returns {Object} Doppler metrics
   */
  static computeDoppler(carrierFrequencyHz, altitudeKm, elevationAngleDeg) {
    const vOrbit = this.getOrbitalVelocity(altitudeKm);
    const elevationRad = (elevationAngleDeg * Math.PI) / 180;

    // Approximate maximum line-of-sight velocity projection
    const relativeVelocityMs = vOrbit * Math.cos(elevationRad);
    const maxDopplerShiftHz = (relativeVelocityMs / SPEED_OF_LIGHT) * carrierFrequencyHz;
    const dopplerPpm = (maxDopplerShiftHz / carrierFrequencyHz) * 1e6;

    return {
      orbitalVelocityKmS: parseFloat((vOrbit / 1000).toFixed(3)),
      maxDopplerShiftHz: parseFloat(maxDopplerShiftHz.toFixed(2)),
      dopplerPpm: parseFloat(dopplerPpm.toFixed(2)),
      compensatedFrequencyHz: carrierFrequencyHz - maxDopplerShiftHz
    };
  }
}

module.exports = DopplerEngine;
