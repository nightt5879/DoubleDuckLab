#!/usr/bin/env python3
import json
from pathlib import Path

status_path = Path('.agent/STATUS.json')
if not status_path.exists():
    print('STATUS.json not found')
    raise SystemExit(1)

status = json.loads(status_path.read_text(encoding='utf-8'))
print('=== Agent Status ===')
print(f"Task      : {status.get('current_task')}")
print(f"Phase     : {status.get('phase')}")
print(f"Progress  : {status.get('progress')}")
print(f"Updated   : {status.get('last_update')}")
print('Next Steps:')
for step in status.get('next_steps', []):
    print(f"  - {step}")
print('Blockers:')
for b in status.get('blockers', []):
    print(f"  - {b}")
