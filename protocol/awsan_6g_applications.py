#!/usr/bin/env python3
"""
================================================================================
AWSAN-6G-NTN ADVANCED APPLICATION ENGINE (IMT-2030 / 6G USE CASES)
================================================================================
Author: Eng. Awsan Adel Abdulbari Ahmed Sultan
National ID: 01010305468 | Phone: +967 777852433 | Sana'a, Yemen
Repository: https://github.com/awsanadelabdulbariahmedsultan-art/Awsan-Communication-6G
================================================================================
"""

from enum import IntEnum
from typing import Dict, Any, Tuple


class ApplicationDomain(IntEnum):
    EXTENDED_REALITY_HOLOGRAPHIC = 1  # XR & Immersive Communications
    EMBEDDED_AI_NETWORKING = 2        # AI-Native Self-Optimization & RAN Fabric
    DIGITAL_TWIN_SYNCHRONIZATION = 3  # Smart Cities, Industrial & Bio Digital Twins
    AUTONOMOUS_MOBILITY_ROBOTICS = 4  # CAVs, Drone Delivery & Swarm Robotics
    THREE_DIMENSIONAL_NTN_MESH = 5   # Space-Air-Ground 3D Coverage
    INTEGRATED_SENSING_COMM = 6       # ISAC: Network as a Sensor & Remote Sensing


class ApplicationProfileRegistry:
    """
    Defines KPI requirements for each 6G application domain under IMT-2030 specs.
    """
    PROFILES = {
        ApplicationDomain.EXTENDED_REALITY_HOLOGRAPHIC: {
            "name": "Extended Reality (XR) & Holographic Telepresence",
            "max_latency_ms": 1.0,
            "min_throughput_gbps": 100.0,
            "reliability_percent": 99.999,
            "preferred_layer": "TERRESTRIAL_HIGH_BAND"
        },
        ApplicationDomain.EMBEDDED_AI_NETWORKING: {
            "name": "Embedded Native AI & Self-Healing RAN Fabric",
            "max_latency_ms": 2.0,
            "min_throughput_gbps": 10.0,
            "reliability_percent": 99.999,
            "preferred_layer": "DISTRIBUTED_EDGE_CORE"
        },
        ApplicationDomain.DIGITAL_TWIN_SYNCHRONIZATION: {
            "name": "Real-Time Digital Twins & Predictive Modeling",
            "max_latency_ms": 5.0,
            "min_throughput_gbps": 25.0,
            "reliability_percent": 99.999,
            "preferred_layer": "HYBRID_FIBER_SATELLITE"
        },
        ApplicationDomain.AUTONOMOUS_MOBILITY_ROBOTICS: {
            "name": "Autonomous Mobility, Connected Vehicles & Swarm Robotics",
            "max_latency_ms": 1.0,
            "min_throughput_gbps": 5.0,
            "reliability_percent": 99.99999,  # Ultra-Reliable
            "preferred_layer": "URLLC_PREEMPTIVE"
        },
        ApplicationDomain.THREE_DIMENSIONAL_NTN_MESH: {
            "name": "Space-Air-Ground 3D Ubiquitous Coverage",
            "max_latency_ms": 25.0,  # Realistic for LEO slant range
            "min_throughput_gbps": 1.0,
            "reliability_percent": 99.99,
            "preferred_layer": "LEO_SATELLITE_SPOT_BEAM"
        },
        ApplicationDomain.INTEGRATED_SENSING_COMM: {
            "name": "Integrated Sensing and Communication (ISAC)",
            "max_latency_ms": 1.0,
            "min_throughput_gbps": 10.0,
            "reliability_percent": 99.999,
            "preferred_layer": "JOINT_RADAR_COMMS_CARRIER"
        }
    }

    @classmethod
    def evaluate_traffic_compliance(cls, domain: ApplicationDomain,
                                    measured_latency_ms: float,
                                    available_throughput_gbps: float) -> Tuple[bool, str]:
        profile = cls.PROFILES.get(domain)
        if not profile:
            return False, "Unknown application domain."

        latency_ok = measured_latency_ms <= profile["max_latency_ms"]
        throughput_ok = available_throughput_gbps >= profile["min_throughput_gbps"]

        if latency_ok and throughput_ok:
            return True, f"Nominal: Meets {profile['name']} specifications."
        
        reasons = []
        if not latency_ok:
            reasons.append(f"Latency ({measured_latency_ms} ms > {profile['max_latency_ms']} ms limit)")
        if not throughput_ok:
            reasons.append(f"Throughput ({available_throughput_gbps} Gbps < {profile['min_throughput_gbps']} Gbps required)")
        
        return False, f"Degraded: {' and '.join(reasons)}. Rerouting or adaptive compression required."


# ==============================================================================
# SELF-TEST RUNNER
# ==============================================================================

if __name__ == "__main__":
    print("=" * 80)
    print("  AWSAN-6G-NTN APPLICATION ENGINE VERIFICATION (6 USE-CASE PILLARS)")
    print("  Author: Eng. Awsan Adel Abdulbari Ahmed Sultan | ID: 01010305468")
    print("=" * 80)

    for domain in ApplicationDomain:
        prof = ApplicationProfileRegistry.PROFILES[domain]
        print(f"\n[+] Domain: {prof['name']}")
        print(f"    • Target Latency: < {prof['max_latency_ms']} ms")
        print(f"    • Min Throughput: > {prof['min_throughput_gbps']} Gbps")
        print(f"    • Reliability: {prof['reliability_percent']}% | Preferred Layer: {prof['preferred_layer']}")

    # Verification Simulation
    print("\n--- Testing Traffic Evaluation Scenarios ---")
    valid_cav, msg_cav = ApplicationProfileRegistry.evaluate_traffic_compliance(
        ApplicationDomain.AUTONOMOUS_MOBILITY_ROBOTICS, measured_latency_ms=0.8, available_throughput_gbps=10.0
    )
    print(f"• Autonomous Vehicles Check: {valid_cav} | {msg_cav}")

    valid_isac, msg_isac = ApplicationProfileRegistry.evaluate_traffic_compliance(
        ApplicationDomain.INTEGRATED_SENSING_COMM, measured_latency_ms=0.5, available_throughput_gbps=15.0
    )
    print(f"• ISAC Radar-Sensing Check: {valid_isac} | {msg_isac}")

    print("\n[✔] 6G Application Engine Successfully Initialized and Verified.")
