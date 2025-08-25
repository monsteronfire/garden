+++
title = "Low-code AI agent builders"
description = "Maintaining a list of some low code tools for building AI agents"
slug = "low-code-ai-agent-builders"
type = "note"
date = "2025-07-05T07:21:39Z"
date_planted = "2025-07-05T07:21:39Z"
date_tended = "2025-08-21T07:21:39Z"
draft = false
# Epistemic status
certainty = "medium"
vibes = "pretty sure this is a thing"
effort = "medium"
# Maintenance status
growth_stage = "seed"
# Thematic clustering
topics = ["AI"]
tags = ["resource", "ai"]
+++

I’ve been thinking a lot about what a diverse AI engineering stack would look like, and I believe that it has to include some low code tooling. While I’m a developer at my day jobs, I’m a huge fan of low/no code solutions. I like the idea that non-technical people can also participate in emerging technology without feeling left out. It democratises the usage of AI and the associated workflows.

## Where a low code solution fits

Low code AI workflow solutions have their limitations when it comes to customisation, and vendor lock-in is definitely a trade-off to consider. I think low code solutions would be great for small, low-stakes apps, and I also think low code solutions are a great way to rapidly prototype an idea so it can be quickly validated and iterated on before time is spent coding a solution from scratch.

Team members outside the development team can feel empowered to communicate their ideas through these tools. I believe a very important part of adopting new processes is empowering teams across the organisation to work autonomously.

It’s also a great tool for developers too. Not everything has to be a from-scratch LangGraph, Python, backend, frontend affair. Sometimes it’s just not that serious.

## Solutions from the popular cloud providers

As usual, the big cloud providers have managed GenAI platforms that aim to reduce the friction for users building with GenAI. The biggest benefits of using services from the big providers are speed and security. These platforms come with guardrails built in. They abstract away a lot of the tedious processes, like data chunking and embedding, and hosting is built into the workflow. Some of these GenAI development platforms are:

- DigitalOcean GenAI Platform
- Amazon Bedrock
- Google Vertex AI
- Microsoft Azure AI Studio

All these services provide access to foundational models, vector databases, and API endpoint hosting. They come with security features and reasonable default guardrails. I think they would be pretty good for smaller teams who may not have the expertise or bandwidth to manage their own security, logging, observability, and monitoring.

## Solutions from IBM for enterprise users

Outside of the cloud providers, there are other large corporations that are spearheading AI platforms. I recently watched a demo that Nicholas Renotte did for IBM using wxflows. This seems to be one of the platforms that emerged early on and is still around today. The platform seems to be positioned to cater to enterprise users.

## Other players

This is my preferred category of low/no code AI platforms. While the big corps provide a lot of stability, I like to support the smaller players because I think it’s better for the industry overall. In this category:

- Langflow – GUI to build flows that are specifically based on LangChain/LangGraph
- n8n – a more low-level alternative to something like Zapier that is built from the ground up to be an AI platform, and it provides way more control for customisations. You can build more complex flows than something like Zapier.
- Windmill – open source platform to build internal tools that use AI
- Flowise – a visual drag-and-drop platform for building AI agents

There are loads more popping up, and it will be interesting to see which ones stick around after the initial AI gold rush.
