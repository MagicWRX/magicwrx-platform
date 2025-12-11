#!/usr/bin/env bash
# Vercel-Token-Manager.sh

set -euo pipefail

ZSHRC="$HOME/.zshrc"
TIMESTAMP=$(date +%s)
BACKUP="$ZSHRC.vercel_token_backup.$TIMESTAMP"
MARKER="# Vercel CLI token managed by Vercel-Token-Manager.sh"

usage() {
  echo "Usage:"
  echo "  $0 \"your_token_here\"    Set or replace VERCEL_TOKEN in ~/.zshrc"
  echo "  $0 unset                 Remove VERCEL_TOKEN from ~/.zshrc"
  echo "  $0 show                  Show masked VERCEL_TOKEN value from ~/.zshrc"
  echo ""
  echo "Notes:"
  echo "- This script modifies ~/.zshrc; it creates a backup at: $BACKUP"
  echo "- After setting/unsetting, run: source ~/.zshrc  (or open a new terminal)"
  echo "- Do NOT commit your token into git or share it publicly."
}

if [ "${1-}" = "" ]; then
  usage
  exit 1
fi

COMMAND="$1"

# Ensure zshrc exists
if [ ! -f "$ZSHRC" ]; then
  echo "# Created by Vercel-Token-Manager" > "$ZSHRC"
fi

case "$COMMAND" in
  unset)
    cp "$ZSHRC" "$BACKUP"
    # Remove token lines and marker
    sed -i '' '/^export VERCEL_TOKEN=/d; /^# Vercel CLI token managed by Vercel-Token-Manager.sh/d' "$ZSHRC" || true
    echo "Removed VERCEL_TOKEN from $ZSHRC. Backup saved to $BACKUP"
    echo "Run: source ~/.zshrc"
    ;;

  show)
    VAL_LINE=$(grep -E '^export VERCEL_TOKEN=' "$ZSHRC" | tail -n1 || true)
    if [ -n "$VAL_LINE" ]; then
      VAL=${VAL_LINE#export VERCEL_TOKEN=}
      # Unescape the value safely
      UNESCAPED_VAL=$(eval "echo $VAL" 2>/dev/null || echo "")
      if [ -z "$UNESCAPED_VAL" ]; then
        echo "VERCEL_TOKEN is set but empty."
      else
        PREFIX=$(echo "$UNESCAPED_VAL" | cut -c1-6)
        SUFFIX=$(echo "$UNESCAPED_VAL" | rev | cut -c1-4 | rev)
        echo "VERCEL_TOKEN: ${PREFIX}******${SUFFIX}"
      fi
    else
      echo "No VERCEL_TOKEN found in $ZSHRC"
    fi
    ;;

  --help|-h)
    usage
    ;;

  *)
    TOKEN="$COMMAND"
    if [ -z "$TOKEN" ]; then
      echo "Error: Token cannot be empty."
      exit 1
    fi
    # Use printf %q to produce a shell-escaped representation of the token
    ESCAPED=$(printf "%q" "$TOKEN")

    cp "$ZSHRC" "$BACKUP"
    # Remove any existing token lines
    sed -i '' '/^export VERCEL_TOKEN=/d; /^# Vercel CLI token managed by Vercel-Token-Manager.sh/d' "$ZSHRC" || true

    # Append the marker and export line using the escaped token
    echo "" >> "$ZSHRC"
    echo "$MARKER" >> "$ZSHRC"
    echo "export VERCEL_TOKEN=$ESCAPED" >> "$ZSHRC"

    echo "Set VERCEL_TOKEN in $ZSHRC (backup: $BACKUP)"
    echo "Run: source ~/.zshrc  (or open a new terminal) to load the token into your shell"
    ;;
esac
