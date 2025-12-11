#!/bin/bash

echo "🔐 GitHub Authentication Setup for MagicWRX"
echo "============================================"
echo ""

echo "📋 Repository Information:"
echo "   Repository: https://github.com/MagicWRX/MagicWRX"
echo "   Current remote:"
git remote -v
echo ""

echo "🔍 Checking repository accessibility..."
curl -s https://api.github.com/repos/MagicWRX/MagicWRX > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Repository exists and is accessible"
else
    echo "❌ Repository not found or not accessible"
    echo ""
    echo "Please verify:"
    echo "1. Repository exists at https://github.com/MagicWRX/MagicWRX"
    echo "2. Repository is public, or you have access"
    echo "3. GitHub username/organization is correct"
    exit 1
fi

echo ""
echo "🔑 Authentication Options:"
echo ""
echo "Option 1: Personal Access Token (Recommended)"
echo "1. Go to GitHub Settings → Developer settings → Personal access tokens"
echo "2. Generate new token (classic)"
echo "3. Select scopes: repo, workflow"
echo "4. Copy the token"
echo "5. Use it as password when prompted"
echo ""

echo "Option 2: GitHub CLI"
echo "1. Install: brew install gh"
echo "2. Login: gh auth login"
echo "3. Select GitHub.com, HTTPS, authenticate via browser"
echo ""

echo "Option 3: SSH Key"
echo "1. Generate SSH key: ssh-keygen -t ed25519 -C 'MagicWRXStudio@gmail.com'"
echo "2. Add to GitHub: Settings → SSH and GPG keys"
echo "3. Use SSH URL: git@github.com:MagicWRX/MagicWRX.git"
echo ""

read -p "Press Enter to attempt push with current setup, or Ctrl+C to setup authentication first..."

echo ""
echo "🚀 Attempting to push to GitHub..."

# Check if we have commits to push
if ! git log --oneline -1 > /dev/null 2>&1; then
    echo "❌ No commits found. Please make some commits first."
    exit 1
fi

if git push -u origin main; then
    echo ""
    echo "🎉 Successfully pushed to GitHub!"
    echo "🌐 Repository: https://github.com/MagicWRX/MagicWRX"
else
    echo ""
    echo "❌ Push failed. Please set up authentication using one of the options above."
    echo ""
    echo "Quick Personal Access Token setup:"
    echo "1. Visit: https://github.com/settings/tokens"
    echo "2. Generate new token (classic)"
    echo "3. Check 'repo' scope"
    echo "4. Copy the token"
    echo "5. Run: git push -u origin main"
    echo "6. Use your GitHub username and the token as password"
fi
