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

```

---

## 📦 5.1 Protocol Packet Types Specification

The **Awsan-6G-NTN** protocol defines 9 discrete operational packet types over a unified 24-byte binary network header:

| Opcode | Packet Type Identifier | Direction | Functional Purpose & Payload Specification |
| :---: | :--- | :---: | :--- |
| `0x01` | **BEACON** | LEO ➔ UE | Satellite orbital ephemeris, beam footprint ID, and synchronization timing. |
| `0x02` | **TELEMETRY_REPORT** | UE ➔ Network | Handheld RF telemetry (RSRP, RSRQ, carrier frequency Doppler estimate). |
| `0x03` | **HANDOVER_REQUEST** | UE ➔ Core | Multi-RAT migration request triggered by deteriorating terrestrial links. |
| `0x04` | **HANDOVER_COMMAND** | Core ➔ UE | Target cell execution directive and beam frequency assignment. |
| `0x05` | **EMERGENCY_SOS** | UE ➔ Space/TN | Mission-critical distress telemetry (preempts all network queues). |
| `0x06` | **USER_PLANE_DATA** | Bi-Directional | Standard broadband data payloads and encapsulated IPv6 packets. |
| `0x07` | **PQC_KEY_EXCHANGE** | Bi-Directional | Post-Quantum key agreement frame utilizing Dilithium-5 tokens. |
| `0x08` | **OTA_UPDATE_PROPOSAL** | AI ➔ Gateway | Machine-generated protocol adaptation proposal derived from live telemetry. |
| `0x09` | **OTA_UPDATE_COMMIT** | Core ➔ Fleet | Cryptographically signed protocol commit broadcast to ground & space nodes. |

---

## 🚦 5.2 Quality of Service (QoS) Classes & Queue Scheduling

To comply with 3GPP mission-critical mandates, traffic is sorted across four strict priority queues:

| Class ID | QoS Priority Level | Preemption Policy | Target Latency | Application / Traffic Type |
| :---: | :--- | :---: | :---: | :--- |
| `0x00` | **EMERGENCY_MISSION_CRITICAL** | Preempts All | $< 5\text{ ms}$ | Emergency SOS, humanitarian distress, and disaster alerts. |
| `0x01` | **CONTROL_SIGNALING** | Strict Priority | $< 15\text{ ms}$ | Handover commands, PQC authentication, and orbital beam steering. |
| `0x02` | **VOICE_STREAM** | Bounded Jitter | $\le 20\text{ ms}$ | Real-time conversational voice and interactive audio feeds. |
| `0x03` | **BROADBAND_DATA** | Best-Effort | Elastic | General web browsing, sensor telemetry, and background sync. |




---

---

## 🔄 6. Multi-RAT Predictive Handover & Protocol State Machine

The handover engine prevents ping-pong effects using adaptive hysteresis timers ($T_{hyst} = 3.0\text{ s}$) while maintaining continuous connectivity across fast-moving LEO spot beams (~7.5 km/s).

### 📋 State Definitions & Transition Matrix

| State Name | State ID | Channel Conditions & Triggers | Active Radio Layer | Next Transition |
| :--- | :---: | :--- | :--- | :--- |
| **DISCONNECTED** | `0` | No viable terrestrial or satellite signal detected. | None (Scanning) | ➔ `TERRESTRIAL_CONNECTED` when $RSRP_{TN} \ge -105\text{ dBm}$ |
| **TERRESTRIAL_CONNECTED** | `1` | High-speed terrestrial cellular coverage available. | Terrestrial gNodeB | ➔ `LEO_TRACKING` when $RSRP_{TN} < -112\text{ dBm}$ |
| **LEO_TRACKING** | `2` | Terrestrial link degrading; acquiring LEO satellite beacon. | Dual-Scan (TN + LEO) | ➔ `LEO_CONNECTED` when Elev $\ge 15^\circ$ & $RSRP_{LEO} \ge -118\text{ dBm}$ |
| **HANDOVER_IN_PROGRESS** | `3` | Multi-RAT link switching and bearer migration executing. | Carrier Transition | ➔ Confirms target connection state |
| **LEO_CONNECTED** | `4` | Terminal actively routing traffic via orbiting LEO satellite. | LEO Satellite Beam | ➔ `TERRESTRIAL_CONNECTED` when terrestrial signal recovers |
| **FAILOVER_EMERGENCY** | `5` | Emergency SOS trigger active during network blackout. | Emergency Channel | Prioritizes strongest viable link ($RSRP \ge -120\text{ dBm}$) |

### 🚨 Emergency SOS Zero-Latency Preemption Rule:
Whenever an `EMERGENCY_SOS` frame (`0x05`) is triggered, the state machine **bypasses all hysteresis timers and queue delays**, establishing immediate transmission over the strongest available carrier ($RSRP_{TN} \ge -115\text{ dBm}$ or $RSRP_{LEO} \ge -120\text{ dBm}$).


---



---

## 🤖 7. AI-Driven Autonomous Protocol Self-Evolution Engine

An embedded **Cognitive Reasoning Agent** (`Awsan-6G-Cognitive-Reasoner`) continuously parses space-ground telemetry to autonomously self-heal and adapt the protocol:

1. **Doppler Stress Mitigation:** If carrier frequency drift exceeds $\pm 45\text{ kHz}$, the AI engine expands Subcarrier Spacing (SCS) from $15\text{ kHz}$ to $30\text{ kHz}$ to maintain subcarrier orthogonality.
2. **Scintillation Adaptation:** If packet loss rate ($PLR$) exceeds $5\%$, the engine triggers Adaptive Modulation and Coding (AMC) gear-up, increasing LDPC parity redundancy.
3. **Automated OTA Synthesis:** Directives are packaged into `OTA_UPDATE_COMMIT` frames and deployed to ground gateways and satellite payloads without human delay.

---

## 🔐 8. Cryptographic Governance & Master Root of Trust

To prevent rogue protocol deployment across commercial carrier networks, all protocol upgrade commits are cryptographically verified against the **Author Master Root of Trust**:

* **Root of Trust Authority:** Eng. Awsan Adel Abdulbari Ahmed Sultan
* **Registered National ID:** `01010305468`
* **Cryptographic Verification:** Evaluated via constant-time `HMAC-SHA256` digest comparison against the pre-compiled Author Root Hash.
* **Post-Quantum Cryptography (PQC):** Updates are signed using quantum-resistant signature tokens (`PQC-DILITHIUM5`).
* **Immutable Audit Ledger:** All deployed patches are logged with UTC timestamps, version tags, and cryptographic hashes in an immutable registry.

---

---

## 🛡️ 9. Security & RFC 8482 Anti-Amplification Compliance

Edge gateways and space transponders enforce strict Zero-Trust boundaries:

* **RFC 8482 Defense:** Incoming DNS queries of type `ANY` are blocked and returned as minimal `HINFO` responses, neutralizing reflection/amplification DDoS attacks against satellite backhaul links.
* **Header Integrity:** Corrupted or modified payloads are discarded via constant-time SHA-256 integrity token validation.
* **Zero-Trust Boundary:** All incoming packets from untrusted ground or aerial terminals undergo cryptographic signature verification before reaching core processing layers.

---

## 👤 10. Chief Architect & Author Information

* **Lead Systems & 6G Network Architect:** Eng. Awsan Adel Abdulbari Ahmed Sultan
* **National ID:** `01010305468` | **Location:** Sana'a, Yemen
* **Phone / WhatsApp:** `+967 777852433` | **Email:** `awsan.sultan@gmail.com`
* **Professional Profile:** [Eng. Awsan Adel Sultan on LinkedIn](https://www.linkedin.com/in/awsan-adel-abdulbari-ahmed-sultan-8aa5a1a9)
* **Standard Specification:** [RFC-AWSAN-6G-NTN-0001](./RFC-AWSAN-6G-NTN.md)
* **Repository:** [Awsan-Communication-6G](https://github.com/awsanadelabdulbariahmedsultan-art/Awsan-Communication-6G)




---


# وثيقة المواصفة المعيارية الدولية: RFC-AWSAN-6G-NTN
## معيار 6G الموحد للتكامل بين الفضاء والأرض والاتصال المباشر بالهواتف (Direct-to-Device)

- **معرف الوثيقة:** RFC-AWSAN-6G-NTN-0001
- **التصنيف:** مسار المعايير الدولية / بروتوكول اتصالات مفتوح (Standards Track)
- **المطور ورئيس معماريي النظم:** م. أوسان عادل عبدالباري أحمد سلطان
- **الرقم القومي:** 01010305468
- **الهاتف / واتساب:** 967777852433+ | صنعاء، الجمهورية اليمنية
- **البريد الإلكتروني:** awsan.sultan@gmail.com
- **الملف المهني:** [رابط حساب LinkedIn](https://www.linkedin.com/in/awsan-adel-abdulbari-ahmed-sultan-8aa5a1a9)
- **حالة المعيار:** معيار دولي مقترح (الإصدار 1.5)
- **التنفيذ المرجعي المفتوح:** [Awsan-Communication-6G](https://github.com/awsanadelabdulbariahmedsultan-art/Awsan-Communication-6G)

---

## 1. الملخص التنفيذي (Abstract)
تحدد هذه المواصفة الفنية **بروتوكول أوسان لشبكات 6G غير الأرضية (Awsan-6G-NTN Protocol)**، كمعيار مفتوح وموحد لتمكين الاتصال المباشر فائق الموثوقية بين الهواتف الذكية التجارية العادية (دون تعديل عتادي) وأقمار مدار الأرض المنخفض (LEO). يحدد البروتوكول معيار ترويسة الحزم الثنائية بطول 24 بايت، والنماذج الحسابية لانتشار الإشارة الراديوية المتوافقة مع معايير 3GPP Release 18/19، وخوارزميات التعويض المسبق لانزياح دوبلر الترددي للسرعات المدارية العالية، ومنظومة التسليم والتوجيه التنبؤي بين الشبكات الخلوية والأقمار، ومحرك التطور الذاتي المدعوم بالذكاء الاصطناعي والمحمي بجذر ثقة سيادي مشفر.

---

## 2. المصطلحات والاتفاقيات المعيارية (RFC 2119)
تُفسر الكلمات المفتاحية المعيارية الواردة في هذه الوثيقة وفقاً لتعريفات معيار [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119):
* **يجب (MUST / SHALL):** متطلب إلزامي لا يجوز تجاوزه لضمان التوافق مع المعيار.
* **يجب ألا (MUST NOT / SHALL NOT):** حظر قطعي لأمر يخالف المعيار.
* **ينبغي (SHOULD):** توصية هندسية يُفضل تطبيقها ما لم توجد أسباب تقنية مانعة.
* **يجوز (MAY):** خيار تطبيقي متروك لتقدير مهندسي النظام.

* **جهاز المستخدم (UE):** هاتف ذكي تجاري قياسي من الفئة الثالثة (3GPP Class 3).
* **مدار الأرض المنخفض (LEO):** أقمار غير ثابتة تدور على ارتفاعات تتراوح بين 500 كم و 1200 كم عن سطح الأرض.
* **الشبكات غير الأرضية (NTN):** شبكات الاتصال التي تستخدم الأقمار الصناعية أو المنصات الجوية.
* **فقدان المسار في الفضاء الحر (FSPL):** التلاشي الهندسي للموجات الكهرومغناطيسية أثناء انتشارها في الفضاء.
* **التشفير ما بعد الكم (PQC):** خوارزميات التشفير والتوقيع الرقمي المقاومة للحوسبة الكمومية.

---

## 3. الطبقة الفيزيائية ونماذج انتشار القناة الراديوية

### 3.1 محددات أجهزة المستخدمين (الهواتف الذكية)
* تُحدد قدرة الإرسال القصوى للهاتف العادي بـ **23 ديسيبل مللي واط (200 mW)** بموجب مواصفات 3GPP Class 3.
* **يجب** نمذجة هوائي الهاتف كهوائي متناحي بكسب مكافئ قدره **0 dBi**.
* **ينبغي** للأنظمة المطبقة تخصيص هامش ربط إضافي لا يقل عن **3.0 dB** لتعويض امتصاص جسم الإنسان وعوائق المباني والأشجار.

### 3.2 معادلة فقدان المسار في الفضاء الحر (FSPL)
**يجب** على محرك ميزانية الرابط حساب تلاشي الإشارة باستخدام النموذج الرياضي الحتمي التالي:
$$FSPL(d, f) = 20 \log_{10}(d) + 20 \log_{10}(f) - 147.55 \text{ dB}$$
حيث:
* $d$ هي المسافة المائلة بين الهاتف المحمول والقمر الصناعي بالأمتار ($m$).
* $f$ هو التردد الحامل بالهرتز ($Hz$) ضمن نطاقات 3GPP المصرح بها (مثل نطاق S-band عند 2.0 جيجاهرتز).

### 3.3 الضوضاء الحرارية وحساسية الاستقبال
**يجب** حساب قدرة الضوضاء الحرارية ($N$) بالاعتماد على ثابت بولتزمان:
$$N = k \cdot T \cdot B \text{ (واط)}$$
حيث:
* $k = 1.380649 \times 10^{-23} \text{ J/K}$ (ثابت بولتزمان).
* $T = 290 \text{ K}$ (درجة حرارة الضوضاء القياسية).
* $B$ هو عرض النطاق الترددي للقناة بالهرتز (الافتراضي: $10 \text{ MHz}$).

يُعتبر الرابط الراديوي صالحاً للتزامن المباشر والاتصال إذا حققت نسبة الإشارة إلى الضوضاء (SNR) الشرط التالي:
$$SNR = P_{rx} - N_{dBm} \ge 2.0 \text{ dB}$$

---

## 4. ديناميكيات أقمار LEO والتعويض المسبق لانزياح دوبلر

### 4.1 السرعات المدارية
نظراً لأن أقمار مدار LEO تتحرك بسرعات دائرية فائقة تصل إلى حوالي $v_{orbit} \approx 7.5 \text{ كم/ثانية}$ على ارتفاع $600 \text{ كم}$، فإنها تُحدث انزياحات ترددية حادة تصل إلى $\pm 40 \text{ كيلوهرتز}$ عند تردد $2.0 \text{ جيجاهرتز}$.

### 4.2 معادلة التعويض المسبق لانزياح دوبلر
**يجب** على المحطات الأرضية أو حمولات الأقمار الصناعية حساب إزاحة دوبلر اللحظية وتطبيق التعويض المسبق وفق المعادلة:
$$\Delta f = \left( \frac{\vec{v}_{rel} \cdot \vec{r}}{c \Vert{}\vec{r}\Vert{}} \right) f_c$$
حيث:
* $\vec{v}_{rel}$ هو متجه السرعة النسبية بين القمر الصناعي والمحطة الطرفية ($m/s$).
* $\vec{r}$ هو متجه الموضع النسبي ($m$).
* $c = 299,792,458 \text{ m/s}$ (سرعة الضوء).
* $f_c$ هو التردد الحامل ($Hz$).

### 4.3 تباعد الموجات الحاملة الفرعية (SCS)
للحفاظ على تعامد الموجات الفرعية وتفادي التداخل تحت ضغط دوبلر، **ينبغي** استخدام التباعد $\mu = 1$ ($SCS = 30 \text{ kHz}$) أو $\mu = 2$ ($SCS = 60 \text{ kHz}$) وفق معايير 3GPP.

---

## 5. مواصفة ترويسة الحزمة الثنائية (24 بايت)

**يجب** أن تبدأ جميع حزم بروتوكول Awsan-6G-NTN بترويسة ثنائية ثابتة بطول 24 بايت يتم إرسالها بترتيب البايتات الشبكي (Big-Endian):

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       رمز التحقق السحري: "AW6G" (0x41573647)  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  رقم الإصدار  |   نوع الحزمة  |  فئة جودة الخدمة |     الرايات    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       رقم تسلسل الحزمة (Sequence Number)      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       التوقيت الزمني الموحد (Unix Timestamp)  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       طول حمولة البيانات (Payload Length)      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     رمز التحقق التكاملي (SHA-256 Token)       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       بيانات الحمولة الفعلية (Payload Data) ...|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

```

