#!/bin/bash

echo "🔍 Magic WRX GitHub Repository Troubleshooting"
echo "============================================="
echo ""

echo "📋 Current Configuration:"
echo "   Local directory: $(pwd)"
echo "   Git remote: $(git remote get-url origin)"
echo "   Target repository: https://github.com/MagicWRX/MagicWRX"
echo ""

echo "🔍 Possible Issues and Solutions:"
echo ""

echo "1. 📁 Repository doesn't exist yet"
echo "   Solution: Create it manually at https://github.com/MagicWRX"
echo "   - Click 'New repository'"
echo "   - Repository name: MagicWRX"
echo "   - Make it Public (or Private if preferred)"
echo "   - Don't initialize with README (we have one)"
echo ""

echo "2. 🔐 Authentication needed"
echo "   Solution: Set up Personal Access Token"
echo "   - Go to: https://github.com/settings/tokens"
echo "   - Generate new token (classic)"
echo "   - Select 'repo' scope"
echo "   - Use token as password when pushing"
echo ""

echo "3. 🏢 Organization vs Personal Account"
echo "   Current target: https://github.com/MagicWRX/MagicWRX"
echo "   Alternative: https://github.com/YourUsername/MagicWRX"
echo ""

echo "4. 📝 Repository name might be different"
echo "   Try: magic-wrx, Magic-WRX, or magicwrx"
echo ""

read -p "Would you like to test different repository URLs? (y/n): " test_urls

if [ "$test_urls" = "y" ] || [ "$test_urls" = "Y" ]; then
    echo ""
    echo "🧪 Testing alternative URLs..."
    
    # Test different variations
    urls=(
        "https://github.com/MagicWRX/magic-wrx"
        "https://github.com/MagicWRXStudio/MagicWRX"
        "https://github.com/MagicWRXStudio/magic-wrx"
    )
    
    for url in "${urls[@]}"; do
        repo_path=$(echo $url | sed 's|https://github.com/||')
        echo -n "   Testing $url ... "
        
        response=$(curl -s -w "%{http_code}" -o /dev/null https://api.github.com/repos/$repo_path)
        if [ "$response" = "200" ]; then
            echo "✅ Found!"
            echo "   Try: git remote set-url origin $url.git"
        elif [ "$response" = "404" ]; then
            echo "❌ Not found"
        else
            echo "⚠️  Status: $response"
        fi
    done
fi

echo ""
echo "🎯 Next Steps:"
echo ""
echo "Option A: Create the repository manually"
echo "1. Go to https://github.com/MagicWRX"
echo "2. Click 'New repository'"
echo "3. Name: MagicWRX"
echo "4. Public repository"
echo "5. Don't initialize with README"
echo "6. Create repository"
echo "7. Run: git push -u origin main"
echo ""

echo "Option B: Use GitHub CLI"
echo "1. Install: brew install gh"
echo "2. Login: gh auth login"
echo "3. Create repo: gh repo create MagicWRX/MagicWRX --public"
echo "4. Push: git push -u origin main"
echo ""

echo "Option C: Check if repository exists with different name"
echo "1. Visit: https://github.com/MagicWRX"
echo "2. Look for existing repositories"
echo "3. Update remote if needed"
echo ""

echo "🔧 Quick Commands:"
echo "   Check GitHub profile: open https://github.com/MagicWRX"
echo "   Update remote URL: git remote set-url origin NEW_URL"
echo "   Force push (if repo exists): git push -f origin main"
