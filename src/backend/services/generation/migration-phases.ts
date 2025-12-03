import { MigrationPhase } from '../../../shared/types';

export function getJavaPhases(): MigrationPhase[] {
  return [
    {
      phase: 1,
      title: 'Setup & Planning',
      description: 'Modernize Java environment and tooling',
      tasks: [
        'Update to Java 21 LTS',
        'Migrate to Spring Boot 3.x',
        'Set up Maven or Gradle with latest versions',
        'Configure JUnit 5 for testing',
        'Set up Checkstyle and SpotBugs',
      ],
      priority: 'high',
    },
    {
      phase: 2,
      title: 'Core Migration',
      description: 'Modernize Java code and patterns',
      tasks: [
        'Use records for data classes',
        'Implement sealed classes where appropriate',
        'Use pattern matching and switch expressions',
        'Migrate to virtual threads (Project Loom)',
        'Add comprehensive unit and integration tests',
      ],
      priority: 'high',
    },
    {
      phase: 3,
      title: 'Refinement',
      description: 'Polish and optimize',
      tasks: [
        'Performance profiling and optimization',
        'Security audit with OWASP guidelines',
        'Documentation with JavaDoc',
        'Final testing and deployment',
      ],
      priority: 'medium',
    },
  ];
}

export function getGoPhases(): MigrationPhase[] {
  return [
    {
      phase: 1,
      title: 'Setup & Planning',
      description: 'Modernize Go environment',
      tasks: [
        'Update to Go 1.22+',
        'Set up Go modules properly',
        'Configure golangci-lint',
        'Set up testing with testify',
        'Implement proper project structure',
      ],
      priority: 'high',
    },
    {
      phase: 2,
      title: 'Core Migration',
      description: 'Modernize Go code',
      tasks: [
        'Use generics where appropriate',
        'Implement context for cancellation',
        'Use structured logging (slog)',
        'Add proper error handling with errors.Is/As',
        'Implement comprehensive tests',
      ],
      priority: 'high',
    },
    {
      phase: 3,
      title: 'Refinement',
      description: 'Polish and optimize',
      tasks: [
        'Performance profiling with pprof',
        'Race condition detection',
        'Documentation with godoc',
        'Final testing and deployment',
      ],
      priority: 'medium',
    },
  ];
}

export function getRustPhases(): MigrationPhase[] {
  return [
    {
      phase: 1,
      title: 'Setup & Planning',
      description: 'Modernize Rust environment',
      tasks: [
        'Update to latest stable Rust',
        'Configure Cargo.toml with workspace',
        'Set up clippy and rustfmt',
        'Configure CI with cargo test',
        'Set up proper error handling with thiserror/anyhow',
      ],
      priority: 'high',
    },
    {
      phase: 2,
      title: 'Core Migration',
      description: 'Modernize Rust code',
      tasks: [
        'Use async/await with tokio or async-std',
        'Implement proper lifetime annotations',
        'Use const generics where appropriate',
        'Add comprehensive unit and integration tests',
        'Implement proper documentation',
      ],
      priority: 'high',
    },
    {
      phase: 3,
      title: 'Refinement',
      description: 'Polish and optimize',
      tasks: [
        'Performance optimization with benchmarks',
        'Security audit with cargo-audit',
        'Documentation with rustdoc',
        'Final testing and deployment',
      ],
      priority: 'medium',
    },
  ];
}

export function getRubyPhases(): MigrationPhase[] {
  return [
    {
      phase: 1,
      title: 'Setup & Planning',
      description: 'Modernize Ruby environment',
      tasks: [
        'Update to Ruby 3.3+',
        'Migrate to Rails 7.x if using Rails',
        'Set up RuboCop for linting',
        'Configure RSpec for testing',
        'Set up Bundler properly',
      ],
      priority: 'high',
    },
    {
      phase: 2,
      title: 'Core Migration',
      description: 'Modernize Ruby code',
      tasks: [
        'Use pattern matching',
        'Implement Ractors for concurrency',
        'Use endless methods and numbered parameters',
        'Add type signatures with RBS or Sorbet',
        'Add comprehensive tests',
      ],
      priority: 'high',
    },
    {
      phase: 3,
      title: 'Refinement',
      description: 'Polish and optimize',
      tasks: [
        'Performance optimization',
        'Security audit with Brakeman',
        'Documentation with YARD',
        'Final testing and deployment',
      ],
      priority: 'medium',
    },
  ];
}

export function getCSharpPhases(): MigrationPhase[] {
  return [
    {
      phase: 1,
      title: 'Setup & Planning',
      description: 'Modernize .NET environment',
      tasks: [
        'Update to .NET 8',
        'Migrate to ASP.NET Core',
        'Set up Entity Framework Core',
        'Configure xUnit for testing',
        'Set up StyleCop and analyzers',
      ],
      priority: 'high',
    },
    {
      phase: 2,
      title: 'Core Migration',
      description: 'Modernize C# code',
      tasks: [
        'Use records and init-only properties',
        'Implement nullable reference types',
        'Use pattern matching and switch expressions',
        'Migrate to minimal APIs',
        'Add comprehensive unit tests',
      ],
      priority: 'high',
    },
    {
      phase: 3,
      title: 'Refinement',
      description: 'Polish and optimize',
      tasks: [
        'Performance optimization',
        'Security audit',
        'Documentation with XML comments',
        'Final testing and deployment',
      ],
      priority: 'medium',
    },
  ];
}

export function getSwiftPhases(): MigrationPhase[] {
  return [
    {
      phase: 1,
      title: 'Setup & Planning',
      description: 'Modernize Swift environment',
      tasks: [
        'Update to Swift 5.10+',
        'Migrate to SwiftUI if using UIKit',
        'Set up Swift Package Manager',
        'Configure SwiftLint',
        'Set up XCTest for testing',
      ],
      priority: 'high',
    },
    {
      phase: 2,
      title: 'Core Migration',
      description: 'Modernize Swift code',
      tasks: [
        'Use async/await for concurrency',
        'Implement Combine for reactive programming',
        'Use property wrappers',
        'Add comprehensive unit tests',
        'Implement proper error handling',
      ],
      priority: 'high',
    },
    {
      phase: 3,
      title: 'Refinement',
      description: 'Polish and optimize',
      tasks: [
        'Performance optimization with Instruments',
        'Accessibility improvements',
        'Documentation with DocC',
        'Final testing and deployment',
      ],
      priority: 'medium',
    },
  ];
}

export function getKotlinPhases(): MigrationPhase[] {
  return [
    {
      phase: 1,
      title: 'Setup & Planning',
      description: 'Modernize Kotlin environment',
      tasks: [
        'Update to Kotlin 1.9+',
        'Set up Gradle with Kotlin DSL',
        'Configure ktlint and detekt',
        'Set up JUnit 5 or Kotest',
        'Implement proper project structure',
      ],
      priority: 'high',
    },
    {
      phase: 2,
      title: 'Core Migration',
      description: 'Modernize Kotlin code',
      tasks: [
        'Use coroutines for async operations',
        'Implement sealed classes and interfaces',
        'Use data classes and value classes',
        'Add comprehensive unit tests',
        'Implement proper null safety',
      ],
      priority: 'high',
    },
    {
      phase: 3,
      title: 'Refinement',
      description: 'Polish and optimize',
      tasks: [
        'Performance optimization',
        'Security audit',
        'Documentation with KDoc',
        'Final testing and deployment',
      ],
      priority: 'medium',
    },
  ];
}
