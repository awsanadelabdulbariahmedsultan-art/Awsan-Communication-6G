<!-- =========================================================================
   INTELLECTUAL PROPERTY & COPYRIGHT NOTICE
   =========================================================================
   Project Name: Awsan Communication Global Hub (6G NTN Edition)
   Document    : 6G Non-Terrestrial Network (NTN) System Architecture
   Edition     : Complete Experimental Edition (إصدار تجريبي مكتمل)
   Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
   Location    : Yemen | National ID: 01010305468 | Tel: +967 777852433
   Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
   ========================================================================= -->

# 6G Non-Terrestrial Network (NTN) Architecture & SAGIN Topology

## 1. Architectural Overview
The Awsan-Communication-6G architecture implements a **Space-Air-Ground Integrated Network (SAGIN)** model. Rather than treating satellite communications as an isolated vertical solution, satellites function as an integrated **Radio Access Network (RAN)** layer connected to a unified 6G Service-Based Core.

## 2. Multi-Layer Hierarchy
1. **Terrestrial Tier (Ground Layer):** Traditional gNodeB base stations, sub-THz micro-cells, and fiber backbones.
2. **Aerial Tier (HAPS Layer):** High-Altitude Platform Stations (drones and stratospheric balloons) providing regional coverage during disasters.
3. **Space Tier (Non-Terrestrial Layer):** Low Earth Orbit (LEO) constellations operating at 500–1200 km, serving as high-mobility base stations directly to standard user equipment (UE).

## 3. Core Functional Modules
* **Link Budget Engine (`core-ntn/link_budget.js`):** Models real-time radio propagation loss, atmospheric absorption, and antenna beam gains.
* **Doppler Compensation Engine (`core-ntn/doppler_engine.js`):** Compensates for rapid orbital velocity shifts (~7.5 km/s).
* **Predictive Handover Orchestrator (`core-ntn/handoff_orchestrator.js`):** Determines data path routing between terrestrial cell towers and orbiting satellites without user intervention.