---
---

## 📦 5.1 مواصفة أنواع الحزم البرمجية للبروتوكول

يحدد بروتوكول **Awsan-6G-NTN** تسعة أنواع معيارية للحزم البرمجية تعمل عبر ترويسة شبكية ثنائية موحدة بطول 24 بايت:

| رمز الحزمة (Opcode) | معرف نوع الحزمة | اتجاه البث | الوظيفة الهندسية ومواصفات الحمولة |
| :---: | :--- | :---: | :--- |
| `0x01` | **BEACON** | قمر ➔ هاتف | إشارة المزامنة المدارية، تعريف بصمة الحزمة الفضائية، وبيانات التقويم المداري. |
| `0x02` | **TELEMETRY_REPORT** | هاتف ➔ شبكة | تقرير قياسات الهاتف اللحظية (مؤشرات RSRP و RSRQ وتقدير إزاحة دوبلر). |
| `0x03` | **HANDOVER_REQUEST** | هاتف ➔ نواة | طلب التحويل والتنقل إلى الشبكة الفضائية عند تراجع جودة الرابط الخلوي الأرضي. |
| `0x04` | **HANDOVER_COMMAND** | نواة ➔ هاتف | أمر تنفيذ التسليم وتخصيص قنوات التردد المدارية للهاتف. |
| `0x05` | **EMERGENCY_SOS** | هاتف ➔ فضاء/أرض | نداءات الطوارئ الإنسانية الحرجة (أولوية مطلقة تقطع كافة طوابير البيانات). |
| `0x06` | **USER_PLANE_DATA** | بالاتجاهين | حزم بيانات الإنترنت العامة وتدفق حزم IPv6 المعيارية للتطبيقات. |
| `0x07` | **PQC_KEY_EXCHANGE** | بالاتجاهين | تبادل المفاتيح المشفرة ما بعد الكم باستخدام معيار Dilithium-5. |
| `0x08` | **OTA_UPDATE_PROPOSAL** | ذكاء اصطناعي ➔ بوابة | مقترح التحديث التلقائي المتولد ذاتياً بناءً على تحليل القنوات الفضائية. |
| `0x09` | **OTA_UPDATE_COMMIT** | نواة ➔ أسطول | أمر الترقية المعتمد والموقع رقمياً للبث المتزامن لجميع المحطات والأقمار. |

