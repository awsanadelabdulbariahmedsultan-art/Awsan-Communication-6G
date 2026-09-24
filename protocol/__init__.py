"""
================================================================================
AWSAN-6G-NTN PROTOCOL SUITE - PACKAGE INITIALIZER
================================================================================
Project Name: Awsan Communication Global Hub (6G NTN Edition)
Module      : Protocol Package API Exposure
Specification: RFC-AWSAN-6G-NTN-0001
Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
Location    : Yemen | National ID: 01010305468 | Tel: +967 777852433
Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
================================================================================
"""

from .awsan_6g_unified_protocol import (
    # Core Framing & Constants
    AWSAN_MAGIC_BYTES,
    CURRENT_PROTOCOL_VERSION,
    Awsan6GPacket,
    
    # Enums
    PacketType,
    QoSClass,
    LinkState,
    OrganizationType,
    
    # Mathematical & Physical Engines
    PhysicalLayerEngine,
    PredictiveHandoverOrchestrator,
    
    # AI & Security Governance
    SecurityAuthority,
    AwsanAIAutonomousProtocolAgent,
    ProtocolAutoUpdateLedger,
    ProtocolUpdateRecord,
    
    # Master Node
    Awsan6GUnifiedNode
)

__version__ = "1.5.0"
__author__ = "Eng. Awsan Adel Abdulbari Ahmed Sultan"
__standard__ = "RFC-AWSAN-6G-NTN-0001"
__all__ = [
    "AWSAN_MAGIC_BYTES",
    "CURRENT_PROTOCOL_VERSION",
    "Awsan6GPacket",
    "PacketType",
    "QoSClass",
    "LinkState",
    "OrganizationType",
    "PhysicalLayerEngine",
    "PredictiveHandoverOrchestrator",
    "SecurityAuthority",
    "AwsanAIAutonomousProtocolAgent",
    "ProtocolAutoUpdateLedger",
    "ProtocolUpdateRecord",
    "Awsan6GUnifiedNode"
]
