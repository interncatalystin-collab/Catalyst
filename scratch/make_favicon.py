import base64
from PIL import Image

# 1. Create crisp favicon.svg
with open('public/logo-icon.png', 'rb') as f:
    b64_data = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="22" fill="#0f172a" />
  <image href="data:image/png;base64,{b64_data}" x="8" y="18" width="84" height="64" />
</svg>'''

with open('public/favicon.svg', 'w') as f:
    f.write(svg_content)

print('Updated public/favicon.svg')
