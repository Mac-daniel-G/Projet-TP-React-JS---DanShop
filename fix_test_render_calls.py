from pathlib import Path

root = Path(r'c:\Users\marco\EcoleProject\react\mon-projet')

files = {
    root / 'src' / 'Composant' / '__tests__' / 'Contact.test.jsx': [
        ('render(<Contact />);', 'renderContact();'),
        ('render(<Contact />', 'renderContact()'),
    ],
    root / 'src' / 'Composant' / '__tests__' / 'MyAPP2.test.jsx': [
        ('render(<MyAPP2 />);', 'renderMyAPP2();'),
        ('render(<MyAPP2 />', 'renderMyAPP2()'),
    ],
}

for path, replacements in files.items():
    text = path.read_text(encoding='utf-8')
    for old, new in replacements:
        text = text.replace(old, new)
    path.write_text(text, encoding='utf-8')
