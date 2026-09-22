<!-- =========================================================================
   INTELLECTUAL PROPERTY & COPYRIGHT NOTICE
   =========================================================================
   Project Name: Awsan Communication Global Hub (6G Advanced Security & NTN Edition)
   Description : تحليل وتطبيق شبكات الجيل السادس غير الأرضية (إصدار تجريبي مكتمل)
   Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
   Location    : Yemen
   National ID : 01010305468
   Contact Tel : +967 777852433
   
   Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
   ========================================================================= -->

# Awsan Communication Global Hub (6G Advanced Security & NTN Edition)

**Chief Systems Engineer:** Eng. Awsan Adel Abdulbari Ahmed Sultan  
**National ID:** 01010305468 | **Country:** YEMEN | **Contact:** +967 777852433  
**Certification:** Expert-Level Network Configuration, 6G Architecture & NTN Space-Ground Integration  
**Edition:** Complete Experimental Edition (إصدار تجريبي مكتمل)

---

## 🛰️ 1. Executive Summary & 6G NTN Architecture

**Awsan Communication Global Hub** implements a unified **Space-Air-Ground Integrated Network (SAGIN)** topology. Rather than treating satellite communications as an isolated vertical solution, this project integrates low Earth orbit (LEO) satellites as an extended **Radio Access Network (RAN)** layer connected seamlessly to a 6G Service-Based Core.

The architecture addresses direct satellite-to-smartphone connectivity (**Direct-to-Device - D2D**), allowing standard user devices (UE) to establish links with orbiting satellites when terrestrial cellular towers are out of reach or disrupted by natural disasters.

---

## 🔬 2. Four Core NTN Physical & Engineering Challenges

Based on the physical and standard considerations of 6G NTN, the project incorporates computational models resolving the four primary direct-to-cell bottlenecks:

1. **User Equipment (UE) Hardware Constraints:** Standard smartphones utilize low-power transmitters (~23 dBm / 200 mW) and omnidirectional antennas (0 dBi). The system models link margins to compensate for body loss, indoor penetration loss, and foliage attenuation.
2. **Radio Channel Physics & Free-Space Path Loss (FSPL):** Overcoming slant distances ranging from 500 km to over 1200 km through dynamic link budget optimization.
3. **High LEO Orbital Dynamics & Rapid Doppler Shift:** LEO satellites orbit at velocities of ~7.5 km/s, inducing severe Doppler frequency shifts ($\approx \pm 40\text{ kHz}$ at 2 GHz). The Doppler engine pre-compensates for frequency offsets and jitter.
4. **Predictive Handover & Traffic Orchestration:** Multi-connectivity handovers between moving satellite spot beams and terrestrial base stations (gNodeB) driven by AI decision engines.

---

## 🌐 3. Tech Stack, Security & Protocols

### 🛰️ 6G Non-Terrestrial Network Modules (`core-ntn/`)
* **Link Budget Calculator (`link_budget.js`):** Computes FSPL, antenna gains (Tx/Rx), atmospheric loss, and thermal noise ($kTB$) to guarantee link viability.
* **Doppler Compensation Engine (`doppler_engine.js`):** Simulates LEO orbital velocities, Doppler shifts in Hz and PPM, and carrier frequency pre-compensation.
* **Handover Orchestrator (`handoff_orchestrator.js`):** Evaluates device RSRP, satellite elevation angles, and QoS priority (Emergency SOS vs. Data stream) to steer traffic.

### 🔒 Advanced Security & Zero-Trust Infrastructure
* **Post-Quantum Cryptography (PQC):** Hardened against quantum cryptanalysis threats.
* **DNS-over-TLS (DoT) & DoH:** Ultra-fast encrypted domain name resolution.
* **AI-Driven Threat Detection & DDoS Shield:** Real-time edge filtering compliant with RFC 8482.

### ⚡ Next-Gen Transport, IP & Network Slicing
* **Google Public DNS IPv4:** `8.8.8.8` | `8.8.4.4` (Sub-THz optimized).
* **Google Public DNS IPv6:** `2001:4860:4860::8888` | `2001:4860:4860::8844`.
* **Network Slicing:** Dedicated virtual slices for low-latency emergency messaging, sensor telemetry, and high-throughput data.
* **Connection Topology:** Permanent AI-optimized fiber/satellite hybrid mesh.

### 🔗 Domain & Backend Resolvers
* **Project Domain:** `awsandew.world.com`
* **Backend Resolver:** `dns.google` (`8.8.8.8`) configured under a Zero-Trust 6G framework.

---

## 📡 4. 6G NTN REST API Endpoints

The central application server (`server.js`) exposes real-time endpoints on port `8080`:

| Method | Endpoint | Function & Description |
| :--- | :--- | :--- |
| `GET` | `/` | Web Management Dashboard (Live Status, Nodes, Latency, and NTN Link Card). |
| `GET` | `/api/ntn/status` | Reports system health, active 3GPP Rel-18 capabilities, and orchestrator status. |
| `POST` | `/api/ntn/link-budget` | Computes physical link margin, FSPL, received power ($P_{rx}$), and SNR. |
| `POST` | `/api/ntn/doppler` | Calculates orbital velocity, Doppler shift (Hz / PPM), and compensated frequency. |
| `POST` | `/api/ntn/orchestrate` | Analyzes device telemetry to execute autonomous handovers between terrestrial and LEO layers. |

---

## 📁 5. Complete Repository Hierarchy & Detailed Dependency Tree

