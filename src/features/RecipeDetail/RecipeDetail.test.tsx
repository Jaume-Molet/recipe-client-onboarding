import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { RecipeDetail } from './RecipeDetail'
import * as apiClient from '../../api/client'

// Mock the API client
vi.mock('../../api/client')

// Mock useParams and useHistory
const mockPush = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useHistory: () => ({
      push: mockPush,
    }),
  }
})

// Mock window.confirm
const mockConfirm = vi.fn()
window.confirm = mockConfirm

describe('RecipeDetail', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockConfirm.mockClear()
    vi.clearAllMocks()
  })

  it('should render loading state', () => {
    vi.spyOn(apiClient, 'getRecipe').mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    )

    expect(screen.getByTestId('spinner')).toBeVisible()
  })

  it('should render error state', async () => {
    vi.spyOn(apiClient, 'getRecipe').mockRejectedValueOnce(new Error('Failed to fetch'))

    render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Failed to load recipe/i)).toBeVisible()
    })
  })

  it('should render recipe details', async () => {
    const mockRecipe = {
      id: '1',
      name: 'Test Recipe',
      author_id: 'author-1',
      ingredients: [
        { id: 'ing-1', name: 'Ingredient 1' },
        { id: 'ing-2', name: 'Ingredient 2' },
      ],
    }

    vi.spyOn(apiClient, 'getRecipe').mockResolvedValueOnce(mockRecipe)

    render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeVisible()
    })
    
    // Ingredients are rendered with bullet points "• Ingredient 1", so we need to match by text content
    const ingredient1 = screen.getByText((content, element) => {
      return element?.textContent === '• Ingredient 1'
    })
    expect(ingredient1).toBeVisible()
    
    const ingredient2 = screen.getByText((content, element) => {
      return element?.textContent === '• Ingredient 2'
    })
    expect(ingredient2).toBeVisible()
  })

  it('should navigate to edit page when edit button is clicked', async () => {
    const mockRecipe = {
      id: '1',
      name: 'Test Recipe',
      author_id: 'author-1',
      ingredients: [],
    }

    vi.spyOn(apiClient, 'getRecipe').mockResolvedValueOnce(mockRecipe)

    render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeVisible()
    })

    const editButton = screen.getByText('Edit')
    await userEvent.click(editButton)

    expect(mockPush).toHaveBeenCalledWith('/recipes/1/edit')
  })

  it('should delete recipe when delete button is clicked and confirmed', async () => {
    const mockRecipe = {
      id: '1',
      name: 'Test Recipe',
      author_id: 'author-1',
      ingredients: [],
    }

    mockConfirm.mockReturnValue(true)
    vi.spyOn(apiClient, 'getRecipe').mockResolvedValueOnce(mockRecipe)
    vi.spyOn(apiClient, 'deleteRecipe').mockResolvedValueOnce(undefined)

    render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Delete')).toBeVisible()
    })

    const deleteButton = screen.getByText('Delete')
    await userEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete "Test Recipe"?')
      expect(apiClient.deleteRecipe).toHaveBeenCalledWith('1', 'author-1')
    })
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('should not delete recipe when delete is cancelled', async () => {
    const mockRecipe = {
      id: '1',
      name: 'Test Recipe',
      author_id: 'author-1',
      ingredients: [],
    }

    mockConfirm.mockReturnValue(false)
    vi.spyOn(apiClient, 'getRecipe').mockResolvedValueOnce(mockRecipe)
    vi.spyOn(apiClient, 'deleteRecipe').mockResolvedValueOnce(undefined)

    render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Delete')).toBeVisible()
    })

    const deleteButton = screen.getByText('Delete')
    await userEvent.click(deleteButton)

    expect(mockConfirm).toHaveBeenCalled()
    expect(apiClient.deleteRecipe).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })
})
