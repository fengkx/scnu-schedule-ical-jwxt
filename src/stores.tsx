import create from 'zustand'

export enum Progress {
	Idle,
	Success,
	Failure,
}

const [useProgressStore] = create(set => ({
	value: Progress.Idle,
	set: (value: Progress) => {
		set({ value: value })
	},
}))

export function useProgressState(): [Progress, (value: Progress) => void] {
	return [
		useProgressStore(state => state.value),
		useProgressStore(state => state.set),
	]
}

const [useDocumentStore] = create(set => ({
	value: false,
	set: (value: boolean) => {
		set({ value })
	},
}))

export function useDocumentShowState(): [boolean, (value: boolean) => void] {
	return [
		useDocumentStore(state => state.value),
		useDocumentStore(state => state.set),
	]
}

const [useChildWindowStore] = create((set, get) => ({
	window: null,
	open(url: string) {
		set({ window: window.open(url) })
	},
	close() {
		get().window?.close()
		set({ window: null })
	},
}))

export function useChildWindow(): {
	window: Window | null
	open: (url: string) => void
	close: () => void
} {
	return {
		window: useChildWindowStore(state => state.window),
		open: useChildWindowStore(state => state.open),
		close: useChildWindowStore(state => state.close),
	}
}
