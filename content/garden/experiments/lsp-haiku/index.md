+++
title = 'Haiku LSP: AI-powered tooling architecture'
description = "VS Code plugin leveraging offline models to build privacy-preserving dev tools."
slug = "lsp-haiku"
type = "experiment"
date = '2025-08-20T13:03:52Z'
date_planted = '2025-08-20T13:02:52Z'
date_tended = '2026-02-01T13:02:52Z'
draft = false
link = ""
tags = ["AI", "Ollama", "Language Server", "VS Code"]
+++

## Overview
Haiku LSP is a VS Code extension and Language Server that generates haiku poetry when you hover over function names in your code. While the functionality is whimsical, the project serves as a proof of concept for building AI-powered developer tools using offline language models.

## Challenge/Problem
Modern AI-powered development tools often rely on cloud-based LLMs, raising significant privacy and security concerns. Code sent to external APIs may contain sensitive business logic, proprietary algorithms, or confidential data. This experiment proposes an alternative architecture for building developer tools that addresses these concerns.

By leveraging locally-hosted language models through Ollama, this proof of concept demonstrates how we can create intelligent tooling without exposing code to third-party services. While the haiku generation itself is playful, the underlying architecture can be adapted for more practical applications like code documentation, intelligent autocomplete, or code review assistance, all while keeping your code on your own infrastructure.

## Business Considerations/Context
Privacy and security are the primary drivers for this experiment, but the approach offers additional business benefits:

**Cost Management**: Self hosting models eliminates per-request API costs, making AI tooling more predictable and potentially more economical at scale.

**Data Sovereignty**: All user data and code remain within your infrastructure, reducing third-party dependencies and simplifying compliance with data protection regulations.

**Customisation**: Self-hosted models can be fine-tuned on internal codebases and documentation, potentially providing more contextually relevant suggestions than generic cloud services.

## Approach and Technical Details
The architecture consists of two main components:

**Language Server (Go)**: Implements the Language Server Protocol to communicate with VS Code. When a hover event occurs over a function name, it extracts the function identifier and sends it to the local Ollama instance.

**VS Code Extension (JavaScript)**: Acts as the LSP client, bridging communication between the editor and the language server.

The workflow is straightforward: when a developer hovers over a function name, the language server sends a prompt to Ollama requesting a haiku based on the function name. The generated haiku is then returned and displayed in VS Code's hover tooltip.

### Model Selection
After experimenting with several models, I settled on `Llama-3.2-1B-Instruct-GGUF` for two key reasons:
- It generated more creative haikus that captured the essence of the function without merely echoing the function name
- The smaller model size (1B parameters) provided acceptable inference speeds on consumer hardware

### Development Environment
The project uses a devcontainer for a consistent development environment. Interestingly, I opted to connect to the host machine's Ollama instance rather than containerizing Ollama itself. This approach simplified the setup and allowed the devcontainer to remain lightweight while still accessing model inference capabilities.

The official Language Server Protocol documentation proved invaluable, providing clear examples and specifications that made implementation relatively straightforward.

## Outcomes
The extension successfully generates haikus for functions in multiple programming languages:
- Go
- JavaScript/TypeScript
- Python

The Language Server Protocol's language-agnostic design means adding support for additional languages requires minimal effort. It is primarily achieved through configuring file type associations in the VS Code extension.

## Reflections
The past year has brought increased scrutiny to the security implications of AI-assisted development tools. While I'm not a security expert, this experiment helped me better understand how organisations can balance the benefits of AI tooling with legitimate concerns about prompt injection attacks, inadvertent data leaks, and other LLM-specific vulnerabilities.

The offline-first architecture isn't without trade-offs, though. Locally-hosted models are generally less capable than frontier cloud models, and maintaining infrastructure adds operational overhead. However, for organizations with strict security requirements or working with highly sensitive codebases, these trade-offs may be worthwhile.

What surprised me most was how accessible this technology has become. A few years ago, running a capable language model locally would have been impractical. Today, with tools like Ollama and optimised model formats like GGUF, even relatively modest hardware can deliver responsive AI features.

## Future Considerations
I plan to extend this experiment in several directions:

**Testing and Reliability**:
- Add comprehensive unit tests for both the language server and extension
- Implement integration tests to verify end-to-end functionality
- Add error handling and fallback behaviors for model failures

**Production Deployment**:
- Deploy Ollama on dedicated infrastructure to support team-wide usage
- Explore model optimisation techniques to reduce inference latency
- Investigate model caching strategies for frequently-accessed functions

**Practical Applications**:
- Adapt the architecture for more utilitarian features (documentation generation, code explanations, test scaffolding)
- Explore fine-tuning approaches to improve model outputs for domain-specific code
- Investigate whether this architecture could benefit non-technical teams (e.g., generating natural language summaries of data transformations for analysts)

## Github repo

{{< github "https://github.com/monsteronfire/haiku-lsp" >}}
