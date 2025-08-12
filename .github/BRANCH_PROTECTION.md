# Branch Protection Setup Guide

This document provides instructions for setting up branch protection rules for the BMW Concierge repository to ensure code quality and security.

## 🛡️ Overview

Branch protection rules help protect important branches by:
- Requiring pull request reviews before merging
- Requiring status checks to pass before merging
- Preventing force pushes and deletions
- Requiring linear history

## 🔧 Setting Up Branch Protection Rules

### Step 1: Access Repository Settings
1. Navigate to the repository on GitHub
2. Click on **Settings** tab
3. Select **Branches** from the left sidebar

### Step 2: Add Branch Protection Rule
1. Click **Add rule** button
2. In the **Branch name pattern** field, enter: `main`

### Step 3: Configure Protection Settings

#### Required Settings ✅
Enable these settings for optimal protection:

- **☑️ Require pull request reviews before merging**
  - Required number of approving reviews: `1`
  - ☑️ Dismiss stale reviews when new commits are pushed
  - ☑️ Require review from code owners (if CODEOWNERS file exists)

- **☑️ Require status checks to pass before merging**
  - ☑️ Require branches to be up to date before merging
  - Add these required status checks:
    - `Build & Test Jekyll Site`
    - `Security & Quality Checks` 
    - `Dependency & Link Validation`
    - `Documentation & Compliance`
    - `✅ Branch Protection Checks Complete`

- **☑️ Require linear history**
  - This ensures a clean, linear git history

- **☑️ Include administrators**
  - Applies rules to repository administrators too

#### Optional Settings ⚙️
Consider enabling these for additional security:

- **☑️ Restrict pushes that create files that are larger than 100MB**
- **☑️ Require deployments to succeed before merging**
- **☑️ Lock branch** (only for critical production branches)

### Step 4: Save Protection Rule
Click **Create** to apply the branch protection rule.

## 🚀 Automated CI/CD Protection

The repository includes automated workflows that provide protection through:

### CI Workflow (`ci.yml`)
- **Build Testing**: Validates Jekyll site builds successfully
- **Security Checks**: Scans for secrets, validates authentication
- **Dependency Validation**: Ensures all dependencies are secure
- **Documentation Compliance**: Verifies required docs exist
- **Link Validation**: Checks internal links and assets

### GitHub Pages Workflow (`jekyll-gh-pages.yml`)
- **Automated Deployment**: Deploys to GitHub Pages on main branch pushes
- **Build Validation**: Ensures site builds before deployment

## 📋 Pull Request Process

With branch protection enabled, the workflow becomes:

1. **Create Feature Branch**: `git checkout -b feature/my-feature`
2. **Make Changes**: Implement your changes
3. **Test Locally**: Run `jekyll build` and `jekyll serve`
4. **Push Branch**: `git push origin feature/my-feature`
5. **Create PR**: Use the provided PR template
6. **CI Checks**: Wait for all automated checks to pass
7. **Code Review**: Get required reviews from team members
8. **Merge**: Merge only after all checks pass and reviews approve

## ✅ Validation Checklist

After setting up branch protection, verify:

- [ ] Direct pushes to main branch are blocked
- [ ] Pull requests are required for changes
- [ ] CI checks must pass before merging
- [ ] At least one review is required
- [ ] Force pushes are prevented
- [ ] Branch deletion is prevented

## 🔍 Testing Branch Protection

To test that protection is working:

1. Try to push directly to main: `git push origin main` (should fail)
2. Create a PR with failing tests (should block merge)
3. Create a PR without required reviews (should block merge)
4. Verify only maintainers can adjust protection settings

## 🆘 Troubleshooting

### Common Issues:

**Issue**: CI checks not showing up as required status checks
- **Solution**: Run the CI workflow at least once, then add the check names to required status checks

**Issue**: Can't merge even with passing checks
- **Solution**: Ensure the branch is up to date with main branch

**Issue**: Administrators can't push despite protection rules
- **Solution**: Verify "Include administrators" is checked in protection settings

**Issue**: Status checks from forks not working
- **Solution**: Enable "Allow GitHub Actions to create and approve pull requests" in repository settings

## 📞 Support

For additional help:
- Review [GitHub's Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- Check the repository's Issues tab
- Contact repository maintainers

---

**Note**: These settings help maintain code quality and security for the BMW Concierge application. Adjust settings based on your team's specific needs and security requirements.