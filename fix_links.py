import json

def update_links(filepath, lang):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    items = data.get('caseList', data).get('items', [])
    for item in items:
        if lang == 'en':
            if 'ciclic' in item['href']: item['href'] = '/en/projects/ciclic'
            elif 'intelie' in item['href']: item['href'] = '/en/projects/intelie-performance-report'
            elif 'voltz' in item['href']: item['href'] = '/en/projects/voltz-motors'
            elif 'aprendin' in item['href']: item['href'] = '/en/projects/aprendin'
        elif lang == 'pt':
            if 'ciclic' in item['href']: item['href'] = '/pt/projects/ciclic'
            elif 'intelie' in item['href']: item['href'] = '/pt/projects/intelie-performance-report'
            elif 'voltz' in item['href']: item['href'] = '/pt/projects/voltz-motors'
            elif 'aprendin' in item['href']: item['href'] = '/pt/projects/aprendin'
            
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

update_links('src/content/en/pages/home.json', 'en')
update_links('src/content/pt/pages/home.json', 'pt')
update_links('src/content/en/projects/index.json', 'en')
update_links('src/content/pt/projects/index.json', 'pt')

print("Links updated successfully")
