# Oh My Claude

**Language**: [English](README.md) | [中文](README.zh-CN.md)

Personal Claude Code configuration repository, optimized for academic research and software development - a complete working environment.

## Introduction

Oh My Claude is a personal configuration system for Claude Code CLI, providing rich skills, commands, agents, and hooks optimized for:
- **Academic Research** - ML/AI paper writing, literature management, conference submissions
- **Software Development** - Git workflows, code review, test-driven development
- **Plugin Development** - Skill, Command, Agent, Hook development guides
- **Project Management** - Planning documents, code standards, automated workflows

## Quick Navigation

| Topic | Description |
|-------|-------------|
| 🚀 [Quick Start](#quick-start) | Get up and running in minutes |
| 📚 [Core Workflows](#core-workflows) | Paper writing, code organization, skill evolution |
| 🛠️ [What's Included](#whats-included) | Skills, commands, agents overview |
| 📖 [Installation Guide](#installation-options) | Full, minimal, or selective setup |
| 🔧 [Project Rules](#project-rules) | Coding style and agent orchestration |

## Core Workflows

### 1. Automated Enforcement Workflow

Cross-platform hooks (Node.js) automate workflow enforcement:

```
Session Start → Skill Evaluation → Session End → Session Stop
```

- **skill-forced-eval** (`skill-forced-eval.js`): Before EVERY user prompt → dynamically scans all available skills (local + plugins) → forces evaluation of each skill → requires activation before implementation → ensures no relevant skill is missed
- **session-start** (`session-start.js`): Session begins → displays Git status, pending todos, available commands, package manager → shows project context at a glance
- **session-summary** (`session-summary.js`): Session ends → generates comprehensive work log → summarizes all changes made → provides smart recommendations for next steps
- **stop-summary** (`stop-summary.js`): Session stops → quick status check → detects temporary files → shows actionable cleanup suggestions

**Cross-platform**: All hooks use Node.js (not shell scripts) ensuring Windows/macOS/Linux compatibility.

### 2. Paper Writing Workflow

Complete lifecycle from idea to publication:

```
Template Preparation → Writing → Anti-AI → Submission → Rebuttal
```

- **Template Prep** (`latex-conference-template-organizer`): Download official conference template .zip files → skill extracts main files, removes sample content → outputs clean template structure ready for Overleaf
- **Writing** (`ml-paper-writing`): Systematic guidance from research repository to final draft → includes narrative framing, abstract formulas (5-sentence), literature search with citation verification, section-by-section drafting with feedback cycles
- **Anti-AI** (`writing-anti-ai`): Pattern detection removes inflated symbolism, promotional language, vague attributions → adds human voice and varied rhythm → supports English and Chinese
- **Submission**: Conference-specific checklists (NeurIPS 16-item, ICML Broader Impact, ICLR LLM disclosure) and page limit enforcement
- **Rebuttal**: Strategies from paper-miner knowledge base → extracted from successful conference rebuttals → addresses technical questions and additional experiment requests

### 3. Code Organization Workflow

Maintainable ML project structure:

```
Project Structure → Code Style → Debug → Git Workflow
```

- **Structure** (`architecture-design`): Factory & Registry patterns for module instantiation → config-driven models accept only `cfg` parameter → enforced by `rules/coding-style.md`
- **Style** (enforced by `code-reviewer` agent): 200-400 line files maximum → type hints required → `@dataclass(frozen=True)` for configs → functions split before 4-level nesting
- **Debug** (`bug-detective`): Systematic error detection for Python, Bash/Zsh, JavaScript/TypeScript → error pattern matching → stack trace analysis → common anti-pattern identification
- **Git** (`git-workflow`): Conventional Commits format (`feat/scope: message`) → branch strategy (master/develop/feature) → merge with `--no-ff` → rebase for syncing upstream changes

### 4. Skill Evolution System

3-step continuous improvement cycle:

```
skill-development → skill-quality-reviewer → skill-improver
```

1. **Develop** (`skill-development`): Create skills with proper YAML frontmatter → clear descriptions with trigger phrases → progressive disclosure (lean SKILL.md, details in `references/`)
2. **Review** (`skill-quality-reviewer`): 4-dimension quality assessment → Description Quality (25%), Content Organization (30%), Writing Style (20%), Structural Integrity (25%) → generates improvement plan with prioritized fixes
3. **Improve** (`skill-improver`): Merges suggested changes → updates documentation → iterates on feedback → reads improvement plans and applies changes automatically

### 5. Knowledge Extraction Workflow

Two specialized mining agents continuously extract knowledge to improve skills:

- **paper-miner** (agent): Analyze research papers (PDF/DOCX/arXiv links) → extracts writing patterns, structure insights, venue requirements, rebuttal strategies → updates `ml-paper-writing/references/knowledge/` with categorized entries (structure.md, writing-techniques.md, submission-guides.md, review-response.md)
- **kaggle-miner** (agent): Study winning Kaggle competition solutions → extract competition briefs, front-runner detailed technical analysis, code templates, best practices → update the `kaggle-learner` skill's knowledge base (`references/knowledge/[domain]/` directories, categorized by NLP/CV/Time Series/Tabular/Multimodal)

**Knowledge feedback loop**: Each paper or solution analyzed enriches the knowledge base, creating a self-improving system that evolves with your research.

## File Structure

```
oh-my-claude/
├── hooks/               # Cross-platform JavaScript hooks (automated enforcement)
│   ├── session-start.js         # Session begin - shows Git status, todos, commands
│   ├── skill-forced-eval.js     # Force skill evaluation before each prompt
│   ├── session-summary.js       # Session end - generates work log with recommendations
│   ├── stop-summary.js          # Session stop - quick status check, temp file detection
│   └── security-guard.js        # Security validation for file operations
│
├── skills/              # 22 specialized skills (domain knowledge + workflows)
│   ├── ml-paper-writing/        # Full paper writing: NeurIPS, ICML, ICLR, ACL, AAAI, COLM
│   │   └── references/
│   │       └── knowledge/        # Extracted patterns from successful papers
│   │       ├── structure.md           # Paper organization patterns
│   │       ├── writing-techniques.md  # Sentence templates, transitions
│   │       ├── submission-guides.md   # Venue requirements (page limits, etc.)
│   │       └── review-response.md     # Rebuttal strategies
│   │
│   ├── writing-anti-ai/         # Remove AI patterns: symbolism, promotional language
│   │   └── references/
│   │       ├── patterns-english.md    # English AI patterns to remove
│   │       ├── patterns-chinese.md     # Chinese AI patterns to remove
│   │       └── phrases-to-cut.md        # Filler phrases to delete
│   │
│   ├── architecture-design/     # ML project patterns: Factory, Registry, Config-driven
│   ├── git-workflow/            # Git discipline: Conventional Commits, branching
│   ├── bug-detective/           # Debugging: Python, Bash, JS/TS error patterns
│   ├── code-review-excellence/  # Code review: security, performance, maintainability
│   ├── skill-development/       # Skill creation: YAML, progressive disclosure
│   ├── skill-quality-reviewer/  # Skill assessment: 4-dimension scoring
│   ├── skill-improver/          # Skill evolution: merge improvements
│   ├── kaggle-learner/          # Learn from Kaggle winning solutions
│   ├── doc-coauthoring/         # Document collaboration workflow
│   ├── latex-conference-template-organizer  # Template cleanup for Overleaf
│   └── ... (10+ more skills)
│
├── commands/            # 30+ slash commands (quick workflow execution)
│   ├── plan.md                  # Implementation planning with agent delegation
│   ├── commit.md                # Conventional Commits: feat/fix/docs/refactor
│   ├── code-review.md           # Quality and security review workflow
│   ├── tdd.md                   # Test-driven development: Red-Green-Refactor
│   ├── build-fix.md             # Fix build errors automatically
│   ├── verify.md                # Run verification loops
│   ├── checkpoint.md            # Save verification state
│   ├── refactor-clean.md        # Remove dead code
│   ├── learn.md                 # Extract patterns from code
│   └── sc/                      # SuperClaude command suite (20+ commands)
│       ├── sc-agent.md           # Agent management
│       ├── sc-estimate.md       # Development time estimation
│       ├── sc-improve.md         # Code improvement
│       └── ...
│
├── agents/              # 7 specialized agents (focused task delegation)
│   ├── architect.md             # System design: architecture decisions
│   ├── code-reviewer.md         # Review code: quality, security, best practices
│   ├── tdd-guide.md             # Guide TDD: test-first development
│   ├── paper-miner.md           # Extract paper knowledge: structure, techniques
│   ├── kaggle-miner.md          # Extract engineering practices from Kaggle
│   ├── build-error-resolver.md  # Fix build errors: analyze and resolve
│   └── refactor-cleaner.md      # Remove dead code: detect and cleanup
│
├── rules/               # Global guidelines (always-follow constraints)
│   ├── coding-style.md          # ML project standards: file size, immutability, types
│   └── agents.md                # Agent orchestration: when to delegate, parallel execution
│
├── CLAUDE.md            # Global configuration: project overview, preferences, rules
│
└── README.md            # This file - overview, installation, features
```

## Feature Highlights

### Skills (21 total)

**Writing & Academic:**
- `ml-paper-writing` - Full paper writing guidance for top conferences/journals
- `writing-anti-ai` - Remove AI writing patterns (bilingual support)
- `doc-coauthoring` - Structured document collaboration workflow
- `latex-conference-template-organizer` - LaTeX template management

**Development:**
- `git-workflow` - Git best practices (Conventional Commits, branching)
- `code-review-excellence` - Code review guidelines
- `bug-detective` - Debugging for Python, Bash, JS/TS
- `architecture-design` - ML project design patterns
- `verification-loop` - Testing and validation

**Plugin Development:**
- `skill-development` - Skill creation guide
- `skill-improver` - Skill improvement tools
- `skill-quality-reviewer` - Quality assessment
- `command-development` - Slash command creation
- `agent-identifier` - Agent configuration
- `hook-development` - Hook development guide
- `mcp-integration` - MCP server integration

**Utilities:**
- `uv-package-manager` - Modern Python package management
- `planning-with-files` - Markdown-based planning
- `webapp-testing` - Local web application testing
- `kaggle-learner` - Learn from Kaggle solutions

### Commands (30+)

| Command | Purpose |
|---------|---------|
| `/plan` | Create implementation plans |
| `/commit` | Commit with Conventional Commits |
| `/code-review` | Perform code review |
| `/tdd` | Test-driven development workflow |
| `/build-fix` | Fix build errors |
| `/verify` | Verify changes |
| `/checkpoint` | Create checkpoints |
| `/refactor-clean` | Refactor and cleanup |
| `/learn` | Extract reusable patterns |
| `/sc` | SuperClaude command suite (20+ commands) |

### Agents (7 specialized)

- **architect** - System architecture design
- **build-error-resolver** - Fix build errors
- **code-reviewer** - Review code quality
- **refactor-cleaner** - Remove dead code
- **tdd-guide** - Guide TDD workflow
- **paper-miner** - Extract paper writing knowledge
- **kaggle-miner** - Extract Kaggle engineering practices

## Quick Start

### Installation Options

Choose the installation method that fits your needs:

#### Option 1: Full Installation (Recommended)

Complete setup for data science, AI research, and academic writing:

```bash
# Clone the repository
git clone https://github.com/Galaxy-Dawn/oh-my-claude.git ~/.claude

# Restart Claude Code CLI
```

**Includes**: All 22 skills, 30+ commands, 7 agents, 5 hooks, and project rules.

#### Option 2: Minimal Installation

Core hooks and essential skills only (faster load, less complexity):

```bash
# Clone repository
git clone https://github.com/Galaxy-Dawn/oh-my-claude.git /tmp/oh-my-claude

# Copy only hooks and core skills
mkdir -p ~/.claude/hooks ~/.claude/skills
cp /tmp/oh-my-claude/hooks/*.js ~/.claude/hooks/
cp -r /tmp/oh-my-claude/skills/ml-paper-writing ~/.claude/skills/
cp -r /tmp/oh-my-claude/skills/writing-anti-ai ~/.claude/skills/
cp -r /tmp/oh-my-claude/skills/git-workflow ~/.claude/skills/
cp -r /tmp/oh-my-claude/skills/bug-detective ~/.claude/skills/

# Cleanup
rm -rf /tmp/oh-my-claude
```

**Includes**: 5 hooks, 4 core skills.

#### Option 3: Selective Installation

Pick and choose specific components:

```bash
# Clone repository
git clone https://github.com/Galaxy-Dawn/oh-my-claude.git /tmp/oh-my-claude
cd /tmp/oh-my-claude

# Copy what you need, for example:
# - Hooks only
cp hooks/*.js ~/.claude/hooks/

# - Specific skills
cp -r skills/latex-conference-template-organizer ~/.claude/skills/
cp -r skills/architecture-design ~/.claude/skills/

# - Specific agents
cp agents/paper-miner.md ~/.claude/agents/

# - Project rules
cp rules/coding-style.md ~/.claude/rules/
cp rules/agents.md ~/.claude/rules/
```

**Recommended for**: Advanced users who want custom configurations.

### Requirements

- Claude Code CLI
- Git
- (Optional) Node.js (for hooks)
- (Optional) uv, Python (for Python development)

### First Run

After installation, the hooks provide automated workflow assistance:

1. **Every prompt** triggers `skill-forced-eval` → ensures applicable skills are considered
2. **Session starts** with `session-start` → displays project context
3. **Sessions end** with `session-summary` → generates work log with recommendations
4. **Session stops** with `stop-summary` → provides status check

## Project Rules

### Coding Style

Enforced by `rules/coding-style.md`:
- **File Size**: 200-400 lines maximum
- **Immutability**: Use `@dataclass(frozen=True)` for configs
- **Type Hints**: Required for all functions
- **Patterns**: Factory & Registry for all modules
- **Config-Driven**: Models accept only `cfg` parameter

### Agent Orchestration

Defined in `rules/agents.md`:
- Available agent types and purposes
- Parallel task execution
- Multi-perspective analysis

## Contributing

This is a personal configuration, but you're welcome to:
- Fork and adapt for your own research
- Submit issues for bugs
- Suggest improvements via issues

## License

MIT License

## Acknowledgments

Built with Claude Code CLI and enhanced by the open-source community.

### References

This project is inspired by and builds upon excellent work from the community:

- **[everything-claude-code](https://github.com/anthropics/everything-claude-code)** - Comprehensive resource for Claude Code CLI
- **[AI-research-SKILLs](https://github.com/zechenzhangAGI/AI-research-SKILLs)** - Research-focused skills and configurations

These projects provided valuable insights and foundations for the research-oriented features in Oh My Claude.

---

**For data science, AI research, and academic writing.**

Repository: [https://github.com/Galaxy-Dawn/oh-my-claude](https://github.com/Galaxy-Dawn/oh-my-claude)
