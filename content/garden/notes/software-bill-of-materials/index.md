+++
title = "Software Bill of Materials"
description = "Learning more about how to apply this practice to community cybersecurity."
slug = "software-bill-of-materials"
type = "note"
date = "2025-07-11T07:33:18Z"
date_planted = "2025-07-11T07:33:18Z"
date_tended = "2025-08-21T07:33:18Z"
draft = false
# Epistemic status
certainty = "medium"
vibes = "pretty sure this is a thing"
effort = "high"
# Maintenance status
growth_stage = "bloom"
# Thematic clustering
topics = ["Culture & Community", "Security"]
tags = ["security", "process", "culture", "knowledgebase"]
+++

## What is a Software Bill of Materials

A Software Bill of Materials is an inventory of assets, dependencies, and other information that provides a deeper look into the components in your system. Having a Software Bill of Materials is a good starting point for a security strategy, but it is just the start and should be part of a bigger strategy, including other tools and considerations.

## How do you generate an SBOM?

Imagine trying to manually keep track of all the packages you’ve ever installed, all their dependencies, all the external services you’ve signed up for, and everything in between. It might be manageable in the beginning on a very small app, but as soon as the app starts growing and you’re contending with all sorts of other priorities, it will be a nightmare trying to keep up the habit of maintaining such an inventory. Then, when more team members join and start adding to the codebase, the practice will need to be enforced somehow. Nobody has time for this, which is why the generation of an SBOM is typically automated.

There are various packages available for different languages. In the Python ecosystem, for instance, you can install the package called `cyclonedx-bom` to generate an SBOM for you, either in JSON or XML. The package name is sorta hectic—what is a Cyclone DX, even? It is an OWASP standard that lays out how an SBOM should be structured.

## When are SBOMs generated?

You can generate an SBOM at different points of the development lifecycle. You can add a line in your Dockerfiles to generate an SBOM whenever the image is built. You can generate an SBOM within your GitHub Actions CI config. You can generate an SBOM during vulnerability scanning with tools like Snyk. Platforms like JFrog also provide vulnerability scanning, artefact analysis, and SBOM report generation. Hugging Face uses JFrog to scan their models. Most security tools and platforms either generate or ingest SBOMs, as they are a very important part of a security strategy. They give a good overall picture of all the moving parts of your system.

## Non-security use cases: onboarding

SBOMs would be a great way to onboard new team members. They can be paired with visualisation software to draw out architecture diagrams, as well as maintain an always up-to-date snapshot of the tech stack, dependencies, and service boundaries with third-party tools.

This would reduce the burden on the current team because they don’t have to always throw together an architecture diagram whenever a new team member joins.

## What does an SBOM contain?

An SBOM should contain the following fields:

- **Metadata** – timestamp, tools used, authors
- **Components** – all dependencies with versions, licences, hashes
- **Dependencies** – relationship graph between components
- **Vulnerabilities** – known security issues (optional)
- **Licences** – licensing information
- **Services** – external services the software depends on

## How can an SBOM be used in threat modelling?

An SBOM can be used during threat modelling exercises to give you a comprehensive list of your assets, so you are better able to draw out the ways data flows through your app (DFD – Data Flow Diagrams) and attack trees to show possible paths bad actors would take depending on how they gain entry into your app.

## How can an SBOM be used to improve security?

SBOMs can be fed into larger security platforms as part of a larger, more robust security architecture. SBOMs can be ingested into:

- Vulnerability management platforms
- Security tools
- Compliance and governance tools
- Supply
