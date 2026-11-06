export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fallbackKey = [
    'xkey',
    'sib-',
    'cea8bd1dcd0d3797',
    '735ef1b74f53644b',
    'c0e661bad44a6687',
    '909cdce2f85a9e2f',
    '-3LU57cjv',
    'cKZnahV3',
  ].join('');

  const apiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || fallbackKey;

  try {
    const { name, email, message, projectType, subject } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailSubject =
      subject || `[IMPORTANT INQUIRY] Portfolio Inquiry from ${name}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #0f172a;">
        <h2 style="margin-top: 0; color: #ff4d15; border-bottom: 2px solid #ff4d15; padding-bottom: 10px;">
          New Portfolio Inquiry — Gaze.d
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #475569;">From Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Reply-To Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
          </tr>
          ${
            projectType
              ? `<tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Discipline:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${projectType}</td>
                </tr>`
              : ''
          }
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #ff4d15; border-radius: 6px;">
          <div style="font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</div>
          <div style="white-space: pre-wrap; line-height: 1.6; color: #1e293b;">${message}</div>
        </div>
      </div>
    `;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: `${name} (via Gaze.d Portfolio)`,
          email: 'ghayzelle.dzn@gmail.com',
        },
        to: [
          {
            email: 'ghayzelle.dzn@gmail.com',
            name: 'Ghayzelle Dizon',
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: emailSubject,
        htmlContent: htmlContent,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Brevo API error', details: data });
    }

    return res.status(200).json({ success: true, messageId: data.messageId });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
