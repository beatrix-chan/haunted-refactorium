# Development with Kiro

> This markdown file is a write up on how Kiro was used for the judges to understand how effectively I have used Kiro to develop my project and next-level understanding of Kiro features.

<details>

<summary>Table of Contents</summary>

- [Vibe Coding](#vibe-coding)
- [Agent Hooks](#agent-hooks)
- [Spec-Driven Development](#spec-driven-development)
- [Steering](#steering)
- [MCP](#mcp)

</details>

## Vibe Coding

> How did you structure your convensations with Kiro to build your project? What was the most impressive code generation Kiro helped you with?

## Agent Hooks

> What specific workflows did you automate with Kiro hooks? How did these hooks improve your development process?

*Not Applicable: No agent hooks was used*

## Spec-Driven Development

> How did you structure your spec for Kiro to implement? How did the spec-driven approach improve your development process? How did this compare to vibe coding?

I independently brainstormed the concept and application of Haunted Refactorium, then I shared my ideas in Kiro's chat to generate the specifications. Kiro's `requirements.md`, `design.md`, and `tasks.md` effectively illustrated my vision for the app, complete with improved features and capabilities. The implementation plan provided by Kiro is extremely thorough; I am quite certain that if I attempted to develop Haunted Refactorium on my own, I would likely encounter difficulties right from the outset, as I tend not to plan my steps with such precision.

In comparison to vibe coding, this approach is somewhat more complex (especially for a beginner using Kiro), but it significantly enhances the development process and helps avoid numerous unnecessary issues. It is also the part where I get to learn more different tech stacks that I have never heard of but will be very useful to develop this project (e.g. Railway, Tree-sitter, Swagger, etc.) With vibe coding, I would instruct the AI to code right away, regardless of whether I provided sufficient details. However, utilizing specifications in Kiro feels quite different &mdash; the spec acts as the brain of Kiro. While this means I invest considerably more time in planning and discussing with Kiro to refine the specs rather than actually constructing the application, it increases our chances of staying on course because we are detailed enough in the spec, leading to fewer errors as long as we adhere to the specifications.

## Steering

> How did you leverage steering to improve Kiro’s responses? Was there a particular strategy that made the biggest difference?

Steering has been incredibly beneficial, allowing me to concentrate on the quality of development. Vibe coding and Specs assist me in brainstorming and enhancing the app's appearance and flow. Steering enables me to focus specifically on the quality of the code, as well as planning for deployments, shipping, documentation, and more.

In addition to `product.md`, `tech.md`, and `structure.md`, I requested that Kiro create two specialized steering files: one focused on modernization strategy (`.kiro/steering/modernization-strategy.md`), and another dedicated to tone and metaphors (`.kiro/steering/tone-and-voice.md`). The core mission of Haunted Refactorium is to revitalize outdated or neglected packages and applications. Accordingly, `modernization-strategy.md` provides guidance to the AI on recommending current technology stacks, more effective testing methods, and enhanced security measures—in essence, encouraging developers to adopt modern best practices. Meanwhile, `tone-and-voice.md` defines the overall style of communication, determining the appropriate balance between a spooky or serious tone in the AI’s explanations, so developers receive advice that is both engaging and clear.

Kiro advanced the work with `modernization-strategy.md` and `tone-and-voice.md`. The modernization strategy introduces new elements, such as architecture patterns, identifying legacy patterns to avoid, prioritizing what to refactor, technology-specific recommendations, and incorporating accessibility requirements into the analysis. In the tone and voice document, it addresses language considerations for screen readers and guidance on handling severity levels, among other aspects. It is genuinely impressive to see AI approaching these topics so comprehensively and giving attention to accessibility. This significantly contributes to making the product more inclusive.

## MCP

> How did extending Kiro’s capabilities help you build your project? What sort of features or workflow improvements did MCP enable that otherwise would have been difficult or impossible?

*Not Applicable: No MCP was used.*
