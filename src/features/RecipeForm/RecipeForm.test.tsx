import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { RecipeForm } from './RecipeForm'
import * as apiClient from '../../api/client'

// Mock the API client
vi.mock('../../api/client')

// Mock useParams and useHistory
const mockPush = vi.fn()
const mockUseParams = vi.fn(() => ({})) // Default: create mode
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => mockUseParams(),
    useHistory: () => ({
      push: mockPush,
    }),
  }
})

describe('RecipeForm', () => {
  beforeEach(() => {
    mockPush.mockClear()
    vi.clearAllMocks()
  })

  describe('Create Mode', () => {
    it('should render create form', () => {
      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:39',message:'Checking rendered content',data:{allText:screen.queryAllByText(/./).map(e=>e.textContent).slice(0,10)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      expect(screen.getByText('Create New Recipe')).toBeVisible()
      expect(screen.getByLabelText(/Recipe Name/i)).toBeVisible()
      expect(screen.getByLabelText(/Author Name/i)).toBeVisible()
    })

    it('should allow editing recipe name and author in create mode', () => {
      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )

      const nameInput = screen.getByLabelText(/Recipe Name/i)
      const authorInput = screen.getByLabelText(/Author Name/i)

      expect(nameInput).not.toBeDisabled()
      expect(authorInput).not.toBeDisabled()
    })

    it('should create recipe on form submission', async () => {
      const mockRecipe = {
        id: 'new-id',
        name: 'New Recipe',
        author_id: 'author-1',
        author_name: 'Test Author',
        ingredients: [{ id: 'ing-1', name: 'Ingredient 1' }],
      }

      vi.spyOn(apiClient, 'createRecipe').mockResolvedValueOnce(mockRecipe)

      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )

      await userEvent.type(screen.getByLabelText(/Recipe Name/i), 'New Recipe')
      await userEvent.type(screen.getByLabelText(/Author Name/i), 'Test Author')
      
      // Add ingredient first
      const addButton = screen.getByRole('button', { name: /Add Ingredient/i })
      await userEvent.click(addButton)
      
      await waitFor(() => {
        const ingredientInputs = screen.getAllByPlaceholderText(/Ingredient name/i)
        expect(ingredientInputs.length).toBeGreaterThan(0)
      })
      
      const ingredientInputs = screen.getAllByPlaceholderText(/Ingredient name/i)
      const ingredientInput = ingredientInputs[ingredientInputs.length - 1] // Get the last one (newly added)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:90',message:'Before typing ingredient',data:{inputValue:(ingredientInput as HTMLInputElement).value,inputCount:ingredientInputs.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      await userEvent.type(ingredientInput, 'Ingredient 1')
      // #region agent log
      const nameInput = screen.getByLabelText(/Recipe Name/i) as HTMLInputElement;
      const authorInput = screen.getByLabelText(/Author Name/i) as HTMLInputElement;
      fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:94',message:'After typing ingredient',data:{ingredientValue:(ingredientInput as HTMLInputElement).value,nameValue:nameInput.value,authorValue:authorInput.value},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
      // #endregion

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:95',message:'Looking for submit button',data:{allButtons:screen.queryAllByRole('button').map(b=>b.textContent)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      const submitButton = screen.getByRole('button', { name: /Create Recipe/i })
      // #region agent log
      const finalIngredientInputs = screen.getAllByPlaceholderText(/Ingredient name/i);
      fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:103',message:'Before clicking submit',data:{nameValue:nameInput.value,authorValue:authorInput.value,ingredientCount:finalIngredientInputs.length,ingredientValues:finalIngredientInputs.map(i=>(i as HTMLInputElement).value),buttonText:submitButton.textContent,buttonDisabled:submitButton.hasAttribute('disabled')},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      await userEvent.click(submitButton)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:107',message:'After clicking submit',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'G'})}).catch(()=>{});
      // #endregion

      await waitFor(() => {
        // #region agent log
        const createRecipeCalls = (apiClient.createRecipe as any).mock?.calls || [];
        fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:110',message:'Checking createRecipe call',data:{wasCalled:createRecipeCalls.length,calls:createRecipeCalls},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        expect(apiClient.createRecipe).toHaveBeenCalledWith({
          name: 'New Recipe',
          author_name: 'Test Author',
          ingredients: [{ name: 'Ingredient 1' }],
        })
      })
      
      await waitFor(() => {
        // #region agent log
        const pushCalls = mockPush.mock.calls || [];
        fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:120',message:'Checking navigation calls',data:{pushCalls:pushCalls},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        expect(mockPush).toHaveBeenCalledWith('/recipes/new-id')
      })
    })

    it('should validate required fields', async () => {
      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )

      const submitButton = screen.getByRole('button', { name: /Create Recipe/i })
      await userEvent.click(submitButton)

      // Form should not submit without required fields
      // (Validation is handled by HTML5 required attribute)
      // Wait a bit to ensure form doesn't submit
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(apiClient.createRecipe).not.toHaveBeenCalled()
    })

    it('should handle ingredient addition and removal', async () => {
      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )

      // Initially no ingredients
      expect(screen.getByText(/No ingredients added/i)).toBeVisible()

      // Add ingredient
      const addButton = screen.getByRole('button', { name: /Add Ingredient/i })
      await userEvent.click(addButton)

      await waitFor(() => {
        const ingredientInputs = screen.getAllByPlaceholderText(/Ingredient name/i)
        expect(ingredientInputs.length).toBeGreaterThan(0)
      })

      // Remove ingredient
      const removeButtons = screen.getAllByText(/Remove/i)
      expect(removeButtons.length).toBeGreaterThan(0)
      await userEvent.click(removeButtons[0])

      // After removal, should show "No ingredients added" again
      await waitFor(() => {
        expect(screen.getByText(/No ingredients added/i)).toBeVisible()
      })
    })
  })

  describe('Edit Mode', () => {
    beforeEach(() => {
      // Set useParams to return an id (edit mode)
      mockUseParams.mockReturnValue({ id: '1' })
    })

    afterEach(() => {
      // Reset to create mode
      mockUseParams.mockReturnValue({})
    })

    it('should render edit form with recipe data', async () => {
      const mockRecipe = {
        id: '1',
        name: 'Existing Recipe',
        author_id: 'author-1',
        author_name: 'Test Author',
        ingredients: [
          { id: 'ing-1', name: 'Ingredient 1' },
        ],
      }

      vi.spyOn(apiClient, 'getRecipe').mockResolvedValueOnce(mockRecipe)

      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )

      await waitFor(() => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/243a064f-b193-47e6-b2f5-bb043de99496',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'RecipeForm.test.tsx:161',message:'Checking edit form rendered',data:{allInputs:screen.queryAllByRole('textbox').map(i=>({value:i.getAttribute('value'),placeholder:i.getAttribute('placeholder')}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        expect(screen.getByText('Edit Recipe')).toBeVisible()
        expect(screen.getByDisplayValue('Existing Recipe')).toBeVisible()
        expect(screen.getByDisplayValue('Ingredient 1')).toBeVisible()
      })
    })

    it('should disable recipe name and author fields in edit mode', async () => {
      const mockRecipe = {
        id: '1',
        name: 'Existing Recipe',
        author_id: 'author-1',
        author_name: 'Test Author',
        ingredients: [],
      }

      vi.spyOn(apiClient, 'getRecipe').mockResolvedValueOnce(mockRecipe)

      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )

      await waitFor(() => {
        const nameInput = screen.getByDisplayValue('Existing Recipe')
        const authorInput = screen.getByDisplayValue('Test Author')
        expect(nameInput).toBeDisabled()
        expect(authorInput).not.toBeDisabled() // Author name should be editable in edit mode for requester
      })
    })

    it('should update recipe on form submission', async () => {
      const mockRecipe = {
        id: '1',
        name: 'Existing Recipe',
        author_id: 'author-1',
        author_name: 'Test Author',
        ingredients: [],
      }

      const updatedRecipe = {
        ...mockRecipe,
        ingredients: [{ id: 'ing-1', name: 'New Ingredient' }],
      }

      vi.spyOn(apiClient, 'getRecipe').mockResolvedValueOnce(mockRecipe)
      vi.spyOn(apiClient, 'updateRecipe').mockResolvedValueOnce(updatedRecipe)

      render(
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(screen.getByText('Edit Recipe')).toBeVisible()
      })

      // Wait for form to fully load (recipe data is loaded)
      await waitFor(() => {
        expect(screen.getByDisplayValue('Existing Recipe')).toBeVisible()
      })

      // Enter requester name
      const authorInput = screen.getByLabelText(/Your Name/i) as HTMLInputElement
      await userEvent.clear(authorInput)
      await userEvent.type(authorInput, 'Test Author')

      // Add new ingredient - in edit mode with empty ingredients, there are no inputs initially
      const addButton = screen.getByRole('button', { name: /Add Ingredient/i })
      await userEvent.click(addButton)

      await waitFor(() => {
        const ingredientInputs = screen.getAllByPlaceholderText(/Ingredient name/i)
        expect(ingredientInputs.length).toBeGreaterThan(0)
      })

      const ingredientInputs = screen.getAllByPlaceholderText(/Ingredient name/i)
      const newIngredientInput = ingredientInputs[ingredientInputs.length - 1] // Get the last one (newly added)
      await userEvent.type(newIngredientInput, 'New Ingredient')

      const submitButton = screen.getByRole('button', { name: /Update Recipe/i })
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(apiClient.updateRecipe).toHaveBeenCalledWith('1', {
          requester_name: 'Test Author',
          ingredients_to_add: [{ name: 'New Ingredient' }],
        })
      })
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/recipes/1')
      })
    })
  })
})
