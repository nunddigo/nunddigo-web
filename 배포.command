#!/bin/bash
cd "$(dirname "$0")"
echo ""
echo "  ┌─────────────────────────────┐"
echo "  │   눈띄고 사이트 배포        │"
echo "  └─────────────────────────────┘"
echo ""

# ── 0. 남은 잠금 파일 치우기 ────────────────────────────
# 외부 도구(클라우드 세션 등)가 git을 건드리면 .git/index.lock 이 남는다.
# 이게 남아 있으면 git add 가 조용히 실패하고, 예전 스크립트는 그걸
# "변경된 내용이 없습니다"로 잘못 보고했다. 그래서 먼저 확인한다.
if [ -e .git/index.lock ]; then
  if pgrep -x git >/dev/null 2>&1; then
    echo "  ✗ 다른 git 작업이 돌고 있습니다. 잠시 뒤 다시 실행하세요."
    echo ""
    read -p "  엔터를 누르면 닫힙니다..."
    exit 1
  fi
  echo "  · 남아 있던 잠금 파일을 치웠습니다 (.git/index.lock)"
  rm -f .git/index.lock
fi
rm -f .git/index.lock.stale-* 2>/dev/null

# ── 1. 스테이징 ─────────────────────────────────────────
if ! git add -A; then
  echo ""
  echo "  ✗ 파일을 담지 못했습니다. 위 메시지를 그대로 알려주세요."
  echo ""
  read -p "  엔터를 누르면 닫힙니다..."
  exit 1
fi

AHEAD=$(git rev-list --count @{u}..HEAD 2>/dev/null || echo 0)

if git diff --cached --quiet; then
  if [ "$AHEAD" -gt 0 ]; then
    echo "  올릴 커밋 $AHEAD 개가 남아 있습니다. 바로 올립니다."
    echo ""
    if git push; then
      echo "  ✓ 완료. 1~2분 뒤 사이트에 반영됩니다."
    else
      echo "  ✗ 실패. 인터넷 연결이나 깃 로그인을 확인하세요."
    fi
    echo ""
    read -p "  엔터를 누르면 닫힙니다..."
    exit 0
  fi
  echo "  변경된 내용이 없습니다."
  echo "  (방금 고친 게 있는데 이 메시지가 나오면 잠금 파일 문제일 수 있습니다)"
  echo ""
  read -p "  엔터를 누르면 닫힙니다..."
  exit 0
fi

echo "  올라갈 파일:"
git diff --cached --name-only | sed 's/^/    /'
echo ""
read -p "  배포 메모 (엔터=자동) : " MSG
[ -z "$MSG" ] && MSG="update $(date '+%Y-%m-%d %H:%M')"

if ! git commit -m "$MSG"; then
  echo ""
  echo "  ✗ 커밋 실패. 위 메시지를 그대로 알려주세요."
  echo ""
  read -p "  엔터를 누르면 닫힙니다..."
  exit 1
fi

echo ""
echo "  올리는 중..."
if git push; then
  echo ""
  echo "  ✓ 완료. 1~2분 뒤 사이트에 반영됩니다."
  echo ""
  echo "  확인: 브라우저에서 Cmd+Shift+R (강력 새로고침)"
  echo "    https://eyetest.nunddigo.com/"
  echo "    https://links.nunddigo.com/"
else
  echo ""
  echo "  ✗ 실패. 인터넷 연결이나 깃 로그인을 확인하세요."
fi
echo ""
read -p "  엔터를 누르면 닫힙니다..."
