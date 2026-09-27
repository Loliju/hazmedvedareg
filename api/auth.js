// מפנה את מערכת הניהול להתחברות דרך גיטהאב
export default function handler(req, res) {
  const id = process.env.GITHUB_CLIENT_ID;
  if (!id) return res.status(500).send('GITHUB_CLIENT_ID is not set');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const redirect = `https://${host}/api/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${id}&scope=repo&redirect_uri=${encodeURIComponent(redirect)}`;
  res.writeHead(302, { Location: url });
  res.end();
}