---

## 🚦 5.2 فئات جودة الخدمة (QoS) وجدولة الأولويات

لتلبية متطلبات 3GPP الصارمة في الاتصالات الحرجة، تُفرز البيانات عبر أربعة طوابير أولوية صارمة:

| معرف الفئة | مستوى أولوية جودة الخدمة | سياسة قطع الطوابير (Preemption) | زمن التأخير المستهدف | التطبيق / نوع حركة البيانات |
| :---: | :--- | :---: | :---: | :--- |
| `0x00` | **EMERGENCY_MISSION_CRITICAL** | تقطع كافة الطوابير | أقل من 5 مللي ثانية | نداءات الطوارئ SOS، وإغاثة الكوارث، وتنبيهات الاستغاثة. |
| `0x01` | **CONTROL_SIGNALING** | أولوية إدارية عليا | أقل من 15 مللي ثانية | أوامر التسليم، والمصادقة الكمومية، وتوجيه الحزم الفضائية. |
| `0x02` | **VOICE_STREAM** | ضبط التذبذب الصوتي | حتى 20 مللي ثانية | المكالمات الصوتية الحية والتواصل الصوتي التفاعلي اللحظي. |
| `0x03` | **BROADBAND_DATA** | الأفضلية المتاحة | مرن (حسب السعة) | تصفح الإنترنت العام، وبيانات المستشعرات، والمزامنة الخلفية. |


