# Features

Feature modules live here and may be nested recursively. Each feature owns its screen components, API adapters, state, types, and child features.

Recommended feature shape:

```text
feature-name/
  api/
  components/
  features/
  model/
  pages/
  services/
  feature-name.sessions.routes.ts
  index.ts
```

Keep imports crossing feature boundaries through public `index.ts` files.