```text
Awsan-Communication-6G/
│
├── workflows/
│   └── ci.yml                              # Continuous Integration & Automated Tests
│
├── core-ntn/                               # 6G Non-Terrestrial Network Logic & Physics
│   ├── link_budget.js                      # Link Budget & Path Loss Equations
│   ├── doppler_engine.js                   # Orbital Velocity & Doppler Pre-compensation
│   └── handoff_orchestrator.js             # Predictive Handover & Steering Engine
│
├── docs/                                   # Standards & Architecture Documentation
│   ├── architecture.md                     # 3D SAGIN Unified Architecture
│   └── 3gpp-specifications.md              # 3GPP Rel-17/18 & 6G Standards Roadmap
│
├── tests/                                  # Automated Test Suite
│   └── ntn_models.test.js                  # Physical Verification & Model Tests
│
├── node_modules/                           # Deployed Runtime & Express Ecosystem
│   ├── accepts/                            # HTTP Accept-* Header Parser
│   ├── body-parser/                        # Request Body Parsing Middleware
│   ├── bytes/                              # Byte String Conversion Utilities
│   ├── call-bind-apply-helpers/            # JS Function Bind & Apply Helpers
│   ├── call-bound/                         # Robust Prototype Call Binders
│   ├── content-disposition/                # Content-Disposition Header Parser
│   ├── content-type/                       # Content-Type Header Formatter
│   ├── cookie/                             # HTTP Cookie Serializer & Parser
│   ├── cookie-signature/                   # Cookie Cryptographic Signer
│   ├── debug/                              # Small Debugging Utility
│   ├── depd/                               # Deprecation Warning Utility
│   ├── dunder-proto/                       # __proto__ Object Access Helper
│   ├── ee-first/                           # Event Emitter First Listener
│   ├── encodeurl/                          # URL Encoder Utility
│   ├── es-define-property/                 # Object.defineProperty Wrapper
│   ├── es-errors/                          # Standard ECMAScript Error Generators
│   ├── es-object-atoms/                    # Fundamental ES Object References
│   ├── escape-html/                        # HTML Escaper for XSS Defense
│   ├── etag/                               # HTTP ETag Generator
│   ├── express/                            # Central HTTP & API Routing Framework
│   ├── finalhandler/                       # Out-of-middleware Response Responder
│   ├── forwarded/                          # Client Address Forwarding Parser
│   ├── fresh/                              # HTTP Cache Freshness Testing
│   ├── function-bind/                      # Standard Function.prototype.bind
│   ├── get-intrinsic/                      # Robust Core JS Intrinsics Resolver
│   ├── get-proto/                          # Object Prototype Retriever
│   ├── gopd/                               # Object Property Descriptor Getter
│   ├── has-symbols/                        # JavaScript Symbol Support Detector
│   ├── hasown/                             # Object.prototype.hasOwnProperty Helper
│   ├── http-errors/                        # HTTP Standard Error Constructor
│   ├── iconv-lite/                         # Character Encoding & Conversion
│   ├── inherits/                           # Prototype Inheritance Utility
│   ├── ipaddr.js/                          # IPv4 and IPv6 Manipulation Engine
│   ├── is-promise/                         # ES6 Promise Type Checking
│   ├── math-intrinsics/                    # Math Built-in Operations Helper
│   ├── media-typer/                        # MIME Media Type Analyzer
│   ├── merge-descriptors/                  # Object Descriptor Merger
│   ├── mime-db/                            # Comprehensive MIME Type Database
│   ├── mime-types/                         # Content-Type and Extension Mappings
│   ├── ms/                                 # Millisecond Parsing & Formatting
│   ├── negotiator/                         # HTTP Content Negotiation Library
│   ├── object-inspect/                     # String Representation of Objects
│   ├── on-finished/                        # HTTP Request Completion Listener
│   ├── once/                               # Single-execution Function Wrapper
│   ├── parseurl/                           # Fast URL Memoized Parser
│   ├── path-to-regexp/                     # Express Path to Regular Expression Compiler
│   ├── proxy-addr/                         # Proxy-aware Remote IP Filter
│   ├── qs/                                 # Query String Parser with Nesting Support
│   ├── range-parser/                       # HTTP Range Header Parser
│   ├── raw-body/                           # Stream-to-Buffer Body Reader
│   ├── router/                             # Express Core Routing Engine
│   ├── safer-buffer/                       # Safe Polyfill for Buffer Allocations
│   ├── send/                               # Static File Streaming Engine
│   ├── serve-static/                       # Static File Serving Middleware
│   ├── setprototypeof/                     # Object.setPrototypeOf Polyfill
│   ├── side-channel/                       # Safe Side-channel Storage Provider
│   ├── side-channel-list/                  # List Implementation for Side-channels
│   ├── side-channel-map/                   # Map Implementation for Side-channels
│   ├── side-channel-weakmap/               # WeakMap Implementation for Side-channels
│   ├── statuses/                           # HTTP Status Code Lookup Table
│   ├── toidentifier/                       # String to JS Identifier Sanitizer
│   ├── type-is/                            # Request Content-Type Validator
│   ├── unpipe/                             # Stream Unpiping Engine
│   ├── vary/                               # HTTP Vary Header Manipulator
│   ├── wrappy/                             # Function Wrapper Callback Utility
│   └── .package-lock.json                  # Local Dependencies Lock State
│
├── server.js                               # Master Application Server & NTN REST API
├── index.js                                # Application Entry Point
├── advanced-dns-config.md                  # Advanced DNS-over-TLS & DoH Specifications
├── auto_sync.sh                            # Automated Background Synchronization Script
├── sync.sh                                 # Manual Git Synchronization Script
├── package.json                            # Project Metadata, Scripts & Dependency Manifest
├── package-lock.json                       # Deterministic Dependency Version Tree
├── License                                 # Software Licensing & Terms
├── .gitignore                              # Git Exclusions Configuration
├── nohup.out                               # Background Execution Runtime Output
└── README.md                               # Master Project Documentation
