# Material upvotes

The material catalogue remains in the `src/ttt-materials` submodule. Supabase
stores only anonymous upvotes keyed by the stable material `id`.

## Setup

1. Create a managed Supabase project.
2. Enable anonymous sign-ins under Authentication settings.
3. Apply `migrations/20260710000000_material_votes.sql` in the SQL editor (or
   with the Supabase CLI).
4. Copy `.env.example` to `.env.local` and fill in the project URL and the
   publishable browser key.
5. Add GitHub repository variables named `SUPABASE_URL` and
   `SUPABASE_PUBLISHABLE_KEY` for the Pages workflow.

Never expose the `service_role` key. Anonymous identities are tied to browser
storage: clearing it or using another browser creates a new voter.