---
---

## 🔄 6. التسليم التنبؤي المتعدد وآلة حالات البروتوكول

يعتمد محرك التسليم على مؤقتات ترشيح تكيفية لمنع التذبذب بين الأبراج والأقمار ($T_{hyst} = 3.0\text{ s}$)، مع ضمان ثبات الاتصال بسرعة دوران أقمار LEO (~7.5 كم/ثانية).

### 📋 مصفوفة تعريف الحالات وقواعد الانتقال

| مسمى الحالة | المعرف | شروط القناة والمحفزات | طبقة الراديو النشطة | الانتقال التالي |
| :--- | :---: | :--- | :--- | :--- |
| **غير متصل (DISCONNECTED)** | `0` | انعدام الإشارة الأرضية والفضائية. | لا يوجد (جاري المسح) | ➔ `متصل أرضياً` عند تجاوز إشارة الأرض $-105\text{ dBm}$ |
| **متصل أرضياً (TERRESTRIAL_CONNECTED)** | `1` | توفر تغطية خلوية أرضية عالية السرعة. | الأبراج الخلوية الأرضية | ➔ `رصد قمر LEO` عند هبوط إشارة الأرض دون $-112\text{ dBm}$ |
| **رصد قمر LEO (LEO_TRACKING)** | `2` | تراجع الإشارة الأرضية والتقاط إشارة قمر LEO. | مسح مزدوج (أرض + فضاء) | ➔ `متصل بـ LEO` عند زاوية $\ge 15^\circ$ وإشارة $\ge -118\text{ dBm}$ |
| **تسليم قيد التنفيذ (HANDOVER_IN_PROGRESS)** | `3` | تنفيذ عملية تحويل الحزم وترحيل الاتصال. | انتقال بين الحوامل | ➔ تأكيد حالة الاتصال الجديدة |
| **متصل بـ LEO (LEO_CONNECTED)** | `4` | توجيه حركة البيانات بالكامل عبر قمر LEO. | حزمة البث الفضائي LEO | ➔ `متصل أرضياً` فور استعادة الإشارة الأرضية بقوة |
| **طوارئ فورية (FAILOVER_EMERGENCY)** | `5` | إطلاق استغاثة نداء طوارئ أثناء انقطاع الشبكة. | قناة الطوارئ المحمية | تفضيل أقوى مسار متاح فوراً (إشارة $\ge -120\text{ dBm}$) |

