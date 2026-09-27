// מקבל את הקוד מגיטהאב, ממיר אותו לאסימון ומחזיר אותו לחלון הניהול
export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  if (!code || !client_id || !client_secret) return res.status(400).send('Missing code or env vars');

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id, client_secret, code })
  });
  const data = await r.json();

  const payload = data.access_token
    ? { token: data.access_token, provider: 'github' }
    : { error: data.error_description || 'auth failed' };

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!doctype html><script>
    (function(){
      function post(){ window.opener.postMessage('authorization:github:${data.access_token ? 'success' : 'error'}:${JSON.stringify(payload).replace(/'/g, "\\\\'")}', '*'); }
      window.addEventListener('message', post, false);
      post();
    })();
  </script>`);
}
