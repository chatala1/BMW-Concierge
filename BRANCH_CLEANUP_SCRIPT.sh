#!/bin/bash

# BMW-Concierge Repository Branch Cleanup Script
# Purpose: Safely delete unnecessary copilot/fix-* branches while preserving main and active PR branches
# 
# IMPORTANT: This script must be run by a repository administrator with appropriate permissions
# 
# Safety Features:
# - Preserves main branch (protected)
# - Preserves branches with active PRs
# - Provides confirmation prompts
# - Creates backup reference file before deletion
# 
# Usage: ./BRANCH_CLEANUP_SCRIPT.sh
# 
# Prerequisites:
# - Git repository with appropriate push permissions
# - Confirmed that no local development depends on branches to be deleted

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Repository information
REPO_OWNER="chatala1"
REPO_NAME="BMW-Concierge"

echo -e "${BLUE}BMW-Concierge Repository Branch Cleanup Script${NC}"
echo -e "${BLUE}=============================================${NC}"
echo ""

# Verify we're in the correct repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a git repository. Please run this script from the repository root.${NC}"
    exit 1
fi

# Get current repository remote URL to verify we're in the right repo
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [[ ! "$REMOTE_URL" =~ "BMW-Concierge" ]]; then
    echo -e "${RED}Error: This script is designed for the BMW-Concierge repository only.${NC}"
    echo -e "${RED}Current remote: $REMOTE_URL${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Repository verification successful${NC}"
echo ""

# Create backup file with current branch information
BACKUP_FILE="branch_backup_$(date +%Y%m%d_%H%M%S).txt"
echo -e "${YELLOW}Creating backup of current branch information...${NC}"
git branch -a > "$BACKUP_FILE"
echo -e "${GREEN}✓ Backup created: $BACKUP_FILE${NC}"
echo ""

# Branches to preserve (DO NOT DELETE)
PROTECTED_BRANCHES=(
    "main"
    "copilot/fix-76"  # Active PR #77
    "copilot/fix-78"  # Active PR #79
)

# Branches to delete (verified safe for deletion)
BRANCHES_TO_DELETE=(
    "copilot/fix-1"
    "copilot/fix-3"
    "copilot/fix-4bd4da71-31ae-434f-be36-ef864ed55d38"
    "copilot/fix-5"
    "copilot/fix-7"
    "copilot/fix-10"
    "copilot/fix-12"
    "copilot/fix-14"
    "copilot/fix-16"
    "copilot/fix-18"
    "copilot/fix-19"
    "copilot/fix-22"
    "copilot/fix-24"
    "copilot/fix-26"
    "copilot/fix-28"
    "copilot/fix-30"
    "copilot/fix-32"
    "copilot/fix-34"
    "copilot/fix-36"
    "copilot/fix-38"
    "copilot/fix-39"
    "copilot/fix-40"
    "copilot/fix-41"
    "copilot/fix-43"
    "copilot/fix-45"
    "copilot/fix-47"
    "copilot/fix-50"
    "copilot/fix-52"
    "copilot/fix-56"
    "copilot/fix-58"
    "copilot/fix-60"
    "copilot/fix-62"
    "copilot/fix-64"
    "copilot/fix-66"
    "copilot/fix-68"
    "copilot/fix-70"
    "copilot/fix-72"
    "copilot/fix-80"
)

echo -e "${YELLOW}Cleanup Summary:${NC}"
echo -e "Branches to preserve: ${#PROTECTED_BRANCHES[@]}"
echo -e "Branches to delete: ${#BRANCHES_TO_DELETE[@]}"
echo ""

echo -e "${YELLOW}Protected branches (will NOT be deleted):${NC}"
for branch in "${PROTECTED_BRANCHES[@]}"; do
    echo -e "  ${GREEN}✓ $branch${NC}"
done
echo ""

echo -e "${YELLOW}Branches marked for deletion:${NC}"
for branch in "${BRANCHES_TO_DELETE[@]}"; do
    echo -e "  ${RED}✗ $branch${NC}"
done
echo ""

# Safety confirmation
echo -e "${YELLOW}SAFETY CHECK:${NC}"
echo -e "${YELLOW}This operation will permanently delete ${#BRANCHES_TO_DELETE[@]} remote branches.${NC}"
echo -e "${YELLOW}The main branch and active PR branches will be preserved.${NC}"
echo ""

read -p "Do you want to proceed with the branch cleanup? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Cleanup cancelled by user.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}Starting branch cleanup...${NC}"
echo ""

# Track success and failures
SUCCESSFUL_DELETIONS=0
FAILED_DELETIONS=0
FAILED_BRANCHES=()

# Delete each branch
for branch in "${BRANCHES_TO_DELETE[@]}"; do
    echo -e "Deleting branch: ${RED}$branch${NC}"
    
    if git push origin --delete "$branch" 2>/dev/null; then
        echo -e "  ${GREEN}✓ Successfully deleted $branch${NC}"
        ((SUCCESSFUL_DELETIONS++))
    else
        echo -e "  ${RED}✗ Failed to delete $branch${NC}"
        ((FAILED_DELETIONS++))
        FAILED_BRANCHES+=("$branch")
    fi
    echo ""
done

# Cleanup summary
echo -e "${BLUE}Cleanup Complete!${NC}"
echo -e "${BLUE}=================${NC}"
echo -e "Successfully deleted: ${GREEN}$SUCCESSFUL_DELETIONS${NC} branches"
echo -e "Failed deletions: ${RED}$FAILED_DELETIONS${NC} branches"
echo ""

if [ ${#FAILED_BRANCHES[@]} -gt 0 ]; then
    echo -e "${RED}Branches that failed to delete:${NC}"
    for branch in "${FAILED_BRANCHES[@]}"; do
        echo -e "  ${RED}✗ $branch${NC}"
    done
    echo ""
    echo -e "${YELLOW}Note: Failed deletions may be due to:${NC}"
    echo -e "  - Branch already deleted"
    echo -e "  - Permission restrictions"
    echo -e "  - Network connectivity issues"
    echo ""
fi

# Verify remaining branches
echo -e "${YELLOW}Remaining branches after cleanup:${NC}"
git branch -r | grep -v "HEAD"
echo ""

# Final verification
REMAINING_COPILOT_BRANCHES=$(git branch -r | grep "copilot/fix" | wc -l)
echo -e "Remaining copilot/fix-* branches: $REMAINING_COPILOT_BRANCHES"

if [ "$REMAINING_COPILOT_BRANCHES" -eq 2 ]; then
    echo -e "${GREEN}✓ Cleanup successful! Only active PR branches remain.${NC}"
else
    echo -e "${YELLOW}⚠ Some copilot/fix-* branches remain. Please review manually.${NC}"
fi

echo ""
echo -e "${GREEN}Branch cleanup script completed.${NC}"
echo -e "${GREEN}Backup file available: $BACKUP_FILE${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Verify the BMW-Concierge site still functions correctly"
echo -e "2. Monitor for any issues related to deleted branches"
echo -e "3. Consider implementing branch protection policies"
echo -e "4. Keep the backup file for reference: $BACKUP_FILE"