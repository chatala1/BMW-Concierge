# BMW Concierge

BMW Concierge is a Jekyll-based static website that serves as a landing page and documentation site for an unofficial companion experience to the MyBMW Application. The site is automatically deployed to GitHub Pages and uses the Minima theme.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

Bootstrap, build, and test the repository:
- `sudo gem install jekyll bundler` -- installs Jekyll and Bundler globally. Takes 90+ seconds due to native gem compilation. NEVER CANCEL.
- `bundle install` -- installs project dependencies. Takes 30-40 seconds. If permissions fail, use `sudo bundle install` (despite warnings).
- `bundle exec jekyll build` -- builds the static site. Takes 1-2 seconds. NEVER CANCEL, though it's very fast.
- `bundle exec jekyll serve --host 0.0.0.0 --port 4000` -- starts development server on port 4000. Takes 2-3 seconds to start.

Clean build and test:
- `rm -rf _site` -- removes build artifacts before clean build
- `bundle exec jekyll build` -- clean build takes 1-2 seconds 
- `bundle exec jekyll serve --host 0.0.0.0 --port 4000` -- serve locally for testing

## Validation

ALWAYS manually validate any changes by running a complete build and serve cycle:
- Build the site with `bundle exec jekyll build`
- Serve the site with `bundle exec jekyll serve --host 0.0.0.0 --port 4000`
- Test the site by accessing `http://localhost:4000` with curl or browser
- Verify that the README content is properly rendered with styling and navigation
- Check that all links and images load correctly
- Ensure the site footer and header appear correctly

CRITICAL validation requirements:
- ALWAYS use `bundle exec` prefix with Jekyll commands - direct `jekyll` commands fail due to gem version conflicts
- ALWAYS test both build and serve to ensure complete functionality
- ALWAYS verify the generated HTML at `http://localhost:4000` renders the README.md content correctly

## Common Tasks

The repository structure is minimal:
```
├── .github/
│   └── workflows/
│       └── jekyll-gh-pages.yml  # GitHub Pages deployment
├── .gitignore                   # Excludes _site/ and other artifacts
├── _config.yml                  # Jekyll configuration
├── Gemfile                      # Ruby dependencies
├── Gemfile.lock                 # Locked dependency versions
├── README.md                    # Main content (becomes index.html)
├── PRIVACY.md                   # Privacy page (mostly empty)
└── LICENSE                      # GPL v3 license
```

### Development workflow:
1. Make changes to README.md or other content files
2. Test locally: `bundle exec jekyll serve --host 0.0.0.0 --port 4000`
3. Access `http://localhost:4000` to verify changes
4. Build for deployment: `bundle exec jekyll build`
5. Commit and push - GitHub Actions automatically deploys to GitHub Pages

### Key files and their purposes:
- **README.md**: Main page content with BMW logo, description, and disclaimers
- **_config.yml**: Jekyll configuration including site title, description, and theme settings
- **Gemfile**: Ruby gem dependencies, specifically github-pages gem for GitHub Pages compatibility
- **.github/workflows/jekyll-gh-pages.yml**: Automated deployment to GitHub Pages

### Dependencies and requirements:
- Ruby 3.2+ with Jekyll and Bundler
- GitHub Pages gem for deployment compatibility
- Minima theme (default Jekyll theme)

### Common commands reference:
```bash
# Setup (one-time)
sudo gem install jekyll bundler
bundle install

# Development
bundle exec jekyll serve --host 0.0.0.0 --port 4000  # Start dev server
bundle exec jekyll build                              # Build static site

# Troubleshooting
rm -rf _site                     # Clean build artifacts
bundle update                    # Update dependencies
bundle exec jekyll clean         # Clean Jekyll cache
```

### Timing expectations:
- **Gem installation**: 90+ seconds (includes native compilation)
- **Bundle install**: 30-40 seconds 
- **Jekyll build**: 1-2 seconds (very fast due to minimal content)
- **Jekyll serve startup**: 2-3 seconds
- **NEVER CANCEL** any of these commands - they complete quickly

### GitHub Pages deployment:
- Automatic deployment via GitHub Actions on push to main branch
- Uses `.github/workflows/jekyll-gh-pages.yml` workflow
- Deploys to `https://chatala1.github.io/BMW-Concierge`
- No manual deployment steps required

### Common issues and solutions:
- **Gem conflicts**: Always use `bundle exec` with Jekyll commands
- **Permission errors**: Use `sudo bundle install` if bundle install fails
- **GitHub API errors**: The _config.yml file prevents GitHub metadata API issues
- **Missing dependencies**: Run `bundle install` to install missing gems
- **Build failures**: Check that _config.yml and Gemfile are present and valid

### Content structure:
The site displays BMW branding with:
- BMW logo image from GitHub assets
- Project title and description
- GPL v3 license badge
- Legal disclaimers about BMW trademarks
- Minimal navigation with Minima theme styling

NEVER modify the core Jekyll files without understanding the GitHub Pages compatibility requirements.