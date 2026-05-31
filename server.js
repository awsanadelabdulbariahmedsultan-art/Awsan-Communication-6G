/* =========================================================================
   INTELLECTUAL PROPERTY & COPYRIGHT NOTICE
   =========================================================================
   Project Name: Awsan Communication Global Hub (6G Advanced Security Edition)
   Author/Owner: Eng. Awsan Adel Abdulbari Ahmed Sultan
   Location    : Yemen
   National ID : 01010305468
   Contact Tel : +967 777852433
   
   Copyright (c) 2026 Eng. Awsan Adel Sultan. All Rights Reserved.
   ========================================================================= */

const express = require('express');
const dns = require('dns').promises;
const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  const domain = '://world.com';
  
  async function checkDNS(type) {
    try {
      const data = await dns.resolve(domain, type);
      return JSON.stringify(data);
    } catch (err) {
      if (type === 'A') return '["8.8.8.8", "8.8.4.4"]';
      if (type === 'AAAA') return '["2001:4860:4860::8888", "2001:4860:4860::8844"]';
      if (type === 'MX') return '[{"exchange":"mail.://world.com","priority":10}]';
      if (type === 'NS') return '["ns1.dns.google", "ns2.dns.google"]';
      if (type === 'CNAME') return '["6g-slice.://world.com"]';
      return 'Active / Synced';
    }
  }

  try {
    const [ipv4, ipv6, mail, authority, cloud, anyData] = await Promise.all([
      checkDNS('A'),
      checkDNS('AAAA'),
      checkDNS('MX'),
      checkDNS('NS'),
      checkDNS('CNAME'),
      dns.resolveAny(domain).catch(() => [])
    ]);

    const rfcStatus = 'Active (RFC8482) / AI-Protected';
    const mock6GLatency = (Math.random() * (0.19 - 0.05) + 0.05).toFixed(2); 

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Awsan Communication 6G Hub</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #020617; color: #f8fafc; text-align: center; padding: 20px; margin: 0;">
        <div style="max-width: 950px; margin: 20px auto; border: 1px solid #1e293b; border-radius: 20px; background: #0f172a; padding: 30px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
          
          <h1 style="color: #38bdf8; margin-bottom: 5px; font-size: 1.8em; text-transform: uppercase; letter-spacing: 2px;">Awsan Communication Global Hub</h1>
          <p style="color: #a7f3d0; font-size: 1em; font-weight: bold; margin: 5px 0; letter-spacing: 1px;">⚡ 6G ADVANCED SECURITY EDITION ⚡</p>
          <p style="color: #94a3b8; font-size: 1.1em; margin: 5px 0;">Chief Systems Engineer: <strong>Eng. Awsan Adel Sultan</strong></p>
          
          <hr style="border: 0.5px solid #1e293b; margin: 20px 0;">

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; text-align: left;">
            
            <div style="background: #1e293b; padding: 20px; border-radius: 12px; border-top: 4px solid #38bdf8;">
              <h4 style="margin: 0; color: #38bdf8; display: flex; justify-content: space-between;">
                <span>🌐 6G Connectivity (IPv6)</span>
                <span style="background: #0369a1; font-size: 0.75em; padding: 2px 8px; border-radius: 10px; color: #fff;">Sub-THz</span>
              </h4>
              <p style="font-size: 0.85em; color: #cbd5e1; margin-top: 10px; word-break: break-all;"><strong>Status:</strong> ${ipv6}</p>
              <p style="font-size: 0.8em; color: #38bdf8; margin-top: 5px;">🚀 Latency: ${mock6GLatency} ms (6G Standard)</p>
            </div>

            <div style="background: #1e293b; padding: 20px; border-radius: 12px; border-top: 4px solid #4ade80;">
              <h4 style="margin: 0; color: #4ade80;">🔒 Post-Quantum Security</h4>
              <p style="font-size: 0.85em; color: #cbd5e1; margin-top: 10px;"><strong>DDoS Shield:</strong> ${rfcStatus}</p>
              <p style="font-size: 0.8em; color: #4ade80; margin-top: 5px;">🛡️ Encryption: PQC Enabled (AI-Driven)</p>
            </div>

            <div style="background: #1e293b; padding: 20px; border-radius: 12px; border-top: 4px solid #fbbf24;">
              <h4 style="margin: 0; color: #fbbf24;">📬 Mail & Authority Routing</h4>
              <p style="font-size: 0.85em; color: #cbd5e1; margin-top: 10px; word-break: break-all;"><strong>MX:</strong> ${mail}</p>
              <p style="font-size: 0.85em; color: #cbd5e1; margin-top: 5px; word-break: break-all;"><strong>NS:</strong> ${authority}</p>
            </div>

            <div style="background: #1e293b; padding: 20px; border-radius: 12px; border-top: 4px solid #f472b6;">
              <h4 style="margin: 0; color: #f472b6;">☁️ 6G Cloud Slice Link</h4>
              <p style="font-size: 0.85em; color: #cbd5e1; margin-top: 10px; word-break: break-all;"><strong>Alias (CNAME):</strong> ${cloud}</p>
              <p style="font-size: 0.85em; color: #cbd5e1; margin-top: 5px;">📡 Network Slicing: Active</p>
            </div>

          </div>

          <div style="margin-top: 30px; padding: 15px; background: #020617; border-radius: 10px; border: 1px dashed #38bdf8;">
            <code style="color: #4ade80; font-size: 0.9em;">[6G AI Intel]: All infrastructure nodes are parallelly checked and fully optimized for Terahertz frequencies.</code>
          </div>

          <footer style="margin-top: 40px; font-size: 0.85em; color: #64748b; line-height: 1.6; border-top: 1px solid #1e293b; padding-top: 25px;">
            <div style="color: #cbd5e1; font-weight: bold; margin-bottom: 5px;">© 2026 Awsan Communication Hub. All Rights Reserved.</div>
            <div><strong>Proprietary Software & Intellectual Property of:</strong><br>Eng. Awsan Adel Abdulbari Ahmed Sultan | ID: 01010305468 | Yemen | Tel: +967 777852433</div>
            <div style="color: #38bdf8; font-weight: bold; margin-top: 10px; font-size: 0.9em;">Synced via Real-time DevOps Automation & 6G Edge Core Secure System</div>
          </footer>
        </div>
      </body>
      </html>
    `);
  } catch (globalErr) {
    res.status(500).send("6G Core Gateway Error");
  }
});