### 🚨 قاعدة الأسبقية الفورية لنداءات الطوارئ SOS:
عند تفعيل حزمة نداء الاستغاثة `EMERGENCY_SOS` (الرمز `0x05`)، **تتجاوز آلة الحالات كافة مؤقتات الانتظار وطوابير التأخير**، وتنشئ اتصالاً فورياً عبر أقوى تردد راديوي متاح في نفس اللحظة ($RSRP_{TN} \ge -115\text{ dBm}$ أو $RSRP_{LEO} \ge -120\text{ dBm}$).

---
---

## 🤖 7. محرك التطور والتحسين الذاتي بالذكاء الاصطناعي (AI-Native)

يراقب وكيل استدلال إدراكي مدمج (`Awsan-6G-Cognitive-Reasoner`) قياسات القنوات الفضائية والأرضية لحظياً للتعامل التلقائي مع المتغيرات وإجراء التحديثات الذاتية:

1. **معالجة إجهاد دوبلر:** إذا تجاوز انحراف التردد الحامل $\pm 45\text{ kHz}$، يرفع الذكاء الاصطناعي تباعد الموجات الفرعية (SCS) من $15\text{ kHz}$ إلى $30\text{ kHz}$ للحفاظ على تعامد القنوات ومنع التداخل.
2. **معالجة الاضطراب الراديوي (Scintillation):** إذا تجاوز معدل فقدان الحزم $5\%$، يُفعّل المحرك خوارزميات التضمين والتكويد التكيفي (AMC) مع رفع معدلات تصحيح أخطاء التكافؤ (LDPC).
3. **البث الآلي للتحديثات:** تُحزم التعليمات التصحيحية في إطارات `OTA_UPDATE_COMMIT` وتُبث إلى البوابات الأرضية وحمولات الأقمار الصناعية تلقائياً دون أي تأخير بشري.

