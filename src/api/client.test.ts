import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from './client'
import { RecipeListItem, Recipe, CreateRecipeInput, UpdateRecipeInput } from './dtos'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('API Client', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getRecipes', () => {
    it('should return list of recipes on success', async () => {
      const mockRecipes: RecipeListItem[] = [
        { id: '1', name: 'Recipe 1', author_id: 'author-1' },
        { id: '2', name: 'Recipe 2', author_id: 'author-2' },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ recipes: mockRecipes }),
      })

      const result = await getRecipes()

      expect(mockFetch).toHaveBeenCalledWith('/api/recipes')
      expect(result).toEqual(mockRecipes)
    })

    it('should throw error on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      })

      await expect(getRecipes()).rejects.toThrow('API error: 500 - Internal Server Error')
    })
  })

  describe('getRecipe', () => {
    it('should return recipe details on success', async () => {
      const mockRecipe: Recipe = {
        id: '1',
        name: 'Recipe 1',
        author_id: 'author-1',
        ingredients: [
          { id: 'ing-1', name: 'Ingredient 1' },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
      })

      const result = await getRecipe('1')

      expect(mockFetch).toHaveBeenCalledWith('/api/recipes/1')
      expect(result).toEqual(mockRecipe)
    })

    it('should throw error when recipe not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => 'Not Found',
      })

      await expect(getRecipe('999')).rejects.toThrow('API error: 404 - Not Found')
    })
  })

  describe('createRecipe', () => {
    it('should create recipe successfully', async () => {
      const input: CreateRecipeInput = {
        name: 'New Recipe',
        author_name: 'Test Author',
        ingredients: [{ name: 'Ingredient 1' }],
      }

      const mockRecipe: Recipe = {
        id: 'new-id',
        name: 'New Recipe',
        author_id: 'author-1',
        author_name: 'Test Author',
        ingredients: [{ id: 'ing-1', name: 'Ingredient 1' }],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
      })

      const result = await createRecipe(input)

      expect(mockFetch).toHaveBeenCalledWith('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: input.name,
          author_name: input.author_name,
          ingredients: input.ingredients,
        }),
      })
      expect(result).toEqual(mockRecipe)
    })

    it('should throw error on creation failure', async () => {
      const input: CreateRecipeInput = {
        name: 'New Recipe',
        author_name: 'Test Author',
        ingredients: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => 'Bad Request',
      })

      await expect(createRecipe(input)).rejects.toThrow('API error: 400 - Bad Request')
    })
  })

  describe('updateRecipe', () => {
    it('should update recipe successfully', async () => {
      const input: UpdateRecipeInput = {
        requester_name: 'Test Author',
        ingredients_to_add: [{ name: 'New Ingredient' }],
      }

      const mockRecipe: Recipe = {
        id: '1',
        name: 'Recipe 1',
        author_id: 'author-1',
        author_name: 'Test Author',
        ingredients: [
          { id: 'ing-1', name: 'Ingredient 1' },
          { id: 'ing-2', name: 'New Ingredient' },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
      })

      const result = await updateRecipe('1', input)

      expect(mockFetch).toHaveBeenCalledWith('/api/recipes/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requester_name: input.requester_name,
          ingredients_to_add: input.ingredients_to_add,
        }),
      })
      expect(result).toEqual(mockRecipe)
    })

    it('should throw error on update failure', async () => {
      const input: UpdateRecipeInput = {
        requester_name: 'Test Author',
        ingredients_to_add: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        text: async () => 'Forbidden',
      })

      await expect(updateRecipe('1', input)).rejects.toThrow('API error: 403 - Forbidden')
    })
  })

  describe('deleteRecipe', () => {
    it('should delete recipe successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      })

      await deleteRecipe('1', 'Test Author')

      expect(mockFetch).toHaveBeenCalledWith('/api/recipes/1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requester_name: 'Test Author',
        }),
      })
    })

    it('should throw error on delete failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => 'Not Found',
      })

      await expect(deleteRecipe('999', 'Test Author')).rejects.toThrow('API error: 404 - Not Found')
    })
  })
})
