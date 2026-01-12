import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { RecipeList } from './RecipeList'
import * as apiClient from '../api/client'

// Mock the API client
vi.mock('../api/client')

// Mock useHistory
const mockPush = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useHistory: () => ({
      push: mockPush,
    }),
  }
})

describe('RecipeList', () => {
  beforeEach(() => {
    mockPush.mockClear()
    vi.clearAllMocks()
  })

  it('should render loading state', () => {
    vi.spyOn(apiClient, 'getRecipes').mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(
      <BrowserRouter>
        <RecipeList />
      </BrowserRouter>
    )

    expect(screen.getByTestId('spinner')).toBeVisible()
  })

  it('should render error state', async () => {
    vi.spyOn(apiClient, 'getRecipes').mockRejectedValueOnce(new Error('Failed to fetch'))

    render(
      <BrowserRouter>
        <RecipeList />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Failed to load recipes/i)).toBeVisible()
    })
  })

  it('should render recipe list', async () => {
    const mockRecipes = [
      { id: '1', name: 'Recipe 1', author_id: 'author-1' },
      { id: '2', name: 'Recipe 2', author_id: 'author-2' },
    ]

    vi.spyOn(apiClient, 'getRecipes').mockResolvedValueOnce(mockRecipes)

    render(
      <BrowserRouter>
        <RecipeList />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Recipe 1')).toBeVisible()
      expect(screen.getByText('Recipe 2')).toBeVisible()
    })
  })

  it('should navigate to create recipe when button is clicked', async () => {
    vi.spyOn(apiClient, 'getRecipes').mockResolvedValueOnce([])

    render(
      <BrowserRouter>
        <RecipeList />
      </BrowserRouter>
    )

    await waitFor(() => {
      const createButton = screen.getByText('Create New Recipe')
      expect(createButton).toBeVisible()
    })

    const createButton = screen.getByText('Create New Recipe')
    await userEvent.click(createButton)

    expect(mockPush).toHaveBeenCalledWith('/recipes/new')
  })

  it('should navigate to recipe detail when recipe is clicked', async () => {
    const mockRecipes = [
      { id: '1', name: 'Recipe 1', author_id: 'author-1' },
    ]

    vi.spyOn(apiClient, 'getRecipes').mockResolvedValueOnce(mockRecipes)

    render(
      <BrowserRouter>
        <RecipeList />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Recipe 1')).toBeVisible()
    })

    const recipeLink = screen.getByText('Recipe 1').closest('a')
    expect(recipeLink).toHaveAttribute('href', '/recipes/1')
  })
})
