import type {
	ExecutionContext,
	IncomingRequestCfProperties,
	KVNamespace
} from '@cloudflare/workers-types';

declare global {
	namespace App {
		interface Platform {
			env: {
				// Add your real bindings as you provision them in wrangler.toml.
				EXAMPLE_KV?: KVNamespace;
				[key: string]: unknown;
			};
			cf: IncomingRequestCfProperties;
			ctx: ExecutionContext;
			caches: CacheStorage;
		}
	}
}

export {};
