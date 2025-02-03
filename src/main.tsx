import { createRoot } from 'react-dom/client'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev";
import './index.css'
import App from './App.tsx'
import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<DevSupport
				ComponentPreviews={ComponentPreviews}
				useInitialHook={useInitial}
			>
				<App/>
			</DevSupport>
		</QueryClientProvider>
	</React.StrictMode>,
)
