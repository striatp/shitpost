# Octovel Developer & Code Standards

**Version 2.0 — Effective October 2025**

This comprehensive guide defines the coding standards, repository practices, development workflows, and collaboration principles for all Octovel projects. It ensures maintainability, consistency, security, and quality across our entire technology stack.

---

## Table of Contents

1. [Core Philosophy & Principles](#1-core-philosophy--principles)
2. [Language & Technology Standards](#2-language--technology-standards)
3. [Repository Organization](#3-repository-organization)
4. [Code Style & Formatting](#4-code-style--formatting)
5. [Version Control & Git Workflow](#5-version-control--git-workflow)
6. [Code Review & Collaboration](#6-code-review--collaboration)
7. [Testing & Quality Assurance](#7-testing--quality-assurance)
8. [Documentation Standards](#8-documentation-standards)
9. [Security & Privacy](#9-security--privacy)
10. [Performance & Optimization](#10-performance--optimization)
11. [Error Handling & Logging](#11-error-handling--logging)
12. [API Design & Integration](#12-api-design--integration)
13. [Database & Data Management](#13-database--data-management)
14. [DevOps & CI/CD](#14-devops--cicd)
15. [Containerization & Deployment](#15-containerization--deployment)
16. [Monitoring & Observability](#16-monitoring--observability)
17. [Dependency Management](#17-dependency-management)
18. [Accessibility & Internationalization](#18-accessibility--internationalization)
19. [Open Source Contributions](#19-open-source-contributions)
20. [Professional Development & Knowledge Sharing](#20-professional-development--knowledge-sharing)

---

## 1 Core Philosophy & Principles

### 1.1 Development Values

Our engineering culture is built on five foundational values that guide every decision and implementation:

**Quality Over Speed**: We prioritize well-crafted, maintainable code over rushed implementations. Technical debt is expensive, and shortcuts taken today become bottlenecks tomorrow. Every engineer should feel empowered to push back on unrealistic timelines if quality would be compromised.

**Clarity Over Cleverness**: Code is read far more often than it is written. We value straightforward implementations that any team member can understand over clever one-liners that require deep language expertise to comprehend. If you find yourself being clever, step back and consider a simpler approach.

**Consistency Over Preference**: Individual preferences take a backseat to team standards. Even if you prefer tabs over spaces or a different bracket style, consistency across our codebase reduces cognitive load and makes code reviews more effective. Follow the established patterns, and propose changes through proper channels if you believe improvements are warranted.

**Simplicity Over Complexity**: The best solution is often the simplest one that solves the problem effectively. Avoid premature optimization, over-engineering, and unnecessary abstractions. Build what you need today, not what you might need in the future. Complexity should be justified by measurable requirements, not theheoretical scenarios.

**Proactive Over Reactive**: Anticipate issues through comprehensive testing, monitoring, and documentation rather than waiting for problems to emerge in production. Write defensive code, handle edge cases, and plan for failure modes. A small investment in prevention saves enormous effort in remediation.

### 1.2 Engineering Principles

These principles form the foundation of how we approach software design and implementation:

**DRY (Don't Repeat Yourself)**: Duplication creates maintenance burdens and increases the likelihood of bugs. When you find yourself copying code, extract it into a reusable function, module, or component. However, be cautious of premature abstraction; sometimes a little duplication is better than the wrong abstraction.

**SOLID Principles**: Apply object-oriented design principles appropriately. Single Responsibility Principle ensures classes and functions have one clear purpose. Open/Closed Principle encourages extension without modification. Liskov Substitution Principle maintains type safety in inheritance hierarchies. Interface Segregation Principle prevents bloated interfaces. Dependency Inversion Principle promotes loose coupling through abstractions.

**YAGNI (You Aren't Gonna Need It)**: Don't build features, abstractions, or infrastructure before they're actually required. Speculative development often leads to unused code that still requires maintenance. Focus on current, concrete requirements rather than hypothetical future needs.

**KISS (Keep It Simple, Stupid)**: Favor straightforward solutions over complex architectures. The simplest design that meets requirements is almost always the best design. Complexity should emerge naturally from requirements, not from architectural astronautics.

**Separation of Concerns**: Keep different aspects of your system isolated and focused. Presentation logic should be separate from business logic, which should be separate from data access. This separation makes code more testable, maintainable, and easier to reason about.

**Fail Fast**: Detect and report errors as early as possible rather than allowing invalid state to propagate through your system. Validate inputs at boundaries, use strong typing, and throw exceptions when invariants are violated. Silent failures and corrupted data are far more dangerous than loud errors.

### 1.3 Code Ownership Philosophy

**Collective Code Ownership**: No code "belongs" to any individual engineer. Any team member should feel comfortable modifying any part of the codebase. This approach prevents knowledge silos, distributes expertise, and ensures the team can continue functioning if someone is unavailable.

**Pride in Craftsmanship**: Despite collective ownership, every engineer should treat code as if they'll maintain it forever. Write clear variable names, add helpful comments, structure code logically, and leave it better than you found it. Your name is on every commit, make it count.

**The Boy Scout Rule**: Always leave code cleaner than you found it. If you notice unclear variable names, missing documentation, or inefficient implementations while working on a feature, improve them. Small incremental improvements compound into significant codebase health over time.

**Accountability and Ownership**: While code is collectively owned, individuals are accountable for their changes. If your commit introduces a bug, own it, fix it, and learn from it. Blame-free culture doesn't mean consequence-free, it means we focus on systemic improvements rather than individual fault.

### 1.4 Decision Making Framework

**Data-Driven Decisions**: Base architectural and technical decisions on objective metrics and benchmarks rather than opinions or assumptions. When evaluating competing solutions, measure performance, resource usage, development time, and maintenance burden. Document your methodology and findings.

**Architecture Decision Records (ADRs)**: Document significant technical decisions in ADR format. Include the context that led to the decision, alternatives considered, the decision made, and its consequences (both positive and negative). ADRs create an invaluable historical record that helps future engineers understand why systems are designed as they are.

**Request for Comments (RFC) Process**: Major architectural changes, new frameworks, or significant departures from existing patterns require an RFC. Write a detailed proposal, solicit feedback from relevant stakeholders, address concerns, and achieve consensus before implementation. RFCs prevent costly mistakes and ensure team alignment.

**Experimentation and Spikes**: For uncertain or novel problems, time-boxed spikes allow exploration without commitment. A spike is an experiment to answer a specific question, not production code. Set clear objectives, a time limit (typically 1-3 days), and success criteria. Share findings regardless of outcome.

### 1.5 Balance and Trade-offs

Engineering is fundamentally about trade-offs. Every decision involves balancing competing concerns:

| Concern | Trade-off |
|---------|-----------|
| **Speed vs Quality** | Fast delivery may sacrifice long-term maintainability |
| **Flexibility vs Simplicity** | Generic solutions add complexity for uncertain future needs |
| **Performance vs Readability** | Optimizations often obscure intent and reduce clarity |
| **Innovation vs Stability** | New technologies offer capabilities but introduce risk |

Make trade-offs consciously and explicitly. Document your reasoning, acknowledge what you're sacrificing, and revisit decisions as circumstances change. The right answer depends on context, constraints, and organizational priorities.

---

## 2 Language & Technology Standards

### 2.1 Supported Languages and Their Purposes

Octovel maintains a curated set of languages, each chosen for specific strengths and use cases. This intentional limitation prevents fragmentation, ensures adequate expertise exists within the team, and simplifies hiring and training.

| Language | Primary Use Cases | When to Choose | When to Avoid |
|----------|------------------|----------------|---------------|
| **TypeScript** | Web applications, REST/GraphQL APIs, CLI tools, build tooling | Rich web ecosystem, type safety for JavaScript, rapid development, Node.js deployment | CPU-intensive tasks, real-time systems, memory-constrained environments |
| **Python** | Data processing, machine learning, automation scripts, DevOps tooling | ML libraries, scientific computing, quick prototyping, extensive third-party packages | High-performance APIs, concurrent systems, large-scale applications |
| **Rust** | Systems programming, performance-critical services, CLI utilities, WebAssembly | Memory safety without garbage collection, extreme performance, concurrency, embedded systems | Rapid prototyping, projects with tight deadlines, teams without Rust experience |
| **C/C++** | Low-level systems, game engines, embedded software, legacy integration | Hardware interaction, real-time requirements, existing C++ codebases | Modern web services, business logic, prototyping |
| **C#** | Enterprise applications, Unity or Avalonia app development, Windows/.NET stack | Mature tooling (VS/Rider), enterprise support, great for Avalonia cross-platform GUIs | Cross-platform CLI tools, microservices (prefer Go/Rust), resource-constrained environments |
| **Go** | Microservices, cloud infrastructure, concurrent systems, networking tools | Built-in concurrency, fast compilation, simple deployment, cloud-native | Complex business logic, rapid prototyping, GUI applications |
| **Java** |	Enterprise backends, Android legacy apps, financial systems |	JVM portability, mature ecosystem, robust runtime performance, huge dev base	| Small utilities, resource-limited environments, high iteration-speed projects |
| **Zig** |	Low-level systems, embedded dev, cross-compilation tooling, C replacement | 	Simplicity, manual but safe memory management, predictable performance, C interop | 	Immature ecosystem, web/backend projects, rapid iteration needs |

### 2.2 Language Selection Decision Tree

When starting a new project or component, use this decision framework:

**Step 1: Requirements Analysis**
- What are the performance characteristics (latency, throughput, resource constraints)?
- What is the expected scale (users, data volume, request rate)?
- What are the integration requirements (APIs, databases, third-party services)?
- What are the deployment constraints (cloud, on-premise, edge, mobile)?

**Step 2: Team Considerations**
- What expertise exists within the team currently?
- How quickly do we need to deliver the initial version?
- What is the expected maintenance burden and lifecycle?

**Step 3: Ecosystem Evaluation**
- What libraries and frameworks are available and mature?
- What is the community support and documentation quality?
- How active is development and how responsive are maintainers?

**Step 4: Long-term Viability**
- What is the technology's adoption trajectory?
- How stable is the language and ecosystem?
- What are the migration risks if we need to change later?

### 2.3 Framework Selection Criteria

Frameworks significantly impact development velocity, code quality, and long-term maintainability. Choose frameworks deliberately using these criteria:

**Maturity and Stability**: Prefer frameworks with proven track records in production environments. A framework should have been through multiple major versions, demonstrating commitment to backward compatibility and thoughtful evolution. Avoid pre-1.0 frameworks for critical systems.

**Community and Ecosystem**: Strong communities provide extensive documentation, tutorials, plugins, and troubleshooting resources. Measure community health by GitHub stars, NPM downloads, Stack Overflow activity, conference presence, and responsive issue tracking.

**Performance Characteristics**: Understand the framework's performance profile through benchmarks and real-world case studies. Some frameworks prioritize developer ergonomics over raw speed, which may be appropriate for many use cases but critical for high-traffic systems.

**Opinion Level**: Frameworks exist on a spectrum from unopinionated (providing building blocks) to highly opinionated (enforcing specific patterns). Choose based on your team's preferences and the problem domain. Highly opinionated frameworks accelerate development but reduce flexibility.

**Bundle Size and Dependencies**: For frontend frameworks and libraries, bundle size directly impacts user experience. For backend frameworks, dependency count affects security surface area and maintenance burden. Evaluate the cost of convenience.

**Vendor Lock-in Risk**: Some frameworks create tight coupling to specific vendors, platforms, or ecosystems. Understand exit costs and migration paths. Prefer standards-based approaches and abstraction layers when reasonable.

**Learning Curve and Documentation**: Framework complexity should match team expertise and timeline. Excellent documentation, clear examples, and active learning resources significantly reduce onboarding time and ongoing frustration.

### 2.4 Approved Technology Stack

These frameworks and libraries have been vetted and approved for use across Octovel projects:

**TypeScript Ecosystem:**
- **Backend**: Express/Hono (mature, flexible), Fastify (high performance), Nest.js (enterprise patterns)
- **Frontend**: React (component library), Next.js (full-stack framework), Vite (build tool)
- **Testing**: Vitest (fast, modern), Jest (mature, comprehensive), Playwright (E2E)
- **Utilities**: Lodash (functional utilities), Zod (schema validation), date-fns (date manipulation)

**Python Ecosystem:**
- **Web**: FastAPI (modern, async), Flask (lightweight, flexible), Django (with justification for admin-heavy apps)
- **Data**: Pandas (analysis), NumPy (numerical computing), Polars (high-performance DataFrames)
- **ML/AI**: PyTorch (deep learning), Scikit-learn (traditional ML), Hugging Face (transformers)
- **Testing**: Pytest (flexible, powerful), Hypothesis (property-based testing)

**Rust Ecosystem:**
- **Async Runtime**: Tokio (comprehensive, mature)
- **Web**: Axum (ergonomic, type-safe), Actix (high-performance)
- **Serialization**: Serde (universal serialization), Bincode (binary format)
- **CLI**: Clap (argument parsing), Indicatif (progress bars)

**Database Technologies:**
- **Relational**: PostgreSQL (primary choice), MySQL (legacy support only)
- **Document**: MongoDB (with justification), DynamoDB (AWS-native projects)
- **Cache**: Redis (distributed cache, pub/sub), Memcached (simple caching only)
- **Search**: Elasticsearch (full-text search), MeiliSearch (lightweight alternative)
- **Time-series**: TimescaleDB (PostgreSQL extension), InfluxDB (high-volume metrics)

**Infrastructure and DevOps:**
- **Containers**: Docker (mandatory for all services)
- **Orchestration**: Kubernetes (production), Docker Compose (development)
- **CI/CD**: GitHub Actions (preferred), GitLab CI (enterprise), CircleCI (legacy)
- **IaC**: Terraform (cloud infrastructure), Ansible (configuration management)
- **Monitoring**: Prometheus + Grafana (metrics), ELK Stack (logging), Jaeger (tracing)

Keep in mind that our products must be as dependency-less as possible.

### 2.5 Technology Evaluation Process
Introducing new technologies requires formal evaluation to prevent ecosystem fragmentation:

**Stage 1: Proposal (1-2 days)**
- Document the problem the technology solves
- Explain why existing approved technologies are insufficient
- Identify the team member who will champion and support the technology
- Create a brief proposal with alternatives considered

**Stage 2: Spike (1-5 days)**
- Build a proof-of-concept demonstrating key use cases
- Evaluate documentation quality and learning curve
- Assess performance characteristics and resource requirements
- Identify potential integration challenges

**Stage 3: Review (1 week)**
- Present findings to engineering team in technical review meeting
- Address questions, concerns, and alternative suggestions
- Update proposal with feedback and additional research
- Achieve consensus or identify blocking concerns

**Stage 4: Pilot (1-3 months)**
- Use technology in a non-critical project or component
- Document patterns, best practices, and gotchas
- Gather team feedback on developer experience
- Evaluate production behavior and operational characteristics
**Stage 5: Adoption Decision**
- Formally approve for general use, approve with restrictions, or reject
- Document decision in ADR with rationale and context
- Update this standards document if approved
- Create internal guides and training materials

**Stage 5: Adoption Decision**
- Formally approve for general use, approve with restrictions, or reject
- Document decision in ADR with rationale and context
- Update this standards document if approved
- Create internal guides and training materials

### 2.6 Language-Specific Best Practices

Each language has idiomatic patterns and anti-patterns that significantly impact code quality:

**TypeScript Best Practices:**
- Enable strict mode in tsconfig.json to catch type errors early
- Avoid implicit any types; be explicit about type contracts
- Use discriminated unions for state machines and variant types
- Prefer functional composition over deep class hierarchies
- Leverage utility types (Partial, Pick, Omit, Record) for type transformations
- Use const assertions for literal type inference
- Implement branded types for domain primitives (UserId, EmailAddress)

**Python Best Practices:**
- Add type hints to all public functions and methods for documentation and static analysis
- Use dataclasses or Pydantic for structured data rather than dictionaries
- Follow PEP 8 style guide rigorously; use Black for consistent formatting
- Prefer pathlib for file operations over os.path for better API
- Use context managers for resource management (with statements)
- Leverage list comprehensions and generator expressions for concise iteration
- Avoid mutable default arguments; use None and initialize in function body

**Rust Best Practices:**
- Follow Rust API guidelines for public interfaces
- Use Err for recoverable errors, panic only for unrecoverable bugs
- Prefer owned types over references in public APIs for simplicity
- Leverage the type system to enforce invariants at compile time
- Use builder patterns for complex object construction
- Implement Debug, Clone, and other derivable traits appropriately
- Document unsafe code thoroughly with safety invariants

**C++ Best Practices:**
- Follow C++ Core Guidelines for modern C++ practices
- Use RAII for all resource management; avoid manual memory management
- Prefer smart pointers (unique_ptr, shared_ptr) over raw pointers
- Use const correctness to communicate and enforce immutability
- Leverage move semantics to avoid unnecessary copies
- Enable all compiler warnings and treat them as errors
- Use standard library containers and algorithms instead of C arrays

**C# Best Practices:**
- Follow Microsoft C# coding conventions for consistency with ecosystem
- Enable nullable reference types to catch null reference errors
- Use async/await throughout; avoid blocking on async operations
- Prefer LINQ for collection operations for readability and optimization
- Implement IDisposable for resource cleanup with using statements
- Use records for immutable data transfer objects
- Leverage pattern matching for cleaner conditional logic

**Go Best Practices:**
- Follow Effective Go guidelines and standard project layout
- Keep interfaces small and focused; prefer composition over inheritance
- Use defer for cleanup actions to ensure execution
- Handle errors explicitly; avoid panic except for programmer errors
- Design for testability with dependency injection via interfaces
- Use channels and goroutines idiomatically; avoid shared mutable state

Keep packages focused and cohesive with clear responsibilities

## 3 Repository Organization

### 3.1 Standard Directory Structure Philosophy

A well-organized repository reduces cognitive load, accelerates onboarding, and makes navigation intuitive. Our standard structure applies across languages with appropriate variations for language-specific conventions.

**Core Principles:**
- **Predictability**: Developers should know where to find things without searching
- **Scalability**: Structure should work for small and large projects
- **Tooling Compatibility**: Standard locations for configs, tests, and documentation
- **Clear Boundaries**: Separation between source, tests, documentation, and infrastructure

### 3.2 Universal Repository Structure

Every Octovel repository follows this foundational structure with language-specific adaptations:

```
project-name/
├── .github/              # GitHub-specific configurations and automation
├── documentation/        # All documentation beyond basic README
├── source/               # Primary source code (or lib/, app/ depending on language)
├── tests/                # Test code mirroring src/ structure
├── scripts/              # Development and deployment automation
├── infrastructure/       # Container definitions and deployment configs
├── tools/                # Custom development tools and utilities
├── .editorconfig         # Cross-editor coding style
├── .gitignore            # Version control exclusions
├── .gitattributes        # Git behavior configuration
├── README.md             # Project overview and quick start
├── CHANGELOG.md          # Version history and release notes
├── CONTRIBUTING.md       # Contribution guidelines
├── LICENSE               # Open source license
└── SECURITY.md           # Security policy and vulnerability reporting
```

**GitHub Configuration (`.github/`):**
- This directory contains GitHub-specific automation and templates that standardize interactions and processes:
`workflows/` - CI/CD pipeline definitions for automated testing, building, and deployment
- `ISSUE_TEMPLATE/` - Structured templates for bug reports, feature requests, and other issue types
- `PULL_REQUEST_TEMPLATE.md` - Standard format for pull requests ensuring consistent information
- `CODEOWNERS` - Automatic reviewer assignment based on file paths and ownership
dependabot.yml - Automated dependency update configuration

**Documentation Structure (`docs/`):**

Comprehensive documentation is critical for maintainability and knowledge transfer:

- `architecture/` - System design documents, component diagrams, data flow documentation
- `api/` - API reference documentation, endpoint specifications, integration guides
- `guides/` - User guides, developer guides, deployment procedures, troubleshooting
- `adr/` - Architecture Decision Records documenting significant technical choices
- `diagrams/` - Visual representations created with tools like Mermaid or draw.io
- `meetings/` - Technical design review notes and decision logs

**Source Code Organization (`source/`):**

The `source/` directory structure varies by language and application type but follows consistent principles:

- `core/` or `domain/` - Business logic and domain models independent of infrastructure
- `api/` or `handlers/` - HTTP endpoints, request/response handling, routing
- `services/` - Service layer coordinating business logic and infrastructure
- `repositories/` or `dal/` - Data access layer abstracting database operations
- `models/` or `entities/` - Data structures and domain entities
- `utilities/` or `library/` - Shared utilities and helper functions
- `configuration/` - Configuration loading and validation
- `middleware/` - Request processing middleware for cross-cutting concerns

**Test Organization (`tests/`):**

Tests mirror the source structure for easy navigation between implementation and tests:

- `unit/` - Fast, isolated tests of individual functions and classes
- `integration/` - Tests of multiple components working together
- `e2e/` or `acceptance/` - End-to-end tests simulating real user workflows
- `performance/` or `load/` - Performance and stress testing scripts
- `fixtures/` - Test data, mocks, and reusable test helpers
- `factories/` - Test data generators for creating valid test objects

**Infrastructure (`infrastructure/`):**

All deployment and infrastructure-related files live here, separated from application code:

- `docker/` - Dockerfiles for various build stages and environments
- `k8s/` or `kubernetes/` - Kubernetes manifests, Helm charts, and deployment configs
- `terraform/` - Infrastructure as Code definitions for cloud resources
- `ansible/` - Configuration management playbooks
- `scripts/` - Deployment automation and operational scripts

You may of course create other folders and files.

### 3.3 Monorepo vs Polyrepo Strategy

The choice between monorepo and polyrepo architectures significantly impacts development workflow, code sharing, and deployment processes.

**Monorepo Architecture:**
- A single repository containing multiple related projects, services, or packages. Suited for:
- Organizations with strong coupling between components
- Teams that deploy multiple services together
- Projects sharing significant code or dependencies
- Need for atomic cross-project changes
- Desire for unified versioning and release coordination

**Monorepo Advantages:**
- Simplified dependency management across projects
- Atomic commits spanning multiple projects
- Easier large-scale refactoring
- Single source of truth for all code
- Consistent tooling and standards enforcement
- Simplified developer setup

**Monorepo Challenges:**
- Repository size and clone time grow over time
- Build complexity increases with project count
- Access control is all-or-nothing
- CI/CD pipelines must be intelligent about what to test
- Tooling requirements are more sophisticated

**Recommended Monorepo Structure:**
```
octovel-platform/
├── packages/
│   ├── api-server/       # Backend API service
│   ├── web-client/       # Frontend web application
│   ├── mobile-app/       # React Native mobile app
│   ├── shared-types/     # Shared TypeScript types
│   ├── ui-components/    # Reusable UI component library
│   └── utils/            # Shared utility functions
├── tools/
│   ├── build-tools/      # Custom build scripts
│   └── generators/       # Code generation templates
├── docs/                 # Cross-project documentation
└── turbo.json           # Turborepo or similar configuration
```

**Polyrepo Architecture:**

Separate repositories for each project or service. Suited for:

- Independent services with minimal code sharing
- Teams with clear ownership boundaries
- Services with different release cycles
- Need for fine-grained access control
- Microservices architecture with service autonomy

**Polyrepo Advantages:**
- Clear ownership and responsibility boundaries
Independent versioning and release cycles
- Smaller repository sizes and faster clones
- Flexible access control per repository
- Simpler CI/CD per repository
- Technology diversity across services

**Polyrepo Challenges:**
- Dependency management across repositories
- Coordinating changes across multiple repos
- Duplicated configuration and tooling
- More complex developer environment setup
- Consistency enforcement requires more discipline

**Recommended Polyrepo Organization:**
```
octovel-api-server/       # Backend service
octovel-web-client/       # Frontend application
octovel-mobile-app/       # Mobile application
octovel-shared-types/     # Shared library (published to npm)
octovel-ui-components/    # Component library (published to npm)
```

**Hybrid Approach:**

Some organizations benefit from multiple monorepos organized by domain or team:

```
octovel-platform/         # Core platform services (monorepo)
├── api-gateway/
├── auth-service/
└── user-service/

octovel-data/             # Data processing services (monorepo)
├── ingestion-pipeline/
├── analytics-engine/
└── reporting-service/

octovel-mobile/           # Mobile applications (separate repo)
octovel-web/              # Web applications (separate repo)
```

## 3.4 File and Directory Naming Conventions

Consistent naming reduces confusion and makes scripts and tooling more reliable:

| **Language/Context** | **Files** | **Directories** | **Rationale** |
| -------------------- | --------- | --------------- | ------------- |
| TypeScript/JavaScript | kebab-case.ts | kebab-case/ | Web standard, npm packages use kebab-case |
| Python | snake_case.py | snake_case/ | PEP 8 standard, Python convention |
| Rust | snake_case.rs | snake_case/ | Rust convention, cargo defaults |
| C++ | kebab-case.cpp | kebab-case/ | Readability, avoid Windows case sensitivity |
| C# | PascalCase.cs | PascalCase/ | Microsoft convention, framework standard |
| Go | snake_case.go | snake_case/ | Go convention, lowercase imports |
| Configuration | lowercase.config.ext | N/A | Clear identification as config file |
| Test Files | <name>.test.ext or e <name>.spec.ext | N/A | Clear identification as test |
| Type Definitions | <name>.d.ts | N/A | TypeScript convention |

**Special Naming Rules:**
- Component files (React, Vue): Use PascalCase.tsx matching the component name
- Constant files: You may use `UPPER_CASE.ts` for files exporting only constants
- Barrel files: Use `index.ts` for re-exports from a directory
- README files: Always `README.md` in all caps for visibility
- Hidden config files: Prefix with `.` (`.env`, `.eslint`rc) following Unix convention

## 3.5 Configuration File Management

Configuration should be explicit, versioned, and environment-specific:

**Local Development Configuration:**
- Use `.env.example` committed to version control showing required variables
- Actual `.env` files never committed, listed in `.gitignore`
- Provide sensible defaults for local development
- Document all environment variables with comments in `.env.example`

**Environment-Specific Configuration:**
- Separate config files for development, staging, production
- Store configs in config/ directory or use cloud configuration services
- Never commit secrets; use secret management tools (AWS Secrets Manager, HashiCorp Vault)
- Use configuration validation on application startup to fail fast

**Configuration Hierarchy:**
- Environment variables (highest priority, set in deployment)
- Environment-specific config files (`configuration/production.json`)
- Default config file (`configuration/default.json`)
- Hardcoded defaults (lowest priority, in source code)

**Configuration Best Practices:**
- Validate all configuration on startup with clear error messages
- Use strong typing for configuration (Zod in TypeScript, Pydantic in Python)
- Document configuration options thoroughly
- Support both environment variables and config files
- Never use different config formats across environments
- Log sanitized configuration on startup (without secrets) for debugging

## 3.6 README Requirements

Every repository must include a comprehensive README.md that serves as the entry point for all developers:

**Essential Sections:**

**Project Name and Description**: One-paragraph overview explaining what the project does and why it exists.

**Key Features**: Bullet list of 3-7 main capabilities or characteristics that differentiate this project.

**Prerequisites**: Explicit listing of required software, versions, and system requirements before installation.

**Installation**: Step-by-step instructions that a new developer can follow to get the project running locally.

**Configuration**: Explanation of environment variables, config files, and customization options.

**Usage**: Basic examples showing common use cases and workflows.

**Testing**: Commands and procedures for running tests locally.

**Deployment**: Link to detailed deployment documentation or basic deployment overview.

**Contributing**: Link to CONTRIBUTING.md and brief summary of how to contribute.

**License**: Clear statement of licensing with link to full `LICENSE` file.

**Support**: How to get help, report bugs, or request features.

**Additional Recommended Sections:**
- Architecture overview or link to architecture docs
- API documentation link
- Known issues or limitations
- Changelog link
- Badge section showing build status, coverage, version

**README Anti-patterns to Avoid:**
- Stale information not updated as project evolves
- Missing or broken links to documentation
- Overly detailed content better suited for separate docs
- Installation instructions that don't work
- Missing troubleshooting section for common issues
- No examples or usage guidance

## 4 Code Style & Formatting

### 4.1 Automated Formatting Philosophy

Code formatting is not a matter of personal preference, it's a solved problem that tools handle better than humans. We use automated formatters universally to eliminate formatting debates, ensure consistency, and save code review time for substantive discussions.

**Formatting Principles:**
- Formatters run automatically on save in IDEs
- Pre-commit hooks prevent unformatted code from being committed
- CI pipelines reject improperly formatted code
- No manual formatting adjustments except in rare documented cases
- Format entire files, never partial formatting
- Formatting rules are configured once and rarely changed

**Benefits of Automated Formatting:**
- Zero time spent on formatting debates
- Diffs show logical changes, not whitespace changes
- Consistent style across entire codebase regardless of author
- New developers productive immediately without learning style preferences
- Refactoring tools work more reliably with consistent formatting


| Language | Primary Formatter | Configuration File | Line Length | Indentation |
| -------- | ----------------- | ------------------| ----------- | ---------- |
| TypeScript/JavaScript | Prettier | .prettierrc.json | 100 chars | 2 spaces |
| Python | Black + isort | pyproject.toml | 100 chars | 4 spaces (PEP 8) |
| Rust | rustfmt | rustfmt.toml | 100 chars | 4 spaces |
| C++ | clang-format | .clang-format | 100 chars | 2 spaces |
| C# | dotnet format | .editorconfig | 120 chars | 4 spaces |
| Go | gofmt (built-in) | None (standard) | No limit | Tabs |

**Why Line Length Matters:**
- The 100-character line limit strikes a balance between modern wide screens and practical considerations:
- Readable side-by-side diffs in code reviews
- Comfortable on laptop screens without horizontal scrolling
- Multiple editor panes visible simultaneously
Encourages breaking complex expressions into named variables

## 4.3 Linting Standards

While formatters handle code appearance, linters catch bugs, enforce best practices, and identify potential issues:

**Linter Responsibilities:**
- Detect unused variables and imports
- Identify potential runtime errors
- Enforce naming conventions
- Flag overly complex code
Check for security vulnerabilities
- Ensure type safety
- Verify documentation completeness

**Language-Specific Linters:**

**TypeScript/JavaScript:**
- ESLint with TypeScript-specific rules
- Rules for async/await correctness
- Prohibition of console.log in production code
- Enforcement of explicit return types
- Detection of floating promises
- Import organization rules

**Python:**
- Pylint for code quality
- Flake8 for style enforcement
- mypy for static type checking
- bandit for security vulnerability detection
- pydocstyle for documentation standards

**Rust:**
- Clippy for idiomatic Rust patterns
- Detection of common mistakes
- Performance optimization suggestions
- API guideline compliance
Unsafe code warnings

**C++:**
- clang-tidy with modernize checks
- Detection of memory leaks and undefined behavior
- Suggestion of modern C++ alternatives
- Performance anti-pattern detection
- Thread safety analysis

**C#:**
- StyleCop Analyzers for style consistency
- Microsoft.CodeAnalysis for best practices
- Security analyzers for vulnerability detection
- Performance analyzers for optimization opportunities

**Go:**
- golangci-lint aggregating multiple linters
- go vet for correctness issues
- staticcheck for bugs and performance
- errcheck for unhandled errors

## 4.4 Comprehensive Naming Conventions

Naming is one of the hardest and most important aspects of programming. Good names communicate intent, scope, and purpose without requiring documentation.

**Universal Naming Principles:**

**Be Descriptive**: Names should clearly communicate what something represents or does. Avoid abbreviations unless universally understood. `userAuthenticationService` is better than `usrAuthSvc`.

**Be Consistent**: Use the same terminology throughout your codebase. If you call something a "user" in one place, don't call it a "person" or "account" elsewhere without good reason.

**Be Appropriate to Scope**: Short names are acceptable for small scopes (loop variables like i for index), but larger scopes require more descriptive names.

**Avoid Meaningless Names**: Names like `data`, `info`, `manager`, `handler` without context provide no information. `userData` is barely better than data, but `authenticatedUser` tells a story.

**Use Positive Boolean Names**: Prefer `isEnabled` over `isDisabled`, `hasAccess` over `lacksAccess`. Positive logic is easier to reason about.

**Avoid Negated Booleans**: `if (!isNotReady)` is confusing. Use `isReady` instead.

**Language-Specific Naming Standards:**

**TypeScript/JavaScript Naming:**
- Variables and Functions: camelCase - `userName, calculateTotal, fetchUserData`
- Classes and Interfaces: PascalCase `- UserService, HttpClient, RequestOptions`
- Types: PascalCase - `UserId, RequestHandler, ErrorCode`
- Constants: UPPER_SNAKE_CASE - `MAX_RETRY_COUNT, API_BASE_URL, DEFAULT_TIMEOUT`
- Private Fields: Prefix with # or `private` - `#secretKey, #internalState, private _hooks`
- Boolean Variables: Prefix with `is`, `has`, `should`, `can` - `isAuthenticated`, `hasPermission`
- Enums: PascalCase for name, `UPPER_SNAKE_CASE` for values
- Acronyms: Treat as words - `HTTPClient` not `HttpClient`, `userID` not `userId`

**Python Naming:**
- Variables and Functions: snake_case - `user_name`, `calculate_total`, `fetch_user_data`
- Classes: PascalCase - UserService, HttpClient, RequestOptions`
- Constants: UPPER_SNAKE_CASE - `MAX_RETRY_COUNT`, `API_BASE_URL`
- Private Attributes: Prefix with underscore - `_internal_state`, `_secret_key`
- Protected Attributes: Single underscore - `_protected_method`
- Name Mangling: Double underscore for strong privacy - `__private_attribute`
- Magic Methods: Double underscore both sides - `__init__`,` __str__`

**Rust Naming:**
- Variables and Functions: snake_case - `user_name`, `calculate_total`
- Structs and Enums: PascalCase - `UserService`, `HTTPClient`
- Traits: PascalCase - `Serializable`, `Clone`, `Display`
- Constants and Statics: UPPER_SNAKE_CASE - `MAX_RETRY_COUNT`, `API_BASE_URL`
- Lifetimes: Single lowercase letter - `'a`, `'static`
- Type Parameters: Single uppercase letter or PascalCase - `T`, `E`, `Key`, `Value`

**C++ Naming:**
- Variables and Functions: camelCase or snake_case (choose one consistently)
- Classes and Structs: PascalCase - `UserService`, `HTTPClient`
- Member Variables: Suffix with underscore - `userName_`, `count_`
- Constants and Macros: UPPER_SNAKE_CASE - `MAX_RETRY_COUNT`
- Namespaces: lowercase or snake_case - `octovel`, `octovel::api`
- Template Parameters: PascalCase - `typename T`, `typename Key`

**C# Naming:**
- Variables and Parameters: camelCase - `userName`, `itemCount`
- Classes and Interfaces: PascalCase - `UserService`, `IRepository`
- Properties and Methods: PascalCase - `UserName`, `CalculateTotal`
- Private Fields: camelCase with underscore prefix -` _userName`, `_itemCount`
- Constants: PascalCase - `MaxRetryCount`, `DefaultTimeout`
- Events: PascalCase - `UserLoggedIn`, `DataReceived`
- Async Methods: Suffix with Async - `GetUserAsync`, `ProcessDataAsync`

**Go Naming:**
- Variables and Functions: camelCase or mixedCaps - `userName, calculateTotal`
- Exported Names: PascalCase - `UserService`, `HTTPClient`
- Unexported Names: camelCase - `userService`, `httpClient`
- Constants: PascalCase or camelCase - `MaxRetryCount` or `maxRetryCount`
- Interfaces: Often noun without I prefix - Reader, `Writer`, `Closer`
- Interface with Single Method: Often -er suffix - `Stringer`, `Handler`

**Domain-Specific Naming Patterns:**

**API Endpoints:** Use RESTful conventions with plural nouns for collections:
- `GET /users` - List users
- `GET /users/:id` - Get specific user
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Database Tables and Columns: Use snake_case consistently across all database systems:
- Tables: Plural nouns - `users`, `order_items`, `authentication_tokens`
- Columns: Descriptive names - `created_at`, `updated_at`, `email_address`
- Foreign Keys: `<table>_id` pattern - `user_id`, `product_id`
- Junction Tables: Combined names - `users_roles`, `products_categories`

Test Names: Descriptive sentences explaining what is tested:
- `test_user_creation_with_valid_email`
- `test_authentication_fails_with_invalid_password`
- `should_return_404_when_user_not_found`
- `it_should_calculate_total_with_discount_applied`

Event Names: Past tense describing what happened:
- `UserCreated, OrderShipped, PaymentProcessed`
- `user_created, order_shipped, payment_processed`

Command Names: Imperative verbs describing actions:
- `CreateUser, ProcessOrder, SendEmail`
- `create_user, process_order, send_email`

## 4.5 Code Organization and Structure

Well-organized code reduces cognitive load and makes maintenance easier. These principles apply across all languages with appropriate adaptations.

**Function Length Guidelines:**

Functions should be focused, single-purpose units that fit on a single screen without scrolling.

| Metric | Target | Maximum | Action at Maximum |
| ------ | ------ | ------- | ----------------- |
| Lines of Code | 20-30  | 50 | Extract helper functions |
| Parameters | 2-3 | 4-5 | Use parameter objects | 
| Cyclomatic Complexity | 5-8 | 10 | Break into smaller functions |
| Nesting Depth | 1-2 | 3 | Use early returns |

**Why Short Functions Matter:**
- Easier to understand at a glance
- Easier to test in isolation
- Easier to reuse in different contexts
- Easier to optimize or refactor
- More descriptive names possible
- Better stack traces in errors

**When to Extract a Function:**
- Logic is repeated more than once
- A section has a distinct purpose that can be named
- Function exceeds 50 lines
- Function has more than 3 levels of nesting
- You need comments to explain what a section does
- You're using the word "and" to describe what the function does

**File Length Guidelines:**

Files should contain related functionality without becoming unwieldy.

| File Type | Target | Maximum Lines | Action at Maximum |
| ------ | ------ | ------- | ----------------- |
| Implementation | 200-300  | 500 | Split into multiple files |
| Test File | 300-400 | 600 | Split by test category | 
| Configuration | 50-100 | 200 | Split by environment |
| Interface/Types | 100-200 | 300 | Group related types |

**When to Split a File:**
- File exceeds maximum line count
- File contains multiple unrelated responsibilities
- Scrolling is required to understand file contents
- File contains multiple classes or modules
- Import list is excessively long (more than 20 imports)
- Team members consistently struggle to find code in the file

**Import Organization:**
**Organize imports consistently for readability and to minimize merge conflicts:**

**Import Order (from top to bottom):**
1. Standard library / language built-ins
2. Third-party framework imports (React, Express, etc.)
3. Third-party package imports
4. Internal shared package imports (monorepo packages)
5. Internal application imports (absolute paths)
6. Relative imports from parent directories
7. Relative imports from current directory
8. Type-only imports (TypeScript)

**Import Grouping Rules:**
- Separate each group with a blank line
- Within each group, sort alphabetically
- Avoid wildcard imports except for common namespaces
- Use named imports preferentially over default imports
- Keep import statements on single lines when possible
- Use path aliases to avoid deep relative paths

**Cyclomatic Complexity Management:**
Cyclomatic complexity measures the number of independent paths through code. High complexity correlates with defect density and testing difficulty.

**Complexity Thresholds:**
|Complexity|Rating|Action Required|
|-|-|-|
|1-5|Simple|None, ideal complexity|
|6-10|Moderate|Acceptable, monitor growth|
|11-15|Complex|Refactor when possible|
|16-20|Very Complex|Refactor immediately|
|21+|Unmaintainable|Block PR, mandatory refactor|

**Reducing Complexity:**
- Extract conditions into named boolean variables
- Use early returns to avoid nested if statements
- Replace complex conditionals with polymorphism or strategy pattern
- Extract complex branches into separate functions
- Use lookup tables instead of long switch statements
- Simplify boolean logic with De Morgan's laws

## 4.6 Comment Standards and Philosophy
Comments are a necessary evil—they're needed when code cannot be self-explanatory, but they're also a maintenance burden that can become outdated and misleading.

**The Comment Hierarchy (in order of preference):**
1. No Comment Needed**: Code is self-explanatory through good naming and structure. This is the ideal.
2. Extract to Named Function**: Instead of commenting what a block does, extract it to a function with a descriptive name.
3. Meaningful Variable Names**: Instead of commenting what a value represents, store it in a descriptively-named variable.
4. Write the Comment**: When the above approaches are insufficient, write a clear comment explaining why, not what.

**When Comments Are Required:**
- **Complex Algorithms**: When implementing non-obvious algorithms, explain the approach and link to references.
- **Business Logic Quirks**: When business rules are unintuitive, explain the reasoning and requirements source.
- **Performance Optimizations**: When code is deliberately non-obvious for performance, explain the optimization and benchmark results.
- **Workarounds**: When working around bugs or limitations in dependencies, explain the issue and link to bug reports.
- **Regular Expressions**: Always explain what a regex matches with examples.
- **Public APIs**: Document all public interfaces with purpose, parameters, return values, and examples.
- **Concurrency**: Explain synchronization strategy, lock ordering, and race condition prevention.
- **Security Sensitive Code**: Document security assumptions, threat model, and validation requirements.
- **When Comments Are Harmful**:
- **Stating the Obvious**: Never comment what code does when it's already clear from reading it.
- **Outdated Information**: Comments that contradict the code are worse than no comments.
- **Commented-Out Code**: Use version control; never commit commented code.
- **Attribution Comments**: Version control shows who wrote code; author comments are redundant.
- **Divider Comments**: Use file organization and functions instead of ASCII art dividers.
- **TODO Comments Without Context**: Incomplete TODOs without ticket numbers or explanations are noise.

**Comment Best Practices:**
**Documentation Comments (JSDoc, docstrings, etc.):**
Required for all public APIs
Include brief description, parameters, return value, exceptions
Provide usage examples for complex APIs
Link to related documentation or specifications
Keep synchronized with code changes

**Inline Comments:**
- Explain why, not what
- Place comments before the code they explain
- Keep comments short and focused
- Use proper grammar and punctuation
- Update or remove when code changes

**TODO Comments:**
- Include assignee or team name
- Include ticket number or issue link
- Provide enough context to understand without searching
- Set realistic priority or deadline if critical
- Format: `TODO(username): Description (TICKET-123)`

**FIXME Comments:**
- For known bugs or issues that need addressing
- Include reproduction steps if non-obvious
- Link to bug report or issue
- Format: `FIXME(username): Description (BUG-456)`

**HACK Comments:**
- For non-ideal solutions that work but need improvement
- Explain why the hack was necessary
- Describe the proper solution for future implementation
- Format: `HACK(username): Description - proper solution would be X`

## 4.7 Code Review Focus Areas
Since formatting is automated, code reviews focus on substantive issues:

**Logic and Correctness:**
- Does the code do what it's supposed to do?
- Are all edge cases handled?
- Is error handling appropriate and complete?
- Are there potential race conditions or concurrency issues?

**Design and Architecture:**
- Is the code in the right place architecturally?
- Does it follow established patterns in the codebase?
- Is it appropriately abstracted without over-engineering?
- Does it introduce unnecessary coupling?

**Performance Implications:**
- Are there obvious performance issues (N+1 queries, etc.)?
- Is the algorithm choice appropriate for expected data sizes?
- Are resources properly managed (connections, memory, file handles)?

**Security Considerations:**
- Is user input properly validated and sanitized?
- Are authentication and authorization correct?
- Are secrets properly protected?
- Is sensitive data logged or exposed inappropriately?

**Testing Coverage:**
- Are there tests for new functionality?
- Do tests cover edge cases and error conditions?
- Are tests clear and maintainable?
- Can the code be tested more easily with different design?

**Maintainability:**
- Will this code be understandable in six months?
- Is complexity justified by requirements?
- Is there adequate documentation?
- Are naming and organization clear?

### 5 Version Control & Git Workflow

## 5.1 Branching Strategy Philosophy

Our branching strategy balances stability with development velocity. It must support continuous integration, enable safe experimentation, facilitate code review, and provide clear release management.

**Core Branch Structure:**

- **stable**: The production branch containing only release-ready code. Every commit on stable represents a deployed or deployable version. Tagged with semantic version numbers. Protected with strict merge  requirements. Deployments to production only occur from this branch.
- **canary**: The primary integration branch where all development converges. Acts as the staging ground before promotion to stable. Should always be in a deployable state, though may contain experimental features behind feature flags. CI/CD runs comprehensive test suites on every commit. Protected branch requiring pull request reviews.
- **feature/x**: Short-lived branches for developing new features. Branch from canary, merge back to canary when complete. Should be small enough to complete within a few days to a week. Regularly rebased on canary to minimize merge conflicts. Deleted after successful merge.
- **fix/x**: Bug fix branches for addressing issues in current development. Follow same workflow as feature branches. May be cherry-picked to release branches if fixing production issues.
- **hotfix/x**: Emergency branches for critical production issues. Branch from stable, merge to both stable and canary. Deployed immediately to production after testing. Higher scrutiny in review process due to direct production impact.
- **release/x**: Optional branches for release preparation and stabilization. Branch from canary when approaching release. Only bug fixes allowed, no new features. Merged to stable when ready, then back-merged to canary.

**Development Flow:**
```
stable  ─────●───────────────────●─────────────●──────
            (v1.0)              (v1.1)       (v2.0)
                                   ↑            ↑
canary  ───●────●────●────●────●───┼────●───●───┼──●──
          ╱    ╱    ╱    ╱    ╱    │   ╱   ╱    │  
feat/A ──●────●────●    /    /     │  ╱   ╱     │
                     ╲ /    /      │ ╱   ╱      │
feat/B ───────────────●────●───────┼●───●       │
                                   │   /        │
fix/C ─────────────────────────────┼●─●         │
                                   │            │
release/v1.1 ────────────────────●─●            │
                                                │
release/v2.0 ───────────────────────────────────●
```

**Hotfix Flow:**
```
stable  ─────●───────────●───────────
            (v1.0)        ↑          
                         ╱ ╲         
hotfix/auth ────────────●   ╲        
                             ↓       
canary  ─────────────────────●───────
```

### 5.3 Commit Message Standards

Commit messages are permanent documentation of why changes were made. They're critical for understanding code history, debugging issues, and generating changelogs.

**Conventional Commits Format:**

Every commit message follows this structure:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Commit Types and Their Meanings:**


| Type | Purpose | When to Use | Semantic Versioning Impact | Emoji |
|------|---------|-------------|---------------------------| ---- |
| `feat` | New feature | Adding functionality users can see or use | MINOR version bump | ✨ | 
| `fix` | Bug fix | Correcting incorrect behavior | PATCH version bump | 🐛 |
| `docs` | Documentation | README, API docs, code comments | No version change | 📚 |
| `style` | Formatting | Code style, whitespace, missing semicolons | No version change | 💎 |
| `refactor` | Code restructuring | Internal changes without behavioral changes | No version change | 📦 |
| `perf` | Performance improvement | Optimizations that maintain behavior | PATCH version bump | 🚀 |
| `test` | Test changes | Adding or modifying tests | No version change | 🚨 |
| `build` | Build system | Changes to build process or dependencies | No version change | 🛠 |
| `ci` | CI/CD changes | GitHub Actions, GitLab CI, etc. | No version change | ⚙️ |
| `chore` | Maintenance | Routine tasks, dependency updates | No version change | ♻️ |
| `revert` | Revert previous commit | Undoing a previous change | Depends on reverted commit | 🗑 |

**Scope Guidelines:**

Scope indicates what part of the codebase is affected. Choose scopes that are meaningful to your project:
- Module names: `auth`, `api`, `database`, `ui`
- Feature areas: `login`, `checkout`, `admin`
- Components: `user-service`, `payment-gateway`

**Subject Line Rules:**
- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter (except for proper nouns)
- No period at the end
- Maximum 72 characters
- Be specific but concise

**Body Guidelines:**
- Wrap at 72 characters
- Explain what and why, not how (code shows how)
- Provide context for the change
- Explain any non-obvious decisions
- Reference related issues or discussions

**Footer Conventions:**
- `Closes #123` or `Fixes #456` - Link to issues
- `BREAKING CHANGE:` - Describe incompatible changes
- `Refs #789` - Reference related issues without closing
- `Co-authored-by:` - Credit collaborators

**Commit Message Examples:**

**Good Examples:**
```
feat(auth): add OAuth2 Google authentication ✨

Implements Google OAuth2 flow with PKCE for enhanced security.
Users can now sign in using their Google accounts, which will
automatically create a user profile with verified email.

Token refresh is handled automatically with 7-day refresh tokens.
Access tokens expire after 1 hour for security.

Closes #234
```
```
fix(api): prevent race condition in concurrent user creation 🐛

Added database-level unique constraint on email column and wrapped
creation in transaction. Previously, simultaneous signup requests
with the same email could both succeed, creating duplicate accounts.

Now properly returns 409 Conflict on duplicate email attempts.

Fixes #456
```
```
perf(db): optimize user search with composite index 🚀

Added composite index on (email, created_at) columns. Reduces
search query time from ~2 seconds to ~50ms for databases with
1M+ users.

Benchmark results:
- Small DB (< 10k users): 15ms → 12ms (marginal improvement)
- Medium DB (100k users): 250ms → 45ms (5.5x faster)
- Large DB (1M+ users): 2100ms → 48ms (43x faster)
```
```
refactor(services): extract email validation to shared utility 🗑

Email validation logic was duplicated across user-service and
contact-service with slight variations causing inconsistency.

Extracted to shared email-validator utility with comprehensive
test coverage. Both services now use the same validation rules.

No behavioral changes for end users.
```
```
docs(api): update authentication endpoint examples 📚

- Fixed incorrect request body format in /auth/login example
- Added missing required fields to /auth/register
- Updated response codes to match current implementation
- Added rate limiting information

Refs #789
```

**Bad Examples:**
```
fix stuff
```
*Problem: Completely uninformative about what was fixed*
```
Fixed the bug where users couldn't login sometimes
```
*Problem: No type, no scope, vague description, no details about root cause*
```
feat(api): Added new endpoint for getting user data and also updated the database schema to include last_login field and fixed a bug in the authentication middleware and updated dependencies ✨
```
*Problem: Multiple changes in one commit, run-on sentence, should be split*
```
WIP: working on new feature
```
*Problem: Work-in-progress commits shouldn't be pushed to shared branches*

### 5.4 Branch Management Best Practices

**Before Starting Work:**
- Always pull latest changes from canary
- Create appropriately named feature or fix branch
- Keep branches focused on single feature or fix
- Plan to complete and merge within 3-5 days maximum

**During Development:**
- Commit frequently with logical, atomic changes
- Keep commits focused and single-purpose
- Write clear commit messages as you go
- Rebase regularly on canary to stay current
- Push to remote regularly to back up work

**Before Creating Pull Request:**
- Rebase on latest canary to minimize conflicts
- Squash fixup commits into logical commits
- Review your own changes first (self-review)
- Ensure all tests pass locally
- Run linter and fix all issues
- Update documentation if needed
- Add/update tests for new functionality

**Branch Naming Conventions:**

| Branch Type | Pattern | Examples |
|-------------|---------|----------|
| Feature | `feature/descriptive-name` | `feature/oauth-login`, `feature/user-dashboard` |
| Bug Fix | `fix/issue-description` | `fix/login-redirect-loop`, `fix/memory-leak` |
| Hotfix | `hotfix/critical-issue` | `hotfix/payment-gateway-timeout`, `hotfix/security-patch` |
| Release | `release/vX.Y` | `release/v2.0`, `release/v1.9.1` |
| Experiment | `spike/hypothesis` or `experiment/idea` | `spike/redis-caching`, `experiment/new-ui-framework` |

**Branch Lifetime Management:**

| Branch Type | Maximum Lifetime | Action at Expiry |
|-------------|-----------------|------------------|
| Feature | 1 week | Break into smaller features or merge WIP |
| Fix | 2-3 days | Prioritize completion or escalate blockers |
| Hotfix | 4-8 hours | Deploy immediately or rollback |
| Release | 1-2 weeks | Release or abandon and create new release branch |
| Spike | 1-3 days | Document findings and delete |

**Long-Running Branch Problems:**
- Merge conflicts multiply over time
- Code becomes stale and diverges from standards
- Harder to review due to size
- Blocks other dependent work
- Increases risk of integration issues

**Strategies for Large Features:**
- Break into smaller, independently valuable pieces
- Use feature flags to merge incomplete work safely
- Create series of small PRs building toward goal
- Maintain separate long-lived branch only when absolutely necessary
- Rebase frequently to minimize divergence

### 5.5 Merge Strategies

Different situations call for different merge approaches:

**Squash and Merge** (Primary Strategy for Feature Branches):

Combines all commits from a feature branch into a single commit on the target branch.

**Advantages:**
- Clean, linear history on main branches
- Each feature represented by one commit
- Easy to revert entire features
- No "fix typo" or "WIP" commits polluting history

**When to Use:**
- Merging feature branches to canary
- Small to medium features (< 20 commits)
- When commit history is messy or has many fixups
- When individual commits aren't meaningful

**Process:**
1. Review all commits in the PR
2. Write comprehensive squash commit message
3. Include all relevant context and references
4. Ensure message follows conventional commit format

**Merge Commit** (For Hotfixes and Releases):

Creates a merge commit that preserves all individual commits from the source branch.

**Advantages:**
- Preserves complete development history
- Shows who made each change and when
- Easy to track specific changes
- Valuable for auditing and debugging

**When to Use:**
- Merging hotfix branches to stable
- Merging release branches
- When commit history tells important story
- When individual commits need to be cherry-picked later

**Rebase and Merge** (For Clean, Well-Structured Branches):

Replays commits from feature branch onto target branch without merge commit.

**Advantages:**
- Completely linear history
- Each commit stands on its own
- No merge commit noise
- Clean git log output

**When to Use:**
- Small, well-crafted PRs with clean commits
- When each commit is logical and atomic
- When commit messages are already excellent
- Experienced developers maintaining high commit quality

**Disadvantages:**
- Requires discipline in commit crafting
- Harder to revert entire features
- Can hide when feature was actually merged

**Merge Strategy Decision Tree:**
```
Is this a hotfix or release branch?
├─ Yes → Use Merge Commit
└─ No → Does the branch have clean, logical commits?
    ├─ Yes → Use Rebase and Merge
    └─ No → Use Squash and Merge (most common)