---

## 🔐 8. الحوكمة الأمنية وجذر الثقة السيادي للمطور

لمنع أي تلاعب أو حقن لترقيات مشبوهة داخل شبكات الاتصالات العالمية، تُوثق وتُعتمد كافة ترقيات البروتوكول بمطابقتها رقمياً مع **جذر الثقة السيادي للمطور**:

* **المرجعية السيادية لجذر الثقة:** م. أوسان عادل عبدالباري أحمد سلطان
* **الرقم القومي المسجل:** `01010305468`
* **آلية المصادقة والتحقق:** فحص تجزئة مشفرة عبر دالة `HMAC-SHA256` بزمن تنفيذ ثابت لمنع هجمات التوقيت.
* **التشفير ما بعد الكم (PQC):** تُوقع التحديثات برموز تشفير رقمية مقاومة للحواسيب الكمومية (`PQC-DILITHIUM5`).
* **سجل التدقيق غير القابل للتعديل:** تُسجل جميع التحديثات المعتمدة بأختام زمنية موحدة (UTC) وأرقام الإصدارات والتجزئة المشفرة في سجل عام دائم.

---

---

## 🛡️ 9. الأمان السيبراني والتوافق مع معيار RFC 8482

تطبق بوابات الاتصال وأجهزة الأقمار الصناعية سياسات انعدام الثقة (Zero-Trust):

