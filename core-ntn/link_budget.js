/* =========================================================================
   INTELLECTUAL PROPERTY & COPYRIGHT NOTICE
   =========================================================================
   Project Name: Awsan Communication Global Hub (6G NTN Edition)
   Module      : Link Budget & Physical Radio Propagation Analysis
   Edition     : Complete Experimental Edition (إصدار تجريبي مكتمل)
   Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
   Location    : Yemen
   National ID : 01010305468
   Contact Tel : +967 777852433
   
   Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
   ========================================================================= */

const SPEED_OF_LIGHT = 299792458; // m/s
const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K

class LinkBudgetCalculator {
  /**
   * Calculates Free Space Path Loss (FSPL) in dB
   * @param {number} distanceMeters - Distance between UE and Satellite in meters
   * @param {number} frequencyHz - Carrier frequency in Hz
   * @returns {number} FSPL in dB
   */
  static calculateFSPL(distanceMeters, frequencyHz) {
    if (distanceMeters <= 0 || frequencyHz <= 0) {
      throw new Error("Distance and frequency must be positive values.");
    }
    const fsplLinear = (4 * Math.PI * distanceMeters * frequencyHz) / SPEED_OF_LIGHT;
    return 20 * Math.log10(fsplLinear);
  }

  /**
   * Evaluates end-to-end Direct-to-Device Link Budget
   * @param {Object} params - Input transmission parameters
   * @returns {Object} Link budget outcome metrics
   */
  static evaluateLink(params) {
    const {
      frequencyHz = 2.0e9,             // 2 GHz (3GPP S-band)
      altitudeKm = 600,                // LEO orbit altitude (600 km)
      elevationAngleDeg = 45,          // Elevation angle above horizon
      txPowerDbm = 23,                 // Typical phone max Tx power (200 mW / 23 dBm)
      txAntennaGainDbi = 0,            // Phone isotropic/omnidirectional antenna
      rxAntennaGainDbi = 30,           // Satellite phased-array spot beam gain
      bandwidthHz = 180e3,             // 180 kHz (1 PRB in 3GPP NB-IoT/NTN)
      noiseFigureDb = 5.0,             // Receiver Noise Figure
      atmosphericLossDb = 0.5,         // Atmospheric attenuation
      polarizationLossDb = 3.0,        // Polarization mismatch loss
      bodyLossDb = 3.0,                // Human body shadowing loss
      requiredSnrDb = -5.0             // Minimum SNR threshold for detection
    } = params;

    // Slant range calculation from elevation angle
    const earthRadiusKm = 6371;
    const phi = (elevationAngleDeg * Math.PI) / 180;
    const distanceKm = Math.sqrt(
      Math.pow(earthRadiusKm * Math.sin(phi), 2) + 2 * earthRadiusKm * altitudeKm + Math.pow(altitudeKm, 2)
    ) - earthRadiusKm * Math.sin(phi);

    const distanceMeters = distanceKm * 1000;
    const fsplDb = this.calculateFSPL(distanceMeters, frequencyHz);
    const totalLossDb = fsplDb + atmosphericLossDb + polarizationLossDb + bodyLossDb;

    // Received Power (Prx)
    const rxPowerDbm = txPowerDbm + txAntennaGainDbi + rxAntennaGainDbi - totalLossDb;

    // Thermal Noise (N = k * T * B) at 290 K
    const thermalNoiseDbm = -174 + 10 * Math.log10(bandwidthHz) + noiseFigureDb;

    // Signal to Noise Ratio (SNR)
    const snrDb = rxPowerDbm - thermalNoiseDbm;
    const linkMarginDb = snrDb - requiredSnrDb;

    return {
      slantDistanceKm: parseFloat(distanceKm.toFixed(2)),
      fsplDb: parseFloat(fsplDb.toFixed(2)),
      totalLossDb: parseFloat(totalLossDb.toFixed(2)),
      rxPowerDbm: parseFloat(rxPowerDbm.toFixed(2)),
      thermalNoiseDbm: parseFloat(thermalNoiseDbm.toFixed(2)),
      snrDb: parseFloat(snrDb.toFixed(2)),
      linkMarginDb: parseFloat(linkMarginDb.toFixed(2)),
      isLinkViable: linkMarginDb >= 0
    };
  }
}

module.exports = LinkBudgetCalculator;
