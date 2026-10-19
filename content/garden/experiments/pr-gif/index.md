+++
title = "PR Gif"
slug = "pr-gif"
type = "project"
project_type = ["repo", "app"]
date = 2026-10-14T01:30:04Z
date_planted = '2026-10-14T13:02:52Z'
date_tended = '2026-10-20T13:02:52Z'
draft = false
description = "A cute little TUI app to create animated demo gifs for your pull requests."
link = ""
tags = ["TUI", "utility", "golang", "swift", "bubbletea", "tool"]
cover = "project-cover-birthday-buddy.jpg"
+++

## Overview

PR Gif is a TUI app that records your screen and outputs an animated GIF.

## Challenge/Problem

My previous process for creating a demo GIF to include in my pull requests required two apps (Cap and ezgif.com) and four repetitive steps.

To achieve the style of animated GIFs I wanted, I would:

1. Record my screen using Cap
2. Edit it in Cap, add a cute background, export as MP4
3. Import the MP4 to ezgif.com
4. Speed it up, compress it, export as GIF

This process works, but the only variable step is recording the screen. Everything after that is identical every time, so I wanted to automate it. I also wanted it all in one app that runs locally.

## Business Considerations/Context

My philosophy for pull requests is to remove as much friction as possible for the reviewer so that my work gets approved faster. This includes providing shortcuts that help them build a mental model of the changes I'm hoping to introduce.

Showing exactly how to test a new feature or bug fix is one of those shortcuts. A GIF works well because it's just an image that loops, so there's no play button to click.

## Approach and Technical Details

The app consists of two main components:

**TUI (Go binary)**: The main app. It drives the recording and implements the video and GIF processing.

**Screen selection helper (Swift)**: A small utility that lets you select a region of the screen, sends the coordinates to the Go app, and draws the bounding box around the recording area.

### Development Environment

As with most of my projects these days, I used a devcontainer. One thing different with this project is that I used Claude Code within the devcontainer. It worked pretty well, and I didn't feel like I was missing anything by not having it directly installed on my machine.

## Outcomes

I can now record, trim and export a PR-ready GIF in one tool. The manual steps after recording are gone.

## Reflections

This application was vibe coded for the most part. I documented my existing process and used that to design the system, and from there, I had Claude generate a lot of the code. I focused on designing the features and the behaviour. It was a very 2026 experience.

TUI applications are very fun to build and use. I enjoy building CLI tools in Go, and I've learnt I enjoy building TUI tools in Go just as much.

## Future Considerations (optional)

I'd like to add more features and customisable settings, with preferences that can be saved. For now I'm happy with where it's at, and I'll just have to use it to see where it can be improved.

## Github repo

{{< github "https://github.com/monsteronfire/prgif" >}}
