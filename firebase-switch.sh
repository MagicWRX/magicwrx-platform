#!/bin/bash

# Firebase Account Switcher
# Switch between three Firebase accounts

echo "🔥 Firebase Account Switcher"
echo "=========================="
echo ""

# Function to show current account
show_current_account() {
    echo "Current Firebase account:"
    firebase login:list
    echo ""
}

# Show current account
show_current_account

# Menu for account selection
echo "Select account to switch to:"
echo "1) Brian@amazinglystrange.com"
echo "2) MagicWRXStudio@gmail.com"
echo "3) AmazinglyStrangeMedia@gmail.com"
echo "4) Show current account"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

# Validate input
if [[ ! "$choice" =~ ^[1-5]$ ]]; then
    echo "❌ Invalid choice. Please enter a number between 1 and 5."
    exit 1
fi

case $choice in
    1)
        echo "Switching to Brian@amazinglystrange.com..."
        echo "Please log in with Brian@amazinglystrange.com when prompted..."
        if firebase logout && firebase login; then
            echo "✅ Successfully switched to Brian@amazinglystrange.com"
        else
            echo "❌ Failed to switch account"
            exit 1
        fi
        ;;
    2)
        echo "Switching to MagicWRXStudio@gmail.com..."
        echo "Please log in with MagicWRXStudio@gmail.com when prompted..."
        if firebase logout && firebase login; then
            echo "✅ Successfully switched to MagicWRXStudio@gmail.com"
        else
            echo "❌ Failed to switch account"
            exit 1
        fi
        ;;
    3)
        echo "Switching to AmazinglyStrangeMedia@gmail.com..."
        echo "Please log in with AmazinglyStrangeMedia@gmail.com when prompted..."
        if firebase logout && firebase login; then
            echo "✅ Successfully switched to AmazinglyStrangeMedia@gmail.com"
        else
            echo "❌ Failed to switch account"
            exit 1
        fi
        ;;
    4)
        show_current_account
        ;;
    5)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Account switch completed!"
echo ""
show_current_account

echo "Available projects for this account:"
firebase projects:list 