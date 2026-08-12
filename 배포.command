#!/bin/bash
cd "$(dirname "$0")"
echo ""
echo "  ┌─────────────────────────────┐"
echo "  │   눈띄고 사이트 배포        │"
echo "  └─────────────────────────────┘"
echo ""
git add -A
if git diff --cached --quiet; then
  echo "  변경된 내용이 없습니다."
  echo ""
  read -p "  엔터를 누르면 닫힙니다..."
  exit 0
fi
echo "  변경된 파일:"
git diff --cached --name-only | sed 's/^/    /'
echo ""
read -p "  배포 메모 (엔터=자동) : " MSG
[ -z "$MSG" ] && MSG="update $(date '+%Y-%m-%d %H:%M')"
git commit -m "$MSG"
echo ""
echo "  올리는 중..."
if git push; then
  echo ""
  echo "  ✓ 완료. 1~2분 뒤 사이트에 반영됩니다."
  echo "    https://links.nunddigo.com"
else
  echo ""
  echo "  ✗ 실패. 인터넷 연결이나 깃 로그인을 확인하세요."
fi
echo ""
read -p "  엔터를 누르면 닫힙니다..."
