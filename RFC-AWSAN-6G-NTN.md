# RFC-AWSAN-6G-NTN: Unified Space-Air-Ground Direct-to-Device 6G Protocol Specification

- **Document Identifier:** RFC-AWSAN-6G-NTN-0001
- **Category:** Standards Track / Open Telecommunications Standard
- **Author & Chief Architect:** Eng. Awsan Adel Abdulbari Ahmed Sultan
- **National ID:** 01010305468
- **Contact:** +967 777852433 | Sana'a, Yemen
- **Email:** awsan.sultan@gmail.com
- **Profile:** [LinkedIn Profile](https://www.linkedin.com/in/awsan-adel-abdulbari-ahmed-sultan-8aa5a1a9)
- **Status:** Proposed Global Standard (Release 1.5)
- **Reference Implementation:** [Awsan-Communication-6G](https://github.com/awsanadelabdulbariahmedsultan-art/Awsan-Communication-6G)

---

## 1. Abstract
This specification defines the **Awsan-6G-NTN Protocol**, a unified open standard enabling robust Direct-to-Device (D2D) communications between unmodified commercial handheld mobile devices and Low Earth Orbit (LEO) satellite constellations. It formalizes a 24-byte binary network header, 3GPP Release 18/19 physical propagation modeling, high-velocity orbital Doppler frequency pre-compensation, predictive Multi-RAT handover orchestration, and an autonomous AI-native self-evolution engine governed by a cryptographic Author Root of Trust.

---

## 2. Conventions and Terminology
The key words "**MUST**", "**MUST NOT**", "**REQUIRED**", "**SHALL**", "**SHALL NOT**", "**SHOULD**", "**SHOULD NOT**", "**RECOMMENDED**", and "**MAY**" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

* **UE (User Equipment):** Standard 3GPP Class 3 commercial handheld smartphone.
* **LEO (Low Earth Orbit):** Non-geostationary orbital satellites orbiting between 500 km and 1200 km above Earth's surface.
* **NTN (Non-Terrestrial Networks):** Networks or segments of networks using spaceborne or airborne vehicles.
* **FSPL (Free-Space Path Loss):** Geometric attenuation of an electromagnetic wave propagating through free space.
* **PQC (Post-Quantum Cryptography):** Quantum-resistant encryption and digital signature algorithms.

---

## 3. Physical Layer & Channel Propagation Models

### 3.1 Handheld Constraints
* Direct-to-Device User Equipment (UE) transmit power is defined at **23 dBm (200 mW)** under 3GPP Class 3 standard specifications.
* The UE antenna **MUST** be modeled as an isotropic radiator with equivalent gain of **0 dBi**.
* Implementations **SHOULD** allocate a minimum link margin of **3.0 dB** to account for human body shielding and foliage loss.

### 3.2 Free-Space Path Loss (FSPL) Formula
The receiver link budget engine **MUST** calculate path attenuation using:
$$FSPL(d, f) = 20 \log_{10}(d) + 20 \log_{10}(f) - 147.55 \text{ dB}$$
Where:
* $d$ is the slant range between the handheld device and the satellite in meters ($m$).
* $f$ is the carrier frequency in Hertz ($Hz$) across authorized 3GPP S-band (e.g., 2.0 GHz) or L-band allocations.

### 3.3 Thermal Noise & Receiver Sensitivity
Thermal noise floor power ($N$) **MUST** be computed using Boltzmann's constant:
$$N = k \cdot T \cdot B \text{ (Watts)}$$
Where:
* $k = 1.380649 \times 10^{-23} \text{ J/K}$ (Boltzmann constant).
* $T = 290 \text{ K}$ (Standard noise temperature).
* $B$ is the channel bandwidth in Hertz (typically $10 \text{ MHz}$).

A link **SHALL** be declared viable for 3GPP direct synchronization if the calculated Signal-to-Noise Ratio (SNR) satisfies:
$$SNR = P_{rx} - N_{dBm} \ge 2.0 \text{ dB}$$

---

## 4. LEO High-Velocity Dynamics & Doppler Pre-Compensation

### 4.1 Orbital Velocities
Because LEO satellites traverse orbit at circular velocities of approximately $v_{orbit} \approx 7.5 \text{ km/s}$ at an altitude of $600 \text{ km}$, they generate severe Doppler frequency shifts of up to $\pm 40 \text{ kHz}$ at a $2.0 \text{ GHz}$ carrier frequency.

### 4.2 Doppler Shift Mathematical Formulation
Base stations and satellite payloads **MUST** calculate real-time Doppler frequency offsets using:
$$\Delta f = \left( \frac{\vec{v}_{rel} \cdot \vec{r}}{c \Vert{}\vec{r}\Vert{}} \right) f_c$$
Where:
* $\vec{v}_{rel}$ is the relative velocity vector between the satellite and the ground terminal ($m/s$).
* $\vec{r}$ is the relative position vector ($m$).
* $c = 299,792,458 \text{ m/s}$ (Speed of light).
* $f_c$ is the carrier frequency ($Hz$).

### 4.3 Subcarrier Spacing (SCS) Numerologies
To preserve subcarrier orthogonality under Doppler stress, network operators **SHOULD** utilize $\mu = 1$ ($SCS = 30 \text{ kHz}$) or $\mu = 2$ ($SCS = 60 \text{ kHz}$) numerologies during high-elevation passes.

---

## 5. Binary Frame Specification

All Awsan-6G-NTN protocol packets **MUST** start with a fixed 24-byte binary header transmitted in Network Byte Order (Big-Endian):

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Magic: "AW6G" (0x41573647)              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|    Version    |  Packet Type  |   QoS Class   |     Flags     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Unix Timestamp                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Payload Length                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     SHA-256 Token (First 4 Bytes)             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Payload Data ...                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
