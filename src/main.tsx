import {createRoot} from "react-dom/client";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import {QueryClient} from "@tanstack/react-query";
import {PersistQueryClientOptions, PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {createIDBPersister} from "@/services/api/idbPersist.ts";

declare global {
	interface Window {
		__DEBUG__: DebugHelpers; // Or define a more specific type
	}
}

interface DebugHelpers {
	queryClient: QueryClient;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: Infinity,
			staleTime: 1 * 60 * 60 * 1000,
		},
	},
});

window.__DEBUG__ = {
	queryClient
};

const persister = createIDBPersister()

// const persister = createSyncStoragePersister({
// 	storage: window.localStorage,
// 	serialize: (data) => compress(JSON.stringify(data)),
// 	deserialize: (data) => JSON.parse(decompress(data)),
// })

const persistClientOptions: PersistQueryClientOptions = {
	maxAge: Infinity,
	persister: persister,
	queryClient: queryClient
};


createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<PersistQueryClientProvider client={queryClient} persistOptions={persistClientOptions}>
			<DevSupport
				ComponentPreviews={ComponentPreviews}
				useInitialHook={useInitial}
			>
				<App/>
			</DevSupport>
		</PersistQueryClientProvider>
	</React.StrictMode>,
);
