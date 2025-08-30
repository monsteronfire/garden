+++
title = "Dreaming of WebGL"
description = "I want to learn more about WebGL and dream of the things I can create."
slug = "dreaming-of-webgl"
type = "note"
date = "2025-08-10T07:33:38Z"
date_planted = "2025-08-10T07:33:38Z"
date_tended = "2025-08-21T07:33:38Z"
draft = true
# Epistemic status
certainty = "speculative"
vibes = "half-baked"
effort = "medium to low"
# Maintenance status
growth_stage = "seed"
# Thematic clustering
topics = ["Art & Creativity"]
tags = ["tinkering", "webgl", "interactive design"]
+++

Ollama is a great tool that lets you work with open source models offline. I have been using it casually for the past few months. Today I’m using it a lot more as I’m trying to integrate it into some offline app idea I’m working on. 

## Downloading Ollama

You can download the Ollama desktop app and you can also use the `ollama` CLI tool. Both give you an interface where you can see the available offline models, create a new model, copy a model, start a chat, and so on.

## Ollama and offline models

The first time you download Ollama, it comes with a handful of models. You can use the `ollama` CLI tool to add more using the `ollama pull` or `ollama run` commands. For instance, you can download the `codellama` model using the following command:

```bash
ollama run codellama
```

Looking at the model [page](https://ollama.com/library/codellama) for `codellama`, you can will see that there are different sizes of the model with different count of parameters. You will also see that some models come with variants that have been fine-tuned for specific purposes. For instance, `codellama` has a `python` variant that has been fine-tuned specifically for working with `python`. You can get this variant by running the following command

```bash
ollama pull codellama:python
ollama run codellama:python
```

## Using Ollama with Devcontainers

You can use Ollama within a devcontainer environment or you can use the API to interface with the Ollama instance installed on the host machine. If you opt to use Ollama from within a devcontainer, you would first need to have the `ollama` feature added to the `devcontainer.json` config, then you will need to expose the `11434` port. Each model will need to be downloaded every time the devcontainer is built. If you already have `Ollama` running on your host machine, this essentially means you will have two installations of `ollama`.

The alternative would be to just have Ollama installed on your host machine and then connect to it via API calls. Since devcontainers are using docker, the API endpoint will look like this:

```bash
http://host.docker.internal:11434/api/version
```

## Ollama CLI and API

The Ollama CLI let’s you interact with the models you have downloaded. If your app is being run directly on your host machine, you will be able to use `ollama CLI` commands within your code. However, if you are running your app within a devcontainer, you will not have direct access to the `ollama CLI`, so instead you’d need to use the API as the way to interact with the Ollama instance on your host machine.
