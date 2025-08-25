+++
title = "Sinatra-inspired frameworks"
description = "A brief history of my exploration into the genre of micro-frameworks shaped by Sinatra's minimalist philosophy, and how they influenced each other."
slug = "sinatra-inspired"
type = "essay"
date = 2025-06-20T10:00:00-07:00
date_planted = 2025-06-20T10:00:00-07:00
date_tended = 2025-08-25T10:00:00-07:00
draft = false
growth = "sprout"
word_count = 0
certainty = "medium"
completeness = "developing"
tags = ["ruby", "frameworks"]
domain = [""]
+++

## Introduction

Sinatra is often described as a micro framework because of its focus on minimalism. Like Ruby on Rails and other Ruby frameworks, it is built on top of Rack. Unlike Rails, Sinatra provides only routing and middleware, leaving the rest up to the developer. This minimalist approach has inspired many other frameworks. For example, the creator of ExpressJS has explicitly stated that Sinatra was the inspiration for Express, which is now one of the most popular web frameworks.

## The foundation: Rack

Rack can be thought of in the same way we understand ECMAScript in the JavaScript ecosystem. Both are specifications, not programming languages themselves. ECMAScript defines how JavaScript should work, while Rack is a specification and middleware layer that describes how compatible web servers interact with web frameworks. Rack enables interoperability between frameworks. For instance, Rodauth is an authentication framework built with Roda and Sequel, but because it is built on top of Rack, it can be incorporated as the authentication system for a Ruby on Rails app. In this way, Rodauth essentially becomes a small Roda app within a fullstack Rails application.

## Philosophy of minimalism

At the core of web application development is routing, the foundation of all web applications. However, additional features are often needed, and not all web applications require the same ones. If there is a mechanism to add features as middleware, developers can create web applications with exactly what they need and none of the things they don't need. Sinatra is on the opposite end of the spectrum compared to more feature-rich frameworks like Rails.

## The influence on other frameworks

### ExpressJS

ExpressJS is the de facto NodeJS framework and I had worked with it for a while before I fully understood the design decisions behind it. I often wondered why it was so barebones compared to Rails, which provides many features out of the box. As a result, I would ultimately set my ExpressJS projects up to be more Rails-like. I finally had a lightbulb moment after I started working with GoFiber.

### GoFiber

GoFiber is inspired by ExpressJS and aims to make it easier for JavaScript developers to transition into Go. Building a couple of web apps with GoFiber for my [YouTube channel](https://divrhino.com/articles/rest-api-docker-go-fiber-from-scratch/) helped me appreciate what the creators meant when they said it was inspired by ExpressJS. This experience also gave me a better grasp of Express itself, making it feel much more familiar when I returned to it.

### Roda and Cuba

Recently, I worked on a little project to incorporate Rodauth into a Rails app. Through this process, I learned more about Roda, the framework on which Rodauth is built. Roda is inspired by Sinatra and shares its minimalist philosophy, but it differs in its approach to routing. Roda's routing strategy is influenced by Cuba, another framework inspired by Sinatra. While Roda and Cuba use a tree-based routing strategy, Sinatra and ExpressJS rely more on a DSL approach. Despite these differences, the core principles remain the same: each framework provides routing and a mechanism for middleware.

### FastAPI

As I began learning Python, I explored its web frameworks. I was already familiar with Django, often compared to Rails, but FastAPI was new to me. Upon learning more about FastAPI, it felt very ExpressJS-like.

## Everything that is Express-like is Sinatra-like

Before I learnt about Sinatra, I always thought of frameworks as being ExpressJS-like, especially since most of my experience has been in JavaScript and ExpressJS is the framework I’ve used the most. It’s pretty cool to discover that so much of what I’ve worked with traces back to Sinatra. I’ve often felt there's a whole genre of web frameworks that can be described as "Rails-inspired", but now I see there's also a whole genre of micro frameworks that are "Sinatra-inspired". The Ruby community stays pioneering, I guess.

## Links
- [Sinatra](https://sinatrarb.com/documentation.html)
- [Express.js Wikipedia](https://en.wikipedia.org/wiki/Express.js)
- [Rodauth](https://github.com/janko/rodauth-rails)
