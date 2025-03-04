import { defineConfig } from "orval";

export default defineConfig({
	api: {
		input: "https://backend-developer-test-tdj0l.kinsta.app/docs/json",
		output: {
			target: "./src/http/api.ts",
			client: "react-query",
			httpClient: "fetch",
			clean: true,
			baseUrl: "https://backend-developer-test-tdj0l.kinsta.app",
			override: {
				fetch: {
					includeHttpResponseReturnType: false,
				},
				query: {
					useQuery: true,
					useSuspenseQuery: true,
				},
			},
		},
	},
});
