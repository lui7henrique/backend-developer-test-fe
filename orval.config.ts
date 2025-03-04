import { defineConfig } from "orval";

export default defineConfig({
	api: {
		input: "http://localhost:3000/docs/json",
		output: {
			target: "./src/http/api.ts",
			client: "react-query",
			httpClient: "fetch",
			clean: true,
			baseUrl: "http://localhost:3000",
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
