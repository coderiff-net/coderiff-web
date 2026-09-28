---
publishDate: 2026-09-27T00:00:00Z
author: Diego Martin
title: "Understand the problem before designing the solution"
excerpt: "Event Storming, strategic DDD, and vertical slices help teams build a shared model before AI makes it easier to build the wrong thing faster."
image: "~/assets/images/hero-image.png"
imageAlt: "Blue, pink, and orange ink clouds blending into a dark background"
category: engineering
tags:
  - software-design
  - domain-driven-design
  - event-storming
  - ai
---

When a request arrives, it is tempting to start with the solution: a new service, a database change, a screen, or a prompt for an AI coding assistant. But the first engineering task is to understand the problem well enough to know what a useful solution would change.

That distinction matters more now. AI can turn a detailed instruction into code quickly. It can also make a mistaken assumption look polished and complete. If the context is wrong, faster implementation only gets us to the wrong outcome sooner.

## Start with the problem space

Before choosing a design, make the people, rules, decisions, and exceptions visible. Domain-Driven Design (DDD) calls attention to the language and boundaries of the business: where terms mean the same thing, where they differ, and which parts of the organization own which decisions.

Strategic DDD patterns such as **bounded contexts** and **context maps** help describe those boundaries and the relationships between them. They are useful when they reflect real differences in language, ownership, or policy—not as a reason to split a system into more services by default.

I often use **Event Storming** to discover this with business experts. We map domain events—things that have happened—along a timeline, then explore the commands that trigger them, the decisions and rules involved, the people or systems making those decisions, and the information they need. The workshop gives everyone a shared model to question and refine before the implementation hardens around assumptions.

## Describe the system as a set of outcomes

Event Modeling takes a more structured view of how a system responds over time. A useful way to discuss a workflow is through:

- **Commands**: requests to do something, issued by a person through a UI or by an automated process.
- **Events**: facts the system records after something has happened.
- **Read models**: information shaped for a particular question or view.
- **Decision makers**: people or policies that use information to decide which command comes next.

This vocabulary helps uncover missing steps. It makes it easier to ask who may issue a command, what must be true first, what event records the outcome, and which view helps the next person or process act.

## Build vertical slices

Once the problem is clearer, vertical slicing turns a business outcome into a small, end-to-end piece of working software. A slice might let a customer submit a request and let an operator review it, including the UI or automation, command handling, business rules, persisted event or state, and the read model needed to see the result.

Each slice should be cohesive around the behavior it supports and loosely coupled to neighboring slices. This keeps related decisions together while making change less likely to ripple through unrelated parts of the system. It also gives teams a concrete outcome to validate with users early.

That boundary is useful when working with AI too. A well-understood slice gives an assistant a smaller, more relevant context: the domain terms, the command and event, the rules, and the acceptance criteria. It gives the team a way to review generated work against an agreed model instead of judging code in isolation.

The goal is not to eliminate uncertainty before writing code. It is to make the important uncertainty discussable, involve the people who understand the work, and learn in small steps. Start with the problem. Agree on a model. Then build a slice that proves the solution helps.
