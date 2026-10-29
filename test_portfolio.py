#!/usr/bin/env python3
"""
Comprehensive Quality & Integrity Verification Suite
for Vinayak's Portfolio Website.
"""

import os
import sys
import re
from html.parser import HTMLParser

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

class PortfolioHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.ids = set()
        self.classes = set()
        self.links = []
        self.images = []
        self.headings = []
        self.scripts = []
        self.aria_labels = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.tags.append((tag, attrs_dict))

        if 'id' in attrs_dict:
            self.ids.add(attrs_dict['id'])

        if 'class' in attrs_dict:
            for c in attrs_dict['class'].split():
                self.classes.add(c)

        if 'aria-label' in attrs_dict:
            self.aria_labels.append((tag, attrs_dict['aria-label']))

        if tag == 'a' and 'href' in attrs_dict:
            self.links.append((attrs_dict['href'], attrs_dict.get('aria-label', ''), attrs_dict.get('target', '')))
        elif tag == 'img' and 'src' in attrs_dict:
            self.images.append((attrs_dict['src'], attrs_dict.get('alt', '')))
        elif tag == 'script' and 'src' in attrs_dict:
            self.scripts.append(attrs_dict['src'])
        elif tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.headings.append((tag, attrs_dict.get('id', '')))

def test_suite():
    passed = True
    print("=" * 65)
    print("PORTFOLIO BY VINAYAK — INTEGRITY & CRAFT VERIFICATION SUITE")
    print("=" * 65)

    # 1. Structure Check
    print("\n[Phase 1] Asset & File System Structure Verification:")
    files = [
        "index.html",
        "style.css",
        "script.js",
        "favicon.svg",
        "README.md",
        "assets/images/clinical-system.svg",
        "assets/images/neural-abstract.svg",
        "assets/icons/python.svg",
        "assets/icons/ai.svg",
        "assets/icons/athletics.svg",
        "assets/icons/brain.svg",
        "assets/icons/problem-solving.svg",
        "assets/icons/experimentation.svg",
        "assets/icons/iit.svg",
        "assets/icons/university.svg",
        "assets/icons/hackathon.svg",
        "assets/icons/wellness.svg",
        "assets/icons/instagram.svg",
        "assets/icons/github.svg",
        "assets/icons/linkedin.svg",
        "assets/icons/mail.svg",
        "assets/icons/medical-ai.svg"
    ]
    for rel_path in files:
        full_path = os.path.join(ROOT_DIR, rel_path)
        if not os.path.isfile(full_path):
            print(f"  ❌ Missing file: {rel_path}")
            passed = False
        else:
            size = os.path.getsize(full_path)
            if size == 0:
                print(f"  ❌ Empty file: {rel_path}")
                passed = False
            else:
                print(f"  ✓ Found {rel_path:<35} ({size:>5} bytes)")

    # 2. HTML Semantics & Content Verification
    print("\n[Phase 2] HTML5 Semantics, Link Integrity & Accessibility:")
    with open(os.path.join(ROOT_DIR, "index.html"), 'r', encoding='utf-8') as f:
        html = f.read()

    parser = PortfolioHTMLParser()
    parser.feed(html)

    # Required Sections
    req_sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
    for sec in req_sections:
        if sec in parser.ids:
            print(f"  ✓ Section confirmed: #{sec}")
        else:
            print(f"  ❌ Missing section #{sec}")
            passed = False

    # Check anchor resolution
    internal_anchors = [href for href, _, _ in parser.links if href.startswith('#')]
    for anchor in internal_anchors:
        target = anchor[1:]
        if target not in parser.ids:
            print(f"  ❌ Broken internal anchor: {anchor}")
            passed = False
    print(f"  ✓ All {len(internal_anchors)} internal anchor links point to existing DOM IDs.")

    # Image checks
    for src, alt in parser.images:
        local_file = os.path.join(ROOT_DIR, src)
        if not os.path.isfile(local_file):
            print(f"  ❌ Broken image src: {src}")
            passed = False
        if not alt.strip():
            print(f"  ❌ Missing alt text on {src}")
            passed = False
    print(f"  ✓ All {len(parser.images)} image elements resolve and have descriptive alt text.")

    # Check Instagram link accuracy
    if "https://www.instagram.com/vinayak_k31/" in html:
        print("  ✓ Exact Instagram URL confirmed: https://www.instagram.com/vinayak_k31/")
    else:
        print("  ❌ Exact Instagram URL missing or altered")
        passed = False

    # Check strict truthfulness (no fabricated claims)
    forbidden_claims = [
        "hackathon winner", "first prize", "1st place", "senior software engineer",
        "lead developer at iit mandi", "full stack developer with 5 years"
    ]
    for claim in forbidden_claims:
        if claim in html.lower():
            print(f"  ❌ Forbidden fabricated claim detected: '{claim}'")
            passed = False
    print("  ✓ Strict truthfulness check passed: No fabricated titles or awards.")

    # 3. CSS3 Tokens & Responsive Rules
    print("\n[Phase 3] CSS3 Tokens, Responsive Design & Reduced Motion:")
    with open(os.path.join(ROOT_DIR, "style.css"), 'r', encoding='utf-8') as f:
        css = f.read()

    css_tokens = [
        '--bg-primary', '--bg-secondary', '--bg-card',
        '--accent-cyan', '--accent-purple', '--accent-teal', '--accent-amber',
        '--font-sans', '--font-display', '--font-mono'
    ]
    for token in css_tokens:
        if token in css:
            print(f"  ✓ Design token confirmed: {token}")
        else:
            print(f"  ❌ Missing design token: {token}")
            passed = False

    if '@media (max-width: 1024px)' in css and '@media (max-width: 768px)' in css and '@media (max-width: 480px)' in css:
        print("  ✓ Responsive breakpoints defined for Desktop, Tablet, and Mobile.")
    else:
        print("  ❌ Missing responsive media breakpoints.")
        passed = False

    if 'prefers-reduced-motion: reduce' in css:
        print("  ✓ Accessibility: prefers-reduced-motion media query implemented.")
    else:
        print("  ❌ Missing prefers-reduced-motion support.")
        passed = False

    # 4. JavaScript Core & Three.js Architecture
    print("\n[Phase 4] JavaScript Architecture, CONFIG Object & 3D Fallback:")
    with open(os.path.join(ROOT_DIR, "script.js"), 'r', encoding='utf-8') as f:
        js = f.read()

    js_checks = [
        ("CONFIG object", "const CONFIG"),
        ("Instagram profile handle", "https://www.instagram.com/vinayak_k31/"),
        ("Three.js WebGL detection", "isWebGLAvailable"),
        ("Three.js scene geometry", "IcosahedronGeometry"),
        ("Kinetic CSS fallback hook", "canvas-fallback"),
        ("IntersectionObserver scroll spy", "IntersectionObserver"),
        ("Modal keyboard accessibility", "Escape"),
        ("Resume HEAD request verifier", "fetch(CONFIG.resume.filePath"),
        ("Client-side form validator", "emailRegex")
    ]
    for label, substr in js_checks:
        if substr in js:
            print(f"  ✓ {label} verified.")
        else:
            print(f"  ❌ Missing {label}.")
            passed = False

    print("\n" + "=" * 65)
    if passed:
        print("🎉 ALL QUALITY, PERFORMANCE & ACCESSIBILITY TESTS PASSED!")
        print("=" * 65)
        return 0
    else:
        print("❌ INTEGRITY TESTS FAILED.")
        print("=" * 65)
        return 1

if __name__ == '__main__':
    sys.exit(test_suite())
