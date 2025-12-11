#!/bin/bash

echo "🏗️  Magic WRX GitHub Repository Setup"
echo "====================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Please install it first:"
    echo "   brew install gh"
    echo "   Or visit: https://cli.github.com/"
    exit 1
fi

# Check if logged into GitHub
if ! gh auth status &> /dev/null; then
    echo "🔑 Please login to GitHub with MagicWRXStudio account:"
    gh auth login
fi

echo "📋 Repository Setup Options:"
echo ""
echo "1. Create new repository as MagicWRXStudio/magic-wrx"
echo "2. Create repository with different name"
echo "3. Show manual setup instructions"
echo ""
read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Creating repository: MagicWRXStudio/magic-wrx"
        gh repo create MagicWRXStudio/magic-wrx --public --description "Premium business website builder with Next.js and Firebase" --homepage "https://magic-wrx.web.app"
        
        if [ $? -eq 0 ]; then
            echo "✅ Repository created successfully!"
            echo "🔗 Adding remote origin..."
            git remote add origin https://github.com/MagicWRXStudio/magic-wrx.git
            echo "📤 Pushing code..."
            git push -u origin main
            echo ""
            echo "🎉 Repository setup complete!"
            echo "🌐 Repository: https://github.com/MagicWRXStudio/magic-wrx"
        else
            echo "❌ Failed to create repository"
        fi
        ;;
    2)
        echo ""
        read -p "Enter repository name: " repo_name
        echo "🚀 Creating repository: MagicWRXStudio/$repo_name"
        gh repo create MagicWRXStudio/$repo_name --public --description "Premium business website builder with Next.js and Firebase"
        
        if [ $? -eq 0 ]; then
            echo "✅ Repository created successfully!"
            echo "🔗 Adding remote origin..."
            git remote add origin https://github.com/MagicWRXStudio/$repo_name.git
            echo "📤 Pushing code..."
            git push -u origin main
            echo ""
            echo "🎉 Repository setup complete!"
            echo "🌐 Repository: https://github.com/MagicWRXStudio/$repo_name"
        else
            echo "❌ Failed to create repository"
        fi
        ;;
    3)
        echo ""
        echo "📋 Manual Setup Instructions:"
        echo ""
        echo "1. Go to https://github.com/MagicWRXStudio"
        echo "2. Click 'New repository'"
        echo "3. Repository name: magic-wrx"
        echo "4. Description: Premium business website builder with Next.js and Firebase"
        echo "5. Make it Public"
        echo "6. Don't initialize with README (we have one)"
        echo ""
        echo "7. After creating, run these commands:"
        echo "   git remote add origin https://github.com/MagicWRXStudio/magic-wrx.git"
        echo "   git push -u origin main"
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac
