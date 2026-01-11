import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import Fuse from 'fuse.js'
import { Code2, FileText, ExternalLink } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { demos } from '@/demos'
import { appendixApis } from '@/data/appendix-apis'

interface SearchItem {
  id: string
  type: 'demo' | 'example' | 'reference'
  name: string
  description: string
  demoId?: string
  exampleId?: string
  mdnUrl?: string
}

interface GlobalSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  // Handle dialog close and reset search
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        setSearch('')
      }
      onOpenChange(newOpen)
    },
    [onOpenChange]
  )

  // Build searchable items
  const searchItems = useMemo(() => {
    const items: SearchItem[] = []

    // Add demos
    for (const demo of demos) {
      items.push({
        id: `demo-${demo.id}`,
        type: 'demo',
        name: demo.name,
        description: demo.description,
        demoId: demo.id,
      })

      // Add examples
      for (const example of demo.examples || []) {
        items.push({
          id: `example-${demo.id}-${example.id}`,
          type: 'example',
          name: example.title,
          description: `${demo.name} • ${example.description}`,
          demoId: demo.id,
          exampleId: example.id,
        })
      }
    }

    // Add appendix APIs
    for (const api of appendixApis) {
      items.push({
        id: `reference-${api.name}`,
        type: 'reference',
        name: api.name,
        description: api.description,
        mdnUrl: api.mdnUrl,
      })
    }

    return items
  }, [])

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(searchItems, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.4, // Lower = stricter matching
      includeScore: true,
      ignoreLocation: true,
    })
  }, [searchItems])

  // Filter items based on search (fuzzy)
  const filteredItems = useMemo(() => {
    if (!search.trim()) {
      return searchItems
    }

    const results = fuse.search(search)
    return results.map((result) => result.item)
  }, [searchItems, search, fuse])

  // Group items by type
  const groupedItems = useMemo(() => {
    const demoItems = filteredItems.filter((item) => item.type === 'demo')
    const exampleItems = filteredItems.filter((item) => item.type === 'example')
    const referenceItems = filteredItems.filter((item) => item.type === 'reference')

    return { demoItems, exampleItems, referenceItems }
  }, [filteredItems])

  const handleSelect = useCallback(
    (item: SearchItem) => {
      handleOpenChange(false)

      if (item.type === 'demo' && item.demoId) {
        navigate({ to: '/api/$apiId', params: { apiId: item.demoId } })
      } else if (item.type === 'example' && item.demoId && item.exampleId) {
        navigate({
          to: '/api/$apiId/$exampleId',
          params: { apiId: item.demoId, exampleId: item.exampleId },
        })
      } else if (item.type === 'reference' && item.mdnUrl) {
        window.open(item.mdnUrl, '_blank', 'noopener,noreferrer')
      }
    },
    [navigate, handleOpenChange]
  )

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange}>
      <CommandInput
        placeholder="Search demos, examples, and APIs..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found for "{search}"</CommandEmpty>

        {groupedItems.demoItems.length > 0 && (
          <CommandGroup heading="Demos">
            {groupedItems.demoItems.map((item) => (
              <CommandItem key={item.id} value={item.id} onSelect={() => handleSelect(item)}>
                <Code2 className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {groupedItems.exampleItems.length > 0 && (
          <CommandGroup heading="Examples">
            {groupedItems.exampleItems.map((item) => (
              <CommandItem key={item.id} value={item.id} onSelect={() => handleSelect(item)}>
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {groupedItems.referenceItems.length > 0 && (
          <CommandGroup heading="API Reference">
            {groupedItems.referenceItems.map((item) => (
              <CommandItem key={item.id} value={item.id} onSelect={() => handleSelect(item)}>
                <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
