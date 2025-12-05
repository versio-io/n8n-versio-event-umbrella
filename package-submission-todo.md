# n8n Community Node Submission Checklist

---

## Phase 1: Planning and Initial Setup

- [ ] **Start from the `n8n-node` CLI tool generated scaffolding**  
  Ensures correct structure, adherence to community requirements, and simplifies linting and testing.

- [ ] **Package naming**  
  Must start with `n8n-nodes-` or `@<scope>/n8n-nodes-` (e.g., `n8n-nodes-weather`).

- [ ] **Include `n8n-community-node-package` in `package.json` keywords**.

- [ ] **Add nodes and credentials to the `n8n` attribute in `package.json`**.

- [ ] **Use TypeScript and follow n8n node development guidelines**.

- [ ] **Avoid run-time external dependencies**  
  Verified community nodes cannot include them.

- [ ] **Do not access environment variables or the file system**  
  Pass all necessary data through node parameters.

- [ ] **Use English only**  
  Node interface elements, parameter names, descriptions, error messages, and documentation must be in English.

- [ ] **Follow UX best practices**  
  - Use appropriate credential types (password fields for API keys).  
  - Include OAuth if available.  
  - Maintain consistency with existing nodes.

---

## Phase 2: Node Design, Testing, and Documentation

- [ ] **Test locally** with `npm run dev`.

- [ ] **Lint your node** with `npm run lint` and ensure `npx @n8n/scan-community-package` passes.

- [ ] **Create a `README.md`**  
  Include usage instructions, example workflows, authentication details, and public API references.

- [ ] **Use MIT license**.

- [ ] **Ensure proper error handling**  
  - Describe **what happened**.  
  - Explain **how to solve or get unstuck**.  
  - Include item indices if applicable (e.g., `[Item 2]`).  
  - Avoid words like "error", "problem", or "failure".

- [ ] **Follow UX guidelines for nodes**  
  - Include CRUD operations where applicable: Create, Upsert, Delete, Get, Get Many, Update.  
  - Use a Resource Locator component where possible.  
  - Provide sorting options for "Get Many" operations.  
  - Simplify output for large responses (`Simplify` parameter ≤10 fields; AI nodes may use `Output` parameter with Simplified/Raw/Selected fields).  
  - Apply Title Case for node names and labels, Sentence case for actions, descriptions, and hints.  
  - Use service-specific terminology consistently.  
  - Add helpful placeholders in parameters (e.g., `e.g. Nathan Smith` for names, `e.g. https://example.com/image.png` for images).

---

## Phase 3: Deployment and Submission

- [ ] **Submit the package to the npm registry**  
  Follow npm documentation for contributing packages.

- [ ] **Verify package repository URL** (optional but recommended)  
  Ensure npm repository URL matches the public repository and author/maintainer info is consistent.

- [ ] **Ensure repository is public**, includes proper documentation, and is accessible via npm.

- [ ] **Submit your node for verification** through the n8n Creator Portal if it meets all technical and UX requirements.  
  - Verified nodes must pass all automated checks.  
  - Follow UX guidelines.  
  - Avoid run-time dependencies.  
  - n8n may reject nodes conflicting with paid features.

- [ ] **Ensure proper versioning and metadata** for discoverability in the n8n community.
