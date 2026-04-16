export async function GET() {
  const html = `<!DOCTYPE html>
<html>
<head><title>Admin Test</title></head>
<body style="background:#000;color:#fff;font-family:sans-serif;padding:40px">
  <h1>Admin Test Page</h1>
  <p>If you can see this, static HTML rendering works.</p>
  <p>Now testing JS hydration:</p>
  <div id="js-test">JS not loaded yet...</div>
  <script>document.getElementById('js-test').textContent='JS works!'</script>
  <hr>
  <p><a href="/admin/login" style="color:cyan">Go to /admin/login</a></p>
  <p><a href="/admin" style="color:cyan">Go to /admin</a></p>
  <iframe src="/admin/login" style="width:100%;height:600px;border:1px solid #333;margin-top:20px"></iframe>
</body>
</html>`
  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}