* **حماية RFC 8482:** حظر استعلامات DNS الواردة من نوع `ANY` والرد باستجابة دنيا `HINFO`، لتحييد هجمات حجب الخدمة التضخيمية (Amplification DDoS) ضد روابط الأقمار الصناعية.
* **سلامة ونزاهة الحزم:** رفض وإسقاط أي حزمة بيانات يتم التلاعب بحمولتها عبر فحص رمزي SHA-256 اللحظي المدمج في الترويسة.
* **حدود انعدام الثقة:** تخضع جميع الحزم الواردة من المحطات الأرضية أو الجوية غير الموثوقة لفحص التوقيع الرقمي المشفر قبل وصولها لطبقات المعالجة الأساسية.

---

## 👤 10. بيانات كبير مهندسي النظم وحقوق الملكية الفكرية

* **كبير مهندسي النظم وشبكات 6G:** م. أوسان عادل عبدالباري أحمد سلطان
* **الرقم القومي:** `01010305468` | **المقر:** صنعاء، الجمهورية اليمنية
* **الهاتف / واتساب:** `967777852433+` | **البريد الرسمي:** `awsan.sultan@gmail.com`
* **الملف المهني:** [حساب المهندس أوسان عادل سلطان على LinkedIn](https://www.linkedin.com/in/awsan-adel-abdulbari-ahmed-sultan-8aa5a1a9)
* **وثيقة المواصفة المعيارية الدولية:** [وثيقة RFC-AWSAN-6G-NTN-0001](./RFC-AWSAN-6G-NTN.md)
* **المستودع الرسمي:** [Awsan-Communication-6G](https://github.com/awsanadelabdulbariahmedsultan-art/Awsan-Communication-6G)






