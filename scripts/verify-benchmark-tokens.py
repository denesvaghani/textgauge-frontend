#!/usr/bin/env python3
"""
Token Verification Script for JSON vs TOON Benchmark
Uses tiktoken to calculate actual token counts for benchmark data.

Requirements:
  pip install tiktoken

Usage:
  python3 scripts/verify-benchmark-tokens.py
"""

try:
    import tiktoken
except ImportError:
    print("Installing tiktoken...")
    import subprocess
    subprocess.check_call(["pip3", "install", "tiktoken"])
    import tiktoken

# Use cl100k_base encoding (GPT-4, GPT-3.5-turbo)
enc = tiktoken.get_encoding("cl100k_base")

# Benchmark samples
samples = [
    {
        "name": "Simple Object",
        "json": '{"name":"John","age":30,"city":"NYC"}',
        "toon": "name: John\nage: 30\ncity: NYC"
    },
    {
        "name": "Nested Object",
        "json": '{"user":{"name":"John","profile":{"age":30,"city":"NYC"}}}',
        "toon": "user:\n  name: John\n  profile:\n    age: 30\n    city: NYC"
    },
    {
        "name": "Array of Objects",
        "json": '[{"id":1,"name":"A"},{"id":2,"name":"B"},{"id":3,"name":"C"}]',
        "toon": "- id: 1\n  name: A\n- id: 2\n  name: B\n- id: 3\n  name: C"
    },
    {
        "name": "API Response (Users)",
        "json": '{"data":{"users":[{"id":1,"name":"Alice","email":"a@b.com"},{"id":2,"name":"Bob","email":"b@b.com"}]}}',
        "toon": "data:\n  users:\n    - id: 1\n      name: Alice\n      email: a@b.com\n    - id: 2\n      name: Bob\n      email: b@b.com"
    },
    {
        "name": "Config File",
        "json": '{"database":{"host":"localhost","port":5432,"name":"mydb"},"cache":{"enabled":true,"ttl":3600}}',
        "toon": "database:\n  host: localhost\n  port: 5432\n  name: mydb\ncache:\n  enabled: true\n  ttl: 3600"
    },
]

print("=" * 70)
print("JSON vs TOON Token Benchmark Verification")
print("Encoding: cl100k_base (GPT-4, GPT-3.5-turbo)")
print("=" * 70)
print()

total_json = 0
total_toon = 0

for sample in samples:
    json_tokens = len(enc.encode(sample["json"]))
    toon_tokens = len(enc.encode(sample["toon"]))
    savings = round((1 - toon_tokens / json_tokens) * 100)
    
    total_json += json_tokens
    total_toon += toon_tokens
    
    print(f"{sample['name']:25} | JSON: {json_tokens:3} | TOON: {toon_tokens:3} | Savings: -{savings}%")

print()
print("-" * 70)
avg_savings = round((1 - total_toon / total_json) * 100)
print(f"{'TOTAL':25} | JSON: {total_json:3} | TOON: {total_toon:3} | Average: -{avg_savings}%")
print("=" * 70)
print()
print("Copy these values to update the benchmark page:")
print()

for sample in samples:
    json_tokens = len(enc.encode(sample["json"]))
    toon_tokens = len(enc.encode(sample["toon"]))
    savings = round((1 - toon_tokens / json_tokens) * 100)
    print(f'  {{ name: "{sample["name"]}", jsonTokens: {json_tokens}, toonTokens: {toon_tokens}, savings: {savings} }},')
