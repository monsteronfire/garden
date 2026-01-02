+++
title = "RAG Architecture"
description = "Notes I've taken as I built out a RAG application. Leaving this here for posterity."
slug = "rag-architecture"
type = "note"
date = "2025-07-04T07:33:01Z"
date_planted = "2025-07-04T07:33:01Z"
date_tended = "2025-09-01T07:33:01Z"
draft = false
# Epistemic status
certainty = "high"
vibes = "pretty sure this is a thing"
effort = "medium"
# Maintenance status
growth_stage = "sprout"
# Thematic clustering
topics = ["AI", "Development", "Security"]
tags = ["AI", "RAG", "database", "docling", "embedding", "vector database"]
+++

These are some of the notes I've taken as I built out a RAG application. It took me a little bit to wrap my head around some of the different stages, so I'm leaving this here for posterity.

## Stage 0: Data preparation and insertion into the vector database

{{< callout-group >}}
{{< callout type="info" >}}
  This process of data preparation happens outside the flow of the app. This is where source documents are converted into a format that is suitable to be saved to a vector database, which will be used in the app.
{{< /callout >}}

{{< callout icon="🧰" >}}
  **Tools mentioned:** Docling, Vector database (e.g. pinecone, faiss)
{{< /callout >}}
{{< /callout-group >}}

This preparation process can be separated into a few parts:

- Creating and storing (for future use) a set of "golden questions" that can be used to test the accuracy of the AI responses.
- Creating a knowledge base, which involves collecting source documents for the specific knowledge domain. For instance, user manuals and documentation for a particular software system. Then, converting source documents into a format that can be inserted into a vector database.

### Golden questions

Golden questions are a set of questions that can be used as a control when you periodically test your system for accuracy. You can ask these questions to the model (LLM) and analyse the responses.

### Creating the knowledgebase

You will need to collect reliable source documents that can be used by the LLM to answer questions that users may have that are specific to your use case. The source documents need to be broken up into chunks (with `docling`) and turned into embeddings (with chosen `embedding model`) before being inserted into a `vector database`. You can version your embeddings in case you change the embedding model.

Key concepts in this stage:

- Chunking
- Embedding
- Vector database

## Stage 1: Build RAG (your custom API)

{{< callout-group >}}
{{< callout type="info" >}}
In this stage of the process, you will need to build a custom backend app. The main purpose of this app is to connect your database, LLM, and frontend client.
{{< /callout >}}

{{< callout icon="🧰" >}}
**Tools mentioned:** FastAPI
{{< /callout >}}
{{< /callout-group >}}

Key concepts in this stage:

- Embedding user queries
- Retrieval strategies
- Message formatting
- Optional: Collecting user feedback to improve answers

These are my raw notes regarding this process:

- The functionality of this app will be exposed via a custom API endpoint that will ultimately be consumed by a frontend application
- The same embedding model from stage 0 is used when retrieving data from the vector database, based on the user query.
- You can filter retrieved results for relevance (e.g., only get results with a score of 0.6 and above), ensure they aren't all from the same source, and also use metadata to improve relevance.
- Pick the top 3-5 results.
- Results from the database will be given to the LLM as context along with a prompt (e.g., "Formulate a concise, coherent response, using these chunks for background context: {chunk1, chunk2, etc.}").
- Send the final answer text to the frontend, along with source citations.
- Add rate limiting for IP (if user authentication is not implemented).

## Stage 2: Build a frontend for end users

{{< callout-group >}}
{{< callout type="info" >}}
This is just a regular frontend app; there’s nothing AI-specific about it. All it does is consume the custom API endpoint and gives the user a GUI to interface with.
{{< /callout >}}

{{< callout icon="🧰" >}}
**Tools mentioned:** Server-Sent Events
{{< /callout >}}
{{< /callout-group >}}

The frontend app will house the chat interface that end users can use to input their queries.

Key concepts in this stage:

- Frontend app
- Error handling
- User sending feedback

These are my raw notes regarding this process:

- Just consumes your custom API.
- Display the answer to the user. Maybe you need to implement a loader and use Server-Sent Events to stream tokens as if it's typing for a cuter UX. Most LLMs support streaming.

## Stage 3: Deployment and performance

{{< callout-group >}}
{{< callout type="info" >}}
This section covers ways to make the RAG production-ready. It includes considerations for logging, monitoring, and observability.
{{< /callout >}}

{{< callout icon="🧰" >}}
**Tools mentioned:** Metabase, Lakera Guard
{{< /callout >}}
{{< /callout-group >}}

- Add logging, observability, and monitoring; for instance, track metrics like retrieval latency, chunk relevance scores, and user satisfaction by query type (this can be done by exporting logs to a database and piping them into Metabase to create dashboards).
- Implement rate limits on the API.
- Additional security considerations: sanitise user inputs to avoid prompt injections (use prompt injection detection libraries). Maybe even consider Lakera Guard for security.
- Additional improvements: consider A/B testing different retrieval strategies or chunk sizes using your feedback data.
- Cache common queries to optimise performance and save money.
