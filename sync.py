import os
import re

workspace = r"d:\doula and birth support services"

# Get golden content
with open(os.path.join(workspace, "index.html"), "r", encoding="utf-8") as f:
    lines = f.readlines()

golden_start = -1
golden_end = -1
for i, line in enumerate(lines):
    if '<div class="offcanvas-body">' in line:
        golden_start = i
    if '<!-- Theme & RTL Controls -->' in line:
        golden_end = i + 10  # approximate end
        
for i in range(golden_start, len(lines)):
    if '</div>' in lines[i] and '</div>' in lines[i+1]:
        # we found the closing of offcanvas-body
        golden_end = i + 1  # include the offcanvas-body closing div
        break

golden_lines = lines[golden_start : golden_end + 1]
golden_html = "".join(golden_lines)

files = [
    "about.html", "services.html", "blog.html", "pricing.html", "contact.html", "login.html", "register.html",
    "blog-details.html", "service-details.html", "404.html", "coming-soon.html"
]

for filename in files:
    filepath = os.path.join(workspace, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        target_lines = f.readlines()
        
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(target_lines):
        if '<div class="offcanvas-body">' in line:
            start_idx = i
        if start_idx != -1 and 'ul>' in line:
            # Look for where offcanvas-body closes after ul>
            pass
            
    # better approach: just manually find start and end
    start_idx = -1
    for i, line in enumerate(target_lines):
        if '<div class="offcanvas-body">' in line:
            start_idx = i
            break
            
    if start_idx == -1: continue
            
    end_idx = -1
    # Count open/close divs to find the matching closing div for offcanvas-body
    div_count = 0
    for i in range(start_idx, len(target_lines)):
        div_count += target_lines[i].count('<div')
        div_count -= target_lines[i].count('</div')
        if div_count == 0:
            end_idx = i
            break
            
    if end_idx == -1: continue
    
    # Process golden HTML for this specific file
    custom_html = re.sub(r'\s*active\b', '', golden_html)
    custom_html = re.sub(r'\s*aria-current="page"', '', custom_html)
    
    if filename == "blog-details.html": target_href = "blog.html"
    elif filename == "service-details.html": target_href = "services.html"
    else: target_href = filename
    
    pattern = r'(<a\s+class="nav-link[^"]*)"([^>]*href="{target}")'.format(target=re.escape(target_href))
    custom_html = re.sub(pattern, r'\1 active"\2 aria-current="page"', custom_html)
    
    new_lines = target_lines[:start_idx] + [custom_html] + target_lines[end_idx+1:]
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print(f"Updated {filename}")

print("Done")
