+++
title = 'Supplementary Phoenix Learning'
description = "Some technology that helped me understand concepts in Phoenix."
slug = "supplementary-phoenix-learning"
type = "note"
date = "2025-11-09T05:09:19Z"
date_planted = "2025-11-09T05:09:19Z"
date_tended = "2025-11-09T05:09:19Z"
draft = false
certainty = "opinion"
vibes = "subjective"
effort = "high"
growth_stage = "sprout"
topics = ["Development", "Learning"]

tags = ["Phoenix", "Elixir", "learning"]
+++

## Overview

I tried to pick up the Phoenix framework for the first time several years ago. But I found the experience a little overwhelming. I had heard that Phoenix was Rails for the Elixir world, and since I had used Rails for a few years, I figured it would be a similar experience. It turns out, it wasn’t a direct translation like some other frameworks I’d tried. Laravel and Adonisjs, for example, feel like you’re just using Rails in a different language. Phoenix isn’t exactly like that. It has Rails inspiration, but it’s not a one-to-one experience.

Recently I attempted to pick it up again and had a much better experience this time around. I know a lot has changed since I last tried it, but these are some notes comparing my past attempt to my current experience.


## Elixir

The thing that made the biggest difference this time was learning Elixir first. My initial experience with Phoenix was a bit of a fail because I figured I’d just learn Elixir while learning Phoenix and building something. That clearly did not happen. But what I found most beneficial, with this go-around, was to do an Elixir course first instead of trying to just jump in head-first, hoping for the best.

{{< callout type="tip" >}}
**My key takeaway:** Do an Elixir course first, I did Pragmatic Studio’s Elixir OTP course.
{{< /callout >}}

## Frontend DX

I have worked with React through several of its iterations. The first time I tried it was even before `create-react-app` was a thing. I did all the wiring up myself, all so I could create a couple of button components and a simple one-pager. I also remember the days of class components and higher order components. And Redux 🥴. And when functional components became the new standard, it started to feel fun again.

Building LiveViews with function components feels a lot like working with JSX and functional React components. It’s a lot of fun. LiveViews also feel a little bit like Rails’ Hotwire, particularly the conventions and server-side rendered updates over the wire. I also just love that Tailwind is wired up out-of-the-box.

There aren’t a huge selection of Phoenix LiveView tutorials out there, but there is no shortage of React tutorials. So if you want to learn the concepts and build a muscle memory for them, but you’re not finding enough LiveView tutorials to get your fill, I think React can be one way to go. Having some React experience definitely made Phoenix’s frontend developer experience feel a lot more familiar and comfortable. I reckon a lot of React developers would feel right at home in a Phoenix LiveView.

{{< callout type="tip" >}}
**My key takeaway:**  build something in React if you can’t find enough LiveView content.
{{< /callout >}}


## PubSub

I really like the PubSub service in Phoenix. How amazing is it? Before I started learning about it, I was mentally preparing myself for an uphill climb. I figured it is a pretty complex topic and I need to be prepared for some frustration as I try to grasp it.

However, I was pleasantly surprised at how effortless Phoenix makes PubSub. I had previously gone through the stages of wrapping my head around websockets, as a concept, by building a Discord Bot that streams messages in real-time. This experience with websockets made learning PubSub in Phoenix feel a little more straightforward and fun.


{{< callout type="tip" >}}
**My key takeaway:**  build a cute little websocket app to understand PubSub concepts in Phoenix.
{{< /callout >}}


## Ecto

Can I just write an ode to Ecto? What a nice library.

I feel like I need to provide some context to frame my feelings about Ecto, as I know it’s a pretty subjective experience. First, I enjoy SQL; I think it’s wonderful. In a previous role, I worked on a platform that was built with React on the frontend and Koa.js on the backend. I spent a lot of time in and around the database dealing with custom reports, using Yup to validate data and generally just needing to constantly interact with the database in some capacity. We used Sequelize as the ORM, and there were times I found myself just using the `query()` function to write some recursive query in regular old SQL for some totalling needed in a custom report or a specific dashboard metric. We made heavy use of Yup to validate data in the models too. It was fine. I had workflows and with repetition, these tasks were fine.

Through that experience, I see how all these tasks could have been performed with out-of-the-box Ecto features. Fragments are an escape-hatch that allow you to just use SQL. Changesets let you cast and validate data, etc. And schema-less queries solves that custom report generation problem. Ecto isn’t an ORM. To me, it feels more like a toolkit to make interacting with the database easier. So I really like it, but I understand that may have a lot to do with the problems I was solving in a previous role.


{{< callout type="tip" >}}
**My key takeaway:**  write some SQL.
{{< /callout >}}


## DX and conventions

I’m going to be one of those people now, but I think that Ruby on Rails played a huge role in my appreciation of Phoenix. I know I said it’s not a one-to-one comparison, and it’s not. But there is something to be said about the developer experience and conventions of Rails and that influence seems present in Phoenix’s DX. I feel like Rails raised a whole genre of Rails-like frameworks, and that’s a good thing. The Rails team makes it possible for iterations to be made on solved problems. Like everything else in this note, this is just my personal opinion based on my own developer journey, but I think it would be beneficial to do a beginner Rails course to build up some context if you’re coming into web application development as a beginner.

{{< callout type="tip" >}}
**My key takeaway:**  build a baby Rails app.
{{< /callout >}}
