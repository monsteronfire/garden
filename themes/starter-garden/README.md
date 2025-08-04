# Starter Garden Hugo Theme

A flexible Hugo theme for creating digital gardens with growth tracking, epistemic status, and interconnected content.

## Quick Start

1. Add theme to your site
2. Copy `exampleSite/hugo.example.toml` to your site root and rename it to `hugo.toml`
3. Customise taxonomies and parameters for your needs
4. Copy example archetypes and modify as needed

## Features

- ✅ Growth stage tracking (seed → tree → fruit)
- ✅ Epistemic status indicators
- ✅ Content freshness tracking
- ✅ Flexible content types (notes, bookmarks, essays, portraits, projects)
- ✅ Relationship mapping between content
- ✅ Customisable taxonomy structure

## Configuration

### Essential Taxonomies
The theme works best with these taxonomies (customize names/values as needed):

```toml
[taxonomies]
  growth = "growth"           # seed, tree, fruit
  certainty = "certainty"     # high, medium, low, speculative
  # ... etc
```
