# Octovel Developer & Code Standards

**Version 2.0 — Effective October 2025**

This comprehensive guide defines the coding standards, repository practices, development workflows, and collaboration principles for all Octovel projects. It ensures maintainability, consistency, security, and quality across our entire technology stack.

---

## Table of Contents

1. [Core Philosophy & Principles](#1-core-philosophy--principles)
2. [Language & Technology Standards](#2-language--technology-standards)
3. [Repository Organization](#3-repository-organization)
4. [Code Style & Formatting](#4-code-style--formatting)
5. [Version Control & Git Workflow](#5️⃣-version-control--git-workflow)
6. [Code Review & Collaboration](#6️⃣-code-review--collaboration)
7. [Testing & Quality Assurance](#7️⃣-testing--quality-assurance)
8. [Documentation Standards](#8️⃣-documentation-standards)
9. [Security & Privacy](#9️⃣-security--privacy)
10. [Performance & Optimization](#🔟-performance--optimization)
11. [Error Handling & Logging](#1️⃣1️⃣-error-handling--logging)
12. [API Design & Integration](#1️⃣2️⃣-api-design--integration)
13. [Database & Data Management](#1️⃣3️⃣-database--data-management)
14. [DevOps & CI/CD](#1️⃣4️⃣-devops--cicd)
15. [Containerization & Deployment](#1️⃣5️⃣-containerization--deployment)
16. [Monitoring & Observability](#1️⃣6️⃣-monitoring--observability)
17. [Dependency Management](#1️⃣7️⃣-dependency-management)
18. [Accessibility & Internationalization](#1️⃣8️⃣-accessibility--internationalization)
19. [Open Source Contributions](#1️⃣9️⃣-open-source-contributions)
20. [Professional Development & Knowledge Sharing](#2️⃣0️⃣-professional-development--knowledge-sharing)

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
- **Backend**: Express (mature, flexible), Fastify (high performance), Nest.js (enterprise patterns)
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

Keep in my that our products must be as dependency-less as possible.

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
- Use Result for recoverable errors, panic only for unrecoverable bugs
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
