export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [];

export const dictionary = {
		"/": [~2],
		"/category/[id]": [~3],
		"/event/[id]": [~4],
		"/profile/[id]": [~5],
		"/settings/[id]": [~6],
		"/tables/categories": [~7],
		"/tables/timeline-events-categories": [~9],
		"/tables/timeline-events": [~8],
		"/tables/user-settings": [~10],
		"/tables/users": [~11]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';