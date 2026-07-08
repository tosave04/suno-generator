"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { GENRES } from "@/lib/data/genres"
import { GENRE_EMOJIS } from "@/lib/data/emojis"

export { GENRE_EMOJIS }

interface GenreSelectorProps {
	value: string[]
	onChange: (genres: string[]) => void
}

export function GenreSelectorLight({ value, onChange }: GenreSelectorProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [dropdownOpen, setDropdownOpen] = useState(false)

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false)
			}
		}
		if (dropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside)
			return () => document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [dropdownOpen])

	function handleToggle(genreId: string) {
		if (value.includes(genreId)) {
			onChange(value.filter((id) => id !== genreId))
		} else if (value.length < 2) {
			onChange([...value, genreId])
		}
	}

	return (
		<div className="space-y-2" role="group" aria-label="Genre musical">
			<label className="text-xs font-medium text-muted-foreground">
				Genre musical <span className="text-muted-foreground/60">(1-2 max)</span>
			</label>

			{/* Cover Flow container */}
			<div ref={containerRef} className="relative w-full rounded-xl border border-border bg-muted/50">
				<div className="overflow-hidden rounded-xl">
					<div className="flex flex-wrap gap-1.5 items-center justify-center p-2">
						{GENRES.map((genre, i) => {
							const isSelected = value.includes(genre.id)
							const isDisabled = !isSelected && value.length >= 2

							return (
								<button
									key={genre.id}
									type="button"
									onClick={() => handleToggle(genre.id)}
									disabled={isDisabled}
									aria-pressed={isSelected}
									className={[
										"flex flex-col items-center justify-center gap-1.5 rounded-lg p-3 text-center",
										"transition-all duration-200 ease-out select-none hover:scale-110",
										isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
										isSelected
											? "border-2 border-accent bg-accent/15 ring-1 ring-accent/40 shadow-[0_0_16px_rgba(124,58,237,0.25)]"
											: "border border-border bg-muted hover:border-accent/50",
										isDisabled&&!isSelected ? "scale-75" : "",
									].join(" ")}
									style={{
										width: 120,
										height: 75,
									}}
								>
									<span className="text-2xl">{GENRE_EMOJIS[genre.id] ?? "🎵"}</span>
									<span
										className={[
											"font-medium leading-tight",
											"text-sm",
											isSelected ? "text-accent" : "text-foreground",
										].join(" ")}
									>
										{genre.name}
									</span>
									<span
										className={[
											"text-[10px] line-clamp-1",
											isSelected ? "text-accent/70" : "text-muted-foreground",
										].join(" ")}
									>
										{genre.subGenres.slice(0, 2).join(", ")}
									</span>
								</button>
							)
						})}
					</div>
				</div>
				{/* Multi-select dropdown — bottom-left inside the card */}
				<div ref={dropdownRef} className="absolute bottom-2 left-2" onMouseMove={(e) => e.stopPropagation()}>
					<button
						type="button"
						onClick={() => setDropdownOpen((o) => !o)}
						className="flex items-center gap-1.5 rounded-md border border-border bg-background/90 backdrop-blur-sm px-2.5 py-1.5 text-xs transition-colors hover:bg-muted cursor-pointer"
					>
						{value.length === 0 ? (
							<span className="text-muted-foreground">Sélectionner…</span>
						) : (
							value.map((id) => {
								const genre = GENRES.find((g) => g.id === id)
								return (
									<span
										key={id}
										className="inline-flex items-center gap-0.5 rounded-full bg-accent/15 pl-1.5 pr-0.5 py-0.5 text-[11px] font-medium text-accent"
									>
										{GENRE_EMOJIS[id] ?? "🎵"} {genre?.name}
										<span
											role="button"
											tabIndex={0}
											onClick={(e) => {
												e.stopPropagation()
												handleToggle(id)
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													e.stopPropagation()
													handleToggle(id)
												}
											}}
											className="ml-0.5 rounded-full p-0.5 hover:bg-accent/20 transition-colors cursor-pointer"
											aria-label={`Retirer ${genre?.name}`}
										>
											<span className="text-accent/60 text-[10px]">✕</span>
										</span>
									</span>
								)
							})
						)}
						<ChevronDown
							className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
						/>
					</button>

					{dropdownOpen && (
						<div className="absolute bottom-full left-0 mb-1 w-52 max-h-36 overflow-y-auto rounded-md border border-border bg-background/95 backdrop-blur-sm shadow-lg">
							{GENRES.map((genre) => {
								const isSelected = value.includes(genre.id)
								const isDisabled = !isSelected && value.length >= 2
								return (
									<button
										key={genre.id}
										type="button"
										onClick={() => handleToggle(genre.id)}
										disabled={isDisabled}
										className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-xs transition-colors ${
											isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-muted"
										} ${isSelected ? "bg-accent/10 text-accent font-medium" : "text-foreground"}`}
									>
										<span>{GENRE_EMOJIS[genre.id] ?? "🎵"}</span>
										<span className="flex-1 text-left">{genre.name}</span>
										{isSelected && <span className="text-accent">✓</span>}
									</button>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
